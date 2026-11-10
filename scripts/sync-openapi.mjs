// Copies the tsoa-generated OpenAPI spec from a PostPin checkout into openapi/swagger.json
// and adds what tsoa leaves out (tags, a server URL), so the API reference has sensible groups.
//
// Usage: node scripts/sync-openapi.mjs <path-to-postpin-checkout>
// The checkout must have run `pnpm --filter @postpin-io/postpin run generate:api`.
import fs from "node:fs";
import path from "node:path";

const src = process.argv[2];
if (!src) {
	console.error("usage: node scripts/sync-openapi.mjs <path-to-postpin-checkout>");
	process.exit(1);
}
const specFile = path.join(src, "packages/postpin/src/api/build/swagger.json");
const spec = JSON.parse(fs.readFileSync(specFile, "utf8"));

// First matching rule wins, so more specific paths come first.
const TAGS = [
	[/\/markers$/, "Markers"],
	[/\/exports/, "Exports"],
	[/\/timelines/, "Timelines"],
	[/\/categories/, "Categories"],
	[/^\/v1\/projects/, "Projects"],
	[/^\/v1\/(openapi\.json|docs)$/, "Meta"],
];
const used = new Set();
for (const [p, ops] of Object.entries(spec.paths)) {
	const tag = TAGS.find(([re]) => re.test(p))?.[1] ?? "Other";
	for (const op of Object.values(ops)) {
		op.tags ??= [tag];
		// tsoa only sets a summary from @summary; derive one from the operation id otherwise,
		// "CreateTimeline" -> "Create timeline"
		op.summary ??= op.operationId.replace(/(?<=[a-z])(?=[A-Z])/g, " ").toLowerCase().replace(/^./, (c) => c.toUpperCase()).replace("open api", "OpenAPI").replace(" html", " HTML");
		op.tags.forEach((t) => used.add(t));
	}
}
const order = ["Projects", "Timelines", "Exports", "Markers", "Categories", "Meta", "Other"];
spec.tags = order.filter((t) => used.has(t)).map((name) => ({ name }));
spec.info.title = "PostPin REST API";
spec.servers = [
	{
		url: "https://{host}/api",
		description: "Your PostPin server",
		variables: { host: { default: "postpin.example.com" } },
	},
];

fs.mkdirSync("openapi", { recursive: true });
fs.writeFileSync("openapi/swagger.json", JSON.stringify(spec, null, "\t") + "\n");
console.log(`openapi/swagger.json: ${Object.keys(spec.paths).length} paths, tags ${spec.tags.map((t) => t.name).join(", ")}`);
