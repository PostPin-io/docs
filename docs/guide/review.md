---
title: Reviewing an export
sidebar_position: 5
---

# Reviewing an export

The review screen has the player and the timeline on the left and the markers on the right. Drag
the divider between them to resize the panes. PostPin remembers the layout in your browser.

<Screenshot name="review" alt="The review screen" />

Changes from other reviewers, and from your own other tabs, appear without a reload: new, moved and
deleted markers, replies and category changes.

Members, admins and owners can drop a video file on the review screen to upload it as a new export
of the same timeline. See [Upload from the browser](./projects.md#upload-from-the-browser).

## Player

The bar under the video has, from left to right:

- the current timecode. Click it and type a timecode to jump there. Click **TC** in front of it to
  show frame numbers instead, and **F** to switch back. The choice applies to every timecode in
  PostPin, also in the marker list, and your browser remembers it.
- the playback speed. Click it to step through 0.25×, 0.5×, 1×, 1.5×, 2× and 4×.
- **Add marker at playhead** (◇+), in the colour of the category new markers get
- **Jump to previous/next Marker**, and play/pause
- while processing runs, the [processing](#processing) indicator
- for [web uploads](#estimated-cuts), the scissors button for the estimated cuts. For uploads from
  a plugin, the document button to [import markers](#importing-an-edl-or-fcpxml).
- the timeline size. The button cycles through **Compact Timeline** (one lane for video and one
  for audio), **Hide Timeline** and **Show Timeline** (all tracks).
- the quality: **Auto** picks the streaming version that fits your connection and the size of the
  player, or choose one yourself: 1080p, 720p or 480p, and 2160p for uploads in 4K. An upload
  doesn't get versions larger than itself.
- mute, **Fullscreen** and **Show Shot Grid**

Pausing the video sets the speed back to 1×.

**Show Shot Grid** replaces the video with one thumbnail per shot, with the name of its clip and
its timecode. Click a shot to jump to it. The slider in the corner sets how many shots fit in a
row; with few of them, the tiles get large and sharp. **Search shots** shows only the shots whose
name matches.

Below the grid, a colour strip of the whole video frames the shots in view. Drag the frame to
scroll, click beside it to jump there, and drag its edges to show more or fewer shots per row.
The shots a search finds stand out in the strip. For timelines from a plugin or an imported EDL or FCPXML, the switch next to it chooses what
counts as a shot:

- **Every cut** (the default): a shot starts at every cut on any video track, also under an
  adjustment layer or a title that runs over the whole timeline. The shot is named after the clip
  the cut brings in.
- **Top clip**: one shot per clip on top. A cut under a clip that covers it doesn't start a new
  shot, so a timeline under an adjustment layer is one shot.

Uploads with [estimated cuts](#estimated-cuts) have one shot per cut, without the switch. Your
browser remembers the choice.

When the timeline is hidden, by you or in a share link without it, markers appear on the scrub
bar instead.

PostPin remembers the playhead position of each export in your browser. When you reload the page
or come back to an export, the player starts where you left it.

### Processing

Until a new upload can play, the video area shows "Processing video" with its progress and the
steps PostPin works through. After that, a small round indicator in the bar under the video shows
the remaining steps, and a red cross if a step failed. Click it to see the steps and the reason a
step failed. You can start reviewing before processing has finished.

## Timeline

Under the player, PostPin draws the timeline as it was in your editor when you uploaded it, with
the track names on the left. Clips have the clip colour from your editor. Clips without one are
blue (video) or green (audio). Click a clip to jump to its first frame. Hover over the ruler to see
a preview image, and drag on it to scrub. The **Zoom** slider zooms the timeline, and so does
scrolling with <kbd>⌘</kbd>/<kbd>Ctrl</kbd> held.

Markers appear on the ruler as diamonds in their category colour. Click one to jump to it and
select it in the marker list. Drag a marker to move it to another frame.

Above the marker list, a thin strip shows the colours of the whole video from start to end. Phones
don't show it, and [share link](./sharing.md#share-links) guests only see it if the link shows the
timeline.

### Ranges

A marker can cover a range of frames instead of a single one, for example a whole shot or a line
of dialogue. On the ruler, a range is a bar with a light tint across the tracks.

- Press <kbd>I</kbd> and <kbd>O</kbd> to set an in and an out point at the playhead, then
  <kbd>M</kbd> to create a range from in to out. <kbd>C</kbd> or <kbd>Shift</kbd> + <kbd>X</kbd>
  clears the points.
- Hold <kbd>⌥</kbd>/<kbd>Alt</kbd> and drag a marker on the ruler to pull out a range.
- Drag a range to move it, or drag its ends to change its start or end. With
  <kbd>⌥</kbd>/<kbd>Alt</kbd> held, dragging the diamond at a range's start or end on the ruler
  changes that end instead of moving the range.
- The ↔ button (**Make it a range**) in the marker's edit pane turns a marker into a one-second
  range, and back into a point marker.

The plugins sync ranges with their length, see [Syncing markers](../plugins/index.md#syncing-markers).

### Estimated cuts

A [web upload](./projects.md#upload-from-the-browser) without timeline data has no timeline from an
editor. PostPin estimates one from the picture: one video track, split into shots where the picture
changes. The scissors button under the video says so. Its window, **Estimate Cuts**, sets how
**Sensitive**, **Medium** or **Insensitive** the detection is, or **No cuts** for one clip over
the whole video. PostPin then rebuilds the shots and their images. Members, admins and owners can
change this once processing is done. If cut detection was off for the upload, only **No cuts** is
available.

If the upload came with an EDL or FCPXML, the timeline comes from that file instead. The button
then shows a document icon, and its window, **Import Timeline or Markers**, says how many clips and
tracks the timeline has. If it was the wrong file, members, admins and owners can go back to
estimated cuts there: pick a sensitivity under **Or detect the cuts from the video** and confirm
with **Replace**. Markers imported from the file stay.

### Importing an EDL or FCPXML

You can bring the timeline or the markers of an editing software into an export later, for example
from a colleague who works without a plugin. PostPin reads CMX3600 EDLs and FCPXML files (also
`.fcpxmld` bundles). The import is not available on phones or in share links.

- On a **web upload**, the window of the scissors or document button has a drop zone: **Drop an EDL
  or FCPXML here or click to choose one**. A file with video clips replaces the timeline, and its
  markers come along. Only members, admins and owners can replace the timeline; for everyone else,
  only the markers of the file are imported.
- On an **upload from a plugin**, the document button under the video (**Import markers from an EDL
  or FCPXML**) imports the markers of a file. The timeline from your editor stays as it is.

You can also drop a file on the button itself, which imports it right away. Everyone who can add
markers can import them.

<Screenshot name="marker-import" alt="Importing markers from an EDL or FCPXML" />

Imported markers keep their position, length, name and note. Their category follows their colour or
type in the file, for example "Resolve Blue", "Avid Red" or "Final Cut To-do"; PostPin creates
missing categories. Importing the same file again skips the markers that are already there. The
window then shows how many markers it added.

## Markers

Press <kbd>M</kbd> or click **Add marker at playhead** (◇+) to add a marker at the current frame.
With an in and an out point set, it becomes a [range](#ranges) and the in and out points are
cleared. It gets the category you used last, and the edit pane opens.

<Screenshot name="review-marker" alt="Editing a marker, with a box pointer on the picture" />

In the edit pane (**Edit Marker**) you set the **Title**, the **Description** and the category.
Changes save as you type. <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>Enter</kbd> closes the pane. The
button next to the title field ("When creating a new marker, you can immediately start typing the
title") puts the cursor into the title of every new marker, so you can type right after pressing
<kbd>M</kbd>. Your browser remembers the setting. The bin (**Delete marker**) deletes the marker
right away. Markers you may not edit open as **View Marker**, read-only. In a narrow marker panel,
the category shrinks to its colour dot.

### Pointers

A pointer is an arrow or a box on the picture that shows what a marker is about, for example the
shot's background or a logo in the corner. A marker has up to 20 pointers.

1. Open the marker and pause the video on a frame of the marker.
2. Click the pointer button in the edit pane (**Add a pointer on the picture (P)**) or press
   <kbd>P</kbd>. A hint over the video says what to do.
3. Click on the picture to place an arrow there, or drag to draw a box. Hold <kbd>Shift</kbd> to
   draw several in a row. <kbd>Esc</kbd> stops drawing.

PostPin shows the pointers of the selected markers while the playhead is on the marker's frame, or
inside its range. Drag a pointer to move it, and the corners of a box to resize it. Click a pointer
to select it; <kbd>Delete</kbd> or <kbd>Backspace</kbd> deletes it.

The number next to the pointer button opens the list of the marker's pointers, numbered as "Arrow 1",
"Box 1" and so on. Click one to show it on the picture, pick one of six colours, or delete it with
the bin. Who may edit a marker may edit its pointers; everyone else only sees them. Pointers stay
in PostPin; the plugins don't sync them.

### The marker list

Each card in the list shows the marker's title, or its category if it has no title, with a bar in
the category colour on the left. The card of a point marker under the playhead is highlighted.

- Click a card to select it and open its edit pane. <kbd>⌥</kbd>/<kbd>Alt</kbd> + click also jumps
  to the marker.
- The target button on the card jumps to the marker.
- The arrow button, a double click or <kbd>Enter</kbd> expands the card. It then shows the
  description, the replies, **Respond**, the category, the author, the date and the timecode.
  Markers of [share link](./sharing.md#share-links) guests show the guest's name as the author.
- To move a marker, click its timecode in the expanded card and type a new one. <kbd>Enter</kbd>
  saves it, <kbd>Esc</kbd> cancels. Only the people who may edit the marker can change it.
- A range shows one end at a time. Click the half diamond in front of the timecode to switch
  between its start and its end. Changing the end changes the range's length.

When you select a marker on the timeline, the list scrolls to its card. <kbd>Space</kbd> still
plays and pauses while a card has the focus.

The header of the list has a **Search** field. It finds markers by title, description, replies,
author or guest name, and creation date. The arrow button next to it flips the sort order. When a
search or a category filter is active, a button next to it clears all filters. The **⋯** menu has:

- **Filter for Category** shows only markers of the chosen categories.
- **Sort by** sorts by **Timecode** (the default), **Updated at**, **Created at** or **User**.
- **Expand All / Collapse All** expands or collapses every card.
- **Export…** saves the markers as a file, see [Exporting markers](#exporting-markers).

### Exporting markers

**Export…** in the **⋯** menu of the marker list opens **Export markers**:

- **Format**: **PDF**, **Excel** or **CSV**. Each marker is a row with timecode in, out and
  duration (for ranges), category, title, description and author.
- **Thumbnails**: **Frame with its pointers** adds a picture of each marker's frame, with its
  [pointers](#pointers) drawn on it, in **Small**, **Medium** or **Large**. CSV has no pictures.
  For a PDF, the size sets how many markers fit on a page.
- **Markers**: **All, by timecode**, **As in the panel** (with its search, filters and sorting),
  or **Only selected** when markers are selected.

**Export** grabs the frames from the video in your browser and downloads the file. Your browser
remembers the choices for the next export.

### Selecting, copying and deleting markers

| Action                              | Keys                                                      |
| ----------------------------------- | --------------------------------------------------------- |
| Select a marker                     | Click                                                     |
| Select a range                      | <kbd>Shift</kbd> + click                                  |
| Add or remove one from the selection | <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + click                      |
| Select all / clear selection        | <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>A</kbd> / <kbd>Esc</kbd> |
| Delete selected markers             | <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>Backspace</kbd> or <kbd>Delete</kbd> |
| Copy, cut, paste                    | <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>C</kbd> / <kbd>X</kbd> / <kbd>V</kbd> |
| Undo a marker change                | <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>Z</kbd>                |
| Redo a marker change                | <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd>, or <kbd>Ctrl</kbd> + <kbd>Y</kbd> on Windows and Linux |

<kbd>⌘</kbd> on a Mac, <kbd>Ctrl</kbd> on Windows and Linux.

Pasted markers land at the current frame, keeping their distance to each other. Copy and paste also
works between exports and browser windows, for example to carry open notes over to the next
version: PostPin keeps what you copied, not your browser. Cut markers are shown faded until you
paste them; <kbd>Esc</kbd> cancels the cut.

With two or more markers selected, the edit pane changes them together, for example
**3 markers selected** (team only, not on share links):

- **Category** puts them all into one category. The button next to it creates a new one.
- **Move** shifts them all: the arrows by a frame or a second, or type a number of frames (`-12`)
  or a timecode (`+00:00:01:00`) and press <kbd>Enter</kbd>.
- The bin deletes them, **✕** clears the selection.

Markers you may not change stay as they are; the pane says how many. It also says how many of the
selected markers the list's filters hide.

### Undo and redo

<kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>Z</kbd> undoes your last change to markers: adding, editing,
moving, deleting, pasting, and changes to several markers at once. A message at the bottom says
what was undone, with a link when it happened on another export. Redo brings it back.

PostPin keeps your last 100 changes for 30 days, across exports and browser windows. Each person
undoes only their own changes. If someone else changed the same markers since, PostPin asks before
undoing yours.

## Replies

Click **Respond** on a marker to open its thread. Type your reply and send it with the button or
<kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>Enter</kbd>. The arrow button goes back to the edit pane.
The expanded marker card lists the replies under **Responses** with their number. Click
**Responses** to fold them in or out.

<Screenshot name="review-responses" alt="The replies of a marker" />

Replies can't be edited or deleted. They stay in PostPin and are not pulled into your editor.

## Categories

Every marker has a category. Categories belong to the project and give markers their colour, in
PostPin and in your editor.

A new project starts with the categories of the PostPin preset: "Important", "QC", "VFX", "Edit",
"Color", "Sound", "Music", "Graphics", "Subtitles" and "Client Feedback". If a project has no
categories at all, PostPin creates a "General" category with the first marker.

The markers of [share link](./sharing.md#share-links) guests go into a "Guest" category, and those
of a [screening](./screening.md) into a category of their own. These are normal categories: you can
use them for your own markers, rename them, change their colour and delete them.

To manage categories, open a marker and click **New category** next to the category selector. The
**Categories** dialog opens.

<Screenshot name="categories" alt="The categories of a project" />

- **Search categories** filters the list.
- Type a name under **New category name** and click **Add** to add a category.
- Click the colour swatch to change the colour, the pencil to rename a category and the bin to
  delete it. If markers still use the category, PostPin asks which category to move them to:
  choose one under **Merge markers into** and click **Merge & delete**.
- **Delete unused** deletes all categories without markers in this project, after showing which
  ones.
- **Presets** opens the [category presets](#category-presets).

Everyone in the team can add categories. Reviewers can edit and delete the categories they added;
members, admins and owners can edit and delete all of them, and add categories from a
[preset](#category-presets). Reviewers don't see **Presets**.

### Category presets

A preset is a set of categories you can add to a project in one go. **Presets** in the
**Categories** dialog lists them. Pick one to see its categories, then click **Add _n_ categories**.
Categories the project already has are marked "in project" and are skipped.

<Screenshot name="category-presets" alt="The category presets" />

PostPin has these built-in presets:

| Preset                  | Categories                                                                              |
| ----------------------- | --------------------------------------------------------------------------------------- |
| **PostPin**             | Common review categories, from "Important" to "Client Feedback". New projects start with these. |
| **DaVinci Resolve**     | One category per Resolve marker colour, like "Resolve Blue", as the Resolve plugin syncs them. |
| **Premiere Pro**        | One category per Premiere marker colour, like "Premiere Pro Green".                     |
| **Avid Media Composer** | One category per Avid locator colour, like "Avid Red", as imported EDLs use them.       |
| **Final Cut Pro**       | One category per Final Cut marker type, like "Final Cut To-do", as imported FCPXMLs use them. |

Under **Your organization**, the dialog lists the presets saved in your organization. To save the
categories of a project as a preset, click **New preset**, select the categories and click
**Save**, then enter a **Preset name** and click **Save preset**. The preset is available in every
project of the organization.

Members, admins and owners can save presets. Members can delete the presets they saved, admins and
owners any of them: select the preset and click the bin twice. Built-in presets can't be changed
or deleted.

## Keyboard shortcuts

These work anywhere on the review screen, except while you type in a field. <kbd>?</kbd>, or
**Keyboard shortcuts** in the account menu, shows the list in PostPin. Where the table says
<kbd>⌘</kbd>, use <kbd>Ctrl</kbd> on Windows and Linux.

| Key                                                 | Action                                     |
| --------------------------------------------------- | ------------------------------------------ |
| <kbd>Space</kbd>                                    | Play / pause                               |
| <kbd>+</kbd> / <kbd>-</kbd>                         | Faster / slower                            |
| <kbd>F</kbd>                                        | Fullscreen                                 |
| <kbd>←</kbd> / <kbd>→</kbd>                         | Previous / next marker                     |
| <kbd>↑</kbd> / <kbd>↓</kbd>                         | Previous / next cut                        |
| <kbd>⌘</kbd> + <kbd>←</kbd> / <kbd>→</kbd>          | One frame back / forward                   |
| <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>←</kbd> / <kbd>→</kbd> | One second back / forward        |
| <kbd>Home</kbd> / <kbd>End</kbd>                    | Start / end                                |
| <kbd>M</kbd>                                        | New marker at the current frame            |
| <kbd>I</kbd> / <kbd>O</kbd>                         | Set in / out point for the next marker     |
| <kbd>C</kbd> or <kbd>Shift</kbd> + <kbd>X</kbd>     | Clear in and out point                     |
| <kbd>P</kbd>                                        | Draw a [pointer](#pointers) for the open marker |
| <kbd>⌘</kbd> + scroll                               | Zoom the timeline                          |
| <kbd>?</kbd>                                        | Show the list of shortcuts                 |

For selecting, copying, deleting, undoing and redoing marker changes, see
[Selecting, copying and deleting markers](#selecting-copying-and-deleting-markers) and
[Undo and redo](#undo-and-redo).

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
