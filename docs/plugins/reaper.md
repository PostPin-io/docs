---
title: REAPER (PostPin Desktop)
sidebar_label: REAPER
sidebar_position: 6
---

# PostPin Desktop for REAPER

[PostPin Desktop](./desktop.md) also works with REAPER. Pick **REAPER** in the **Program** menu on
the host card. The window and the buttons are the same as for Pro Tools and the
[Resolve plugin](./resolve.md).

## Requirements

- REAPER on the same computer, started at least once.
- [PostPin Desktop](./desktop.md#install).

## Setting up REAPER

PostPin sets REAPER up by itself the first time, which needs REAPER closed. If REAPER is running
when you pick it, the host card shows "PostPin needs to set up REAPER once. Quit REAPER, then start
it again." Quit REAPER, and PostPin adds three things to it:

- the script `Scripts/PostPin/postpin_bridge.lua` in REAPER's resource folder,
- an action for that script, "PostPin bridge (used by PostPin Desktop)",
- a web interface of its own, on a free port and with a password, through which PostPin runs that
  action. Web interfaces you set up yourself stay as they are.

Start REAPER again, and the host card connects. PostPin updates the script itself with new
versions of PostPin Desktop.

:::note

REAPER can't answer PostPin while one of its windows waits for you, like the evaluation reminder at
startup or a render that failed. PostPin then shows "REAPER doesn't answer. Close any open window
in REAPER…". Close the window and try again.

:::

## Differences to the Resolve plugin

- **A project is the timeline.** PostPin links the REAPER project itself. The link survives
  **Save As**. The host card shows the project's name as the timeline and its folder's name as the
  project.
- **Render & Upload renders the whole project** as an H.264 MP4 in 1920×1080 at the project's frame
  rate, with the video scaled in. Your render settings stay as they were. REAPER is busy while it
  renders, so the progress bar only moves once it's done. There are no render presets and no render
  to disk settings.
- **Markers are markers and regions.** Point markers become REAPER markers, ranges become regions.
  If a marker turns into a range or back, PostPin replaces it, because REAPER can't change a marker
  into a region. Markers take any colour. A marker before the start of the project can't be pushed.
- **Only the title shows in REAPER.** REAPER markers have just a name, so PostPin keeps the
  description in the project, where you don't see it in REAPER. It is saved with the project and
  comes back to PostPin with the marker.
- Each push or removal of markers is one undo step in REAPER.
- The timeline view on the review screen shows the project's tracks with their items. Tracks with
  video come first.
