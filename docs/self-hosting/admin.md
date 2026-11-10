---
title: System admin
sidebar_position: 9
---

# System admin

The **System** page at `/admin` shows the state of your PostPin server and its background jobs.

![The system admin page](/img/screenshots/web/admin.png)

## Access

Add your email address to `ADMIN_EMAILS` in `.env` and restart the app. Several addresses are
separated by commas. The address must also be verified: open your
[profile](../guide/account.md#email), click **Send verification email** and follow the link.

System admins see **System** in the header. For everyone else, `/admin` answers with 404.

Being a system admin doesn't grant access to any organization. It only opens this page.

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
