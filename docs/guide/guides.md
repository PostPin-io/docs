---
title: PostPin Guides
sidebar_position: 10
---

# PostPin Guides

PostPin explains itself with two kinds of guides:

- **Tutorials** teach the basics step by step. Most of them start on their own when you need them,
  and they cover the whole window until you finish or skip them.
- **Tours** explain one feature right where it is. The rest of the page is dimmed, and a popover
  points at one element at a time. You start a tour with its guide button next to the feature.

All guides are on the **PostPin Guides** page in the account menu at the top right (on a phone,
the **☰** menu at the top left).

<Screenshot name="guides" alt="The PostPin Guides page" />

## The PostPin Guides page

The page lists **Tutorials** and **Tours** side by side. Each row shows the guide's status: **Not
started**, **In progress**, **Completed** or **Skipped**. The info button (**About this guide**) shows
what the guide covers.

The button at the end of the row starts the guide where its first step is, so you don't have to
find the feature first:

- **Start** for a guide you haven't started.
- **Continue** for one in progress. It goes on where you left it.
- **Start again** for one you completed or skipped. It runs from the first step, and a tour gets
  its guide button back.

Some guides need something to start on, for example an export you may share. If there is none
yet, the row says so instead of starting.

**Filter guides** finds guides by words in their title or description. **Not completed** hides the guides you have
completed.

Guides you start from this page run even while guides are switched off.

## Tutorials

| Tutorial | What it covers | Where it starts | Lowest role |
| --- | --- | --- | --- |
| **Your first upload** | Create your organization, a project and a timeline, and upload your first export. | On the dashboard, on its own for new accounts. See [Your first upload](./getting-started.md#your-first-upload). | Member |
| **Your first review** | Leave a marker on a frame, give it a category, jump between markers and reply to one. | On its own on the first export you open. From this page, on the latest export you may leave markers on. | Reviewer |
| **Installing the Resolve plugin** | Install the PostPin plugin in DaVinci Resolve Studio on macOS or Windows and sign it in. | From [the plugin question](#the-plugin-question) on an export list, or from this page. | Member |
| **Installing the Premiere Pro plugin** | Install the PostPin panel in Premiere Pro on macOS or Windows and sign it in. | From [the plugin question](#the-plugin-question) on an export list, or from this page. | Member |
| **Installing PostPin Desktop** | Install PostPin Desktop for Pro Tools on macOS or Windows, connect it and sign it in. | From [the plugin question](#the-plugin-question) on an export list, or from this page. | Member |
| **Using the plugin** | The plugin's panel: where exports go, and markers from PostPin into your program and back. | On its own on the dashboard once a plugin is signed in and an export has markers, or right after an install tutorial. | Member |

The install tutorials pick your operating system and let you switch to the other one. They notice
when the plugin signs in, which finishes them. **Using the plugin** shows the panel of the program
you use and waits for you to bring the markers over and send one back. See
[the plugins](../plugins/index.md).

**Skip tutorial** ends a tutorial at any step. It asks once more: **Skip** ends it, **Continue
tutorial** goes back. A tutorial you leave without skipping, for example by reloading the page,
goes on where you were.

### The plugin question

The first time you open the export list of a timeline, PostPin asks **Install a PostPin plugin?**
(not on a phone). **Yes** asks **Which program do you work in?**: **DaVinci Resolve**, **Premiere
Pro** or **Pro Tools** starts its install tutorial right there. **No, thanks** asks once more:
**Skip** skips all three install tutorials, and the question doesn't come back. You can still start
each of them from this page.

PostPin only asks while guides are switched on, and only members, admins and owners who don't
have a plugin signed in yet and haven't started, completed or skipped an install tutorial. If you
leave the page without answering, it asks again next time.

## Tours

| Tour | What it covers | Where it starts | Lowest role |
| --- | --- | --- | --- |
| **PostPin Guides** | How guides work: the guide buttons, this page, and switching guides off. | On its own after **Your first upload**, or right away for accounts that can't do that tutorial. | Reviewer |
| **Finding your way** | From the dashboard through projects and timelines to an export, and back with the breadcrumbs. | Guide button next to the PostPin logo in the header, once there is an export. | Reviewer |
| **Share links** | Share an export with people who don't have an account. | Guide button next to the share button of an export. | Member |
| **Inviting your team** | Invite people into your organization by e-mail or with an invite link. | Guide button next to **Invite by E-Mail** on the [Members](./organization.md#members) page. From this page, on the Members page of your active organization. | Admin |
| **Project access** | Give people access to just one project or timeline: by name, e-mail or link. | Guide button next to the title of the [Invitations dialog](./sharing.md#share-a-project-or-timeline) of a project or timeline. From this page, on the newest project you may invite to. | Member |
| **Marker ranges** | Move a marker on the timeline, stretch it into a range and set start and end to the frame. | Guide button in the timeline toolbar of an export. | Reviewer |

A tour step either has a **Next** button, says **Try it, then click Next.**, or says **Your turn**:
then you click or use the highlighted element, and the tour goes on by itself. **Skip tour** ends
it after asking once more. **Done** on the last step completes it.

A tour started with its guide button pauses when you leave the page. **Finding your way** is the
exception: it walks you through several pages.

**Your first review**, **Using the plugin** and **Marker ranges** only run in a wide window, not
on a phone.

## Guide buttons

A guide button is a small round button with a graduation cap next to a feature. Its tooltip names
the tour. It's there while the tour isn't completed or skipped, and disappears once you're done.
To see a tour again, use **Start again** on the PostPin Guides page.

## Roles

Each guide has a lowest [role](./sharing.md#roles) in the active organization, the one that can
do what the guide teaches. Below it, the guide is greyed out on the PostPin Guides page with
**Needs the Member role**, its button is disabled, and it doesn't start on its own or show a guide
button. An admin of the organization can give you a higher role.

<Screenshot name="guides-reviewer" alt="The PostPin Guides page for a reviewer, with the guides for members greyed out" />

Without an organization you have no role yet. Then only the guides for reviewers and **Your first
upload**, which creates your organization, are available.

## Switching guides off

The **Guides on** switch next to the page title switches guides off for your account. Then nothing
starts on its own and there are no guide buttons. A guide that is running disappears and stays
**In progress**. You can still start every guide from the PostPin Guides page. Switch it back to
**Guides on** to get the tutorials and guide buttons back.
