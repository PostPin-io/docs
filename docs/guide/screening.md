---
title: Screenings
sidebar_position: 7
---

# Screenings

A screening shows an export to an audience in one room, for example on a projector, while the
guests leave markers from their phones. The video plays in a separate window that you move to the
projector or external screen. You control it from the export view on your own screen.

A screening uses a [share link](./sharing.md#share-links) of its own, so guests need no account.
Members, admins and owners can start screenings, like they can create share links. Screenings need
a browser window at least 1024 pixels wide, so they aren't available on phones.

## Start a screening

1. Open the export and click the projector button (**Start a screening**) in the header. The
   button is disabled until the streaming versions of the video are ready.
2. The **Screening** dialog opens. **How does a screening work?** shows a short explanation.
3. Set the **Guest limit**, the number of guests who may join. It starts at 30. The server sets
   the highest limit, 100 unless the administrator
   [changed it](../self-hosting/configuration.md#screenings).
4. Click **Start**.

The screening window opens. If your browser blocks it, the dialog says so: allow pop-ups for
PostPin and click **Start** again.

PostPin creates a screening link for the export. It shows only the video and the marker panel to
guests, has no note and expires after 24 hours. Every new screening also gets a new category for
its guests' markers, named after the date in your time zone, for example "Screening (14/11/2026)".
A second screening on the same day gets "Screening 2 (14/11/2026)", and so on. The link appears in
the export's share links.

### Continue a screening

If the export has an active screening link that you may edit, the dialog offers two choices:

- **Continue the existing screening** uses that link and its category again. Guests who joined
  keep their access. You can change the guest limit, but not below the number of guests who
  already joined. Click **Continue screening**.
- **New screening** creates a new link and a new category. The existing link stays active.

<Screenshot name="screening-start" alt="The Screening dialog with an active screening link" />

## The screening window

Move the window to the projector or external screen. Click **Activate Player** in it first: the
browser only plays a video with sound in a window that was clicked. Then press <kbd>F</kbd> or
click **Fullscreen** to fill the screen.

While the video waits at its start, the window shows a large QR code with "Join the review" and the
name of the export. Guests scan it to open the screening link. The QR code goes away once the
video plays.

<Screenshot name="screening-slate" alt="The screening window with the QR code for the guests" />

The window shows no markers. When you move the mouse over it, a bar with play/pause, the timecode,
a scrub bar and **Fullscreen** appears for the case that you need to control it there.

## Run the screening

<Screenshot name="screening-remote" alt="The export view during a screening" />

While the screening runs, the export view shows a panel instead of the video. The player bar, the
timeline and the [keyboard shortcuts](./review.md#keyboard-shortcuts) control the screening window:
play, pause, jump to a marker, change the speed, the quality or mute. The panel shows:

- the QR code of the link, and how many guests joined, for example "12 of 30 guests joined"
- the category the guests' markers go into
- **Show QR code on screen** shows the QR code in the screening window at any point of the video,
  for example for guests who come late. **Hide QR code on screen** hides it again.
- **Show window** brings the screening window to the front.
- **Copy link** copies the screening link.
- **End screening** ends it, see below.

The panel warns you if the screening window wasn't activated yet, if the link expires in less than
an hour, or if the link is no longer active. You can renew an expiring link in the
[share links](./sharing.md#share-links).

A reload of the export view keeps the screening running and reconnects to the window. If you leave
the export view, PostPin asks whether to end the screening first.

## What guests see

Guests scan the QR code or open the link, enter their name and get the export with the marker
panel. On a guest's phone, the video starts muted, because the sound comes from the room, and in
the lowest quality. Guests can unmute it.

Guests add markers [like on any share link](./sharing.md#what-guests-see). Their markers go into the
screening's category, and each guest only sees their own. Once the guest limit is reached, new
guests see "This screening is full". Guests who joined before can still open the link.

## End the screening

Click **End screening** in the panel, or the projector button in the header, which is red while
the screening runs. The **End the screening?** dialog says that the screening window closes and
until when guests can still add markers.

- Turn on **Delete the link now** to end the link as well. Guests can't join or add markers
  anymore. The button then says **End & delete link**. You only see this option if you may delete
  the link.
- **End screening** closes the window and keeps the link active until it expires.
- **Keep going** closes the dialog and keeps the screening running.

<Screenshot name="screening-end" alt="Ending a screening and deleting its link" />

The markers stay in the screening's category. It is a normal category: you can rename it, change
its colour or move its markers to another [category](./review.md#categories).

## Screening links in the share links

In the export's [share links](./sharing.md#share-links), screening links have a projector icon and
"Screening". **Details** shows their **Guest limit** and **Category**. While a screening link is
active, its projector button (**Start screening**) starts its screening again, with the same link
and category, and opens the export view. Edit and delete screening links like other share links.
