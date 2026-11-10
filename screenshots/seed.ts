// Fills the throwaway screenshot instance with a small, believable studio: one organization,
// four people, three projects with timelines and uploaded exports, categories, markers and replies.
// Everything goes through the REST API where the API allows it; the rest (memberships, grants,
// replies, nicer export names, backdated timestamps) is written with SQL.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { api, q, signUp, sleep, sql, WORK, type Session } from "./lib.ts";
import { DEMO_VIDEO, SHOT_COUNT, SHOT_SECONDS } from "./demo-video.ts";

const FPS = 24;
const START = 86400; // 01:00:00:00 at 24 fps
const SHOT = SHOT_SECONDS * FPS;
const VIDEO = DEMO_VIDEO;

const tc = (h: number, m: number, s: number, f = 0) => ((h * 60 + m) * 60 + s) * FPS + f;

function snapshot(name: string) {
	const shots = ["HL_010_A001", "HL_020_B003", "HL_030_C002", "HL_040_A007", "HL_050_D001", "HL_060_B012"];
	const clips = shots.map((clip, i) => ({
		id: `v1-${i}`,
		name: `${clip}.mov`,
		mediaId: `m-${i}`,
		startFrameIndex: START + i * SHOT,
		durationFrameCount: SHOT,
		sourceStartFrameIndex: 0,
		speed: 1,
		metadata: {},
	}));
	const span = (id: string, n: string, from: number, len: number) => ({
		id, name: n, mediaId: null, startFrameIndex: START + from, durationFrameCount: len,
		sourceStartFrameIndex: null, speed: 1, metadata: {},
	});
	return {
		id: `resolve-${name}`,
		name,
		tracks: [
			{ id: "V2", type: "video", name: "V2 · Titles", clips: [span("v2-0", "Main Title", 2 * SHOT, 3 * FPS), span("v2-1", "End Card", 5 * SHOT + FPS, SHOT - FPS)] },
			{ id: "V1", type: "video", name: "V1 · Picture", clips },
			{ id: "A1", type: "audio", name: "A1 · Dialogue", clips: clips.map((c, i) => ({ ...c, id: `a1-${i}` })) },
			{ id: "A2", type: "audio", name: "A2 · Music", clips: [span("a2-0", "Score_Harbor_v3.wav", 0, SHOT_COUNT * SHOT)] },
		],
		mediaItems: shots.map((clip, i) => ({
			id: `m-${i}`, name: `${clip}.mov`, type: "video", filePath: `/Volumes/Media/HarborLights/${clip}.mov`,
			frameRate: { fpsNumerator: FPS, fpsDenominator: 1, dropFrame: false }, startTimecode: "00:00:00:00", metadata: {},
		})),
		frameRate: { fpsNumerator: FPS, fpsDenominator: 1, dropFrame: false },
		startFrameIndex: START,
		durationFrameCount: SHOT_COUNT * SHOT,
		metadata: {},
	};
}

/**
 * The demo render with its shots rotated by `shift`, so projects and versions get different
 * thumbnails. Shift 0 is the original, which matches the timeline snapshot.
 */
function demoVideo(shift: number) {
	if (shift === 0) return VIDEO;
	const out = path.join(WORK, `demo-${shift}.mp4`);
	if (!fs.existsSync(out)) {
		const t = shift * SHOT_SECONDS;
		execFileSync("ffmpeg", ["-v", "error", "-y", "-i", VIDEO, "-filter_complex",
			`[0:v]trim=start=${t},setpts=PTS-STARTPTS[a];[0:v]trim=end=${t},setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1:a=0[v]`,
			"-map", "[v]", "-map", "0:a", "-c:v", "libx264", "-preset", "veryfast", "-crf", "23", "-c:a", "copy", "-movflags", "+faststart", out]);
	}
	return out;
}

