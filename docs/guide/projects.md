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

The **⋯** menu of a project card has **Open project**, **Rename project**, **Share project** and
**Delete project**. Deleting a project deletes all its timelines, exports and markers.

Reviewers and members only see the projects they were [given access to](./sharing.md#share-a-project-or-timeline).
Admins and owners see all projects of the organization.

## Timelines

Open a project to see its timelines. **Open latest** on a timeline card, or a click on its
thumbnail, opens its newest export for review. Timelines without uploads show "No exports yet".

<Screenshot name="project" alt="The timelines of a project" />

The **⋯** menu of a timeline has **All exports**, **View latest export**, **Share timeline**,
**Share links of latest export**, **Rename timeline** and **Delete timeline**. The two share
entries are there for members, admins and owners.

## Exports

**All exports** lists every upload of a timeline, newest first.

<Screenshot name="exports" alt="The exports of a timeline, newest first" />

The **⋯** menu of an export has:

- **Open export** opens it for review.
- **Share links** opens the [share links](./sharing.md#share-links) of the export.
- **Rename export** and **Delete export**. Deleting an export also deletes its markers and media.

The **i** next to an export's name shows how much storage it takes up: the original, each streaming
version, the images and the total.

While an export is still uploading or processing, its thumbnail says so ("Uploading", "Processing",
"Detecting cuts"), and "Processing failed" if something went wrong. The
[review screen](./review.md#processing) shows which step failed and why.

## Navigation

Inside a project, the header shows where you are: project › timeline › export. Each name links to
its page. The arrow in front of a name opens a list of the other projects, timelines or exports at
that level, so you can switch, for example, to another version of the same timeline.

The icons next to the names share what they stand for: **Share project** and **Share timeline**
open the [share dialog](./sharing.md#share-a-project-or-timeline), and **Share links** next to the
export opens its [share links](./sharing.md#share-links), with the number of active links.

On a phone, the header shows only the current name, with a back arrow to the level above.

## Upload from the browser

The plugins are the recommended way to upload, because they send the real timeline with its clips,
names and timecode. Without a plugin, members, admins and owners can upload a video file from the
export list: click the upload button next to **Your Exports**. Reviewers don't see it.

PostPin first recommends the plugins. Click **I want to upload manually** to go on, or
**Download plugins** to get one.

<Screenshot name="upload" alt="Uploading a video in the browser" />

1. Drop a video into the dialog or click to choose one. MP4, MOV, WebM and MXF with H.264, HEVC,
   ProRes, VP9 or MPEG-2 work. If the server limits the file size, the dialog says how large a file
   may be.
2. PostPin reads the file in the browser and fills in the **Name**, the **Frame rate** and the
   **Start timecode** (from the timecode track of MOV and MP4 files). These values are marked
   _estimated_; check them and change them if they're wrong. Phone videos often have a variable
   frame rate, which the dialog points out. MXF files can't be read in the browser, so their frame
   rate and timecode are filled in after the upload.
3. **Detect cuts** splits the timeline into shots where the picture changes. Choose how
   **Sensitive**, **Medium** or **Insensitive** it is. You can change this later on the
   [review screen](./review.md#estimated-cuts).
4. Click **Upload**.

The upload keeps running while you move around in PostPin. A progress card at the bottom right
links back to the export list, and the browser asks before you close the tab. If the upload is
interrupted, for example by a reload or a lost connection, the export offers **Resume**: choose the
same file again, and PostPin uploads only what's missing. **Cancel** gives up the upload.

If your [storage](./account.md#storage) or the organization's is full, the dialog says so before
the upload starts.
