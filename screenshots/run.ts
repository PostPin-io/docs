// Regenerates every screenshot from a PostPin checkout:
//   node screenshots/run.ts <postpin-checkout> [--only <steps>] [--keep] [--skip-prepare]
//
// --only takes a comma-separated list of steps: the web steps in web.ts (login, review, sharing, …),
// `plugins` (plugin.ts) and `social` (social.ts). Without it, every step runs. The other screenshots
// stay as they are. `social` also runs with `review`, as it is rendered from the review shot.
// Without `plugins`, the checkout's Resolve plugin isn't built either, which saves the most time.
//
// 1. starts throwaway Postgres/Redis/rustfs/maildev (screenshots/compose.yml, own ports)
// 2. prepares the checkout: env, install, prisma client, API spec, Resolve plugin build
// 3. starts app (http://localhost:5199) and worker from the checkout, unless already running
// 4. resets the database, seeds demo data (seed.ts), waits for media processing
// 5. web screenshots (web.ts), plugin screenshots (plugin.ts), link preview image (social.ts)
// 6. stops everything it started, unless --keep
//
// Needs Docker, pnpm, ffmpeg/ffprobe. The demo video is rendered from the photos in
// screenshots/photos (see demo-video.ts). The checkout should be a detached worktree at the commit
// in source.json; its .env is overwritten.
import { execFileSync, spawn, type ChildProcess } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { BASE, COMPOSE, DOCS_ROOT, WORK, resetDatabase, sleep } from "./lib.ts";
import { seed } from "./seed.ts";
import { buildDemoVideo } from "./demo-video.ts";

const args = process.argv.slice(2);
const src = path.resolve(args.find((a, i) => !a.startsWith("--") && args[i - 1] !== "--only") ?? "");
if (!fs.existsSync(path.join(src, "packages/postpin"))) {
	console.error("usage: node screenshots/run.ts <postpin-checkout> [--only <steps>] [--keep] [--skip-prepare]");
	process.exit(1);
}
const keep = args.includes("--keep");
const onlyArg = args.indexOf("--only");
const only = onlyArg >= 0 ? args[onlyArg + 1].split(",").filter(Boolean) : null;
const webSteps = only?.filter((s) => s !== "plugins" && s !== "social") ?? [];
const runWeb = !only || webSteps.length > 0;
const runPlugins = !only || only.includes("plugins");
const knownWebSteps = [...fs.readFileSync(path.join(DOCS_ROOT, "screenshots/web.ts"), "utf8").matchAll(/^\tasync (\w+)\(\)/gm)].map((m) => m[1]);
const unknown = webSteps.filter((s) => !knownWebSteps.includes(s));
if (unknown.length) {
	console.error(`unknown steps: ${unknown.join(", ")}; known: ${[...knownWebSteps, "plugins", "social"].join(", ")}`);
	process.exit(1);
}
const runSocial = !only || only.includes("social") || only.includes("review");
const run = (cmd: string, argv: string[], cwd = src) => execFileSync(cmd, argv, { cwd, stdio: "inherit" });
fs.mkdirSync(WORK, { recursive: true });

console.log("== services");
run("docker", [...COMPOSE, "up", "-d", "--wait"], DOCS_ROOT);

if (!args.includes("--skip-prepare")) {
	console.log("== prepare checkout");
	fs.copyFileSync(path.join(DOCS_ROOT, "screenshots/env.screenshots"), path.join(src, ".env"));
	run("pnpm", ["install", "--frozen-lockfile"]);
	run("pnpm", ["run", "sync-env"]);
	// `prisma generate --sql` checks the typed queries against a migrated database
	resetDatabase(src);
	run("pnpm", ["--filter", "@postpin-io/shared", "run", "db:generate"]);
	run("pnpm", ["--filter", "@postpin-io/postpin", "run", "generate:api"]);
	run("pnpm", ["--filter", "@postpin-io/postpin", "run", "build:api-client"]);
	if (runPlugins) {
		run("pnpm", ["--filter", "@postpin-io/resolve-plugin", "run", "build"]);
		ensureElectron(path.join(src, "packages/plugin-resolve/node_modules/electron"));
	}
}

const started: ChildProcess[] = [];
const up = async () => (await fetch(`${BASE}/health`).catch(() => null))?.ok ?? false;
if (!(await up())) {
	console.log("== start app and worker");
	const log = (name: string) => fs.openSync(path.join(WORK, `${name}.log`), "w");
	started.push(
		spawn("npx", ["vite", "dev", "--port", "5199", "--strictPort"], { cwd: path.join(src, "packages/postpin"), stdio: ["ignore", log("app"), log("app")], detached: true }),
		spawn("pnpm", ["dev"], {
			cwd: path.join(src, "packages/worker"),
			stdio: ["ignore", log("worker"), log("worker")],
			detached: true,
			// bin/ffmpeg encodes with x264's fastest preset, see there
			env: { ...process.env, PATH: `${path.join(DOCS_ROOT, "screenshots/bin")}:${process.env.PATH}` },
		}),
	);
	for (let i = 0; !(await up()); i++) {
		if (i > 90) throw new Error("app did not come up, see screenshots/.work/app.log");
		await sleep(1000);
	}
}

try {
	console.log("== seed");
	resetDatabase(src);
	await buildDemoVideo();
	await seed(src);

	console.log("== screenshots");
	if (runWeb) run("node", [path.join(DOCS_ROOT, "screenshots/web.ts"), ...webSteps], DOCS_ROOT);
	if (runPlugins) run("node", [path.join(DOCS_ROOT, "screenshots/plugin.ts"), src], DOCS_ROOT);
	if (runSocial) run("node", [path.join(DOCS_ROOT, "screenshots/social.ts")], DOCS_ROOT);
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
