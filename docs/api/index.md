---
title: REST API
sidebar_label: Overview
sidebar_position: 1
slug: /api
---

# REST API

The plugins use the PostPin REST API, and you can use it too, for example to upload renders from a
render farm or to sync markers with another tool.

Every PostPin server serves the API under `/api/v1`. It also ships its own interactive docs at
`/api/v1/docs` and the OpenAPI spec at `/api/v1/openapi.json`. Neither needs a login.

The [reference](#reference) on this site lists every endpoint of the PostPin version these docs
describe.

## Authentication

There are no API keys yet. The API accepts a PostPin session, either as the browser's session
cookie or as a bearer token:

```http
Authorization: Bearer <session token>
```

A token acts as the user it belongs to, with all their permissions. To get one, sign in with email
and password:

```sh
curl -s -X POST https://postpin.example.com/api/auth/sign-in/email \
  -H 'Content-Type: application/json' \
  -d '{"email": "you@example.com", "password": "…"}' \
  | jq -r .token
```

The token is in the `token` field of the response and in the `set-auth-token` response header.
Every token is a session, so it appears in the user's
[active sessions](../guide/account.md#active-sessions), where the user can also end it.

## Uploading a render

An upload goes through four steps. The file itself goes straight to the server's S3 storage in
parts, not through the API.

1. **Create an export** in a timeline:
   `POST /api/v1/projects/{projectId}/timelines/{timelineId}/exports` with
   `{"nleProjectId": null, "nleTimelineId": null}`. The two IDs link the export to a project and
   timeline in an editor. Pass `null` if there is none.
2. **Start the upload:** `POST …/exports/{exportId}/init-upload` with `{"fileSize": <bytes>}`.
   The response has a `partSize` and one presigned URL per part.
3. **Upload the parts:** `PUT` each part's bytes to its URL and keep the `ETag` header of each
   response. The URLs are valid for 24 hours.
4. **Finish:** `POST …/exports/{exportId}/complete-upload` with the `uploadId`, the list of
   `{partNumber, etag}` and a `timelineSnapshot`. PostPin then starts processing the file.

:::warning

The review screen needs the `timelineSnapshot` to draw the timeline and place markers. Send at
least the frame rate, the start frame and the duration, with an empty `tracks` list if you have
nothing else. See the `TimelineSnapshot` schema in the
[reference](./reference/complete-upload.api.mdx).

:::

`POST …/exports/{exportId}/abort-upload` cancels an upload that you won't finish.

## Markers

`GET …/exports/{exportId}/markers` returns the markers of an export with their replies.

`PUT …/exports/{exportId}/markers` adds or updates up to 2000 markers at once. Each marker needs a
`name`, a `frame` and a `categoryId`. To update existing markers, pass their PostPin `id`, or an
`nleId` that you chose yourself. A marker with an `nleId` that PostPin already knows is updated,
not added again.

Marker frames are absolute timeline frames. At 24 fps, a timeline that starts at `01:00:00:00`
begins at frame 86400.

Categories come from `GET /api/v1/projects/{projectId}/categories`. `PUT` on the same path
creates one from `{"name", "color"}`, with the colour as `#RRGGBB`.

## What the API can't do yet

The API has no endpoints for replies, renaming or deleting, members or invitations. Those only
exist in the web app.

## Reference

The pages under **Reference** in the sidebar are generated from the server's OpenAPI spec.
