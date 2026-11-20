---
title: Updates and versions
sidebar_position: 7
---

# Updates and versions

PostPin runs database migrations on startup, so you update by pulling the new images and restarting the containers:

```sh
docker compose pull && docker compose up -d
```

This can be automated by Watchtower or similar tools. The app and worker images share the same version, so always update both at the same time. Pin `POSTPIN_VERSION` to a version like `1.4.2` if you want to decide yourself when to update. If you set `SKIP_MIGRATIONS` to `true`, PostPin skips the migrations and may fail to start if the database is not up to date.

The editor plugins have to match the API version of your server. After an update that changes it,
the plugins show **Plugin update required** and link to the matching download, see
[Plugin and server versions](../plugins/index.md#plugin-and-server-versions).

When the worker is stopped, it stops taking new jobs and gives the ones it is working on up to 25
seconds to finish. Jobs that take longer, like transcoding a long video, are put back into the
queue and start over once the worker is running again, so nothing is lost.
