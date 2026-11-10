// Screenshots of the web app. Expects a seeded instance (seed.ts) and writes PNGs to
// static/img/screenshots/web/. Each shot is a named step, so a single one can be re-run with
// `node screenshots/web.ts review`.
import { chromium, type Page } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { BASE, OUT, PASSWORD, WORK, api, sleep } from "./lib.ts";

const dir = path.join(OUT, "web");
fs.mkdirSync(dir, { recursive: true });
const ids = () => JSON.parse(fs.readFileSync(path.join(WORK, "seed.json"), "utf8"));

const browser = await chromium.launch();
// the dev server compiles pages on first visit, which can take a while
const TIMEOUT = 60_000;

// one login per user, reused by all steps
const sessions = new Map<string, any>();

async function newPage(email?: string) {
	const options = {
		viewport: { width: 1440, height: 900 },
		deviceScaleFactor: 2,
		colorScheme: "light" as const,
		reducedMotion: "reduce" as const,
	};
	if (email && !sessions.has(email)) {
		const context = await browser.newContext(options);
		const page = await context.newPage();
		for (let attempt = 1; ; attempt++) {
			await page.goto(`${BASE}/auth/login`);
			await page.getByLabel("Email").fill(email);
			await page.getByLabel("Password").fill(PASSWORD);
			await page.getByRole("button", { name: "Log in" }).click();
			try {
				await page.waitForURL(/\/dashboard/, { timeout: 10_000 });
				break;
			} catch (e) {
				if (attempt === 3) throw e;
			}
		}
		sessions.set(email, await context.storageState());
		await context.close();
	}
	const context = await browser.newContext({ ...options, storageState: email ? sessions.get(email) : undefined });
	const page = await context.newPage();
	page.setDefaultTimeout(TIMEOUT);
	if (email) await page.goto(`${BASE}/dashboard`);
	return page;
}

async function shot(page: Page, name: string, opts: { fullPage?: boolean; clip?: { x: number; y: number; width: number; height: number } } = {}) {
	await page.waitForLoadState("networkidle");
	// thumbnails and fonts settle a moment after network idle
	await sleep(500);
	await page.screenshot({ path: path.join(dir, `${name}.png`), animations: "disabled", ...opts });
	console.log(`  web/${name}.png`);
}

/** Screenshot of a dialog (daisyUI modal) plus some padding. */
async function shotDialog(page: Page, name: string) {
	const box = page.locator(".modal-box:visible").first();
	await box.waitFor();
	await sleep(300);
	const b = (await box.boundingBox())!;
	const pad = 24;
	await shot(page, name, { clip: { x: b.x - pad, y: b.y - pad, width: b.width + 2 * pad, height: b.height + 2 * pad } });
}

const reviewUrl = () => {
	const s = ids();
	return `${BASE}/projects/${s.harbor}/timelines/${s.trailer}/exports/${s.trailerV3}`;
};

const steps: Record<string, () => Promise<void>> = {
	async login() {
		const page = await newPage();
		await page.goto(`${BASE}/auth/login`);
		await shot(page, "login");
		await page.goto(`${BASE}/auth/signup`);
		await shot(page, "signup");
		await page.close();
	},

	async onboarding() {
		// a brand-new account without an organization
		const email = `new-${Date.now()}@example.com`;
		await api("POST", "/api/auth/sign-up/email", { name: "Robin Novak", email, password: PASSWORD });
		const page = await newPage(email);
		await shot(page, "dashboard-no-organization");
		await page.getByRole("button", { name: "Create organization" }).first().click();
		await page.getByLabel("Organization Name").fill("Robin Novak Post");
		await shotDialog(page, "new-organization");
		await page.close();
	},

	async dashboard() {
		const page = await newPage("alex@example.com");
		await shot(page, "dashboard");
		const s = ids();
		await page.goto(`${BASE}/projects/${s.harbor}`);
		await shot(page, "project");
		await page.goto(`${BASE}/projects/${s.harbor}/timelines/${s.trailer}/exports`);
		await shot(page, "exports");
		await page.close();
	},

	async review() {
		const page = await newPage("alex@example.com");
		await page.goto(reviewUrl());
		await page.locator("video").first().waitFor();
		await page.getByText("Grade doesn't match").first().waitFor();
		await sleep(3000); // HLS + thumbnails
		// → jumps to the next marker; the third one is "Grade doesn't match" in a nicer shot
		for (let i = 0; i < 3; i++) {
			await page.keyboard.press("ArrowRight");
			await sleep(300);
		}
		await sleep(1500);
		await shot(page, "review");

		// open a marker: the edit pane
		await page.getByText("Grade doesn't match").first().click();
		await sleep(800);
		await shot(page, "review-marker");
		await page.close();

		// the marker with the longest thread
		const thread = await newPage("alex@example.com");
		await thread.goto(reviewUrl());
		await thread.getByText("Hold on the title a beat longer").first().click();
		await thread.getByRole("button", { name: /Respond/ }).first().click();
		await thread.getByPlaceholder("Write a response…").fill("Looks great now, approved from our side.");
		await sleep(800);
		await shot(thread, "review-responses");
		await thread.close();
	},

	async categories() {
		const page = await newPage("alex@example.com");
		await page.goto(reviewUrl());
		await page.getByText("Grade doesn't match").first().click();
		await page.getByRole("button", { name: /New category/i }).first().click();
		await shotDialog(page, "categories");
		await page.close();
	},

	async sharing() {
		const page = await newPage("alex@example.com");
		const s = ids();
		await page.goto(`${BASE}/projects/${s.harbor}`);
		await page.getByRole("button", { name: /Share/ }).first().click();
		await shotDialog(page, "share-project");
		await page.close();
	},

	async organization() {
		const page = await newPage("alex@example.com");
		await page.goto(`${BASE}/organizations/northlight-studio/members`);
		// a pending invitation and an enabled invite link, so the page doesn't look empty
		await page.getByPlaceholder("name@example.com").fill("client@example.com");
		await page.getByRole("button", { name: "Invite", exact: true }).click();
		await page.getByText("client@example.com").waitFor();
		await page.locator("tr", { hasText: "Reviewer" }).locator("input.toggle").last().check();
		await sleep(1000);
		await shot(page, "members", { fullPage: true });
		await page.goto(`${BASE}/organizations/northlight-studio/settings`);
		await shot(page, "organization-settings");
		await page.goto(`${BASE}/profile`);
		await shot(page, "profile", { fullPage: true });
		await page.close();
	},

	async admin() {
		const page = await newPage("alex@example.com");
		await page.goto(`${BASE}/admin`);
		await shot(page, "admin", { fullPage: true });
		await page.close();
	},
};

const only = process.argv.slice(2);
for (const [name, step] of Object.entries(steps)) {
	if (only.length && !only.includes(name)) continue;
	console.log(`web: ${name}`);
	try {
		await step();
	} catch (e) {
		// The dev server re-optimizes dependencies the first time a page needs new ones and
		// reloads that page, which can break a step on a fresh instance. The second try works.
		console.log(`  retrying ${name}: ${(e as Error).message.split("\n")[0]}`);
		await step();
	}
}
await browser.close();
