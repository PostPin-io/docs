// Builds the demo render (screenshots/.work/demo.mp4): six 5-second shots with hard cuts,
// 1920x1080, 24 fps, silent stereo audio.
//
// With PIXABAY_API_KEY set (or the clips already cached), the shots are the nature clips pinned in
// clips.json. They are cached per user (~/Library/Caches/postpin-docs/pixabay on macOS) and never
// committed. Without key and cache it falls back to generated test patterns
// (make-demo-video.sh), so the screenshot run still works.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DOCS_ROOT, WORK } from "./lib.ts";

const config = JSON.parse(fs.readFileSync(path.join(DOCS_ROOT, "screenshots/clips.json"), "utf8")) as {
	shotSeconds: number;
	clips: { id: number; start: number; name: string }[];
};
export const SHOT_SECONDS = config.shotSeconds;
export const SHOT_COUNT = config.clips.length;
export const DEMO_VIDEO = path.join(WORK, "demo.mp4");

const cacheDir = path.join(
	os.homedir(),
	process.platform === "darwin" ? "Library/Caches" : ".cache",
	"postpin-docs/pixabay",
);

async function download(id: number, key: string) {
	const res = await fetch(`https://pixabay.com/api/videos/?key=${encodeURIComponent(key)}&id=${id}`);
	if (!res.ok) throw new Error(`Pixabay API: ${res.status} ${await res.text()}`);
	const hit = (await res.json()).hits?.[0];
	if (!hit) throw new Error(`Pixabay video ${id} not found`);
	// smallest rendition that is at least full HD, otherwise the biggest there is
	const renditions = Object.values(hit.videos as Record<string, { url: string; width: number; size: number }>)
		.filter((v) => v.url)
		.sort((a, b) => a.width - b.width);
	const pick = renditions.find((v) => v.width >= 1920) ?? renditions.at(-1)!;
	console.log(`  downloading pixabay ${id} (${pick.width}px, ${Math.round(pick.size / 1e6)} MB)`);
	const video = await fetch(pick.url);
	if (!video.ok) throw new Error(`download of ${pick.url} failed: ${video.status}`);
	const file = path.join(cacheDir, `${id}.mp4`);
	fs.writeFileSync(`${file}.part`, Buffer.from(await video.arrayBuffer()));
	fs.renameSync(`${file}.part`, file);
}

export async function buildDemoVideo() {
	if (fs.existsSync(DEMO_VIDEO)) return;
	fs.mkdirSync(cacheDir, { recursive: true });
	fs.mkdirSync(WORK, { recursive: true });
	const missing = config.clips.filter((c) => !fs.existsSync(path.join(cacheDir, `${c.id}.mp4`)));
	const key = process.env.PIXABAY_API_KEY;
	if (missing.length && !key) {
		console.log("  no PIXABAY_API_KEY and clips not cached, using generated test patterns");
		execFileSync("sh", [path.join(DOCS_ROOT, "screenshots/make-demo-video.sh"), DEMO_VIDEO], { stdio: "inherit" });
		return;
	}
	for (const clip of missing) await download(clip.id, key!);

	const d = SHOT_SECONDS;
	const inputs = config.clips.flatMap((c) => ["-ss", String(c.start), "-t", String(d), "-i", path.join(cacheDir, `${c.id}.mp4`)]);
	const shots = config.clips
		.map((_, i) => `[${i}:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=24,setsar=1,format=yuv420p,trim=duration=${d},setpts=PTS-STARTPTS[v${i}]`)
		.join(";");
	const n = config.clips.length;
	execFileSync("ffmpeg", [
		"-hide_banner", "-loglevel", "error", "-y",
		...inputs,
		"-f", "lavfi", "-t", String(n * d), "-i", "anullsrc=channel_layout=stereo:sample_rate=48000",
		"-filter_complex", `${shots};${config.clips.map((_, i) => `[v${i}]`).join("")}concat=n=${n}:v=1:a=0[v]`,
		"-map", "[v]", "-map", `${n}:a`,
		"-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-c:a", "aac", "-b:a", "128k",
		"-movflags", "+faststart", DEMO_VIDEO,
	], { stdio: "inherit" });
}

if (import.meta.main) await buildDemoVideo();
