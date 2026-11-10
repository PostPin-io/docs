# PostPin Docs

Source of [docs.postpin.io](https://docs.postpin.io), built with [Docusaurus](https://docusaurus.io).

```sh
pnpm install
pnpm start      # dev server on http://localhost:3000
pnpm build      # static site in build/
```

The docs describe the PostPin commit in [`source.json`](./source.json).

## Screenshots

All screenshots in `static/img/screenshots/` are generated. The script starts a throwaway PostPin
instance from a checkout of the main repo, fills it with demo data and takes the screenshots of the
web app and the plugin windows:

```sh
git -C ../postpin worktree add --detach /tmp/postpin-docs-src <commit from source.json>
pnpm screenshots /tmp/postpin-docs-src
```

It needs Docker, pnpm and ffmpeg, and uses its own ports (5199 for the app, 554xx/563xx/590xx/510xx
for the services), so it doesn't touch a running PostPin dev setup. `--keep` leaves the instance
running afterwards. The plugin screenshots run the real plugin UI in Electron with a fake DaVinci
Resolve / Pro Tools / Premiere Pro behind it (`screenshots/plugin/harness.ts`).

The demo video is cut from the Pixabay nature clips pinned in `screenshots/clips.json`. The first
run downloads them into `~/Library/Caches/postpin-docs/pixabay` and needs a free
[Pixabay API key](https://pixabay.com/api/docs/) in `PIXABAY_API_KEY`. The clips are not committed,
because the Pixabay license doesn't allow redistributing them on their own. Without key and cache
the run falls back to generated test patterns.

To keep the run short, the worker gets `screenshots/bin/ffmpeg` first in its `PATH`. It runs the
real ffmpeg with x264's `ultrafast` preset, so transcoding takes seconds instead of minutes.

## API reference

`openapi/swagger.json` is the spec of the source commit:

```sh
node scripts/sync-openapi.mjs /tmp/postpin-docs-src
```

`docs/api/reference/` is generated from it on `pnpm start` and `pnpm build`.

## Updating to a newer PostPin version

See [CLAUDE.md](./CLAUDE.md#updating-the-docs-to-a-newer-postpin-commit).
