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
| **Reviewer** | Watch exports, add markers and replies, edit and delete their own markers, add categories and edit or delete the ones they added. Can't use the [plugins](../plugins/index.md).                                        |
| **Member**   | Everything a reviewer can, plus use the plugins, create, rename and delete projects, timelines and exports, upload, edit and delete anyone's markers and categories, add categories from presets, save category presets and delete their own, invite people and change or revoke their own invitations, create share links and edit or delete their own, and run [screenings](./screening.md). |
| **Admin**    | Everything a member can, plus change roles, remove members, revoke anyone's invitations and access, edit or delete anyone's share links, and delete anyone's category presets. |
| **Owner**    | Everything an admin can, plus rename and delete the organization.                                                                                                        |

Admins and owners see every project in the organization. Members and reviewers only see the
projects and timelines someone gave them access to. Members can still create new projects and
get access to the ones they create.

Nobody can hand out a role above their own, and the owner role can't be given by invitation. An
organization always keeps at least one owner.

## Share a project or timeline

Click the people icon (**Invitations for this project** or **Invitations for this timeline**) next
to the project's or timeline's name in the [header](./projects.md#navigation), or choose
**Invitations** in the **⋯** menu of its card. Members, admins and owners can open it. The
**Invitations** dialog names the project or timeline and has three tabs: **Add people**, **Invite
links** and **Access**.

Invitations to a project or timeline offer the roles **Reviewer** (the default) and **Member**.
Admins see the whole organization anyway; invite them
[to the whole organization](#invite-to-the-whole-organization). Access to a project includes all
its timelines.

### Add people

<Screenshot name="share-project" alt="The Invitations dialog of a project on the Add people tab, offering to invite colorist@example.com as Reviewer" />

**Add people** lists the members of the organization who don't have access yet. Type a name or an
e-mail address in the field to filter the list.

- **Add** next to a name gives that person access. No e-mail is sent, and their role in the
  organization stays the same.
- For someone who isn't in the organization yet, type their e-mail address. The dialog offers
  **Invite … as** with a role: pick it and click **Send**. They get an e-mail invitation, join
  the organization with that role and only see this project or timeline.

### Invite links

<Screenshot name="invite-links" alt="The Invite links tab of the Invitations dialog, with the Reviewer link turned on" />

**Invite links** has one link per role that anyone can use to join. **Turn on** creates the link,
**Copy** copies it. The link doesn't expire and works for any number of people, so only send it
to people you trust. People who are already in the organization keep their role and get access to
this project or timeline.

- **New link** replaces the link. Confirm with **Replace**; the old link stops working.
- **Turn off** ends the link for good. **Turn on** later gives a new link, so a link you turned
  off never works again.

Anyone who may invite can turn a link on. Only the person who turned it on, an admin or an owner
can replace it or turn it off; everyone else sees who created it. People who joined with a link
keep their access when it changes.

### Access

<Screenshot name="share-access" alt="The Access tab of the Invitations dialog, with the people who have access and a pending invitation" />

**Access** shows who can get into the project or timeline right now.

- The list shows everyone who was given access, with their role. **Remove** takes it back. Members
  can remove the access they gave, admins and owners anyone's. People with access to the project
  show up on its timelines as "via project". Admins and owners always have access and aren't
  listed.
- **Invited** lists the e-mail invitations nobody has accepted yet, with **Resend** and
  **Revoke**. It only shows while there are any.
- **Manage all members** opens the [Members](./organization.md#members) page.

## Share links

A share link lets anyone watch one export and leave markers, without an account. Members, admins
and owners can create them.

Open the export and click **Share links** (the share arrow) at the right end of the
[header](./projects.md#navigation). The export's **⋯** menu in the export list and **Share links
of latest export** in the timeline's menu open the same dialog. It lists the export's share links.
Click **+** (**New link**) to create one. If the export has no links yet, the form for the first
one is already open.

<Screenshot name="share-link-new" alt="Creating a share link" />

- **Panels:** the video is always shown. Click **Timeline** or **Markers** to show or hide those
  panels for the guest. New links show the markers but not the timeline. Without the marker panel,
  guests can only watch.
- **Note:** an optional text the guest sees over the video. It also goes into the e-mail when you
  send the link.
- **Expiry:** 24 hours (**24h**), 7 days (**7d**, the default), 30 days (**30d**) or
  **infinitely**: the link then works until it is deleted.

Click the check mark to create the link. The share button in the header then shows the number of
active links of the export.

<Screenshot name="share-links" alt="The share links of an export" />

Each link in the list shows its panels, the first line of its note and the time left, or ∞ for a
link without expiry.
[Screening](./screening.md) links also have a projector icon. Its buttons:

- **Edit** (the gear) changes the panels and the note. A click on the panels icon opens the same
  form. The expiry keeps its time left unless you
  pick a new one, which then counts from now. Expired links stay in the list, greyed out, and
  editing them with a new expiry makes them work again.
- **Details** shows the link itself, the visits and guests, when it was last opened, the exact
  expiry (or "Never expires"), who created it, the whole note, and the category its guests' markers go into. Screening
  links also show their guest limit.
- **Copy link** copies the link, **QR code** shows it as a QR code you can download.
- **Send by e-mail** sends the link to up to 20 addresses at once. Each recipient gets their own
  e-mail with the link, the note and the expiry date. Replies go to your address. You can send a
  link to at most 50 people a day.
- **Delete** (the bin) asks for a second click and ends the link at once, also for guests who
  have it open.

### What guests see

If the link shows the markers, a guest who opens it enters their name first, so the team knows who
left which marker. Links that only show the video need no name.

<Screenshot name="share-join" alt="A guest enters their name" />

Then they get the review screen with the panels the link shows and the note over the video.
**Note** in the header shows or hides it.

<Screenshot name="share-view" alt="The review screen of a share link" />

- Guests add markers with <kbd>M</kbd> or **Add marker at playhead** like the team, and edit,
  move and delete their own markers, ranges included. They only see their own markers, not the
  team's or other guests'.
- Their markers go into the link's category. They can't pick a category or reply to markers.
  They can copy, cut and paste their markers within the link's export, and undo and redo their
  changes. If the team renames the category, changes its colour or merges it into another, guests
  see it without a reload.
- The team sees guest markers on the export with the guest's name as the author.
- The browser remembers the guest, so opening the link again continues with the same name. A link
  accepts at most 500 guests, a screening link only as many as its guest limit.

The category of a share link is the project's "Guest" category. PostPin creates it with the first
link if the project doesn't have one. It is a normal category, so the team can rename it, change
its colour or delete it. A link keeps its category when the category is renamed. If it is deleted, or for new
links after a rename, PostPin creates a new "Guest" category. Screening links have a
[category of their own](./screening.md#start-a-screening).

When a link expires or is deleted, guests who have it open see "This link is no longer active"
right away, not only with their next click.

## Invite to the whole organization

Admins and owners invite people to the whole organization on the
[Members](./organization.md#members) page, or with the people icon (**Invitations for this
organization**) next to the organization's name at the top left of the header (not on a phone).
It opens the same **Invitations** dialog for the whole organization: **Add people** takes only an
e-mail address and offers the roles **Reviewer**, **Member** and **Admin**, **Invite links** has a
link for each of these roles, and **Access** lists the pending invitations.

## Accept an invitation

An email invitation links to a page that says which organization invited you and with which role.

- Without an account, click **Create an account**. With an account, click **Log in**.
- You need to sign in with the address the invitation was sent to. If you are signed in with a
  different account, PostPin offers **Sign in with a different account**.
- Click **Accept invitation** to join, or **Decline**.

Email invitations are valid for 48 hours. An invite link stays valid until someone replaces it
with **New link** or turns it off. Opening one shows the role you'll get and a **Join organization** button.
