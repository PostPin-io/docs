// Takes a web app screenshot in light and dark mode and records it in the manifest, which the
// docs' <Screenshot> component reads: the page URL for the browser frame, and whether the shot
// is a whole page (framed) or a cutout like a dialog (not framed).
import type { Page } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { OUT, sleep } from "./lib.ts";

const dir = path.join(OUT, "web");
const manifestFile = path.join(dir, "manifest.json");

export interface ShotInfo {
	/** path and query of the page, shown in the browser frame */
	url: string;
	/** a whole page (shown in a browser frame) or a cutout of one */
	page: boolean;
}

function updateManifest(name: string, info: ShotInfo) {
	const manifest: Record<string, ShotInfo> = fs.existsSync(manifestFile)
		? JSON.parse(fs.readFileSync(manifestFile, "utf8"))
		: {};
	manifest[name] = info;
	const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
	fs.writeFileSync(manifestFile, JSON.stringify(sorted, null, "\t") + "\n");
}

export type Clip = { x: number; y: number; width: number; height: number };

/**
 * `<name>.png` in light and `<name>-dark.png` in dark mode. The app follows prefers-color-scheme,
 * so switching the emulated scheme restyles the same page state without redoing the step.
 * `clip` can be a function, because the cutout may move when the theme changes.
 */
export async function webShot(page: Page, name: string, opts: { fullPage?: boolean; clip?: Clip | (() => Promise<Clip>) } = {}) {
	fs.mkdirSync(dir, { recursive: true });
	await page.waitForLoadState("networkidle");
	await sleep(500); // thumbnails and fonts settle a moment after network idle
	for (const scheme of ["light", "dark"] as const) {
		await page.emulateMedia({ colorScheme: scheme });
		await sleep(300);
		const clip = typeof opts.clip === "function" ? await opts.clip() : opts.clip;
		const file = path.join(dir, scheme === "light" ? `${name}.png` : `${name}-dark.png`);
		await page.screenshot({ path: file, animations: "disabled", fullPage: opts.fullPage, clip });
	}
	await page.emulateMedia({ colorScheme: "light" });
	const url = new URL(page.url());
	updateManifest(name, { url: url.pathname + url.search, page: !opts.clip });
	console.log(`  web/${name}.png (+ dark)`);
}
