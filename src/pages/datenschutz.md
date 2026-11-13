---
title: Datenschutzerklärung
description: Datenschutzerklärung für postpin.io, docs.postpin.io und die PostPin-Apps
---

# Datenschutzerklärung

_English: [Privacy Policy](/privacy) (convenience translation; this German version is binding)_

Stand: 12. November 2026

## 1. Verantwortlicher

**Rüger Events – Software und Veranstaltungstechnik**<br />
Hannes Rüger<br />
Eschenallee 20<br />
87463 Dietmannsried<br />
Deutschland

E-Mail: <Email />

## 2. Worum es geht

Unter postpin.io betreiben wir PostPin, eine Software, mit der Teams Exporte aus ihrer
Schnittsoftware prüfen: Sie laden Videos hoch, setzen Marker und Kommentare, teilen Exporte über
Links mit Gästen und übernehmen die Marker zurück in DaVinci Resolve, Premiere Pro oder Pro Tools.
Dazu gibt es die PostPin Desktop-App und Plugins für diese Programme. Unter docs.postpin.io liegt
die Dokumentation. Die Nutzung ist aktuell unentgeltlich.

Wir haben dabei zwei Rollen:

- **Selbst verantwortlich** sind wir für Ihr Konto und den Betrieb der Plattform (Anmeldung,
  Sitzungen, Einladungen, Sicherheit) und für die Dokumentation. Davon handelt diese Erklärung.
- **Im Auftrag** verarbeiten wir die Inhalte, die eine Organisation hochlädt oder einträgt:
  Videos, Marker, Kommentare, die Namen von Gästen und die Empfänger von Share-Links. Dafür ist die
  jeweilige Organisation verantwortlich (Art. 28 DSGVO, siehe [AVV](/avv)). Fragen dazu richten Sie
  an die Organisation, die Ihnen den Link geschickt oder Sie eingeladen hat.

Dieselbe Software können andere selbst betreiben. Für solche Instanzen ist allein ihr Betreiber
verantwortlich; diese Erklärung gilt nur für postpin.io.

## 3. Welche Daten wir verarbeiten

### Aufruf der Website

- **Protokoll des Webservers:** Beim Aufruf protokolliert der Webserver IP-Adresse, Zeitpunkt,
  aufgerufene Adresse, Statuscode und Browserkennung.
- **Zweck:** Betrieb und Abwehr von Angriffen.
- **Rechtsgrundlage:** Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren
  Betrieb).
- **Speicherdauer:** Löschung nach 7 Tagen.

### Schutz vor Angriffen (CrowdSec)

- **Was:** Die Protokolle des Webservers und die eingehenden Anfragen prüft die Software CrowdSec
  auf unserem Server auf Angriffsmuster. Erkennt sie einen Angriff, wird die IP-Adresse für eine
  begrenzte Zeit gesperrt.
- **Weitergabe:** Die IP-Adresse eines erkannten Angreifers, der Zeitpunkt und die Art des
  Angriffs werden an die CrowdSec SAS (Paris, Frankreich) übermittelt. Im Gegenzug erhalten wir
  deren Liste bekannter Angreifer-Adressen. Anfragen, die nicht als Angriff erkannt werden,
  verlassen unseren Server nicht.
- **Rechtsgrundlage:** Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Sicherheit des
  Dienstes).
- **Speicherdauer:** Sperren enden automatisch, in der Regel nach 4 Stunden.

### Konto

- **Daten:** Name, E-Mail-Adresse und Passwort. Das Passwort speichern wir nur als Hash. Dazu
  kommen Ihre Rollen in den Organisationen, Projekten und Timelines, denen Sie angehören.
- **Rechtsgrundlage:** Art. 6 Abs. 1 lit. b DSGVO (Nutzungsverhältnis).
- **Speicherdauer:** bis Ihr Konto gelöscht wird (siehe Abschnitt 6).

### Sitzungen

- **Daten:** Solange Sie angemeldet sind, speichern wir zu Ihrer Sitzung die IP-Adresse und die
  Browserkennung (User-Agent). Melden Sie sich mit der Desktop-App oder einem Plugin an, kommen
  der Name der App und der Name Ihres Rechners dazu. Beides sehen Sie in Ihrem Profil und können
  die Sitzung dort beenden.
- **Zweck:** Die Sitzung absichern, Missbrauch erkennen und Ihnen zeigen, wo Sie angemeldet sind.
- **Rechtsgrundlage:** Art. 6 Abs. 1 lit. f DSGVO.
- **Speicherdauer:** Eine Sitzung läuft nach 7 Tagen ohne Nutzung ab. Abgelaufene Sitzungen
  löschen wir spätestens einen Tag später.

### E-Mails

- **Wann:** Wir senden E-Mails zur Bestätigung der Adresse, zum Zurücksetzen des Passworts, mit
  Einladungen in eine Organisation und, wenn ein Mitglied einer Organisation das veranlasst, mit
  einem Share-Link an die angegebenen Empfänger. Bei Share-Links steht die Adresse des Absenders
  als Antwortadresse in der E-Mail.
