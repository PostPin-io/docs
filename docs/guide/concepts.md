---
title: Concepts
sidebar_position: 3
---

# Concepts

PostPin organizes work in five levels:

```text
Organization
└── Project              e.g. "Harbor Lights"
    └── Timeline         e.g. "Trailer", linked to a timeline in your editor
        └── Export       one uploaded render, e.g. "Trailer v3 – picture lock"
            └── Marker   a note at one frame or on a range, with replies
```

## Organizations

An organization is a team or company. It has members, each with a [role](./sharing.md#roles),
and it owns all projects. Each person can belong to several organizations.

## Projects

A project groups the timelines of one production, like a film, a campaign or a series. The plugins
link a PostPin project to a project in your editor.

## Timelines

A timeline in PostPin stands for one timeline (Resolve), sequence (Premiere Pro) or session
(Pro Tools) in your editor. Once
linked, the plugin preselects the right PostPin timeline whenever you open that timeline in your
editor.

## Exports

An export is one render of a timeline that you uploaded for review. Every upload creates a new
export, so a timeline's exports are its version history. Older exports keep their markers.

Exports in PostPin are always uploads. PostPin does not export review notes to files.
To get notes into your editor, pull them with the [plugin](../plugins/index.md#syncing-markers).

When an upload arrives, PostPin processes it in the background. It creates streaming versions in
1080p, 720p and 480p, a thumbnail, preview images for scrubbing and one image per shot. The player
starts with the original file and switches to streaming once the streaming versions are ready.

PostPin also saves a snapshot of the editor's timeline with every export: tracks, clips with their
colours, frame rate and start timecode. The review screen uses it to draw the timeline under the
player. A [web upload](./projects.md#upload-from-the-browser) has no editor timeline, so PostPin
estimates one: a single track, split into shots where the picture changes.

## Markers

A marker is a note at one frame of an export, or on a range of frames from an in to an out point.
It has a title, an optional description, a
[category](./review.md#categories), its author and a thread of replies. Marker frames are
absolute timeline frames, so a marker at `01:00:10:00` lands at `01:00:10:00` in your editor too.

## Categories

Categories belong to a project and give each marker a colour, for example "Edit", "Color", "Sound"
or "Client". The plugins use the colour for the marker in your editor. Every project has a "Guest"
category for the markers of [share link](./sharing.md#share-links) guests.
