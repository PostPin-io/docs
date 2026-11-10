---
title: Backups
sidebar_position: 7
---

# Backups

:::danger

PostPin does not provide any backup or restore functionality. You are responsible for backing up your data and restoring it in case of a failure if you self-host PostPin. Alternatively, you can use our SaaS offering, where we ensure that your data is backed up and can be restored in case of a failure.

:::

What to back up:

- **Database:** don't copy `data/db` while Postgres is running, the copy may be inconsistent. Dump
  it instead: `docker compose exec db pg_dump -U <POSTGRES_USER> <POSTGRES_DB> > postpin.sql`
- **Media:** `data/s3`, e.g. with restic or rsync.
- **`.env`:** it holds your secrets. Without the same `BETTER_AUTH_SECRET` and S3 keys, a restored
  instance signs everyone out or can't read its storage.

`data/redis` only holds the job queue and doesn't need a backup.
