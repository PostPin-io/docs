---
title: Installation
sidebar_position: 2
---

# Installation

1. Download `compose.yml` and the example configuration into a new directory:

   ```sh
   mkdir postpin && cd postpin
   curl -fsSLO https://github.com/PostPin-io/postpin/releases/latest/download/compose.yml
   curl -fsSL -o .env https://github.com/PostPin-io/postpin/releases/latest/download/env.example
   ```

2. Edit `.env` and replace every `change-me`. Generate the secrets with:

   ```sh
   openssl rand -hex 32   # BETTER_AUTH_SECRET
   openssl rand -hex 24   # POSTGRES_PASSWORD
   openssl rand -hex 16   # S3_ACCESS_KEY
   openssl rand -hex 32   # S3_SECRET_KEY
   ```

   Set `BETTER_AUTH_URL` and `S3_PUBLIC_ENDPOINT` to the two public URLs, and fill in your SMTP
   server. Put your own email address into `ADMIN_EMAILS`.

3. Start PostPin:

   ```sh
   docker compose up -d
   docker compose ps   # wait until app, db, redis and rustfs are healthy
   curl http://localhost:3000/health   # {"status":"ok"}
   ```

   The first start applies all database migrations, which takes a few seconds. All data is stored
   in `./data` next to `compose.yml`: the database in `data/db`, the job queue in `data/redis` and
   all media in `data/s3`. Make sure the disk has room for your media.

4. Set up your [reverse proxy](./reverse-proxy.md) for both hostnames.

5. Open `BETTER_AUTH_URL` in your browser, sign up with the address from `ADMIN_EMAILS` and verify
   it. You can then reach the [admin area](./admin.md) at `/admin`.

## Next steps

- Create an organization and invite your team, see [Getting started](../guide/getting-started.md).
- In the [plugins](../plugins/index.md#logging-in), turn off **Use hosted PostPin server** and
  enter your `BETTER_AUTH_URL` to connect them to your server.
