---
title: Pro Tools (PostPin Desktop)
sidebar_label: Pro Tools
sidebar_position: 3
---

# PostPin Desktop for Pro Tools

PostPin Desktop is a standalone app that talks to Pro Tools through its scripting interface (PTSL).
It has the same window as the [Resolve plugin](./resolve.md), plus a **Program** menu on the host
card for the program the app works with. Pro Tools is the only one so far. The app remembers the
choice, and you can't switch while it renders or syncs markers.

![PostPin Desktop connected to Pro Tools](/img/screenshots/plugins/desktop-main.png)

## Requirements

- Pro Tools 2025.10 or newer, running on the same computer.
- macOS (Apple silicon or Intel) or Windows (x64).

If Pro Tools isn't running, or its scripting interface is turned off, the host card shows
**Not connected** with "Pro Tools is not running, or its scripting interface is disabled". The app
tries again every few seconds, so you can start Pro Tools afterwards.

## Install

Download PostPin Desktop for your system from the [Downloads](../downloads.md) page.

**macOS:** open `PostPin-Desktop-<version>-universal.dmg` and drag PostPin Desktop into your
Applications folder. The app is signed and notarized.

**Windows:** run `PostPin-Desktop-<version>-x64.exe`. It installs PostPin Desktop for your user
right away, without further questions, and starts it.

:::note

The Windows installer isn't code-signed yet. On first start Windows SmartScreen shows
"Windows protected your PC". Click **More info**, then **Run anyway**.

:::

Then start Pro Tools, open your session, start PostPin Desktop and
[log in](./index.md#logging-in).

### Updates

PostPin Desktop checks for a new version every time it starts. It downloads the update in the
background, shows a notification, and installs it the next time you quit the app.

<details>
<summary>Building the app from source</summary>

Building needs `PTSL.proto` from the [Avid Pro Tools scripting SDK](https://developer.avid.com/scripting/),
which can't be redistributed. Copy it to
`packages/desktop/src/third-party/protools-sdk/PTSL.proto` in a checkout of the
[PostPin repository](https://github.com/PostPin-io/postpin), then:

```sh
pnpm install
pnpm --filter @postpin-io/desktop setup   # generates the PTSL client from the proto
pnpm --filter @postpin-io/desktop build
npx electron packages/desktop
```

`pnpm --filter @postpin-io/desktop dist` builds the installer for the current system with
electron-builder.

</details>

## Differences to the Resolve plugin

- **A session is the timeline.** PostPin links the Pro Tools session itself, not a playlist or a
  selection. The link survives **Save As**. The host card shows the session's name as the
  timeline and its folder's name as the project, because the folder keeps its name when you save
  the session under a new one.
- **Render & Upload bounces the edit selection.** Select the range to review in the timeline
  first. Without an edit selection, the app selects everything from the first to the last clip on
  the audio and video tracks, so you see in Pro Tools what gets bounced. The bounce is an offline
  bounce of the first output to a MOV file with the session's video and 24-bit PCM audio.
- **No clips in the timeline view.** PostPin shows the session's tracks on the review screen, but
  without clips.
- **Markers are memory locations.** Pull and push work with memory locations of type Marker.
  Markers without a `#Category` line go into a category named after their colour, for example
  "Pro Tools Color 3". Pulled markers that already exist stay on their marker ruler. New ones go on
  the ruler most of the session's markers are on, or on the default "Markers" ruler.
- There are no render presets and no render to disk settings.
