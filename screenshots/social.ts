// Renders the link preview image (Open Graph / Twitter card) to static/img/social.png:
//   node screenshots/social.ts
//
// 1200×630, the size WhatsApp, Slack, iMessage, LinkedIn etc. show as a wide card. Uses the dark
// review screenshot, so run it after `pnpm screenshots` (run.ts does that at the end).
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const ROOT = path.resolve(import.meta.dirname, "..");
const img = (p: string) => fs.readFileSync(path.join(ROOT, "static/img", p));
const dataUrl = (p: string, type: string) => `data:${type};base64,${img(p).toString("base64")}`;

const html = `<!doctype html>
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
</style></head><body>
  <div class="text">
    <img class="logo" src="${dataUrl("logo-dark.svg", "image/svg+xml")}">
    <h1>PostPin <span>Docs</span></h1>
    <p>Media review for<br>post-production teams</p>
    <div class="url">docs.postpin.io</div>
  </div>
  <img class="shot" src="${dataUrl("screenshots/web/review-dark.png", "image/png")}">
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "load" });
const out = path.join(ROOT, "static/img/social.png");
await page.screenshot({ path: out });
await browser.close();
console.log(`wrote ${path.relative(ROOT, out)}`);
