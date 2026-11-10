import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export const BASE = "http://localhost:5199";
export const DOCS_ROOT = path.resolve(import.meta.dirname, "..");
export const COMPOSE = ["compose", "-f", path.join(DOCS_ROOT, "screenshots/compose.yml")];
export const WORK = path.join(DOCS_ROOT, "screenshots/.work");
export const OUT = path.join(DOCS_ROOT, "static/img/screenshots");
export const PASSWORD = "postpin-docs-demo";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Runs SQL against the throwaway screenshot database and returns the rows as text (tab-separated). */
export function sql(query: string): string {
	return execFileSync(
		"docker",
		[...COMPOSE, "exec", "-T", "db", "psql", "-U", "postpin", "-d", "postpin", "-qAt", "-F", "\t", "-v", "ON_ERROR_STOP=1", "-c", query],
		{ encoding: "utf8" },
	).trim();
}

export const q = (s: string) => `'${s.replaceAll("'", "''")}'`;

export interface Session {
	token: string;
	userId: string;
	email: string;
}

/** fetch against the app, JSON in and out, throws on HTTP errors. */
export async function api<T = any>(
	method: string,
	url: string,
	body?: unknown,
	token?: string,
): Promise<{ data: T; headers: Headers }> {
	const res = await fetch(BASE + url, {
		method,
		headers: {
			"content-type": "application/json",
			origin: BASE,
			...(token ? { authorization: `Bearer ${token}` } : {}),
		},
		body: body === undefined ? undefined : JSON.stringify(body),
	});
	const text = await res.text();
	if (!res.ok) throw new Error(`${method} ${url} -> ${res.status}: ${text}`);
	return { data: text ? JSON.parse(text) : (null as T), headers: res.headers };
}

export async function signUp(name: string, email: string): Promise<Session> {
	const { data, headers } = await api("POST", "/api/auth/sign-up/email", { name, email, password: PASSWORD });
	return { token: headers.get("set-auth-token") ?? data.token, userId: data.user.id, email };
}

/** Empties the database and job queue and applies all migrations of the source checkout again. */
export function resetDatabase(src: string) {
	// queued jobs of a previous run would point at rows that no longer exist
	execFileSync("docker", [...COMPOSE, "exec", "-T", "redis", "redis-cli", "FLUSHALL"], { stdio: "ignore" });
	sql(`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`);
	execFileSync("npx", ["prisma", "migrate", "deploy", "--config", "prisma7.config.ts"], {
		cwd: path.join(src, "packages/shared"),
		env: { ...process.env, ...envFile(path.join(DOCS_ROOT, "screenshots/env.screenshots")) },
		stdio: "ignore",
	});
}

export function envFile(file: string): Record<string, string> {
	const env: Record<string, string> = {};
	for (const line of fs.readFileSync(file, "utf8").split("\n")) {
		const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
		if (m) env[m[1]] = m[2].replace(/^"(.*)"$/, "$1");
	}
	return env;
}
