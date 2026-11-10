---
title: Downloads
slug: /downloads
displayed_sidebar: plugins
---

import Downloads from '@site/src/components/Downloads';

# Downloads

<Downloads />

Each download comes from the newest release that has it. Pre-releases are marked. Older versions
and release notes are on the [GitHub Releases page](https://github.com/PostPin-io/postpin/releases).

To set up a server, the [installation guide](./self-hosting/installation.md) downloads
`compose.yml` and `env.example` straight from the latest release:

```sh
curl -fsSLO https://github.com/PostPin-io/postpin/releases/latest/download/compose.yml
curl -fsSL -o .env https://github.com/PostPin-io/postpin/releases/latest/download/env.example
```
