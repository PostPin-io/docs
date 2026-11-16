// Renders the link preview images (Open Graph / Twitter card):
//   node screenshots/social.ts
// static/img/social.png for these docs, static/img/social-app.png for the landing page on
// postpin.io (the app's scripts/landing-screenshots.sh copies it over).
//
// 1200×630, the size WhatsApp, Slack, iMessage, LinkedIn etc. show as a wide card. Uses the dark
// review screenshot, so run it after `pnpm screenshots` (run.ts does that at the end).
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const ROOT = path.resolve(import.meta.dirname, "..");
const img = (p: string) => fs.readFileSync(path.join(ROOT, "static/img", p));
const dataUrl = (p: string, type: string) =>
  `data:${type};base64,${img(p).toString("base64")}`;

const html = (
  title: string,
  tagline: string,
  url: string,
  css = "",
) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden; position: relative;
    background: radial-gradient(circle at 15% 20%, #2a2350 0%, #16161c 55%);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    color: #f6f5f2;
  }
  .text { position: absolute; left: 72px; top: 0; bottom: 0; width: 500px;
    display: flex; flex-direction: column; justify-content: center; }
  .logo { width: 132px; margin-bottom: 36px; }
  h1 { font-size: 76px; font-weight: 800; letter-spacing: -2px; line-height: 1; }
  h1 span { color: #8f80ff; }
  p { margin-top: 22px; font-size: 30px; line-height: 1.3; color: #c9c6d6; }
  .url { margin-top: 40px; font-size: 24px; font-weight: 600; color: #8f80ff; }
  .shot { position: absolute; left: 590px; top: 70px; width: 820px; border-radius: 14px;
    border: 1px solid #3a3a44; box-shadow: 0 30px 80px rgba(0,0,0,.6); }
  ${css}
</style></head><body>
  <div class="text">
    <img class="logo" src="${dataUrl("logo-dark.svg", "image/svg+xml")}">
    <h1>${title}</h1>
    <p>${tagline}</p>
    <div class="url">${url}</div>
  </div>
  <img class="shot" src="${dataUrl("screenshots/web/review-dark.png", "image/png")}">
</body></html>`;

const variants = [
  {
    file: "social.png",
    html: html(
      "PostPin <span>Docs</span>",
      "Media review for<br>post-production teams",
      "docs.postpin.io",
    ),
  },
  {
    file: "social-app.png",
    // the slogan of the landing page; bigger, so the short title fills the space up to the screenshot
    html: html(
      "PostPin",
      "From your timeline<br>to your client and back",
      "postpin.io",
      `h1 { font-size: 116px; letter-spacing: -3px; }
       p { font-size: 37px; }`,
    ),
  },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const { file, html } of variants) {
  await page.setContent(html, { waitUntil: "load" });
  const out = path.join(ROOT, "static/img", file);
  await page.screenshot({ path: out });
  console.log(`wrote ${path.relative(ROOT, out)}`);
}
await browser.close();
