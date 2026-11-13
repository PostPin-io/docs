---
title: Data Processing Agreement
description: Agreement on the processing of personal data on behalf of a controller (Art. 28 GDPR) for postpin.io
---

# Agreement on the Processing of Personal Data on Behalf of a Controller (Art. 28 GDPR)

:::info[Convenience translation]

This is an English translation of the
[Vertrag über die Auftragsverarbeitung](/avv). Only the German version is legally binding.

:::

Last updated: 12 November 2026

between

Hannes Rüger, Rüger Events – Software und Veranstaltungstechnik, Eschenallee 20, 87463
Dietmannsried, Germany, <Email />
– hereinafter the “Processor” –

and

the organization on postpin.io for which this agreement is concluded under § 12
– hereinafter the “Controller” –.

## § 1 Subject matter and duration

1. The Processor runs the PostPin software at postpin.io and provides it to the Controller for
   uploading exports from editing software, reviewing them with markers and comments, sharing them
   with guests via links and bringing the markers back into the editing software.
2. The service is provided free of charge.
3. The agreement applies as long as the Controller maintains an organization on postpin.io and
   ends when that organization is deleted or the service is discontinued.

## § 2 Nature and purpose of the processing

- **Nature of the processing:** Storing, hosting, converting videos into preview versions and
  thumbnails, backing up, transmitting to authorized users and guests, sending emails on behalf
  of the Controller and deleting, as part of running the software.
- **Purpose:** Solely providing the software to the Controller.

## § 3 Types of data and categories of data subjects

| Data category                                                                                                 | Data subjects                                     |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Memberships: name, email address and role of members in the organization, projects and timelines              | Employees and agents of the Controller            |
| Invitations: email address, inviting person, role, target                                                     | Invited persons                                   |
| Videos and files created from them (preview versions, thumbnails)                                             | Persons who can be seen or heard in the videos    |
| Timeline descriptions: names of clips, tracks and files, file paths on the uploader's computer, clip metadata | Users, persons named in names and metadata if any |
| Markers and comments including their authors                                                                  | Users, guests, persons named in them if any       |
| Share links: note, creator, views; email addresses of recipients a link is sent to                            | Users, recipients                                 |
| Guests: self-chosen name, time of last visit, hash of the guest cookie                                        | Guests, e.g. clients of the Controller            |
| Storage usage per user                                                                                        | Users                                             |

## § 4 Instructions

1. The Processor processes the data only on documented instructions from the Controller. The
   Controller's use of the software counts as an instruction.
2. If the Processor considers an instruction unlawful, it informs the Controller.

## § 5 Confidentiality

The Processor only employs persons who are bound to confidentiality. It accesses the data only as
far as operation, maintenance, troubleshooting or security require.

## § 6 Technical and organizational measures

