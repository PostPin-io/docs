---
title: Troubleshooting
sidebar_position: 8
---

# Troubleshooting

### Health check

`GET /health` answers `200 {"status":"ok"}` when the app is running and can reach the database, and
`503 {"status":"error"}` otherwise. It needs no login, so you can use it for your reverse proxy's or
uptime monitor's health checks.

### Port is already allocated

Another service on your server uses port 3000 or 9000. Set `APP_PORT` or `S3_PORT` in `.env` to a
free port and point your reverse proxy there.

### Uploads fail with 403 Forbidden

The signature of the presigned URL doesn't match the request. Check that `S3_PUBLIC_ENDPOINT`
matches the URL your proxy serves rustfs on exactly (scheme and hostname) and that your proxy
forwards the original `Host` header.
