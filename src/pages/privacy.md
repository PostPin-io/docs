---
title: Privacy Policy
description: Privacy policy for postpin.io, docs.postpin.io and the PostPin apps
---

# Privacy Policy

:::info[Convenience translation]

This is an English translation of the [Datenschutzerklärung](/datenschutz). Only the German
version is legally binding.

:::

Last updated: 12 November 2026

## 1. Controller

**Rüger Events – Software und Veranstaltungstechnik**<br />
Hannes Rüger<br />
Eschenallee 20<br />
87463 Dietmannsried<br />
Germany

Email: <Email />

## 2. What this is about

At postpin.io we run PostPin, software that teams use to review exports from their editing
software: they upload videos, add markers and comments, share exports with guests via links and
bring the markers back into DaVinci Resolve, Premiere Pro or Pro Tools. There is also the PostPin
desktop app and plugins for these programs. The documentation is at docs.postpin.io. Use is
currently free of charge.

We have two roles:

- **As controller** we are responsible for your account and for running the platform (sign-in,
  sessions, invitations, security) and for the documentation. That is what this policy covers.
- **As processor** we process the content an organization uploads or enters on its behalf:
  videos, markers, comments, guests' names and the recipients of share links. The organization is
  responsible for that content (Art. 28 GDPR, see the [DPA](/dpa)). Please direct questions about
  it to the organization that sent you the link or invited you.

Others can run the same software themselves. Their operators alone are responsible for such
instances; this policy applies only to postpin.io.

## 3. What data we process

### Visiting the website

- **Web server log:** When a page is requested, the web server logs the IP address, time,
  requested address, status code and browser identification.
- **Purpose:** Operation and defense against attacks.
- **Legal basis:** Art. 6(1)(f) GDPR (legitimate interest in secure operation).
- **Retention:** Deleted after 7 days.

### Attack protection (CrowdSec)

- **What:** The CrowdSec software on our server checks the web server logs and incoming requests
  for attack patterns. If it detects an attack, the IP address is blocked for a limited time.
- **Sharing:** The IP address of a detected attacker, the time and the type of attack are sent to
  CrowdSec SAS (Paris, France). In return, we receive their list of known attacker addresses.
  Requests not identified as attacks do not leave our server.
- **Legal basis:** Art. 6(1)(f) GDPR (legitimate interest in the security of the service).
- **Retention:** Blocks expire automatically, usually after 4 hours.

### Account

- **Data:** Name, email address and password. We store the password only as a hash. In addition,
  your roles in the organizations, projects and timelines you belong to.
- **Legal basis:** Art. 6(1)(b) GDPR (user relationship).
- **Retention:** Until your account is deleted (see section 6).

### Sessions

- **Data:** While you are signed in, we store the IP address and browser identification (user
  agent) of your session. If you sign in with the desktop app or a plugin, the name of the app and
  the name of your computer are added. You can see both in your profile and end the session there.
- **Purpose:** Securing the session, detecting misuse and showing you where you are signed in.
- **Legal basis:** Art. 6(1)(f) GDPR.
- **Retention:** A session expires after 7 days without use. We delete expired sessions within one
  day.

### Emails

- **When:** We send emails to confirm your address, to reset your password, with invitations to an
  organization and, when a member of an organization requests it, with a share link to the
  recipients they enter. For share links, the sender's address is set as the reply-to address.
- **Delivery:** via Scaleway Transactional Email (Scaleway SAS, Paris, France).
- **Legal basis:** Art. 6(1)(b) GDPR. We send share link emails on behalf of the organization.

### Invitations

- **Data:** If someone invites you, we store your email address, who invited you, with which role
  and to which organization, project or timeline.
- **Validity:** An email invitation is valid for 48 hours. Invite links stay valid until the
  organization disables them.
- **Retention:** We delete expired invitations 30 days later.

### Videos, markers and comments

- **Upload:** The desktop app and the plugins upload an export from your editing software,
  together with a description of the timeline: names of clips and tracks, file names and file
  paths on your computer, and clip metadata.
- **Processing:** From the video we create preview versions in several quality levels and
  thumbnails. We do not carry metadata of the original file over into the preview versions.
- **Storage location:** Videos and the files created from them are stored in object storage, in
  one of these two places:
  - on our server at Contabo in Germany, or
  - in Cloudflare R2, the object storage of Cloudflare, Inc. (USA), in a storage area with EU
    jurisdiction, i.e. in data centers in the EU. For the transfer, see section 5.

  Which of the two we use can differ per file and change over time. In both cases the data stays
  in the EU.

- **Role:** We process this content on behalf of the organization.
- **Retention:** Until the organization deletes it. When it deletes an export, a project or the
  whole organization, we delete the associated files immediately.

### Share links and guests

- **What:** Members of an organization can share an export via a link. Guests open it without an
  account, watch the video and add their own markers.
- **Data:** We store the name the guest enters (if the organization requires one or the guest
  enters one), their markers and when they last opened the link. To recognize the guest on their
  next visit, we set a cookie (see section 4). We store only a hash of it.
- **Validity:** A link is valid for at most 30 days and can be revoked at any time.
- **Role:** We process guests' names and markers on behalf of the organization that shared the
  link.

### Backups

