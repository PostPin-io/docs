---
title: Plugins
sidebar_position: 1
slug: /plugins
---

# Plugins

The plugins connect [DaVinci Resolve](./resolve.md), [Premiere Pro](./premiere.md),
[Pro Tools](./desktop.md) and [FilmCraft](./filmcraft.md) to PostPin. They render the current
timeline, upload it as a new export, and sync markers in both directions.

Get them from the [Downloads](../downloads.md) page. All of them share the same window and work
the same way. The sections below apply to all of them.

The plugins need the **Member** role or higher in at least one of your organizations, see
[Roles](../guide/sharing.md#roles). Reviewers review in the browser.

## Logging in

The first time you open the plugin, it asks you to log in.

![The plugin login screen](/img/screenshots/plugins/resolve-login.png)

1. Choose your server. **Use hosted PostPin server** is on by default. If your team
   [runs its own server](../self-hosting/index.md), turn it off and enter your server's URL under
   **PostPin Server URL**, for example `https://postpin.example.com`.

   ![Logging in to a self-hosted server](/img/screenshots/plugins/resolve-login-self-hosted.png)

2. Click **Login**. The plugin shows a code and opens your browser.

   ![The plugin waits for the approval in the browser](/img/screenshots/plugins/resolve-login-code.png)

3. In the browser, log in to PostPin if you aren't already. The page shows the plugin, your
   computer's name and the code. Check that the code matches and click **Allow access**.

   <Screenshot name="device-approve" alt="Approving the plugin in the browser" />

   If the browser didn't open, go to `<your server>/auth/device` and enter the code yourself.

4. The plugin logs in on its own after a few seconds. You can close the browser tab.

If you're a Reviewer in all your organizations, the page in the browser says that the plugins
need the Member role and offers **Go to your projects** instead of **Allow access**. A plugin that
is already logged in shows **The plugin needs the Member role** once your role changes to
Reviewer. Ask an admin to change your role, then click **Check again**.

The plugin stays logged in. To log out, click the log-out button at the top right of the plugin.
You can also end the plugin's session from your [profile](../guide/account.md#active-sessions) in
the browser. Switching to a different server logs you out.

## The plugin window

![The plugin window](/img/screenshots/plugins/resolve-main.png)

The window shows how your timeline and PostPin are connected. In a wide window your editor is on
the left, PostPin on the right and the buttons in between. In a narrow window, like a docked
Premiere panel, PostPin is on top and your editor at the bottom. The arrows on the buttons always
point in the direction the data goes, towards PostPin or back into your editor.

- **The host card** shows the timeline and project that are open in your editor.
- **Upload to** is the PostPin project and timeline that **Render & Upload →** uploads to.
- **Exchange markers with** is the export the two marker buttons sync with.

The globe buttons open the corresponding page in your browser.

If the plugin can't reach your editor, for example because it isn't running yet, the host card
says **Not connected** with the reason and tries again every few seconds. **Retry now** tries
right away. The buttons stay disabled until the editor answers.

When a button is disabled, a note below it says why, for example **Choose a destination
timeline.** or **This timeline has no export yet. Render & Upload one first.**

When an action is done, the plugin says what it did in a short message at the bottom right, for
example **Synced to PostPin: 2 new, 1 updated.** It disappears after a few seconds, or when you
click it. Warnings and errors stay in the window.

If the plugin can't reach the PostPin server, because it's down, you're offline or the server URL
is wrong, it says **Can't reach the PostPin server at …** with **Retry** and **Logout**. Log out
to pick another server.

### Choosing the timeline and export

The first time you upload a timeline, choose where it goes. Click **Choose timeline** under
**Upload to** and pick a project and timeline, or create new ones with **+**. **Choose export**
under **Exchange markers with** picks the export the markers sync with.

![Choosing the PostPin timeline to upload to](/img/screenshots/plugins/resolve-choose-destination.png)

The plugin remembers both choices for each timeline in your editor, also after a restart. When you
open a timeline again, it selects them again. If the remembered export no longer exists, it takes
the newest export of that timeline.

For a timeline you haven't chosen anything for yet, the plugin uses the PostPin timeline it's
linked to: after the first upload, the PostPin timeline is linked to the timeline in your editor.
**Exchange markers with** then starts at its latest export.

## Render and upload

Under **Upload to**, **Name of the new export** names the export. Leave it empty to name it after
the timeline in your editor with the date and time. The field is empty again after each upload.

Click **Render & Upload →**. The plugin renders the timeline, uploads it and opens the new export in
your browser. The window shows the progress of the render and the upload. On macOS the Dock icon
shows it too. Afterwards, **Exchange markers with** switches to the new export.

![Rendering and uploading a new export](/img/screenshots/plugins/resolve-rendering.png)

The upload goes straight to your server's storage, in four parallel parts. Every upload becomes a
new [export](../guide/concepts.md#exports) of the timeline, so earlier versions and their markers
stay as they are.

The upload starts as soon as the render is done. While it runs, the plugin encodes the streaming
versions (2160p for 4K timelines, 1080p, 720p and 480p) on your computer, with the ffmpeg it
brings along, and uploads them with the render. A separate bar shows the encoding progress. This
takes load off the server, and the review is ready sooner. If encoding fails, or the server is
[set up](../self-hosting/configuration.md#transcoding) to encode itself, the plugin leaves the
streaming versions out and the server encodes them.

## Plugin and server versions

The plugin checks whether it fits the version of your PostPin server before it renders. Plugin
and server fit when they use the same API version, whatever their release numbers. If they don't,
the plugin shows **Plugin update required** (the plugin is older than the server) or **Server
update required** (the plugin is newer). **Download plugin for PostPin …** opens the download of
the plugin that matches your server. In PostPin Desktop, **Update to …** installs a matching
version instead, followed by **Restart to update**. **Try again** checks again, **Log out** logs
you out, for example to switch to another server.

## Syncing markers

The **Markers** box has two buttons. Each shows your editor's logo, an arrow and the PostPin logo;
the arrow points the way the markers go. Hover over a button to see what it does, for example
**Sync markers from DaVinci Resolve to PostPin**. While a sync runs, markers move along the
button in that direction.

- The button with the arrow pointing to your editor (**Sync markers from PostPin to …**) writes
  the markers of the selected export into your timeline.
- The button with the arrow pointing to PostPin (**Sync markers from … to PostPin**) sends the
  markers of your timeline to the selected export.

A sync only transfers what changed since the last sync between the two:

- A marker changed on the side the sync comes from is updated on the other side.
- A marker changed only on the other side keeps that change. Sync in the other direction to take
  it over.
- A marker changed on both sides gets the version of the side the sync comes from.
- A marker deleted on either side stays deleted, unless you choose **Match** in the preview.

### The preview

Before a sync writes anything, it shows what it changes, titled **To PostPin** or, for example,
**To DaVinci Resolve**. One line per marker, sorted by timecode:

![The preview of a sync to PostPin](/img/screenshots/plugins/resolve-sync-preview.png)

- **Added / changed** on the left: new markers (**+**) and changed ones (pencil). Hover over a
  changed marker to see what changes, for example `Name: "A" → "B"` or **Moved**.
- **Deleted** on the right: markers deleted on the side the sync comes from since the last sync.

Click a line to leave that marker out, click again to include it.

If markers were deleted on either side since the last sync, the preview has two tabs:

- **Add & update** writes the new and changed markers and deletes nothing. The deleted markers stay
  left out.
- **Match** makes the other side exactly like the side the sync comes from. It also deletes the
  markers under **Deleted** and brings back markers that were deleted on the other side. Those are
  marked **was deleted**.

The plugin keeps the tab you used last until you close it.

Notes below the list say, for example, how many markers keep the other side's version, or that the
export starts at another timecode than the timeline (see below). The button applies the selection,
for example **Apply 3**, **Delete 2** or **Apply 3 · delete 2**. **Cancel** changes nothing. If
nothing changed, the plugin skips the preview and says **Nothing to sync.**

### Into your editor

- The marker lands on the same frame as in PostPin. A [range](../guide/review.md#ranges) keeps its
  length.
- The title and description become the marker's name and note. The category goes into the first
  line of the note as `#Category`, followed by a blank line, except for colour categories like
  "Resolve Blue", where the colour already says it.
- The marker colour is the editor colour closest to the category colour.
- A marker pulled before is updated in place instead of added twice.
- Replies stay in PostPin.

If markers couldn't be written, the plugin lists them with the reason, for example
**3 markers couldn't be written to Resolve:** and one line per reason with the markers' names.
The others are written anyway.

### Into PostPin

Markers go to the selected export, ranges with their length. A marker whose note starts with a
`#Category` line goes into that category, if a blank line follows or a category of that name exists
in the project (upper and lower case don't matter). Other markers go into a category named after
their colour, for example "Resolve Blue". PostPin creates missing categories.

With **Match**, markers that came from this timeline and that you deleted in your editor are
deleted in PostPin too.

### Exports that start at another timecode

An export [uploaded in the browser](../guide/projects.md#upload-from-the-browser) starts at the timecode given
there under **Start timecode**, often 00:00:00:00, while the timeline in your editor starts at 01:00:00:00. The plugin
shifts the markers by the difference in both directions, so they land on the right frames. Exports
rendered by the plugin start where the timeline starts and need no shift.

### History

Every sync, **Clear all markers in this timeline** and undo backs up the markers first. **History**
below the marker buttons opens the **Marker history** of the timeline open in your editor, newest
first. Each entry says what happened, for example **DaVinci Resolve → PostPin**, **PostPin →
DaVinci Resolve** or **Deleted all markers in DaVinci Resolve**, when and by whom, on which export
and what changed on each side.

![The marker history after a sync to PostPin and one back](/img/screenshots/plugins/resolve-marker-history.png)

**Undo** brings the markers back as they were before that action, on the side or sides it changed.
Click it twice: the second click (**Really undo?**) runs it. Later changes to those markers are
replaced. An undo is backed up as well, so you can undo it in turn. To undo a change in your
editor, open the timeline it was made in.

The backups are stored in the PostPin timeline under **Exchange markers with**, or under **Upload
to** if no export is chosen.

### Clearing all markers

The **⋯** menu of the host card has **Clear all markers in this timeline**. It deletes all markers
in the timeline in your editor right away, without asking first. The plugin backs them up first, so
you can undo it in the [History](#history). It needs a PostPin timeline under **Exchange markers
with** or **Upload to** to store the backup in.
