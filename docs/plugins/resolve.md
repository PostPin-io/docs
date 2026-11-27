---
title: DaVinci Resolve
sidebar_position: 2
---

# DaVinci Resolve plugin

The plugin is a workflow integration plugin for DaVinci Resolve. It runs in its own window next to
Resolve.

![The PostPin plugin for DaVinci Resolve](/img/screenshots/plugins/resolve-main.png)

## Requirements

- DaVinci Resolve Studio 20.1 or newer. Resolve loads workflow integration plugins only in the
  Studio version. An older Resolve shows "The plugin needs DaVinci Resolve 20.1 or newer" with the
  version it found. Before 21.1.2 the host card shows no preview image.
- macOS on Apple silicon or Intel, or Windows on x64 or ARM64.

## Install on macOS

1. Download **PostPin for DaVinci Resolve** for macOS from the [Downloads](../downloads.md) page.
   It's a signed installer package, `PostPin-Resolve-<version>.pkg`.
2. Open it and follow the installer. macOS asks for an administrator password, because the plugin
   goes into the system library:

   ```text
   /Library/Application Support/Blackmagic Design/DaVinci Resolve/Workflow Integration Plugins/io.postpin.plugin.resolve
   ```

3. Restart Resolve.
4. Open the plugin from **Workspace › Workflow Integrations › PostPin**.

To update, install the newer package the same way. It removes the previous version first, including
development installs in the old `com.postpin.resolve` folder. For pre-releases Resolve shows only
the version number, for example 0.2.0 for 0.2.0-rc.2.

To uninstall, delete the `io.postpin.plugin.resolve` folder above and restart Resolve.

## Install on Windows

1. Download **PostPin for DaVinci Resolve** for Windows from the [Downloads](../downloads.md)
   page, `PostPin-Resolve-<version>.exe`. The same installer works on x64 and ARM64 and installs
   the right version for your PC.
2. Run it. The installer isn't signed yet, so Windows SmartScreen may warn you. Click
   **More info**, then **Run anyway**. Windows then asks for administrator rights, because the
   plugin is installed for all users:

   ```text
   C:\ProgramData\Blackmagic Design\DaVinci Resolve\Support\Workflow Integration Plugins\io.postpin.plugin.resolve
   ```

3. Restart Resolve.
4. Open the plugin from **Workspace › Workflow Integrations › PostPin**.

To update, run the newer installer. It removes the previous version first.

To uninstall, remove **PostPin for DaVinci Resolve** under **Settings › Apps › Installed apps**,
then restart Resolve.

<details>
<summary>Building the plugin from source</summary>

From a checkout of the [PostPin repository](https://github.com/PostPin-io/postpin):

```sh
pnpm install
cd packages/plugin-resolve
pnpm setup:mac     # once: creates the plugin folder and makes it yours (asks for sudo)
pnpm install:mac   # builds the plugin and copies it into the plugin folder
```

`pnpm dist` builds the macOS installer package. It needs a Developer ID Installer certificate to
sign it. `pnpm dist:win` builds the Windows installer on macOS or Linux and needs `makensis`
(`brew install makensis` or `apt install nsis`).

</details>

## Using the plugin

[Log in](./index.md#logging-in), then open the timeline you want to send for review.

**Render & Upload →** renders the whole timeline as MP4 (H.265) at the timeline's resolution and
frame rate, with audio, and uploads it to PostPin. The plugin also sends a snapshot of the
timeline: tracks, clips with their clip colour, and their source media. PostPin uses it to draw the timeline on the
[review screen](../guide/review.md#timeline).

Markers sync with the two buttons in the **Markers** box, see
[Syncing markers](./index.md#syncing-markers). Pulled markers use Resolve's 16 marker colours.
PostPin stores its marker ID in the marker's custom data, so the link survives when you edit the
marker's name or note. Every Resolve marker has a duration of at least one frame: a marker with a
duration of 1 is a point marker in PostPin, longer ones are ranges. A one-frame range in PostPin
therefore comes back from Resolve as a point marker.

Resolve takes only one marker per frame, while PostPin can have several on the same frame, for
example from different reviewers. A pulled marker whose frame is taken goes on the next free frame,
up to 10 frames later. As long as you don't move it, the plugin reports it at its original frame, so
the next sync to PostPin doesn't move it there. Resolve also needs a name for every marker: an
untitled marker gets a placeholder like `M3` and stays untitled in PostPin. Markers that still
can't be placed, or that would lie before the start of the Resolve timeline, are listed with the
reason after the sync.

### Render to disk

Besides the upload, the plugin can render a second file with one of your Resolve render presets
into a folder, for example a master for delivery. The gear button next to **Render & Upload →**
opens the **Render to disk** dialog:

- **Additionally render to disk** turns it on.
- **Render preset** is one of the render presets of the open Resolve project. Format, codec and
  the other render settings come from the preset.
- **Folder** is where the file goes. **Browse…** picks one.
- **File name** is optional. Leave it empty to keep the name from the preset.

![The render to disk settings](/img/screenshots/plugins/resolve-render-to-disk.png)

**Done** closes the dialog. The plugin saves the settings when you close it. While render to disk
is on, the gear button stays highlighted.

With the toggle on, **Render & Upload →** first renders the upload, then starts the disk render
while the upload runs. A **To disk** bar shows its progress. Once the upload is done, the plugin
opens the export in your browser and waits for the disk render, then shows the file's path. If the
disk render fails, the export is uploaded anyway and the plugin shows the error as a warning.

**Render & Upload →** stays disabled until a preset and a folder are chosen. The note below it
and the dialog say what's missing, for example **Choose a folder for the disk render.**
