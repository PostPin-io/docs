// Screenshots of the plugin window for DaVinci Resolve, PostPin Desktop (Pro Tools) and Premiere Pro.
// Premiere's panel is the same plugin-core UI, so it runs in the Resolve build too, in a narrow window.
// Runs the real plugin UI and host bridge from the source checkout in Electron, with a fake NLE
// (plugin/harness.ts), and logs in through the real device flow against the seeded instance.
//
// Usage: node screenshots/plugin.ts <postpin-checkout>
// Needs `pnpm --filter @postpin-io/resolve-plugin build` in the checkout (run.ts does it).
import { _electron, chromium } from "playwright";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { BASE, DOCS_ROOT, OUT, PASSWORD, WORK, sleep } from "./lib.ts";
import { webShot } from "./webshot.ts";

const src = path.resolve(process.argv[2] ?? "");
const pluginDir = path.join(src, "packages/plugin-resolve");
const dist = path.join(pluginDir, "dist");
if (!fs.existsSync(path.join(dist, "ui/index.html"))) throw new Error(`build the Resolve plugin first: ${dist}`);
const outDir = path.join(OUT, "plugins");
const webDir = path.join(OUT, "web");
fs.mkdirSync(outDir, { recursive: true });

// Bundle the harness against the checkout's plugin packages
const harness = path.join(WORK, "harness.cjs");
execFileSync(
	path.join(pluginDir, "node_modules/.bin/esbuild"),
	[path.join(DOCS_ROOT, "screenshots/plugin/harness.ts"), "--bundle", "--platform=node", "--format=cjs", "--external:electron", `--outfile=${harness}`],
	{ stdio: "inherit", env: { ...process.env, NODE_PATH: path.join(pluginDir, "node_modules") } },
);

// Timeline thumbnail the fake Resolve shows on its host card
const thumbFile = path.join(WORK, "thumb.txt");
const jpg = execFileSync("ffmpeg", ["-v", "error", "-ss", "12", "-i", path.join(WORK, "demo.mp4"), "-frames:v", "1", "-vf", "scale=480:-1", "-f", "image2", "-c:v", "mjpeg", "-"]);
fs.writeFileSync(thumbFile, `data:image/jpeg;base64,${jpg.toString("base64")}`);

const electronBin = path.join(pluginDir, "node_modules/electron/dist/Electron.app/Contents/MacOS/Electron");

// browser session of the user approving the device login
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const web = await ctx.newPage();
await web.goto(`${BASE}/auth/login`);
await web.getByLabel("Email").fill("jordan@example.com");
await web.getByLabel("Password").fill(PASSWORD);
await web.getByRole("button", { name: "Log in" }).click();
await web.waitForURL(/\/dashboard/);

const SLUGS: Record<string, string> = { Resolve: "resolve", "Pro Tools": "desktop", "Premiere Pro": "premiere" };
for (const [host, slug] of Object.entries(SLUGS)) {
	console.log(`plugin: ${slug}`);
	const userData = fs.mkdtempSync(path.join(WORK, `userdata-${slug}-`));
	const app = await _electron.launch({
		executablePath: electronBin,
		args: [harness, "--lang=en-US"],
		env: {
			...process.env,
			HARNESS_HOST: host,
			HARNESS_DIST: dist,
			HARNESS_USERDATA: userData,
			HARNESS_SERVER: BASE,
			HARNESS_THUMB: thumbFile,
			HARNESS_VIDEO: path.join(WORK, "demo.mp4"),
		},
	});
	let openedUrl: string | null = null;
	app.process().stdout?.on("data", (d: Buffer) => {
		const m = d.toString().match(/HARNESS_OPEN (\S+)/);
		if (m) openedUrl = m[1];
	});
	const win = await app.firstWindow();
	await win.waitForLoadState("domcontentloaded");
	// The window is taller than its content; crop to the content plus some margin
	const shot = async (name: string, full = false) => {
		await sleep(600);
		// main screen: its grid; login screens: the centered card
		const box = full ? null : await win.evaluate(() => {
			const grid = document.querySelector("main .grid");
			const el = grid ?? document.querySelector("main .shadow-lg");
			const r = el?.getBoundingClientRect();
			return r ? { top: r.top, bottom: r.bottom, isMain: !!grid } : null;
		});
		const { width, height } = win.viewportSize() ?? (await win.evaluate(() => ({ width: innerWidth, height: innerHeight })));
		const clip = box
			? box.isMain
				? { x: 0, y: 0, width, height: Math.min(height, box.bottom + 32) }
				: { x: 0, y: Math.max(0, box.top - 64), width, height: Math.min(height, box.bottom + 64) - Math.max(0, box.top - 64) }
			: undefined;
		await win.screenshot({ path: path.join(outDir, `${slug}-${name}.png`), clip });
		console.log(`  plugins/${slug}-${name}.png`);
	};

	await win.getByRole("button", { name: "Login" }).waitFor();
	if (slug !== "premiere") await shot("login");
	if (slug === "resolve") {
		await win.locator("input.toggle").uncheck();
		await win.getByPlaceholder("PostPin Server URL").fill("https://postpin.example.com");
		await shot("login-self-hosted");
		await win.getByPlaceholder("PostPin Server URL").fill("");
		await win.locator("input.toggle").check();
	}

	await win.getByRole("button", { name: "Login" }).click();
	await win.getByText("Continue in your browser").waitFor();
	if (slug !== "premiere") await shot("login-code");
	while (!openedUrl) await sleep(100);

	await web.goto(openedUrl);
	await web.getByRole("button", { name: "Allow access" }).waitFor();
	if (slug === "resolve") {
		await sleep(500);
		await webShot(web, "device-approve");
	}
	await web.getByRole("button", { name: "Allow access" }).click();
	await web.getByText("You can close this tab").waitFor();

	// the plugin polls every few seconds
	await win.getByText("Render & Upload").waitFor({ timeout: 30_000 });
	await win.getByText("Trailer v3").first().waitFor({ timeout: 15_000 }).catch(() => {});
	await shot("main");
	if (slug === "premiere") {
		// the login, choose and render screens look the same as in the other plugins
		await app.close();
		fs.rmSync(userData, { recursive: true, force: true });
		continue;
	}

	await win.getByRole("button", { name: "Choose export" }).first().click();
	await win.getByRole("button", { name: "Select" }).waitFor();
	await shot("choose-destination", true);
	await win.getByRole("button", { name: "Cancel" }).click();

	if (slug === "resolve") {
		await win.getByRole("button", { name: "Render to disk settings" }).click();
		await shot("render-to-disk");
		await win.getByRole("button", { name: "Render to disk settings" }).click();
	}

	// the fake render takes a minute; the export is only created after it, so closing the
	// window here leaves the seeded data untouched
	await win.getByRole("button", { name: /Render & Upload/ }).click();
	await sleep(20_000);
	await shot("rendering");
	await app.close();
	fs.rmSync(userData, { recursive: true, force: true });
}

await browser.close();