async function uploadExport(s: Session, projectId: string, timelineId: string, timelineName: string, shift = 0) {
	const base = `/api/v1/projects/${projectId}/timelines/${timelineId}/exports`;
	const { data: exp } = await api("POST", base, { nleProjectId: null, nleTimelineId: `resolve-${timelineName}` }, s.token);
	const file = fs.readFileSync(demoVideo(shift));
	const { data: init } = await api("POST", `${base}/${exp.id}/init-upload`, { fileSize: file.length }, s.token);
	const parts = [];
	for (const part of init.parts) {
		const chunk = file.subarray((part.partNumber - 1) * init.partSize, part.partNumber * init.partSize);
		// rustfs occasionally resets the connection on a part, so try each part a few times
		for (let attempt = 1; ; attempt++) {
			try {
				const res = await fetch(part.url, { method: "PUT", body: chunk });
				if (!res.ok) throw new Error(`part ${part.partNumber}: ${res.status} ${await res.text()}`);
				parts.push({ partNumber: part.partNumber, etag: res.headers.get("etag")! });
				break;
			} catch (e) {
				if (attempt === 3) throw e;
				await sleep(1000);
			}
		}
	}
	await api("POST", `${base}/${exp.id}/complete-upload`, { uploadId: init.uploadId, parts, timelineSnapshot: snapshot(timelineName) }, s.token);
	// one at a time: several workers reading originals from rustfs at once made ffprobe fail
	await waitForMedia();
	return exp.id as string;
}

