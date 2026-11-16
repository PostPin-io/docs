// Builds the demo render (screenshots/.work/demo.mp4): six 5-second shots with hard cuts,
// 1920x1080, 24 fps, silent stereo audio.
//
// Each shot is one photo from screenshots/photos/ (listed in photos.json), which ffmpeg turns into
// a clip with a slow zoom or pan, so scrubbing and the shot grid don't look like stills. The photos
// are committed, so every run renders the same video. Until all six are there, it falls back to
// generated test patterns (make-demo-video.sh), so the screenshot run still works.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { DOCS_ROOT, WORK } from "./lib.ts";

type Motion = "in" | "out" | "left" | "right" | "up" | "down";
type Photo = { file: string; name: string; motion?: Motion };

const PHOTOS_DIR = path.join(DOCS_ROOT, "screenshots/photos");
const config = JSON.parse(fs.readFileSync(path.join(PHOTOS_DIR, "photos.json"), "utf8")) as {
	shotSeconds: number;
	photos: Photo[];
};
export const SHOT_SECONDS = config.shotSeconds;
// seed.ts builds a timeline with six clips; the video has to have the same cuts
export const SHOT_COUNT = 6;
export const DEMO_VIDEO = path.join(WORK, "demo.mp4");

const FPS = 24;
const FRAMES = SHOT_SECONDS * FPS;
// How far a shot zooms or pans over its 5 seconds: subtle, like a slow camera move
const ZOOM = 0.08;

/**
 * zoompan expressions for one shot. `on` is the output frame, so `p` runs from 0 to 1 over the
 * shot. Pans keep a fixed zoom, so there is room to move.
 */
function zoompan(motion: Motion): string {
	const p = `(on/${FRAMES - 1})`;
	const centerX = "iw/2-(iw/zoom/2)";
	const centerY = "ih/2-(ih/zoom/2)";
	const [z, x, y] = {
		in: [`1+${ZOOM}*${p}`, centerX, centerY],
		out: [`1+${ZOOM}*(1-${p})`, centerX, centerY],
		left: [`1+${ZOOM}`, `(iw-iw/zoom)*(1-${p})`, centerY],
		right: [`1+${ZOOM}`, `(iw-iw/zoom)*${p}`, centerY],
		up: [`1+${ZOOM}`, centerX, `(ih-ih/zoom)*(1-${p})`],
		down: [`1+${ZOOM}`, centerX, `(ih-ih/zoom)*${p}`],
	}[motion];
	return `zoompan=z='${z}':x='${x}':y='${y}':d=${FRAMES}:s=1920x1080:fps=${FPS}`;
}

const MOTIONS: Motion[] = ["in", "right", "out", "left", "in", "down"];

function photoFiles(): string[] | null {
	const files = config.photos.map((p) => path.join(PHOTOS_DIR, p.file));
	return files.length === SHOT_COUNT && files.every((f) => fs.existsSync(f)) ? files : null;
}

/** The render is up to date when it is newer than every photo and than photos.json. */
function upToDate(sources: string[]): boolean {
	if (!fs.existsSync(DEMO_VIDEO)) return false;
	const built = fs.statSync(DEMO_VIDEO).mtimeMs;
	return sources.every((f) => fs.statSync(f).mtimeMs < built);
}

export async function buildDemoVideo() {
	fs.mkdirSync(WORK, { recursive: true });
	const files = photoFiles();
	if (!files) {
		if (fs.existsSync(DEMO_VIDEO)) return;
		console.log(`  not all ${SHOT_COUNT} photos in screenshots/photos, using generated test patterns`);
		execFileSync("sh", [path.join(DOCS_ROOT, "screenshots/make-demo-video.sh"), DEMO_VIDEO], { stdio: "inherit" });
		return;
	}
	if (upToDate([...files, path.join(PHOTOS_DIR, "photos.json")])) return;
	console.log("  rendering the demo video from the photos");

	// Scaled up before zoompan, which moves in whole pixels: on a bigger picture the steps are
	// too small to see, so the motion doesn't judder
	const shots = config.photos
		.map((photo, i) =>
			[
				`[${i}:v]scale=5760:3240:force_original_aspect_ratio=increase`,
				"crop=5760:3240",
				zoompan(photo.motion ?? MOTIONS[i % MOTIONS.length]),
				"setsar=1,format=yuv420p",
				`trim=end_frame=${FRAMES},setpts=PTS-STARTPTS[v${i}]`,
			].join(","),
		)
		.join(";");
	const n = SHOT_COUNT;
	fs.rmSync(DEMO_VIDEO, { force: true });
	execFileSync("ffmpeg", [
		"-hide_banner", "-loglevel", "error", "-y",
		...files.flatMap((f) => ["-i", f]),
		"-f", "lavfi", "-t", String(n * SHOT_SECONDS), "-i", "anullsrc=channel_layout=stereo:sample_rate=48000",
		"-filter_complex", `${shots};${files.map((_, i) => `[v${i}]`).join("")}concat=n=${n}:v=1:a=0[v]`,
		"-map", "[v]", "-map", `${n}:a`,
		"-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-c:a", "aac", "-b:a", "128k",
		"-movflags", "+faststart", DEMO_VIDEO,
	], { stdio: "inherit" });
}

if (import.meta.main) await buildDemoVideo();
