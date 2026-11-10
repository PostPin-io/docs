---
title: Sharing and roles
sidebar_position: 6
---

# Sharing and roles

Your team works in PostPin with an account and a place in your organization. You can add people
to the whole organization or only to a single project or timeline. To show a single export to
someone outside the team, like a client, send a [share link](#share-links). It needs no account.

## Roles

| Role         | Can                                                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Reviewer** | Watch exports, add markers and replies, edit and delete their own markers, add categories.                                                                                |
| **Member**   | Everything a reviewer can, plus create, rename and delete projects, timelines and exports, upload, edit anyone's markers and categories, invite people, and create share links and edit or delete their own. |
| **Admin**    | Everything a member can, plus change roles, remove members, revoke anyone's invitations and access, and edit or delete anyone's share links.                             |
| **Owner**    | Everything an admin can, plus rename and delete the organization.                                                                                                        |

Admins and owners see every project in the organization. Members and reviewers only see the
projects and timelines someone gave them access to. Members can still create new projects and
get access to the ones they create.

Nobody can hand out a role above their own, and the owner role can't be given by invitation. An
organization always keeps at least one owner.

## Share a project or timeline

Open the project or timeline and click the **Share** button in the header. The dialog shows who has
access and lets you add more people.

<Screenshot name="share-project" alt="The share dialog of a project" />

- **Has access** lists everyone with access. Access to a project includes all its timelines,
  shown as "via project". Admins and owners always have access and aren't listed.
- **Add member…** gives an existing member of the organization access.
- **Invite people outside the organization** sends an email invitation with a role. The person
  joins your organization with that role and gets access to this project or timeline only.
- **Invite links** are links per role that anyone can use to join. Turn a link on to use it, click
  **Copy** to share it and **Reset** to invalidate the old link.

## Share links

A share link lets anyone watch one export and leave markers, without an account. Members, admins
and owners can create them.

Open the export and click the **Share** button in the header. The dialog lists the export's share
links. Click **+** (**New link**) to create one. If the export has no links yet, the form for the
first one is already open.

<Screenshot name="share-link-new" alt="Creating a share link" />

- **Panels:** the video is always shown. Click **Timeline** or **Markers** to show or hide those
  panels for the guest. New links show the markers but not the timeline. Without the marker panel,
  guests can only watch.
- **Note:** an optional text the guest sees over the video. It also goes into the e-mail when you
  send the link.
- **Expiry:** 24 hours, 7 days (the default) or 30 days. Every link expires.

Click the check mark to create the link. The **Share** button in the header then shows the number
of active links of the export.

<Screenshot name="share-links" alt="The share links of an export" />

Each link in the list shows its panels, the first line of its note and the time left. Its buttons:

- **Details** shows the visits and guests, when it was last opened, the exact expiry, who created
  it and the whole note.
- **Copy link** copies the link, **QR code** shows it as a QR code you can download.
- **Send by e-mail** sends the link to up to 20 addresses at once. Each recipient gets their own
  e-mail with the link, the note and the expiry date. Replies go to your address. You can send a
  link to at most 50 people a day.
- **Edit** (the gear) changes the panels and the note. The expiry keeps its time left unless you
  pick a new one, which then counts from now. Expired links stay in the list, greyed out, and
  editing them with a new expiry makes them work again.
- **Delete** (the bin) asks for a second click and ends the link at once, also for guests who
  have it open.

### What guests see

A guest who opens the link enters their name first, so the team knows who left which marker.

<Screenshot name="share-join" alt="A guest enters their name" />

Then they get the review screen with the panels the link shows and the note over the video.
**Note** in the header shows or hides it.

<Screenshot name="share-view" alt="The review screen of a share link" />

- Guests add markers with <kbd>M</kbd> like the team, and edit, move and delete their own markers.
  They only see their own markers, not the team's or other guests'.
- Their markers go into a category named "Gast" that PostPin creates in the project. They can't
  pick a category, reply to markers or copy and paste markers.
- The team sees guest markers on the export with the guest's name and a "Gast" badge.
- The browser remembers the guest, so opening the link again continues with the same name. A link
  accepts at most 500 guests.

When a link has expired or was deleted, guests see "This link is no longer active".

## Invite to the whole organization

Click **Share** outside a project, for example on the dashboard, to invite someone to the whole
organization. You can also invite from the [Members](./organization.md#members) page. Only admins and
owners can invite to the whole organization.

## Accept an invitation

An email invitation links to a page that says which organization invited you and with which role.

- Without an account, click **Create an account**. With an account, click **Log in**.
- You need to sign in with the address the invitation was sent to. If you are signed in with a
  different account, PostPin offers **Sign in with a different account**.
- Click **Accept invitation** to join, or **Decline**.

Email invitations are valid for 48 hours. An invite link stays valid until someone resets or turns
it off. Opening one shows the role you'll get and a **Join organization** button.
