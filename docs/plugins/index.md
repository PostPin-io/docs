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
- **Markers with** is the export that **Push markers →** and **← Pull comments** sync with. By
  default it's the latest export of the linked timeline.

The globe buttons open the corresponding page in your browser.

If the plugin can't reach your editor, for example because it isn't running yet, the host card
says **Not connected** with the reason and tries again every few seconds. **Retry now** tries
right away. The buttons stay disabled until the editor answers.

### Linking a timeline

The first time you upload a timeline, choose where it goes. Click **Choose export** under
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

## Syncing markers

**← Pull comments** writes the markers of the selected export into your timeline:

- The marker lands on the same frame as in PostPin. A [range](../guide/review.md#ranges) keeps its
  length.
- The title and description become the marker's name and note. The category goes into the first
  line of the note as `#Category`, except for colour categories like "Resolve Blue", where the
  colour already says it.
- The marker colour is the editor colour closest to the category colour.
- Pulling again updates the markers PostPin created before instead of adding them twice.
- Replies stay in PostPin.

**Push markers →** sends the markers of your timeline to the selected export, ranges with their
length. A marker whose note
starts with `#Category` goes into that category. Markers without one go into a category named
after their colour, for example "Resolve Blue". PostPin creates missing categories. Pushing again
updates the markers in PostPin.

The **⋯** menu of the host card has **Clear all markers in this timeline**. It deletes all
markers in the timeline in your editor right away, without asking first.