- **Backups:** We back up the database and the videos stored on our server daily with restic to
  Scaleway Object Storage (Scaleway SAS, data center in the EU). The backups are encrypted before
  they leave our server and are additionally stored encrypted by Scaleway.
- **Retention:** We keep the backups of the last 7 days, 4 weeks and 6 months. Deleted data
  therefore disappears from the backups after 6 months at the latest.
- **Videos in Cloudflare R2:** Cloudflare stores them redundantly. We do not make any additional
  backup of them.

### Desktop app and plugins

- **Sign-in:** The apps sign you in via your browser and then store a sign-in token on your
  computer, along with the chosen server address and your export settings. This data leaves your
  computer only for requests to PostPin.
- **Updates:** On startup, the desktop app checks GitHub for a new version and downloads it from
  there. GitHub, Inc. (USA) learns your IP address in the process. The legal basis is Art. 6(1)(f)
  GDPR (legitimate interest in secure, up-to-date software).

### Documentation (docs.postpin.io)

- **Hosting:** The documentation is hosted on GitHub Pages (GitHub, Inc., USA). GitHub logs the IP
  address and technical data of each request.
- **Downloads:** The download page asks GitHub from your browser which version is current. GitHub
  learns your IP address in the process as well.
- **Search:** The search runs entirely in your browser.
- **Legal basis:** Art. 6(1)(f) GDPR (legitimate interest in reliably available documentation).

## 4. Cookies and local storage

We only use what is necessary for the service to work. No consent is required for this (§ 25(2)
no. 2 of the German Telecommunications Digital Services Data Protection Act, TDDDG), which is why
there is no cookie banner.

| Name                                 | Type         | Purpose                                            | Duration      |
| ------------------------------------ | ------------ | -------------------------------------------------- | ------------- |
| `__Secure-better-auth.session_token` | Cookie       | Sign-in                                            | up to 7 days  |
| `postpin_share_…`                    | Cookie       | Recognizing a guest on a share link                | up to 1 year  |
| `postpin:…`, view and filter values  | localStorage | e.g. video quality, panel layout, sorting, filters | until deleted |
| `theme` (docs.postpin.io)            | localStorage | Light or dark theme of the documentation           | until deleted |

Local storage stays in your browser and is not sent to us.

## 5. Recipients and transfers to third countries

- **No tracking:** We do not use any analytics, advertising or tracking services.
- **One exception for third-party content:** The API documentation at postpin.io/api/v1/docs loads
  the Swagger UI viewer from cdnjs (Cloudflare, Inc., USA). Cloudflare learns your IP address in
  the process. We serve all other pages entirely ourselves.
- **Recipients of your data** are only our service providers:

| Service provider                | Service                                               | Location     |
| ------------------------------- | ----------------------------------------------------- | ------------ |
| Contabo GmbH, Munich            | Server PostPin runs on, storage for videos            | Germany      |
| Cloudflare, Inc., San Francisco | Storage for videos (R2), Swagger UI via cdnjs         | EU (R2), USA |
| Scaleway SAS, Paris             | Sending emails, storage for backups                   | EU           |
| CrowdSec SAS, Paris             | IP addresses of detected attackers                    | France       |
| GitHub, Inc., San Francisco     | Hosting the documentation, updates of the desktop app | USA          |

- **Data processing:** We have agreements under Art. 28 GDPR with all service providers.
- **Third countries:** Cloudflare and GitHub are based in the USA. Both are certified under the
  EU-US Data Privacy Framework, for which the EU Commission has found an adequate level of
  protection (Art. 45 GDPR). In addition, the EU Commission's standard contractual clauses from
  both providers' data processing agreements apply. Videos stored in R2 stay in data centers in
  the EU; as a US company, Cloudflare may nevertheless be subject to requests from US authorities.

## 6. Deleting your account

- **How:** In your profile under “Delete account”, confirmed with your password. The account is
  deleted immediately, and you then receive a confirmation by email.
- **What is deleted:** Your account with name, email address and password hash, all sessions
  (including those of the desktop app and the plugins), your memberships and pending invitations
  to your email address. Invitations and invite links you sent or created stop working.
- **What remains:** Markers, comments, exports and share links you created in an organization
  belong to the organization and stay with it. They are no longer linked to your account and are
  shown as “Deleted User”.
- **Last owner:** If you are the last owner of an organization, first transfer that role or
  delete the organization. Until then, the account cannot be deleted.
- **Backups:** Your account disappears from the backups after 6 months at the latest (see
  Backups).

## 7. Your rights

- **Your rights towards us:**
  - Access (Art. 15 GDPR)
  - Rectification (Art. 16)
  - Erasure (Art. 17)
  - Restriction of processing (Art. 18)
  - Data portability (Art. 20)
  - Objection to processing based on legitimate interests (Art. 21)
- **Contact:** An email to <Email /> is enough.
- **Content of organizations:** For videos, markers or your name as a guest, please contact the
  organization. We forward requests that reach us to it.
- **Complaints:** You can lodge a complaint with a data protection supervisory authority, for
  example the one responsible for us: Bayerisches Landesamt für Datenschutzaufsicht (BayLDA),
  Promenade 18, 91522 Ansbach, Germany, [www.lda.bayern.de](https://www.lda.bayern.de).
