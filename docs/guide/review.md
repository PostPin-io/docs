---
title: Reviewing an export
sidebar_position: 5
---

# Reviewing an export

The review screen has the player and the timeline on the left and the markers on the right. Drag
the divider between them to resize the panes. PostPin remembers the layout in your browser.

<Screenshot name="review" alt="The review screen" />

## Player

The bar under the video has, from left to right:

- the current timecode. Click it and type a timecode to jump there.
- the playback speed (0.25× to 4×)
- **Add marker at playhead** (◇+), in the colour of the category new markers get
- **Jump to previous/next Marker**, and play/pause
- the timeline size: **Compact Timeline**, **Show Only Scrub Area** or **Expand Timeline**
- for [web uploads](#estimated-cuts), the scissors button for the estimated cuts
- the quality: **Auto** picks the streaming version that fits your connection, or choose 1080p,
  720p or 480p
- mute, **Fullscreen** and **Show Shot Grid**

**Show Shot Grid** replaces the video with one thumbnail per shot. Click a shot to jump to it.

When the timeline is hidden, for example in a share link without it, markers appear on the scrub
bar instead.

### Processing

Until a new upload can play, the video area shows "Processing video" with its progress and the
steps PostPin works through. After that, a small round indicator in the bar under the video shows
the remaining steps, and a red cross if a step failed. Click it to see the steps and the reason a
step failed. You can start reviewing before processing has finished.

## Timeline

Under the player, PostPin draws the timeline as it was in your editor when you uploaded it, with
the track names on the left. Clips have the clip colour from your editor. Clips without one are
blue (video) or green (audio). Click a clip to jump to its first frame. Hover over the ruler to see
a preview image, and drag on it to scrub. The **Zoom** slider zooms the timeline.

Markers appear on the ruler as diamonds in their category colour. Drag a marker to move it to
another frame.

### Ranges

A marker can cover a range of frames instead of a single one, for example a whole shot or a line
of dialogue. On the ruler, a range is a bar with a light tint across the tracks.

- Press <kbd>I</kbd> and <kbd>O</kbd> to set an in and an out point at the playhead, then
  <kbd>M</kbd> to create a range from in to out. <kbd>Shift</kbd> + <kbd>X</kbd> clears the
  points.
- Hold <kbd>⌥</kbd>/<kbd>Alt</kbd> and drag a marker on the ruler to pull out a range.
- Drag a range to move it, or drag its ends to change its start or end.
- The ↔ button (**Make it a range**) in the marker's edit pane turns a marker into a one-second
  range, and back into a point marker.

The plugins sync ranges with their length, see [Syncing markers](../plugins/index.md#syncing-markers).

### Estimated cuts

A [web upload](./projects.md#upload-from-the-browser) has no timeline from an editor. PostPin
estimates one from the picture: one video track, split into shots where the picture changes.
The scissors button under the video says so. Its menu, **Estimate Cuts**, sets how
**Sensitive**, **Medium** or **Insensitive** the detection is, or **No cuts** for one clip over
the whole video. PostPin then rebuilds the shots and their images. Members, admins and owners can
change this once processing is done. If cut detection was off for the upload, only **No cuts** is
available.

## Markers

Press <kbd>M</kbd> or click **Add marker at playhead** (◇+) to add a marker at the current frame.
With an in and an out point set, it becomes a [range](#ranges). It gets the category you used
last, and the edit pane opens so you can type a title right away.

<Screenshot name="review-marker" alt="Editing a marker" />

In the edit pane you set the **Title**, the **Description** and the category. Changes save as you
type. <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>Enter</kbd> closes the pane.

Each marker in the list shows its title, description, author, date and timecode, a range its start
and end. Markers from guests of a [share link](./sharing.md#share-links) show the guest's name and
a "Guest" badge. To move a marker, click its timecode and type a new one. For a range, the end
timecode changes its length.

The marker list has a **Search** field, and its **⋯** menu has:

- **Filter for Category** shows only markers of the chosen categories.
- **Sort by** sorts by timecode (the default), last update, creation date or author.
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

<Screenshot name="review-responses" alt="The replies of a marker" />

Replies can't be edited or deleted. They stay in PostPin and are not pulled into your editor.

## Categories

Every marker has a category. Categories belong to the project and give markers their colour, in
PostPin and in your editor. A project without categories of its own gets a "General" category with
the first marker.

Every project has a "Guest" category, which the markers of
[share link](./sharing.md#share-links) guests go into. It can't be renamed or deleted, but you can
change its colour.

To manage categories, open a marker and click **New category** next to the category selector.

<Screenshot name="categories" alt="The categories of a project" />

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
| <kbd>I</kbd> / <kbd>O</kbd>                         | Set in / out point                         |
| <kbd>Shift</kbd> + <kbd>X</kbd>                     | Clear in and out point                     |
| <kbd>Home</kbd> / <kbd>End</kbd>                    | Start / end                                |
| <kbd>+</kbd> / <kbd>-</kbd>                         | Faster / slower                            |
| <kbd>F</kbd>                                        | Fullscreen                                 |

:::note

The hint under the timeline says "←/→ frame", but the arrow keys on their own jump between
markers. Hold <kbd>⌘</kbd> to step frames.

:::

## On a phone

On a phone, and in browser windows narrower than 1024 pixels, the review screen shows the video on
top and the markers below it. There is no timeline and no shot grid; markers sit on the scrub bar
instead, and a tap close to one jumps to it.

- The clock button opens **Jump to time**, where you enter a timecode or frame number.
- Tap a marker to jump to it. The pencil opens it full screen with its edit pane, its replies and
  **Change position**, which moves it to a typed timecode or to the playhead. Swipe left or right
  to go to the next or previous marker, and swipe down to close it.
- Turn the phone sideways to fill the screen with the video. On an iPhone, **Fullscreen** opens
  the system player, which doesn't show markers.
