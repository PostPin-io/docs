---
title: Self-hosting PostPin
sidebar_position: 1
sidebar_label: Overview
slug: /self-hosting
---

# Self-hosting PostPin

## Overview

PostPin is open source under the MIT license, so you can run it on your own server. The code is in
the [PostPin repository](https://github.com/PostPin-io/postpin).

PostPin runs as two Docker images: the app (web interface and API) and a worker that processes
uploaded media, for example transcoding videos and creating thumbnails. Both need a Postgres
database, Redis (for the job queue and for passing live marker changes between reviewers) and
S3-compatible storage for the media. The bundled `compose.yml` runs all
of it with Docker Compose: PostPin, Postgres, Redis and a small S3 server called rustfs. It is in
`deploy/` of the [repository](https://github.com/PostPin-io/postpin/tree/main/deploy) and attached
to every [release](https://github.com/PostPin-io/postpin/releases).

## Requirements

- a Linux server with Docker and Docker Compose. A small VPS works, but transcoding videos needs
  CPU and may be slow on small instances.
- a domain name and TLS certificates. PostPin needs HTTPS for sign-in and media uploads. You need
  two hostnames pointing to the server, one for the app and one for media storage, e.g.
  `postpin.example.com` and `media.example.com`.
- a reverse proxy that terminates TLS, see [Reverse proxy and TLS](./reverse-proxy.md)
- an SMTP server for email verification, password reset, invitation and share-link emails. PostPin starts
  without it, but users can't verify their address or reset their password.
