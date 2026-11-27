---
title: What is PostPin?
sidebar_position: 1
sidebar_label: Introduction
slug: /
---

# What is PostPin?

PostPin is a review tool for video and audio post-production. You render a cut straight from your
editing software, your team and clients leave time-coded notes on it in the browser, and you pull
those notes back into your timeline as markers.

<Screenshot name="review" alt="The PostPin review screen with the player, the rebuilt timeline and the marker list" />

## How it works

1. **Upload from your editor.** The [DaVinci Resolve plugin](../plugins/resolve.md), the
   [Premiere Pro plugin](../plugins/premiere.md) and [PostPin Desktop](../plugins/desktop.md) (for
   Pro Tools and [FilmCraft](../plugins/filmcraft.md)) render the current timeline and upload it to PostPin in one click. Each upload becomes a new [export](./concepts.md#exports) of that
   timeline.
2. **Review in the browser.** Reviewers open the export, play it, and press <kbd>M</kbd> to drop a
   marker on the current frame, or mark a range from an in to an out point. Markers have a title, a
   description, a category and a reply thread, and arrows or boxes on the picture if needed.
   PostPin also rebuilds the editor's timeline from the upload, so everyone sees where the cuts are.
3. **Bring the notes back.** One of the plugin's [marker buttons](../plugins/index.md#syncing-markers)
   writes the markers into your timeline at the right frame, with their category as the marker
   colour. The other sends markers you set in the editor to PostPin.

Without a plugin, you can also [upload a video file in the browser](./projects.md#upload-from-the-browser).
PostPin then estimates the cuts from the picture. The [REST API](../api/index.md) uploads too.

PostPin is open source under the MIT license. The code of the app, the worker and the plugins is in
the [PostPin repository](https://github.com/PostPin-io/postpin). You can use the hosted PostPin
server or [run your own](../self-hosting/index.md).

## Where to go next

- New to PostPin? Start with [Getting started](./getting-started.md).
- Setting up the editor side: [Plugins](../plugins/index.md).
- Running PostPin on your own server: [Self-hosting](../self-hosting/index.md).
- Automating uploads or marker sync: [API](../api/index.md).
