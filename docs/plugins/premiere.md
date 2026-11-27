---
title: Premiere Pro
sidebar_position: 3
---

# Premiere Pro plugin

The plugin is a UXP panel for Adobe Premiere Pro. It docks into Premiere like any other panel and
has the same window as the [Resolve plugin](./resolve.md). In a narrow panel the parts are stacked:
PostPin on top, the buttons in the middle, Premiere at the bottom.

{/* a docked panel is tall and narrow: shown at its real width instead of the full column */}
<img
  src="/img/screenshots/plugins/premiere-main.png"
  alt="The PostPin panel in Premiere Pro"
  width="340"
/>

## Requirements

- Premiere Pro 26.2 or newer.
- macOS or Windows. The plugin is one file for both.

## Install

1. Download **PostPin for Premiere Pro** from the [Downloads](../downloads.md) page,
   `PostPin-Premiere-<version>.ccx`.
2. Double-click the file. The Creative Cloud desktop app installs it. The plugin isn't from the
   Adobe Marketplace, so Creative Cloud asks you to confirm the installation first.
3. Restart Premiere Pro.
4. Open the panel from **Window › UXP Plugins › PostPin**.

To update, install the newer `.ccx` the same way. To uninstall, remove PostPin under **Plugins**
in the Creative Cloud desktop app.

<details>
<summary>Building the plugin from source</summary>

From a checkout of the [PostPin repository](https://github.com/PostPin-io/postpin):

```sh
pnpm install
pnpm --filter @postpin-io/premiere-plugin build
```

`build` also compiles the native addon that runs ffmpeg for the
[local encoding](./index.md#render-and-upload). It runs on macOS and needs Rust with the targets
`aarch64-apple-darwin` and `x86_64-apple-darwin`. On Windows,
`packages/plugin-premiere/native/build-win.ps1` builds the addon.

To run it, load `packages/plugin-premiere/dist/manifest.json` in Adobe's UXP Developer Tool.
`pnpm --filter @postpin-io/premiere-plugin dev` rebuilds on every change.
`pnpm --filter @postpin-io/premiere-plugin dist` downloads the bundled ffmpeg for macOS and
Windows and packages the build as `release/PostPin-Premiere-<version>.ccx`.

</details>

## Using the plugin

[Log in](./index.md#logging-in), then open the sequence you want to send for review. The plugin
shows up as **PostPin for Premiere Pro** on the approval page and in your
[active sessions](../guide/account.md#active-sessions).

- **A sequence is the timeline.** PostPin links the active sequence, and the Premiere project is
  the host card's project.
- **Render & Upload** exports the whole sequence as MP4 (H.264) at the sequence's resolution, with
  audio, and uploads it to PostPin. The file goes to a `PostPin` folder in your Movies folder
  (macOS) or Videos folder (Windows). The plugin also sends a snapshot of the sequence: the enabled
  clips on enabled tracks with their label colour, and their source media. PostPin uses it to draw
  the timeline on the [review screen](../guide/review.md#timeline).
- **Label colours:** Premiere's plugin API can't read clip labels, so the plugin exports the
  sequence as Final Cut Pro XML to a temporary file on every upload and reads the labels from
  there. Label names and colours come from Premiere's preferences, so renamed labels and custom
  colours carry over. Premiere writes its preferences only when you close the Preferences dialog or
  quit, so a label you changed since then shows its old colour until you do. If the preferences
  can't be read, for example because there are several `Profile-*` folders, the plugin uses
  Premiere's default label colours.
- **Media Encoder:** by default the export runs in Adobe Media Encoder, which shows the progress in
  the panel. Turn off **Render with Media Encoder** in the panel's **☰** menu to export in
  Premiere itself. The panel then shows no progress until the file is done. Without Media Encoder
  installed, the plugin always exports in Premiere.
- **No thumbnail.** The host card shows no preview image, because Premiere shows a message every
  time a plugin exports a frame.
- **Markers** sync with the sequence markers, see
  [Syncing markers](./index.md#syncing-markers). Pulled markers become comment markers in one of
  Premiere's eight marker colours, ranges with their length. Markers without a `#Category` line go into a category named after their colour, for
  example "Premiere Pro Green". A sync shows up in Premiere's undo history as
  "PostPin: Sync markers".
- There are no render presets and no render to disk settings.
