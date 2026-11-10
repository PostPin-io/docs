---
title: DaVinci Resolve
sidebar_position: 2
---

# DaVinci Resolve plugin

The plugin is a workflow integration plugin for DaVinci Resolve. It runs in its own window next to
Resolve.

![The PostPin plugin for DaVinci Resolve](/img/screenshots/plugins/resolve-main.png)

## Requirements

- DaVinci Resolve Studio. Resolve loads workflow integration plugins only in the Studio version.
- macOS on Apple silicon or Intel.

## Install

1. Download the Resolve plugin from the [Downloads](../downloads.md) page.
2. Copy the `com.postpin.resolve` folder to

   ```text
   /Library/Application Support/Blackmagic Design/DaVinci Resolve/Workflow Integration Plugins/
   ```

   so that the plugin ends up in `…/Workflow Integration Plugins/com.postpin.resolve/manifest.xml`.
   macOS asks for an administrator password because the folder is in the system library.
3. Restart Resolve.
4. Open the plugin from **Workspace › Workflow Integrations › PostPin**.

To update, replace the folder with the new version and restart Resolve.

<details>
<summary>Building the plugin from source</summary>

From a checkout of the [PostPin repository](https://github.com/PostPin-io/postpin):

```sh
pnpm install
cd packages/plugin-resolve
pnpm setup:mac     # once: creates the plugin folder and makes it yours (asks for sudo)
pnpm install:mac   # builds the plugin and copies it into the plugin folder
```

</details>

## Using the plugin

[Log in](./index.md#logging-in), then open the timeline you want to send for review.

**Render & Upload →** renders the whole timeline as MP4 (H.265) at the timeline's resolution and
frame rate, with audio, and uploads it to PostPin. The plugin also sends a snapshot of the
timeline: tracks, clips and their source media. PostPin uses it to draw the timeline on the
[review screen](../guide/review.md#timeline).

Markers sync with **Push markers →** and **← Pull comments**, see
[Syncing markers](./index.md#syncing-markers). Pulled markers use Resolve's 16 marker colours.
PostPin stores its marker ID in the marker's custom data, so the link survives when you edit the
marker's name or note.

### Render to disk

The gear button next to **Render & Upload →** opens the render to disk settings: a toggle, a
Resolve render preset, a folder and a file name.

![The render to disk settings](/img/screenshots/plugins/resolve-render-to-disk.png)

:::note

In this version the plugin saves these settings but doesn't use them yet. The render for the
upload always goes to a temporary folder.

:::
