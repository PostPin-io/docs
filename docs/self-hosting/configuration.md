---
title: Configuration
sidebar_position: 3
---

# Configuration

PostPin is configured through environment variables, set in the `.env` file next to your
`compose.yml`. Variables without a default are required. Values marked _set by compose.yml_ are
the same for every installation of the bundled stack; only set them if you run PostPin without it,
e.g. with an external database or S3 storage.

### Compose

These only configure `compose.yml` itself:

| Variable          | Default  | Description                                                                                   |
| ----------------- | -------- | --------------------------------------------------------------------------------------------- |
| `POSTPIN_VERSION` | `latest` | Image tag to run, e.g. `1.4.2`. `latest` follows every release, including new major versions. |
| `APP_PORT`        | `3000`   | Port on localhost the app listens on, for your reverse proxy.                                 |
| `S3_PORT`         | `9000`   | Port on localhost the bundled rustfs listens on, for your reverse proxy.                      |

### App

| Variable             | Default | Description                                                                                                                                                                                                               |
| -------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_URL`    |         | Public URL of your instance, e.g. `https://postpin.example.com`. Used for sign-in, links in emails and the S3 CORS rule. `compose.yml` also passes it to the app as `ORIGIN`, which form submissions are checked against. |
| `BETTER_AUTH_SECRET` |         | Secret for signing sessions, at least 32 characters. Generate one with `openssl rand -hex 32`. Changing it signs everyone out.                                                                                            |
| `ADMIN_EMAILS`       | (empty) | Comma-separated emails that get system admin access (`/admin`). Only applies once the address is verified.                                                                                                                |

### Database

| Variable            | Default              | Description                                                                                                                                                       |
| ------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POSTGRES_USER`     |                      | User the bundled Postgres container is created with.                                                                                                              |
| `POSTGRES_PASSWORD` |                      | Password for that user.                                                                                                                                           |
| `POSTGRES_DB`       |                      | Database the bundled Postgres container is created with.                                                                                                          |
| `DATABASE_URL`      | _set by compose.yml_ | Connection URL used by app and worker, built from the three values above. Because the password becomes part of this URL, avoid characters like `@ / : ? #` in it. |
| `SKIP_MIGRATIONS`   |                      | Set to `true` to skip database migrations on startup.                                                                                                             |

### Storage

See [Storage & Uploads](./storage.md) for how the two endpoints work together.

| Variable              | Default                                     | Description                                                                                                                            |
| --------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `S3_ENDPOINT`         | _set by compose.yml_ (`http://rustfs:9000`) | Endpoint app and worker use for all S3 operations. Leave empty for AWS S3.                                                             |
| `S3_PUBLIC_ENDPOINT`  | `S3_ENDPOINT`                               | Endpoint in presigned URLs for browsers and plugins. Required with the bundled rustfs: the public URL your reverse proxy serves it on. |
| `S3_FORCE_PATH_STYLE` | _set by compose.yml_ (`true`)               | `true` for URLs like `endpoint/bucket/key`, which most self-hosted S3 servers (including rustfs) need.                                 |
| `S3_ACCESS_KEY`       |                                             | Access key. For the bundled rustfs this also sets its admin user.                                                                      |
| `S3_SECRET_KEY`       |                                             | Secret key. For the bundled rustfs this also sets its admin password.                                                                  |
| `S3_BUCKET`           |                                             | Bucket for all media. Created on startup if it doesn't exist.                                                                          |
| `S3_REGION`           |                                             | Region, e.g. `eu-west-1`. Self-hosted servers accept any value.                                                                        |

### Queue

| Variable        | Default                        | Description                |
| --------------- | ------------------------------ | -------------------------- |
| `REDIS_HOST`    | _set by compose.yml_ (`redis`) | Redis host.                |
| `REDIS_PORT`    | _set by compose.yml_ (`6379`)  | Redis port.                |
| `REDIS_USE_SSL` | `false`                        | `true` to connect via TLS. |

### Email

PostPin sends email verification, password reset and invitation mails. Without a working SMTP server
the app still starts, but users can't verify their address or reset their password.

| Variable         | Default     | Description                                             |
| ---------------- | ----------- | ------------------------------------------------------- |
| `SMTP_HOST`      |             | SMTP server.                                            |
| `SMTP_PORT`      |             | Usually `587` (STARTTLS) or `465` (TLS).                |
| `SMTP_SECURE`    | `false`     | `true` for TLS from the start (port 465).               |
| `SMTP_USER`      |             | SMTP user name.                                         |
| `SMTP_PASSWORD`  |             | SMTP password.                                          |
| `SMTP_MAIL_FROM` | `SMTP_USER` | Sender address, e.g. `"PostPin <noreply@example.com>"`. |
