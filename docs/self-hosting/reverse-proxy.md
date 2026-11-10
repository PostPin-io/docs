---
title: Reverse Proxy & TLS
sidebar_position: 4
---

# Reverse Proxy & TLS

PostPin doesn't terminate TLS itself. `compose.yml` publishes two ports on localhost only, and your
reverse proxy serves them under your two hostnames with HTTPS:

| Hostname (example)    | Proxies to       | Set as               |
| --------------------- | ---------------- | -------------------- |
| `postpin.example.com` | `localhost:3000` | `BETTER_AUTH_URL`    |
| `media.example.com`   | `localhost:9000` | `S3_PUBLIC_ENDPOINT` |

Whatever proxy you use, it must

- forward the original `Host` header to rustfs, because presigned URLs are signed for that host,
- not limit the request body size, because uploads are sent in parts of 32 MiB or more,
- not buffer uploads for a long time, so slow connections don't run into timeouts.

If your proxy runs in a container itself, `localhost` is the proxy container: add it to the
`postpin_default` network and use `app:3000` and `rustfs:9000` instead.

### Caddy

[Caddy](https://caddyserver.com) gets and renews certificates automatically and meets all of the
above by default. `/etc/caddy/Caddyfile`:

```caddyfile
postpin.example.com {
	reverse_proxy localhost:3000
}

media.example.com {
	reverse_proxy localhost:9000
}
```

### nginx

Get certificates with certbot or similar, then:

```nginx
server {
	listen 443 ssl;
	server_name postpin.example.com;
	# ssl_certificate ... / ssl_certificate_key ...

	location / {
		proxy_pass http://127.0.0.1:3000;
		proxy_set_header Host $host;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
	}
}

server {
	listen 443 ssl;
	server_name media.example.com;
	# ssl_certificate ... / ssl_certificate_key ...

	client_max_body_size 0;
	proxy_request_buffering off;

	location / {
		proxy_pass http://127.0.0.1:9000;
		proxy_set_header Host $host;
	}
}
```
