---
title: Your account
sidebar_position: 9
---

# Your account

Open **Profile** from the account menu at the top right (on a phone, the **☰** menu at the top
left).

<Screenshot name="profile" alt="The profile page" />

## Theme

The account menu has a **Theme** row with three buttons: **System** follows the light or dark mode
of your computer, **Light** and **Dark** keep PostPin in one of them. Your browser remembers the
choice.

## Name

Your display name appears on your markers and replies.

## Email

The badge shows whether your address is verified. **Send verification email** sends a new link.

To change your address, enter it under **New email address** and click **Change**. If your current
address is verified, PostPin sends a confirmation link to the new address first. Otherwise the
change happens right away.

## Password

Enter your current password and the new one twice. Tick **Sign out other devices** to end every
other session at the same time.

Forgot your password? Click **Forgot password?** on the login page and enter your email. You'll
get a link to choose a new password.

An account you created with Google, Microsoft or another provider has no password. The section
then says how you log in instead.

## Sign-in & security

### Passkeys

A passkey lets you log in with your fingerprint, face or device PIN instead of a password. Click
**Add passkey** and follow your browser or password manager. Each passkey is listed with the date
it was added, and "synced" if your password manager syncs it between your devices. **Rename** gives
it a name you recognize, **Remove** deletes it.

On the login page, click **Sign in with a passkey**. Browsers that support it also offer your
passkey right in the email field.

### Two-factor authentication

With two-factor authentication, PostPin asks for a 6-digit code from an authenticator app
(1Password, Google Authenticator, Authy, …) after you log in with your password. It is only there
for accounts with a password; passkeys and providers have their own protection.

1. Click **Turn on** and confirm with your password.
2. Scan the QR code with your authenticator app. **Can't scan it? Enter the key by hand** shows
   the key as text.
3. Enter the code the app shows and click **Turn on**.
4. PostPin shows your backup codes. Each one works once, if you lose your authenticator app.
   **Copy** or **Download** them and keep them somewhere safe: you won't see them again. Then
   click **Done**.

At the next login, enter the code from the app. Tick **Trust this device for 30 days** to skip the
code on this browser for a while. Without your phone, click **Lost your device? Use a backup
code**.

**New backup codes** replaces all your backup codes with new ones, **Turn off** turns two-factor
authentication off again. Both ask for your password.

### Connected accounts

If the server offers sign-in with Google, Microsoft, GitHub, Apple or its own single sign-on, they
are listed here. **Connect** links a provider to your account, so you can log in with it instead
of your password. The provider's account needs the same email address as your PostPin account.
**Disconnect** removes it again. You can't disconnect the only way you have left to log in.

Logging in with a provider for the first time connects it on its own if your PostPin email is
verified and the provider reports the same address as verified. If not, the login page says that an
account with this email already exists: log in with your password and connect the provider here.

## Active sessions

This lists every browser and plugin that is signed in to your account, with its IP address and when
it was last active. Plugin sessions show the plugin and the computer's name. **Sign out** ends a
session, for example on a computer you no longer use.

## Organizations

The organizations you belong to, with your role. **Leave** removes you from one.
**Create new organization** creates another one with you as the owner.

## Storage

How much space the exports you uploaded take up, with their streaming versions and images, in all
organizations together. If the server limits storage per user, the bar shows how much of your
limit is used. The table lists each organization you're a member of with **Your uploads** and
**You can still upload**, which can be less than your own limit because the organization has a
limit too. See [Storage limits](../self-hosting/storage.md#storage-limits).

## Tutorial

**Show tutorial again** starts the explanations of markers and sharing again, from the
[tutorial](./getting-started.md#the-tutorial). Organizations, projects and exports you created stay
as they are. The section is there for accounts that own an organization or aren't in one yet.

## Delete account

**Delete account…** deletes your account, your sessions and your memberships right away. Confirm
with your password. An account without a password confirms by logging in again: click **Log in
again**, then delete the account within 10 minutes. Markers, replies and exports you created stay with their organization and show
"Deleted User" as their author. PostPin then sends an email to your address that confirms the
deletion.

If you are the last owner of an organization, the button is disabled. Make someone else owner, or
delete the organization, first.
