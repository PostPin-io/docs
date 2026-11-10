---
title: Self-Hosting PostPin
sidebar_position: 1
sidebar_label: Overview
slug: /self-hosting
---

# Self-Hosting PostPin

## Overview

To run PostPin on your own server, you need Docker, a containerization platform that runs Linux containers. PostPin is distributed as a set of Docker images, and the easiest way to run them is with Docker Compose. PostPin ships as two images: the app (web interface and API) and a worker that processes uploaded media, e.g. transcoding videos and creating thumbnails. In addition, PostPin needs a Postgres database, a Redis queue and S3-compatible storage for media. The easiest way to get all of these is with the bundled `compose.yml` (in `deploy/` of the [PostPin repository](https://github.com/PostPin-io/postpin/tree/main/deploy), and attached to every [release](https://github.com/PostPin-io/postpin/releases)), which runs PostPin, Postgres, Redis and a small S3 server called rustfs.

## Requirements

- a linux server with Docker and Docker Compose installed (any basic VPS will do, although transcoding videos is CPU-intensive and may be slow on small instances)
- a domain name and TLS certificate (PostPin requires HTTPS for sign-in and media uploads). You need two hostnames pointing to the server: one for the app and one for media storage, e.g. `postpin.example.com` and `media.example.com`
- a reverse proxy that terminates TLS, see [Reverse Proxy & TLS](./reverse-proxy.md)
- a working SMTP server for sending email verification, password reset and invitation emails (PostPin will start without it, but users can't verify their address or reset their password)