- **Versand:** über Scaleway Transactional Email (Scaleway SAS, Paris, Frankreich).
- **Rechtsgrundlage:** Art. 6 Abs. 1 lit. b DSGVO. Share-Link-E-Mails versenden wir im Auftrag
  der Organisation.

### Einladungen

- **Daten:** Lädt Sie jemand ein, speichern wir Ihre E-Mail-Adresse, wer eingeladen hat, mit
  welcher Rolle und in welche Organisation, welches Projekt oder welche Timeline.
- **Gültigkeit:** Eine Einladung per E-Mail gilt 48 Stunden. Einladungslinks gelten, bis die
  Organisation sie abschaltet.
- **Speicherdauer:** Abgelaufene Einladungen löschen wir 30 Tage später.

### Videos, Marker und Kommentare

- **Upload:** Die Desktop-App und die Plugins laden einen Export aus Ihrer Schnittsoftware hoch,
  zusammen mit einer Beschreibung der Timeline: Namen von Clips und Spuren, Dateinamen und
  Dateipfade auf Ihrem Rechner und Metadaten der Clips.
- **Verarbeitung:** Aus dem Video erzeugen wir Vorschauversionen in mehreren Qualitätsstufen und
  Vorschaubilder. Metadaten der Originaldatei übernehmen wir nicht in die Vorschauversionen.
- **Speicherort:** Videos und die daraus erzeugten Dateien liegen in einem Objektspeicher, und
  zwar an einem dieser beiden Orte:
  - auf unserem Server bei Contabo in Deutschland oder
  - in Cloudflare R2, dem Objektspeicher der Cloudflare, Inc. (USA), in einem Speicherbereich mit
    EU-Jurisdiktion, also in Rechenzentren in der EU. Für die Übermittlung siehe Abschnitt 5.

  Welchen der beiden wir nutzen, kann sich je Datei unterscheiden und mit der Zeit ändern. Die
  Daten bleiben in beiden Fällen in der EU.

- **Rolle:** Diese Inhalte verarbeiten wir im Auftrag der Organisation.
- **Speicherdauer:** bis die Organisation sie löscht. Löscht sie einen Export, ein Projekt oder die
  ganze Organisation, löschen wir die zugehörigen Dateien sofort.

### Share-Links und Gäste

- **Was:** Mitglieder einer Organisation können einen Export über einen Link teilen. Gäste öffnen
  ihn ohne Konto, sehen das Video und setzen eigene Marker.
- **Daten:** Wir speichern den Namen, den der Gast angibt (falls die Organisation einen verlangt
  oder er einen eingibt), seine Marker und wann er den Link zuletzt geöffnet hat. Damit der Gast
  beim nächsten Besuch wiedererkannt wird, setzen wir ein Cookie (siehe Abschnitt 4). Wir
  speichern davon nur einen Hashwert.
- **Gültigkeit:** Ein Link gilt höchstens 30 Tage und kann jederzeit widerrufen werden.
- **Rolle:** Name und Marker von Gästen verarbeiten wir im Auftrag der Organisation, die den Link
  geteilt hat.

### Datensicherung

- **Backups:** Die Datenbank und die Videos, die auf unserem Server liegen, sichern wir täglich
  mit restic in Scaleway Object Storage (Scaleway SAS, Rechenzentrum in der EU). Die Backups werden verschlüsselt, bevor sie
  unseren Server verlassen, und von Scaleway zusätzlich verschlüsselt gespeichert.
- **Speicherdauer:** Wir behalten die Sicherungen der letzten 7 Tage, 4 Wochen und 6 Monate.
  Gelöschte Daten verschwinden also spätestens nach 6 Monaten auch aus den Backups.
- **Videos in Cloudflare R2:** Cloudflare speichert sie redundant. Eine zusätzliche Sicherung
  davon machen wir nicht.

### Desktop-App und Plugins

- **Anmeldung:** Die Apps melden Sie über Ihren Browser an und speichern danach ein
  Anmelde-Token auf Ihrem Rechner. Dazu kommen die gewählte Server-Adresse und Ihre
  Export-Einstellungen. Diese Daten verlassen Ihren Rechner nur für die Anfragen an PostPin.
- **Updates:** Die Desktop-App prüft beim Start auf GitHub, ob es eine neue Version gibt, und lädt
  sie von dort. Dabei erfährt die GitHub, Inc. (USA) Ihre IP-Adresse. Rechtsgrundlage ist Art. 6
  Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherer, aktueller Software).

### Dokumentation (docs.postpin.io)

- **Hosting:** Die Dokumentation liegt bei GitHub Pages (GitHub, Inc., USA). GitHub protokolliert
  beim Aufruf die IP-Adresse und technische Daten der Anfrage.
- **Downloads:** Die Download-Seite fragt in Ihrem Browser bei GitHub ab, welche Version aktuell
  ist. Auch dabei erfährt GitHub Ihre IP-Adresse.
- **Suche:** Die Suche läuft vollständig in Ihrem Browser.
- **Rechtsgrundlage:** Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer zuverlässig
  erreichbaren Dokumentation).

## 4. Cookies und lokaler Speicher

