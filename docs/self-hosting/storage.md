---
title: Storage & Uploads
sidebar_position: 5
---

# Storage & Uploads

Browsers and the editor plugins upload and download media **directly from S3**, not through the
PostPin app. The app only hands out short-lived presigned URLs. Your S3 storage therefore has to be
reachable from wherever your users are.

PostPin uses two endpoint settings:

| Variable             | Used by                                       | Example                     |
| -------------------- | --------------------------------------------- | --------------------------- |
| `S3_ENDPOINT`        | App and worker, for all S3 operations         | `http://rustfs:9000`        |
| `S3_PUBLIC_ENDPOINT` | Presigned URLs handed to browsers and plugins | `https://media.example.com` |

`S3_PUBLIC_ENDPOINT` is optional and falls back to `S3_ENDPOINT`.

- **Bundled rustfs (default compose setup):** `compose.yml` sets `S3_ENDPOINT=http://rustfs:9000`;
  point `S3_PUBLIC_ENDPOINT` at the public URL your reverse proxy serves rustfs on. App and worker talk to
  rustfs over the internal Docker network, so they keep working while your proxy, DNS or TLS
  certificate is still being set up, and large video transfers by the worker never have to leave the host.
- **External S3 (AWS S3, Cloudflare R2, Backblaze B2, …):** set `S3_ENDPOINT` to the provider's
  endpoint (leave it empty for AWS) and leave `S3_PUBLIC_ENDPOINT` unset.

On startup PostPin creates the bucket if it does not exist and sets a CORS rule that allows
`BETTER_AUTH_URL` as origin. If your provider does not allow this via the API, create the bucket and
CORS rule manually (methods `GET, PUT, POST, DELETE, HEAD`, exposed headers
`ETag, Content-Range, Content-Length`).

:::warning

Presigned URLs are signed for a specific host. Your reverse proxy must forward the original `Host`
header to rustfs (Caddy does this by default; for nginx add `proxy_set_header Host $host;`) and must
allow large request bodies (uploads are sent in parts of 32 MiB or more, so set
`client_max_body_size 0;` in nginx).

:::
