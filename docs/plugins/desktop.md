---
title: Pro Tools (PostPin Desktop)
sidebar_label: Pro Tools
sidebar_position: 3
---

# PostPin Desktop for Pro Tools

PostPin Desktop is a standalone app that talks to Pro Tools through its scripting interface (PTSL).
It has the same window as the [Resolve plugin](./resolve.md).

![PostPin Desktop connected to Pro Tools](/img/screenshots/plugins/desktop-main.png)

## Requirements

- Pro Tools 2025.10 or newer, running on the same computer.
- macOS.

If Pro Tools isn't running, or its scripting interface is turned off, the app shows "Pro Tools is
not running, or its scripting interface is disabled".

## Install

Download PostPin Desktop from the [Downloads](../downloads.md) page and move it to your
Applications folder. Start Pro Tools and open your session, then start PostPin Desktop and
[log in](./index.md#logging-in).

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

</details>

## Differences to the Resolve plugin

- **A session is the timeline.** PostPin links the Pro Tools session itself, not a playlist or a
  selection. The link survives **Save As**.
- **Render & Upload bounces the edit selection.** Select the range to review in the timeline first,
  otherwise the app shows "Select the range to render in the Pro Tools timeline first". The bounce
  is an offline bounce of the first output to a MOV file with the session's video and 24-bit PCM
  audio.
- **No clips in the timeline view.** PostPin shows the session's tracks on the review screen, but
  without clips.
- **Markers are memory locations.** Pull and push work with memory locations of type Marker.
  Markers without a `#Category` line go into a category named after their colour, for example
  "Pro Tools Color 3".
- There are no render presets and no render to disk settings.