Wir verwenden nur, was für die Funktion nötig ist. Eine Einwilligung ist dafür nicht erforderlich
(§ 25 Abs. 2 Nr. 2 TDDDG), deshalb gibt es keinen Cookie-Banner.

| Name                                   | Art          | Zweck                                                     | Dauer        |
| -------------------------------------- | ------------ | --------------------------------------------------------- | ------------ |
| `__Secure-better-auth.session_token`   | Cookie       | Anmeldung                                                 | bis 7 Tage   |
| `postpin_share_…`                      | Cookie       | einen Gast auf einem Share-Link wiedererkennen            | bis 1 Jahr   |
| `postpin:…`, Ansichts- und Filterwerte | localStorage | z. B. Videoqualität, Panel-Aufteilung, Sortierung, Filter | bis gelöscht |
| `theme` (docs.postpin.io)              | localStorage | helles oder dunkles Design der Dokumentation              | bis gelöscht |

Der lokale Speicher bleibt in Ihrem Browser und wird nicht an uns übertragen.

## 5. Empfänger und Übermittlung in Drittländer

- **Kein Tracking:** Wir binden keine Analyse-, Werbe- oder Trackingdienste ein.
- **Eine Ausnahme bei Drittinhalten:** Die API-Dokumentation unter postpin.io/api/v1/docs lädt
  die Anzeige-Software Swagger UI von cdnjs (Cloudflare, Inc., USA). Dabei erfährt Cloudflare Ihre
  IP-Adresse. Alle anderen Seiten liefern wir vollständig selbst aus.
- **Empfänger Ihrer Daten** sind nur unsere Dienstleister:

| Dienstleister                   | Leistung                                           | Ort          |
| ------------------------------- | -------------------------------------------------- | ------------ |
| Contabo GmbH, München           | Server, auf dem PostPin läuft, Speicher für Videos | Deutschland  |
| Cloudflare, Inc., San Francisco | Speicher für Videos (R2), Swagger UI über cdnjs    | EU (R2), USA |
| Scaleway SAS, Paris             | Versand der E-Mails, Speicher für Backups          | EU           |
| CrowdSec SAS, Paris             | IP-Adressen erkannter Angreifer                    | Frankreich   |
| GitHub, Inc., San Francisco     | Hosting der Dokumentation, Updates der Desktop-App | USA          |

- **Auftragsverarbeitung:** Mit allen Dienstleistern haben wir Verträge nach Art. 28 DSGVO.
- **Drittländer:** Cloudflare und GitHub sitzen in den USA. Beide sind nach dem EU-US Data Privacy
  Framework zertifiziert; die EU-Kommission hat dafür ein angemessenes Schutzniveau festgestellt
  (Art. 45 DSGVO). Zusätzlich gelten die Standardvertragsklauseln der EU-Kommission aus den
  Auftragsverarbeitungsverträgen beider Anbieter. Videos, die in R2 liegen, bleiben in Rechenzentren
  in der EU; als US-Unternehmen kann Cloudflare dennoch Anfragen von US-Behörden unterliegen.

## 6. Konto löschen

- **So geht's:** Im Profil unter „Delete account“, bestätigt mit Ihrem Passwort. Die Löschung
  erfolgt sofort, danach erhalten Sie eine Bestätigung per E-Mail.
- **Was gelöscht wird:** Ihr Konto mit Name, E-Mail-Adresse und Passwort-Hash, alle Sitzungen
  (auch die der Desktop-App und der Plugins), Ihre Mitgliedschaften und offene Einladungen an
  Ihre E-Mail-Adresse. Einladungen und Einladungslinks, die Sie verschickt oder erstellt haben,
  werden ungültig.
- **Was bleibt:** Marker, Kommentare, Exporte und Share-Links, die Sie in einer Organisation
  angelegt haben, gehören der Organisation und bleiben bei ihr. Sie sind danach nicht mehr mit
  Ihrem Konto verknüpft und erscheinen als „Deleted User“.
- **Letzter Owner:** Sind Sie der letzte Owner einer Organisation, übertragen Sie diese Rolle
  vorher oder löschen die Organisation. Bis dahin lässt sich das Konto nicht löschen.
- **Backups:** Aus den Sicherungen verschwindet Ihr Konto spätestens nach 6 Monaten (siehe
  Datensicherung).

## 7. Ihre Rechte

- **Rechte gegenüber uns:**
  - Auskunft (Art. 15 DSGVO)
  - Berichtigung (Art. 16)
  - Löschung (Art. 17)
  - Einschränkung der Verarbeitung (Art. 18)
  - Datenübertragbarkeit (Art. 20)
  - Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21)
- **Kontakt:** eine E-Mail an <Email /> genügt.
- **Inhalte von Organisationen:** Geht es um Videos, Marker oder Ihren Namen als Gast, wenden Sie
  sich an die Organisation. Wir leiten Anfragen, die bei uns ankommen, an sie weiter.
- **Beschwerde:** Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren, etwa bei der
  für uns zuständigen: Bayerisches Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18,
  91522 Ansbach, [www.lda.bayern.de](https://www.lda.bayern.de).
