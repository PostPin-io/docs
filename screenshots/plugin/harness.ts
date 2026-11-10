// Electron main process for plugin screenshots: the real PostPin plugin window, UI, preload and
// host bridge (login, API, settings) from the source checkout, with a fake NLE behind it so no
// DaVinci Resolve or Pro Tools is needed. Bundled by screenshots/plugin.ts with esbuild.
//
// Env: HARNESS_HOST ("Resolve" | "Pro Tools"), HARNESS_DIST (built plugin-resolve dist),
// HARNESS_USERDATA (fresh dir), HARNESS_SERVER (PostPin URL), HARNESS_THUMB (jpeg data URL file),
// HARNESS_VIDEO (file "rendered" by the fake NLE).
import { app, shell } from "electron";
import fs from "node:fs";
import path from "node:path";
import { createWindow, exposeHostBridge, exposeNleBridge } from "@postpin-io/plugin-electron/main";
import type { NleBridge, NleMarker } from "@postpin-io/plugin-core/bridge";

const env = (name: string) => {
	const value = process.env[name];
	if (!value) throw new Error(`${name} is not set`);
	return value;
};
const host = env("HARNESS_HOST");
const dist = env("HARNESS_DIST");
app.setPath("userData", env("HARNESS_USERDATA"));

// The device login opens the approval page in the default browser. The screenshot script
// approves it in Playwright instead, so only report the URL.
Object.defineProperty(shell, "openExternal", {
	value: async (url: string) => console.log(`HARNESS_OPEN ${url}`),
});

const resolve = host === "Resolve";
const palette = resolve
	? ["Blue", "Cyan", "Green", "Yellow", "Red", "Pink", "Purple", "Fuchsia", "Rose", "Lavender", "Sky", "Mint", "Lemon", "Sand", "Cocoa", "Cream"].map(
			(id) => ({ id, hex: "#888888" }),
		)
	: Array.from({ length: 16 }, (_, i) => ({ id: String(i + 1), hex: "#888888", name: `Color ${i + 1}` }));

let markers: NleMarker[] = [
	{ nleId: "1", title: "Jump cut", description: "#Edit\nTrim the head of HL_020.", frame: 86400 + 5 * 24 + 2, color: palette[0].id, customData: null },
	{ nleId: "2", title: "Music dips", description: "#Sound\nGap between two music edits.", frame: 86400 + 17 * 24 + 15, color: palette[2].id, customData: null },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const bridge: NleBridge = {
	getCapabilities: async () => ({
		hostName: host,
		palette,
		renderPresets: resolve,
		renderToDisk: resolve,
		snapshotClips: resolve,
		customMarkerData: resolve,
	}),
	getProjectId: async () => "nle-project-harbor",
	getTimelineInfo: async () => ({
		name: resolve ? "Trailer" : "Trailer_Mix_v3",
		id: "resolve-Trailer",
		projectId: "nle-project-harbor",
		projectName: resolve ? "Harbor Lights" : "Trailer_Mix_v3",
		thumbnailDataUrl: resolve ? fs.readFileSync(env("HARNESS_THUMB"), "utf8") : undefined,
	}),
	getMarkers: async () => markers,
	setMarkers: async (list) => {
		const ids = list.map((m, i) => m.nleId ?? String(100 + i));
		markers = list.map((m, i) => ({ ...m, nleId: ids[i] }));
		return ids;
	},
	clearMarkers: async () => {
		markers = [];
	},
	getRenderPresets: async () => ["H.264 Master", "ProRes 422 HQ", "YouTube 1080p"],
	// A slow fake render, so the screenshot can catch the progress bar
	renderPreview: async (onProgress) => {
		for (let percent = 0; percent <= 100; percent += 1) {
			onProgress({ percent, estimatedTimeRemainingMs: (100 - percent) * 600 });
			await sleep(600);
		}
		return env("HARNESS_VIDEO");
	},
	buildTimelineSnapshot: async () => ({
		id: "resolve-Trailer",
		name: "Trailer",
		tracks: [],
		mediaItems: [],
		frameRate: { fpsNumerator: 24, fpsDenominator: 1, dropFrame: false },
		startFrameIndex: 86400,
		durationFrameCount: 30 * 24,
		metadata: {},
	}),
} as NleBridge;

app.whenReady().then(() => {
	const win = createWindow({
		title: resolve ? "PostPin for DaVinci Resolve" : "PostPin Desktop",
		preloadPath: path.join(dist, "preload.js"),
		devServerUrl: "",
		url: path.join(dist, "ui/index.html"),
	});
	exposeHostBridge(win, {
		clientId: resolve ? "io.postpin.plugin-resolve" : "io.postpin.desktop",
		defaultServerUrl: env("HARNESS_SERVER"),
	});
	exposeNleBridge(win, bridge);
});

app.on("window-all-closed", () => app.quit());
