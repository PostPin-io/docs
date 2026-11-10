// Regenerates every screenshot from a PostPin checkout:
//   node screenshots/run.ts <postpin-checkout> [--keep] [--skip-prepare]
//
// 1. starts throwaway Postgres/Redis/rustfs/maildev (screenshots/compose.yml, own ports)
// 2. prepares the checkout: env, install, prisma client, API spec, Resolve plugin build
// 3. starts app (http://localhost:5199) and worker from the checkout, unless already running
// 4. resets the database, seeds demo data (seed.ts), waits for media processing
// 5. web screenshots (web.ts), plugin screenshots (plugin.ts)
// 6. stops everything it started, unless --keep
//
// Needs Docker, pnpm, ffmpeg/ffprobe. The checkout should be a detached worktree at the commit
// in source.json; its .env is overwritten.
import { execFileSync, spawn, type ChildProcess } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { BASE, COMPOSE, DOCS_ROOT, WORK, resetDatabase, sleep } from "./lib.ts";
import { seed } from "./seed.ts";

const args = process.argv.slice(2);
const src = path.resolve(args.find((a) => !a.startsWith("--")) ?? "");
if (!fs.existsSync(path.join(src, "packages/postpin"))) {
	console.error("usage: node screenshots/run.ts <postpin-checkout> [--keep] [--skip-prepare]");
	process.exit(1);
}
const keep = args.includes("--keep");
const run = (cmd: string, argv: string[], cwd = src) => execFileSync(cmd, argv, { cwd, stdio: "inherit" });
fs.mkdirSync(WORK, { recursive: true });

console.log("== services");
run("docker", [...COMPOSE, "up", "-d", "--wait"], DOCS_ROOT);

if (!args.includes("--skip-prepare")) {
	console.log("== prepare checkout");
	fs.copyFileSync(path.join(DOCS_ROOT, "screenshots/env.screenshots"), path.join(src, ".env"));
	run("pnpm", ["install", "--frozen-lockfile"]);
	run("pnpm", ["run", "sync-env"]);
	run("pnpm", ["--filter", "@postpin-io/shared", "run", "db:generate"]);
	run("pnpm", ["--filter", "@postpin-io/postpin", "run", "generate:api"]);
	run("pnpm", ["--filter", "@postpin-io/postpin", "run", "build:api-client"]);
	run("pnpm", ["--filter", "@postpin-io/resolve-plugin", "run", "build"]);
	ensureElectron(path.join(src, "packages/plugin-resolve/node_modules/electron"));
}

const started: ChildProcess[] = [];
const up = async () => (await fetch(`${BASE}/health`).catch(() => null))?.ok ?? false;
if (!(await up())) {
	console.log("== start app and worker");
	const log = (name: string) => fs.openSync(path.join(WORK, `${name}.log`), "w");
	started.push(
		spawn("npx", ["vite", "dev", "--port", "5199", "--strictPort"], { cwd: path.join(src, "packages/postpin"), stdio: ["ignore", log("app"), log("app")], detached: true }),
		spawn("pnpm", ["dev"], { cwd: path.join(src, "packages/worker"), stdio: ["ignore", log("worker"), log("worker")], detached: true }),
	);
	for (let i = 0; !(await up()); i++) {
		if (i > 90) throw new Error("app did not come up, see screenshots/.work/app.log");
		await sleep(1000);
	}
}

try {
	console.log("== seed");
	resetDatabase(src);
	run("sh", [path.join(DOCS_ROOT, "screenshots/make-demo-video.sh"), path.join(WORK, "demo.mp4")], DOCS_ROOT);
	await seed();

	console.log("== screenshots");
	run("node", [path.join(DOCS_ROOT, "screenshots/web.ts")], DOCS_ROOT);
	run("node", [path.join(DOCS_ROOT, "screenshots/plugin.ts"), src], DOCS_ROOT);
} finally {
	if (!keep) {
		console.log("== teardown");
		for (const p of started) if (p.pid) process.kill(-p.pid);
		run("docker", [...COMPOSE, "down", "-v"], DOCS_ROOT);
	}
}

// pnpm doesn't run electron's postinstall (build scripts need approval), and its installer
// sometimes leaves only the license files behind, so unpack the cached zip if needed.
function ensureElectron(dir: string) {
	if (fs.existsSync(path.join(dir, "dist/Electron.app"))) return;
	execFileSync("node", ["install.js"], { cwd: dir, stdio: "inherit" });
	if (fs.existsSync(path.join(dir, "dist/Electron.app"))) return;
	const version = JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf8")).version;
	const zip = execFileSync("find", [path.join(process.env.HOME!, "Library/Caches/electron"), "-name", `electron-v${version}-darwin-${process.arch}.zip`], { encoding: "utf8" }).split("\n")[0];
	if (!zip) throw new Error(`Electron ${version} could not be installed`);
	fs.rmSync(path.join(dir, "dist"), { recursive: true, force: true });
	execFileSync("unzip", ["-q", zip, "-d", path.join(dir, "dist")]);
	fs.writeFileSync(path.join(dir, "path.txt"), "Electron.app/Contents/MacOS/Electron");
}
