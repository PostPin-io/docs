---
title: Downloads
slug: /downloads
displayed_sidebar: plugins
---

import Downloads from '@site/src/components/Downloads';

# Downloads

<Downloads />

The buttons link the newest release that has the download. If only a pre-release has it so far,
the button says so. All releases are on the
[GitHub Releases page](https://github.com/PostPin-io/postpin/releases).

## Self-hosting

Every release also has `compose.yml` and `env.example` for
[running your own server](./self-hosting/installation.md). The installation guide downloads them
from the latest release:

```sh
curl -fsSLO https://github.com/PostPin-io/postpin/releases/latest/download/compose.yml
curl -fsSL -o .env https://github.com/PostPin-io/postpin/releases/latest/download/env.example
```
