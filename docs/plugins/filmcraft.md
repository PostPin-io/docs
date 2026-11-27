---
title: FilmCraft (PostPin Desktop)
sidebar_label: FilmCraft
sidebar_position: 5
---

# PostPin Desktop for FilmCraft

[PostPin Desktop](./desktop.md) also works with FilmCraft, the editor from ArtCraft. Pick
**FilmCraft** in the **Program** menu on the host card. The window and the buttons are the same as
for Pro Tools and the [Resolve plugin](./resolve.md).

## Requirements

- FilmCraft installed on the same computer, in the default location: `/Applications` or
  `~/Applications` on macOS, `%LOCALAPPDATA%\Programs\ArtCraft\FilmCraft` on Windows.
- [PostPin Desktop](./desktop.md#install).

## Connecting

FilmCraft only accepts remote control when it was started for it, so PostPin Desktop starts
FilmCraft itself. Quit FilmCraft first, then pick **FilmCraft** in PostPin Desktop. FilmCraft
opens, and you can open your project in it. While that FilmCraft keeps running, PostPin Desktop
reconnects to it, also after a restart of PostPin Desktop.

If FilmCraft is already running, started the usual way, the host card shows "FilmCraft is running
without remote control. Quit FilmCraft, then PostPin starts it with remote control." If PostPin
Desktop can't find FilmCraft, it shows "FilmCraft isn't installed".

## Differences to the Resolve plugin

- **A sequence is the timeline.** PostPin links the sequence that is open in FilmCraft.
- **Save the project first.** PostPin tells FilmCraft projects apart by their file, so an unsaved
  project can't be linked. A project saved under a new name counts as a new project.
- **Render & Upload exports the whole sequence** as an H.264 MP4. There are no render presets and no
  render to disk settings.
- **Markers** go on the sequence. Ranges become markers with a duration. FilmCraft's 16 label
  colours are the marker colours, a custom colour gets the nearest label. A marker before the start
  of the sequence can't be pushed.
- The timeline view on the review screen shows the sequence's video and audio tracks with their
  clips.
