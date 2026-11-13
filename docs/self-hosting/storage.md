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

## Storage limits

Every export counts towards the quota of its organization and of the user who uploaded it. Both
apply: an upload is rejected (HTTP 413, shown in the editor plugin) as soon as it would exceed
either one. The plugins and the [web upload](../guide/projects.md#upload-from-the-browser) announce
the file size before uploading, so PostPin rejects an upload up front instead of after the
transfer. `UPLOAD_MAX_FILE_SIZE` additionally limits the size of a single file, independent of the
quotas.

- **What counts:** the original, its proxies, and the generated images (thumbnail, seek images,
  shot thumbnails). Unfinished uploads reserve their announced size for 24 hours.
- **Defaults and overrides:** `STORAGE_DEFAULT_ORG_QUOTA` and `STORAGE_DEFAULT_USER_QUOTA` apply
  to everyone. System admins set different limits per organization and per user in the
  [admin area](./admin.md#organizations-and-users), and see the usage of the whole instance under
  [Storage](./admin.md#storage). Organization owners and admins see their organization's usage in
  its settings, and every user sees their own on their profile.
- **A user quota above their organizations' quotas** is allowed, because it counts over all
  organizations. The admin user list points out the part a user can never use because their
  organizations together allow less.

The quotas don't stop other data from filling your disk. As a safety net, give the rustfs bucket a
hard quota too, ideally the same value as `STORAGE_CAPACITY`. rustfs then refuses writes beyond it,
even if PostPin's own check is wrong. Run this next to your `compose.yml`:

```sh
set -a && . ./.env && set +a
docker compose exec -T rustfs curl -s --fail-with-body \
  --aws-sigv4 "aws:amz:${S3_REGION}:s3" --user "$S3_ACCESS_KEY:$S3_SECRET_KEY" \
  -X PUT -H "Content-Type: application/json" \
  -d '{"quota":50000000000,"quotatype":"hard"}' \
  "http://127.0.0.1:9000/rustfs/admin/v3/set-bucket-quota?bucket=$S3_BUCKET"

# check it: quota_limit should show the new value
docker compose exec -T rustfs curl -s --aws-sigv4 "aws:amz:${S3_REGION}:s3" \
  --user "$S3_ACCESS_KEY:$S3_SECRET_KEY" \
  "http://127.0.0.1:9000/rustfs/admin/v3/quota-stats/$S3_BUCKET"
```

`"quota":0` removes the limit. rustfs checks multipart uploads only when they complete, so a large
upload can briefly take up more than the quota before it is rejected.
