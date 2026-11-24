---
title: Projects, timelines and exports
sidebar_position: 4
---

# Projects, timelines and exports

## Dashboard

The dashboard lists the projects of your active organization. Each card shows a thumbnail of the
latest export, and when the project was created and last updated.

<Screenshot name="dashboard" alt="The dashboard with three projects" />

- **+** creates a new project. Projects also appear on their own when you upload from a
  plugin into a new project.
- **Search projects** filters by name.
- The **Table / Cards** toggle switches between the card grid and a list. Phones always show
  cards.
- **⋯ › Sort by** sorts by name, creation date or last update. The arrow button next to it flips
  the order.

A click on a project's thumbnail, its name or **Open** opens it. The **⋯** menu of a project card
has **Open project**, [**Invitations**](./sharing.md#share-a-project-or-timeline), **Rename
project** and **Delete project**. **Invitations** is there for members, admins and owners.
Deleting a project deletes all its timelines, exports and markers.

Reviewers and members only see the projects they were [given access to](./sharing.md#share-a-project-or-timeline).
Admins and owners see all projects of the organization.

## Timelines

Open a project to see its timelines. A click on a timeline's thumbnail, its name or **Open** opens
its [exports](#exports). **Open latest** next to it opens the newest export for review right away.
Timelines without uploads show "No exports yet". **+** creates a new timeline. **Search
timelines**, the **Table / Cards** toggle and **⋯ › Sort by** work like on the dashboard.

<Screenshot name="project" alt="The timelines of a project" />

The **⋯** menu of a timeline has **Open timeline**, **Open latest export**,
[**Invitations**](./sharing.md#share-a-project-or-timeline), **Share links of latest export**,
**Rename timeline** and **Delete timeline**. **Invitations** and **Share links of latest export**
are there for members, admins and owners.

## Exports

A timeline's page lists every upload of it, sorted by last update, the most recent first. A click
on an export's thumbnail, its name or **Open** opens it for review.
**Search exports**, the **Table / Cards** toggle and **⋯ › Sort by** work like on the dashboard.

<Screenshot name="exports" alt="The exports of a timeline, newest first" />

The **⋯** menu of an export has:

- **Open export** opens it for review.
- **Info** shows how much storage it takes up: the original, each streaming version, the images and
  the total.
- **Share links** opens the [share links](./sharing.md#share-links) of the export.
- **Rename export** and **Delete export**. Deleting an export also deletes its markers and media.

While an export is still uploading or processing, its thumbnail says so ("Uploading", "Processing",
"Detecting cuts"), and "Processing failed" if something went wrong. The
[review screen](./review.md#processing) shows which step failed and why.

## Navigation

Inside a project, the header shows where you are: project › timeline › export. Each name links to
its page. The arrow in front of a name opens a list of the other projects, timelines or exports at
that level, so you can switch, for example, to another version of the same timeline.

The people icons next to the project's and the timeline's name (**Invitations for this project**,
**Invitations for this timeline**) open the
[Invitations dialog](./sharing.md#share-a-project-or-timeline). Admins and owners also have one
next to the organization's name (**Invitations for this organization**), which
[invites to the whole organization](./sharing.md#invite-to-the-whole-organization). On an export, the
share arrow at the right end of the header opens its [share links](./sharing.md#share-links), with
the number of active links.

On a phone, the header shows only the current name, with a back arrow to the level above.

## Upload from the browser

The plugins are the recommended way to upload, because they send the real timeline with its clips,
names and timecode. Without a plugin, members, admins and owners can upload a video file in the
browser. Reviewers can't.

- On a timeline's export list, click the upload button (**Upload a video**) next to **Your
  Exports**. PostPin first recommends the plugins. Click **I want to upload manually** to go on,
  or **Download plugins** to get one.
- Or drag a video file from your computer onto the page. "Drop your video to upload" covers the
  page; drop the file to open the upload dialog. This works on the export list, on the
  [review screen](./review.md) (the video becomes a new export of the same timeline, the open
  export stays as it is), and on the dashboard and a project's page. There, PostPin holds the video
  in a card at the bottom and highlights the projects, then the timelines, you may upload to. Click
  one to go on, or **Upload here** on a timeline. The **×** on the card discards the video. If you
  drop several files, PostPin takes the first video.

<Screenshot name="upload" alt="Uploading a video in the browser" />

1. Drop a video into the dialog or click to choose one. MP4, MOV, WebM and MXF with H.264, HEVC,
   ProRes, VP9 or MPEG-2 work. If the server limits the file size, the dialog says how large a file
   may be.
2. PostPin reads the file in the browser and fills in the **Name**, the **Frame rate** and the
   **Start timecode** (from the timecode track of MOV and MP4 files). These values are marked
   _estimated_; check them and change them if they're wrong. Phone videos often have a variable
   frame rate, which the dialog points out. MXF files can't be read in the browser, so their frame
   rate and timecode are filled in after the upload.
3. **Cuts** sets where the timeline's cuts come from. The section is closed and shows the current
   setting, by default "Detect · Medium". Open it to change it:
   - **Detect cuts** splits the timeline into shots where the picture changes. Choose how
     **Sensitive**, **Medium** or **Insensitive** it is. You can change this later on the
     [review screen](./review.md#estimated-cuts).
   - **Import EDL** takes the timeline from your editing software, as a CMX3600 EDL or an FCPXML
     file (also a `.fcpxmld` bundle). Drop it on the field or click to choose one. The dialog shows
     what it found. Its clips become the cuts and tracks of the timeline, and its markers are added
     to the export, in one category per colour. If the file's frame rate differs from the video's,
     the dialog says so and the clips are placed by time. The **×** next to the file removes it.
     Without a file, the timeline is one clip over the whole video.
4. Click **Upload**.

The upload keeps running while you move around in PostPin. A progress card at the bottom right
links back to the export list, and the browser asks before you close the tab. If the upload is
interrupted, for example by a reload or a lost connection, the export offers **Resume**: choose the
same file again, and PostPin uploads only what's missing. **Cancel** gives up the upload.

If your [storage](./account.md#storage) or the organization's is full, the dialog says so before
the upload starts.
