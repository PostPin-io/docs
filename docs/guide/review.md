---
title: Reviewing an export
sidebar_position: 5
---

# Reviewing an export

The review screen has the player and the timeline on the left and the markers on the right. Drag
the divider between them to resize the panes. PostPin remembers the layout in your browser.

![The review screen](/img/screenshots/web/review.png)

## Player

The bar under the video has, from left to right:

- the current timecode. Click it and type a timecode to jump there.
- the playback speed (0.25× to 4×)
- **Jump to previous/next Marker**, and play/pause
- the timeline size: **Compact Timeline**, **Show Only Scrub Area** or **Expand Timeline**
- the quality: **Auto** picks the streaming version that fits your connection, or choose 1080p,
  720p or 480p
- mute, **Fullscreen** and **Show Shot Grid**

**Show Shot Grid** replaces the video with one thumbnail per shot. Click a shot to jump to it.

While a new upload is still processing, a round progress indicator in the header shows which
steps are done. You can start reviewing before processing has finished.

## Timeline

Under the player, PostPin draws the timeline as it was in your editor when you uploaded it:
video clips in blue, audio clips in green, with the track names on the left. Click a clip to jump
to its first frame. Hover over the ruler to see a preview image, and drag on it to scrub. The
**Zoom** slider zooms the timeline.

Markers appear on the ruler in their category colour. Drag a marker to move it to another frame.

## Markers

Press <kbd>M</kbd> to add a marker at the current frame. It gets the category you used last, and
the edit pane opens so you can type a title right away.

![Editing a marker](/img/screenshots/web/review-marker.png)

In the edit pane you set the **Title**, the **Description** and the category. Changes save as you
type. <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>Enter</kbd> closes the pane.

Each marker in the list shows its title, description, author, date and timecode. To move a marker,
click its timecode and type a new one.

The marker list has a **Search** field, and its **⋯** menu has:

- **Filter for Category** shows only markers of the chosen categories.
- **Sort by** sorts by last update, creation date, author or timecode.
- **Expand All / Collapse All** shows or hides descriptions and replies.

### Selecting, copying and deleting markers

| Action                              | Keys                                                      |
| ----------------------------------- | --------------------------------------------------------- |
| Select a marker                     | Click                                                     |
| Select a range                      | <kbd>Shift</kbd> + click                                  |
| Add or remove one from the selection | <kbd>⌘</kbd> + click                                      |
| Select all / clear selection        | <kbd>⌘</kbd> + <kbd>A</kbd> / <kbd>Esc</kbd>              |
| Delete selected markers             | <kbd>⌘</kbd> + <kbd>Backspace</kbd>                       |
| Copy, cut, paste                    | <kbd>⌘</kbd> + <kbd>C</kbd> / <kbd>X</kbd> / <kbd>V</kbd> |

Pasted markers land at the current frame, keeping their distance to each other. Copy and paste also
works between exports, for example to carry open notes over to the next version.

## Replies

Click **Respond** on a marker to open its thread. Type your reply and send it with the button or
<kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>Enter</kbd>. The marker card shows the number of replies.

![The replies of a marker](/img/screenshots/web/review-responses.png)

Replies can't be edited or deleted. They stay in PostPin and are not pulled into your editor.

## Categories

Every marker has a category. Categories belong to the project and give markers their colour, in
PostPin and in your editor. A project without categories gets a "General" category with the first
marker.

To manage categories, open a marker and click **New category** next to the category selector.

![The categories of a project](/img/screenshots/web/categories.png)

Here you can add categories, rename them, change their colour and delete them. If markers still use
a category you delete, PostPin asks which category to move them to.

## Keyboard shortcuts

These work anywhere on the review screen, except while you type in a field.

| Key                                                 | Action                                     |
| --------------------------------------------------- | ------------------------------------------ |
| <kbd>Space</kbd>                                    | Play / pause                               |
| <kbd>M</kbd>                                        | New marker at the current frame            |
| <kbd>←</kbd> / <kbd>→</kbd>                         | Previous / next marker                     |
| <kbd>⌘</kbd> + <kbd>←</kbd> / <kbd>→</kbd>          | One frame back / forward                   |
| <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>←</kbd> / <kbd>→</kbd> | One second back / forward        |
| <kbd>↑</kbd> / <kbd>↓</kbd>                         | Previous / next cut                        |
| <kbd>Home</kbd> / <kbd>End</kbd>                    | Start / end                                |
| <kbd>+</kbd> / <kbd>-</kbd>                         | Faster / slower                            |
| <kbd>F</kbd>                                        | Fullscreen                                 |

:::note

The hint under the timeline says "←/→ frame", but the arrow keys on their own jump between
markers. Hold <kbd>⌘</kbd> to step frames.

:::
