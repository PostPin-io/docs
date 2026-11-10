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

1. **Upload from your editor.** The [DaVinci Resolve plugin](../plugins/resolve.md) and
   [PostPin Desktop](../plugins/desktop.md) (for Pro Tools) render the current timeline and upload
   it to PostPin in one click. Each upload becomes a new [export](./concepts.md#exports) of that
   timeline.
2. **Review in the browser.** Reviewers open the export, play it, and press <kbd>M</kbd> to drop a
   marker on the current frame. Markers have a title, a description, a category and a reply thread.
   PostPin also rebuilds the editor's timeline from the upload, so everyone sees where the cuts are.
3. **Bring the notes back.** In the plugin, **← Pull comments** writes the markers into your
   timeline at the right frame, with their category as the marker colour. **Push markers →** sends
   markers you set in the editor to PostPin.

There is no upload button in the web app. Media reaches PostPin through the plugins or the
[REST API](../api/index.md).

## Where to go next

- New to PostPin? Start with [Getting started](./getting-started.md).
- Setting up the editor side: [Plugins](../plugins/index.md).
- Running PostPin on your own server: [Self-hosting](../self-hosting/index.md).
- Automating uploads or marker sync: [API](../api/index.md).