export async function seed() {
	const alex = await signUp("Alex Morgan", "alex@example.com");
	const priya = await signUp("Priya Shah", "priya@example.com");
	const jordan = await signUp("Jordan Lee", "jordan@example.com");
	const sam = await signUp("Sam Rivera", "sam@example.com");
	sql(`UPDATE "user" SET "emailVerified" = true WHERE email = 'alex@example.com'`);

	const { data: org } = await api("POST", "/api/auth/organization/create", { name: "Northlight Studio", slug: "northlight-studio" }, alex.token);
	const addMember = (s: Session, role: string) =>
		sql(`INSERT INTO member (id, "organizationId", "userId", role, "createdAt") VALUES (gen_random_uuid()::text, ${q(org.id)}, ${q(s.userId)}, '${role}', now() - interval '20 days') RETURNING id`);
	addMember(priya, "ADMIN");
	const jordanMember = addMember(jordan, "MEMBER");
	const samMember = addMember(sam, "REVIEWER");
	for (const s of [priya, jordan, sam]) sql(`UPDATE session SET "activeOrganizationId" = ${q(org.id)} WHERE "userId" = ${q(s.userId)}`);

	const project = async (name: string) => (await api("POST", "/api/v1/projects", { name, organizationId: org.id }, alex.token)).data.id as string;
	const timeline = async (p: string, name: string) => (await api("POST", `/api/v1/projects/${p}/timelines`, { name }, alex.token)).data.id as string;

	const harbor = await project("Harbor Lights");
	const aurora = await project("Aurora Brand Film");
	const salt = await project("Saltwater (Documentary)");

	const trailer = await timeline(harbor, "Trailer");
	const teaser = await timeline(harbor, "Teaser 30s");
	const mainEdit = await timeline(aurora, "Main Edit");
	const social = await timeline(aurora, "Social Cutdown 9x16");
	const ep1 = await timeline(salt, "Episode 1");
	await timeline(salt, "Episode 2");

	// Trailer gets three versions, the latest one is the one being reviewed
	const trailerV1 = await uploadExport(alex, harbor, trailer, "Trailer", 5);
	const trailerV2 = await uploadExport(alex, harbor, trailer, "Trailer", 1);
	const trailerV3 = await uploadExport(alex, harbor, trailer, "Trailer");
	const teaserV1 = await uploadExport(alex, harbor, teaser, "Teaser 30s", 3);
	const mainV1 = await uploadExport(alex, aurora, mainEdit, "Main Edit", 2);
	const socialV1 = await uploadExport(alex, aurora, social, "Social Cutdown 9x16", 4);
	const ep1V1 = await uploadExport(alex, salt, ep1, "Episode 1", 3);

	const named: [string, string, number][] = [
		[trailerV1, "Trailer v1 – rough cut", 12],
		[trailerV2, "Trailer v2 – fine cut", 6],
		[trailerV3, "Trailer v3 – picture lock", 1],
		[teaserV1, "Teaser v1", 3],
		[mainV1, "Main Edit v1", 4],
		[socialV1, "Social Cutdown v1", 2],
		[ep1V1, "Episode 1 – assembly", 9],
	];
	for (const [id, name, days] of named)
		sql(`UPDATE export SET name = ${q(name)}, "createdAt" = now() - interval '${days} days', "updatedAt" = now() - interval '${days} days' WHERE id = ${q(id)}`);
	sql(`UPDATE project SET "createdAt" = now() - interval '30 days'`);

	// Reviewer Sam only sees Harbor Lights; Jordan works on Harbor Lights and Aurora
	sql(`INSERT INTO member_grant (id, "memberId", "projectId", "createdById") VALUES (gen_random_uuid()::text, ${q(samMember)}, ${q(harbor)}, ${q(alex.userId)})`);
	for (const p of [harbor, aurora])
		sql(`INSERT INTO member_grant (id, "memberId", "projectId", "createdById") VALUES (gen_random_uuid()::text, ${q(jordanMember)}, ${q(p)}, ${q(alex.userId)})`);

	// categories
	const cats: Record<string, string> = {};
	for (const [name, color] of [["Edit", "#3d7fff"], ["Color", "#f5b92f"], ["Sound", "#31b86a"], ["VFX", "#8a63d2"], ["Client", "#e8559a"]])
		cats[name] = (await api("PUT", `/api/v1/projects/${harbor}/categories`, { name, color }, alex.token)).data.id;

	const markers = (s: Session, exp: string, list: [string, string, number, string][]) =>
		api("PUT", `/api/v1/projects/${harbor}/timelines/${trailer}/exports/${exp}/markers`,
			list.map(([name, description, frame, cat]) => ({ name, description, frame: START + frame, categoryId: cats[cat] })), s.token);

	// timecodes fit the six 5-second shots of the demo render (see clips.json)
	await markers(sam, trailerV3, [
		["Hold on the title a beat longer", "The main title disappears before the music hit. Can we hold it until the downbeat?", tc(0, 0, 11, 6), "Client"],
		["Logo too small", "On phones the logo at the end is hard to read. Maybe 20% bigger?", tc(0, 0, 27, 12), "Client"],
	]);
	await markers(jordan, trailerV3, [
		["Jump cut", "Two frames of the previous take flash before the cut. Trim the head of HL_020.", tc(0, 0, 5, 2), "Edit"],
		["Grade doesn't match", "The river shot is noticeably cooler than the forest before it. Match to HL_020.", tc(0, 0, 13, 0), "Color"],
		["Music dips", "Score drops out for ~10 frames, looks like a gap between two music edits.", tc(0, 0, 17, 15), "Sound"],
		["Rainbow flickers", "The rainbow in the waterfall shot flickers after the stabilization. Check the VFX pass.", tc(0, 0, 18, 20), "VFX"],
	]);
	await markers(alex, trailerV3, [
		["Room tone", "Add room tone under the cut, it goes completely silent here.", tc(0, 0, 24, 4), "Sound"],
	]);
	// a few markers on the older version, so the version history looks used
	await markers(sam, trailerV2, [["Pacing in the middle", "The middle section drags, can we lose a shot?", tc(0, 0, 15, 0), "Client"]]);

	// replies (no REST endpoint for responses)
	const reply = (markerName: string, s: Session, content: string, minutesAgo: number) =>
		sql(`INSERT INTO response (id, "markerId", content, "authorId", "createdAt", "updatedAt")
			SELECT gen_random_uuid()::text, id, ${q(content)}, ${q(s.userId)}, now() - interval '${minutesAgo} minutes', now() - interval '${minutesAgo} minutes'
			FROM marker WHERE name = ${q(markerName)} AND "exportId" = ${q(trailerV3)}`);
	reply("Hold on the title a beat longer", jordan, "Good catch, extended by 12 frames in the next version.", 90);
	reply("Hold on the title a beat longer", sam, "Perfect, thanks!", 60);
	reply("Grade doesn't match", alex, "Sent to color, they'll fix it in the next pass.", 45);
	reply("Logo too small", priya, "Agreed. We'll scale it up and check it on a phone.", 30);

	fs.writeFileSync(
		path.join(WORK, "seed.json"),
		JSON.stringify({ org, harbor, aurora, salt, trailer, teaser, trailerV1, trailerV2, trailerV3, cats }, null, 2),
	);
}

export async function waitForMedia(timeoutMs = 15 * 60_000) {
	const deadline = Date.now() + timeoutMs;
	while (Date.now() < deadline) {
		const rows = sql(`SELECT status, count(*) FROM media GROUP BY status`);
		console.log(`  media: ${rows.replaceAll("\n", ", ").replaceAll("\t", " ")}`);
		if (!/PENDING|PROCESSING/.test(rows)) {
			if (/FAILED/.test(rows)) throw new Error("media processing failed, see the worker log");
			return;
		}
		await sleep(3_000);
	}
	throw new Error("media processing timed out");
}

if (import.meta.main) {
	await seed();
}
