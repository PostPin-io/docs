---
title: Plugins
sidebar_position: 1
slug: /plugins
---

# Plugins

The plugins connect your editing software to PostPin. They render the current timeline, upload it
as a new export, and sync markers in both directions.

| Editing software       | Plugin                          | Platform |
| ---------------------- | ------------------------------- | -------- |
| DaVinci Resolve Studio | [Resolve plugin](./resolve.md)  | macOS, Windows |
| Avid Pro Tools         | [PostPin Desktop](./desktop.md) | macOS, Windows |
| Adobe Premiere Pro     | [Premiere plugin](./premiere.md) | macOS, Windows |

Get them from the [Downloads](../downloads.md) page. All of them share the same window and work
the same way. The sections below apply to all of them.

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
- **Exchange markers with** is the export the two marker buttons sync with. By default it's the
  latest export of the linked timeline.

The globe buttons open the corresponding page in your browser.

If the plugin can't reach your editor, for example because it isn't running yet, the host card
says **Not connected** with the reason and tries again every few seconds. **Retry now** tries
right away. The buttons stay disabled until the editor answers.

When a button is disabled, a note below it says why, for example **Choose a destination
timeline.** or **This timeline has no export yet. Render & Upload one first.**

If the plugin can't reach the PostPin server, because it's down, you're offline or the server URL
is wrong, it says **Can't reach the PostPin server at …** with **Retry** and **Logout**. Log out
to pick another server.

### Linking a timeline

The first time you upload a timeline, choose where it goes. Click **Choose timeline** under
**Upload to** and pick a project and timeline, or create new ones with **+**.

![Choosing the PostPin timeline to upload to](/img/screenshots/plugins/resolve-choose-destination.png)

After the first upload, the PostPin timeline is linked to the timeline in your editor. Whenever you
open that timeline again, the plugin selects the right PostPin timeline on its own.

## Render and upload

Click **Render & Upload →**. The plugin renders the timeline, uploads it and opens the new export in
your browser. The window shows the progress of the render and the upload. On macOS the Dock icon
shows it too.

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

The plugin checks whether it fits the version of your PostPin server before it renders. If it
doesn't, it shows **Plugin update required** (the plugin is older than the server) or **Server
update required** (the plugin is newer). **Download plugin for PostPin …** opens the download of
the plugin that matches your server. In PostPin Desktop, **Update to …** installs a matching
version instead, followed by **Restart to update**. **Try again** checks again, **Log out** logs
you out, for example to switch to another server.

## Syncing markers

The **Markers** box has two buttons. Each shows your editor's logo, an arrow and the PostPin logo;
the arrow points the way the markers go. Hover over a button to see what it does, for example
**Sync markers from DaVinci Resolve to PostPin**. While a sync runs, markers move along the
button in that direction.

The button with the arrow pointing to your editor (**Sync markers from PostPin to …**) writes the
markers of the selected export into your timeline:

- The marker lands on the same frame as in PostPin. A [range](../guide/review.md#ranges) keeps its
  length.
- The title and description become the marker's name and note. The category goes into the first
  line of the note as `#Category`, except for colour categories like "Resolve Blue", where the
  colour already says it.
- The marker colour is the editor colour closest to the category colour.
- Pulling again updates the markers PostPin created before instead of adding them twice.
- Replies stay in PostPin.

The button with the arrow pointing to PostPin (**Sync markers from … to PostPin**) sends the
markers of your timeline to the selected export, ranges with their length. A marker whose note
starts with `#Category` goes into that category. Markers without one go into a category named
after their colour, for example "Resolve Blue". PostPin creates missing categories. Pushing again
updates the markers in PostPin.

The **⋯** menu of the host card has **Clear all markers in this timeline**. It deletes all
markers in the timeline in your editor right away, without asking first.
