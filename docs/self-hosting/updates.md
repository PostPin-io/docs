---
title: Updates & Versions
sidebar_position: 6
---

# Updates & Versions

PostPin will run database migrations automatically on startup, so you can update by pulling the new images and restarting the containers:

```sh
docker compose pull && docker compose up -d
```

This can be automated by Watchtower or similar tools. The app and worker images share the same version, so always update both at the same time. Pin `POSTPIN_VERSION` to a version like `1.4.2` if you want to decide yourself when to update. If you set `SKIP_MIGRATIONS` to `true`, PostPin will skip migrations and may fail to start if the database is not up-to-date.

When the worker is stopped, it stops taking new jobs and gives the ones it is working on up to 25
seconds to finish. Jobs that take longer, like transcoding a long video, are put back into the
queue and start over once the worker is running again, so nothing is lost.
