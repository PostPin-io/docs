---
title: Sign-in methods
sidebar_position: 4
---

# Sign-in methods

Besides email and password, users can sign in with passkeys, which need no configuration, and with
the SSO and social providers you set up under [Sign-in](./configuration.md#sign-in): Google,
Microsoft, GitHub, Apple and any OpenID Connect provider. Everyone with a password can turn on
two-factor authentication (authenticator app plus backup codes) in their
[profile](../guide/account.md#sign-in--security).

## Redirect URIs

Register these redirect URIs with the provider, with your `BETTER_AUTH_URL` in front:

| Provider      | Redirect URI                   |
| ------------- | ------------------------------ |
| Google        | `/api/auth/callback/google`    |
| Microsoft     | `/api/auth/callback/microsoft` |
| GitHub        | `/api/auth/callback/github`    |
| Apple         | `/api/auth/callback/apple`     |
| Your OIDC IdP | `/api/auth/callback/oidc`      |

For OIDC, request the scopes `openid email profile`. PostPin uses PKCE.

## Existing accounts

A first SSO sign-in with the email of an existing account connects the two, but only if the
provider reports the email as verified and the PostPin account's email is verified too. Otherwise
the user logs in with their password and connects the provider under **Profile › Sign-in &
security**. A first SSO sign-in with a new email creates an account.

## Passkeys

Passkeys need HTTPS (or `localhost`) and are bound to the host name of `BETTER_AUTH_URL`. Changing
that host name invalidates every passkey.

## SSO-only instances

With `DISABLE_PASSWORD_LOGIN=true`, the login and sign-up pages show only the providers and
**Sign in with a passkey**. Existing users with a password sign in through a provider with the same
verified email, or with a passkey they added before.

## Apple

"Sign in with Apple" needs a paid Apple developer account. Create an App ID with _Sign in with
Apple_, a Services ID (your `APPLE_CLIENT_ID`) with your domain and the redirect URI above, and a
key for _Sign in with Apple_. Apple's client secret is a JWT signed with that key, valid for at
most 6 months. The script
[`apple-client-secret.mjs`](https://github.com/PostPin-io/postpin/blob/main/packages/postpin/scripts/apple-client-secret.mjs)
from the repository creates it and needs nothing but Node.js:

```sh
node apple-client-secret.mjs AuthKey_XXXX.p8 <team id> <key id> <services id>
```

and set a reminder to create a new one before it expires. Users who hide their email get a
`@privaterelay.appleid.com` address. Apple only forwards mail to it from senders you register
under _Sign in with Apple for Email Communication_, so register your `SMTP_MAIL_FROM` address there.
