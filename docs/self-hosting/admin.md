---
title: System admin
sidebar_position: 9
---

# System admin

The admin area at `/admin` shows the state of your PostPin server and its background jobs, and
how much storage it uses. It has four tabs: **System**, **Storage**, **Organizations** and
**Users**.

<Screenshot name="admin" alt="The system admin page" />

## Access

Add your email address to `ADMIN_EMAILS` in `.env` and restart the app. Several addresses are
separated by commas. The address must also be verified: open your
[profile](../guide/account.md#email), click **Send verification email** and follow the link.

System admins see **System** in the header (on a phone, in the **☰** menu). For everyone else, `/admin` answers with 404.

Being a system admin doesn't grant access to any organization. It only opens the admin area.

## System

The top row shows the version and whether the app can reach the database, storage and Redis, with
the response time of each. **send test** next to Email sends a test mail to your own address, which
is a quick way to check your [SMTP settings](./configuration.md#email). **Refresh** checks again.

## Queues and jobs

The worker processes uploads in two queues. `heavy` runs transcoding and other long jobs, `light`
runs short ones. For each queue the page shows how many workers are connected and how many jobs are
active, waiting, delayed, failed and completed.

**Jobs** lists jobs by state. Click a job to see its data and, for failed jobs, the error. **Retry**
runs a failed job again, **Remove** deletes it.

If uploads stay at "processing", check here first: no connected worker means the worker container
isn't running, and failed jobs show why processing stopped.

Once a day at 3:00 (Europe/Berlin), the worker also deletes expired sessions, plugin login codes
and verification links, and invitations that expired more than 30 days ago.

## Storage

<Screenshot name="admin-storage" alt="The storage tab of the admin area" />

**Usage** shows how much of the storage is used by originals, streaming versions and images, as a
chart if `STORAGE_CAPACITY` or `STORAGE_DISK_PATH` is set (see
[Storage limits](./configuration.md#storage-limits)). Exports processed before PostPin recorded
the size of their images are missing from it until you click **Measure now**.

**Quotas** shows the default quota per organization and per user and the **Total allocated** to
all organizations. If the organization quotas add up to more than the storage there is, a warning
points out that uploads can fail before an organization reaches its quota.

## Organizations and users

**Organizations** lists every organization with its members, the storage it uses and its quota.
**Users** lists every user with their organizations, the storage of their uploads and their quota.

<Screenshot name="admin-users" alt="The users tab of the admin area" />

Click a quota to change it for that organization or user, for example to `200 GB`. Leave it empty
to go back to the default. See [Storage limits](./storage.md#storage-limits) for how the two
quotas work together.