The Processor takes the measures under Art. 32 GDPR described in the [Annex](#annex). It may
develop them further as long as the level of protection does not decrease.

## § 7 Sub-processors

1. The Controller approves the following sub-processors:

| Provider                                                         | Service                                                                                 | Place of processing  |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------------------- |
| Contabo GmbH, Aschauer Straße 32a, 81549 Munich, Germany         | Server PostPin runs on, including the database and storage for videos and created files | Germany              |
| Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA | Storage for videos and created files (R2)                                               | EU (EU jurisdiction) |
| Scaleway SAS, 8 rue de la Ville l'Evêque, 75008 Paris, France    | Sending emails (Transactional Email)                                                    | France               |
| Scaleway SAS (as above)                                          | Storage for backups (Object Storage)                                                    | EU                   |
| CrowdSec SAS, Paris, France                                      | Attack detection: IP addresses of detected attackers                                    | France               |

2. Cloudflare, Inc. is based in the USA. The transfer is safeguarded by its certification under
   the EU-US Data Privacy Framework (Art. 45 GDPR) and additionally by the EU Commission's standard
   contractual clauses in Cloudflare's data processing agreement. The data is stored in a storage
   area with EU jurisdiction.
3. The Processor stores videos and created files either on its server at Contabo or in Cloudflare
   R2. It may decide and change this per file; both places are approved above and are in the EU. A
   switch between them is not a new sub-processor within the meaning of para. 4.
4. The Processor informs the Controller's owners by email in advance about new or replaced
   sub-processors. The Controller may object within 14 days. In that case, either party may
   terminate the agreement.
5. An agreement under Art. 28(4) GDPR is in place with every sub-processor.

## § 8 Assisting the Controller

1. The Processor assists the Controller, within reason, with:
   - requests from data subjects (access, rectification, erasure, restriction, data portability)
   - notifications of personal data breaches
   - data protection impact assessments
2. The Controller can fulfill many of these rights in the software itself. Examples:
   - deleting markers, comments, exports, projects and share links
   - revoking share links
   - removing members from the organization
3. The Processor reports personal data breaches without undue delay, at the latest within 48
   hours of becoming aware of them, by email to the Controller's owners.

## § 9 Deletion and return

1. When the Controller deletes content or its organization in the software, the data and files
   are deleted immediately.
2. If the agreement ends in any other way, the Processor deletes the Controller's data within 30
   days, unless there is a legal obligation to retain it.
3. The data disappears from backups as they expire on schedule, after 6 months at the latest.
4. Before that, the Controller can bring its markers into the editing software using the plugins
   and receive a database extract of its organization on request. The originals of the videos
   remain with the Controller.

## § 10 Audit rights

The Processor demonstrates compliance with this agreement on request, usually by providing
information and documentation. On-site audits are possible after notice with a reasonable period.

## § 11 Free of charge and liability

1. The service is free of charge. The Processor is liable for damage arising from the provision of
   the service only in the case of intent and gross negligence (applying §§ 521, 599 of the German
   Civil Code, BGB, accordingly).
2. This does not affect:
   - liability for injury to life, body or health
   - liability under Art. 82 GDPR
3. There is no entitlement to any particular availability. Details are set out in the
   [Terms of Service](/terms).

## § 12 Final provisions

1. The agreement forms part of the [Terms of Service](/terms) and is concluded in electronic form
   (Art. 28(9) GDPR): whoever creates an organization or manages it as an owner concludes it on
   behalf of the Controller by accepting the Terms of Service on registration. The version in
   force is available at [docs.postpin.io/avv](https://docs.postpin.io/avv); earlier versions are
   in the version history of that page on GitHub.
2. The Processor announces changes 4 weeks in advance as described in the Terms of Service. § 7
   para. 4 applies to new sub-processors.
3. If a provision is invalid, the remaining provisions stay in effect.

## Annex

**Technical and organizational measures (Art. 32 GDPR)**

### Confidentiality

- **Server location:** Germany, data center of Contabo GmbH. Videos and created files there or in
  Cloudflare R2 with EU jurisdiction.
- **Physical access control:** by Contabo and Cloudflare in their data centers, see their data
  processing agreements and their technical and organizational measures.
- **System access control:**
  - Sign-in with email and password. Passwords are stored only as a hash (scrypt).
  - The desktop app and plugins sign in via the browser; each sign-in appears with the device
    name in the profile and can be ended there.
  - Sessions expire after 7 days without use.
  - Requests to the sign-in are rate limited.
  - Server access only via SSH key, root login disabled.
- **Data access control:** Roles per organization, in ascending order:
  - REVIEWER: sees shared projects and timelines, adds markers and comments
  - MEMBER: additionally uploads, renames, deletes, invites and creates share links
  - ADMIN: additionally manages members, roles and settings of the organization
  - OWNER: additionally renames or deletes the organization

  REVIEWER and MEMBER only see projects and timelines they have been given access to.

- **Guests:** Share links are valid for at most 30 days and can be revoked. Guests only see the
  shared export and only their own markers. Only a hash of the guest cookie is stored.
- **Media access:** Videos are delivered via time-limited, signed addresses, for guests for at
  most 12 hours and never longer than the share link is valid.
- **Separation control:** Every record belongs to an organization, and every query is limited to
  the user's organizations and access grants.
- **Encryption:**
  - Transmission exclusively via TLS.
  - Videos in R2 are stored encrypted by Cloudflare.
  - Server disks, including videos stored there: not encrypted.

### Integrity

- **Input control:** Markers, comments, exports, projects and share links record who created
  them.
- **Attack detection:** CrowdSec checks web server logs and requests for attacks and blocks
  detected attackers. Their IP addresses are reported to CrowdSec SAS (Paris).
- **Transfer control:** No transfer to third parties other than the sub-processors listed. No
  analytics or tracking services.
- **Data minimization for media:** Preview versions contain no metadata of the original file.

### Availability and resilience

- **Backups:** The database and the videos on the server are backed up daily with restic to
  Scaleway Object Storage (EU). The backups of the last 7 days, 4 weeks and 6 months are kept.
  They are encrypted before they leave the server and are additionally stored encrypted by
  Scaleway.
- **Videos in Cloudflare R2:** are stored redundantly by Cloudflare and not backed up separately.
- **Updates:** Container images are updated automatically (Watchtower).

### Review and data minimization

- Expired sessions, device codes and invitations are deleted regularly.
- Review of these measures: annually and after significant changes.
