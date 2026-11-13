---
title: Vertrag über die Auftragsverarbeitung
description: Vertrag über die Verarbeitung personenbezogener Daten im Auftrag (Art. 28 DSGVO) für postpin.io
---

# Vertrag über die Verarbeitung personenbezogener Daten im Auftrag (Art. 28 DSGVO)

_English: [Data Processing Agreement](/dpa) (convenience translation; this German version is binding)_

Stand: 12. November 2026

zwischen

Hannes Rüger, Rüger Events – Software und Veranstaltungstechnik, Eschenallee 20, 87463
Dietmannsried, <Email />
– nachfolgend „Auftragnehmer“ –

und

der Organisation auf postpin.io, für die dieser Vertrag nach § 12 geschlossen wird
– nachfolgend „Auftraggeber“ –.

## § 1 Gegenstand und Dauer

1. Der Auftragnehmer betreibt die Software PostPin unter postpin.io und stellt sie dem
   Auftraggeber bereit, um Exporte aus Schnittsoftware hochzuladen, mit Markern und Kommentaren zu
   prüfen, über Links mit Gästen zu teilen und die Marker in die Schnittsoftware zurückzuholen.
2. Die Bereitstellung ist unentgeltlich.
3. Der Vertrag gilt, solange der Auftraggeber eine Organisation auf postpin.io unterhält, und
   endet mit deren Löschung oder mit Einstellung des Dienstes.

## § 2 Art und Zweck der Verarbeitung

- **Art der Verarbeitung:** Speichern, Hosten, Umwandeln von Videos in Vorschauversionen und
  Vorschaubilder, Sichern, Übermitteln an berechtigte Nutzer und Gäste, Versand von E-Mails im
  Auftrag des Auftraggebers und Löschen, im Rahmen des Betriebs der Software.
- **Zweck:** ausschließlich die Bereitstellung der Software für den Auftraggeber.

## § 3 Art der Daten und Kreis der Betroffenen

| Datenkategorie                                                                                                            | Betroffene                                            |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Mitgliedschaften: Name, E-Mail-Adresse und Rolle der Mitglieder in Organisation, Projekten und Timelines                  | Beschäftigte und Beauftragte des Auftraggebers        |
| Einladungen: E-Mail-Adresse, einladende Person, Rolle, Ziel                                                               | eingeladene Personen                                  |
| Videos und daraus erzeugte Dateien (Vorschauversionen, Vorschaubilder)                                                    | in den Videos abgebildete oder hörbare Personen       |
| Timeline-Beschreibungen: Namen von Clips, Spuren und Dateien, Dateipfade auf dem Rechner des Hochladenden, Clip-Metadaten | Nutzer, ggf. in Namen und Metadaten genannte Personen |
| Marker und Kommentare samt Verfasser                                                                                      | Nutzer, Gäste, ggf. darin genannte Personen           |
| Share-Links: Notiz, Ersteller, Aufrufe; E-Mail-Adressen der Empfänger, an die ein Link verschickt wird                    | Nutzer, Empfänger                                     |
| Gäste: selbst angegebener Name, Zeitpunkt des letzten Aufrufs, Hashwert des Gast-Cookies                                  | Gäste, z. B. Kunden des Auftraggebers                 |
| Speicherverbrauch je Nutzer                                                                                               | Nutzer                                                |

## § 4 Weisungen

1. Der Auftragnehmer verarbeitet die Daten nur auf dokumentierte Weisung des Auftraggebers. Die
   Nutzung der Software durch den Auftraggeber gilt als Weisung.
2. Hält der Auftragnehmer eine Weisung für rechtswidrig, weist er den Auftraggeber darauf hin.

## § 5 Vertraulichkeit

Der Auftragnehmer setzt nur Personen ein, die zur Vertraulichkeit verpflichtet sind. Zugriff auf
die Daten nimmt er nur, soweit Betrieb, Wartung, Fehlerbehebung oder Sicherheit es erfordern.

## § 6 Technische und organisatorische Maßnahmen

Der Auftragnehmer trifft die Maßnahmen nach Art. 32 DSGVO, die in der [Anlage](#anlage) beschrieben
sind. Er darf sie weiterentwickeln, solange das Schutzniveau nicht sinkt.

## § 7 Unterauftragsverarbeiter

1. Der Auftraggeber genehmigt die folgenden Unterauftragsverarbeiter:

| Anbieter                                                         | Leistung                                                                                   | Standort der Verarbeitung |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------- |
| Contabo GmbH, Aschauer Straße 32a, 81549 München                 | Server, auf dem PostPin läuft, samt Datenbank und Speicher für Videos und erzeugte Dateien | Deutschland               |
| Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA | Speicher für Videos und erzeugte Dateien (R2)                                              | EU (EU-Jurisdiktion)      |
| Scaleway SAS, 8 rue de la Ville l'Evêque, 75008 Paris            | Versand von E-Mails (Transactional Email)                                                  | Frankreich                |
| Scaleway SAS (wie oben)                                          | Speicher für Backups (Object Storage)                                                      | EU                        |
| CrowdSec SAS, Paris                                              | Angriffserkennung: IP-Adressen erkannter Angreifer                                         | Frankreich                |

2. Cloudflare, Inc. sitzt in den USA. Die Übermittlung ist durch die Zertifizierung nach dem
   EU-US Data Privacy Framework (Art. 45 DSGVO) und zusätzlich durch die Standardvertragsklauseln
   der EU-Kommission im Auftragsverarbeitungsvertrag von Cloudflare abgesichert. Die Daten liegen
   in einem Speicherbereich mit EU-Jurisdiktion.
3. Videos und erzeugte Dateien speichert der Auftragnehmer entweder auf seinem Server bei Contabo
   oder in Cloudflare R2. Er kann das je Datei festlegen und ändern; beide Orte sind oben genehmigt
   und liegen in der EU. Ein Wechsel zwischen ihnen ist kein neuer Unterauftragsverarbeiter im
   Sinne von Abs. 4.
4. Über neue oder ersetzte Unterauftragsverarbeiter informiert der Auftragnehmer vorab per E-Mail
   an die Owner des Auftraggebers. Der Auftraggeber kann innerhalb von 14 Tagen widersprechen. In
   dem Fall kann jede Seite den Vertrag beenden.
5. Mit jedem Unterauftragsverarbeiter besteht ein Vertrag nach Art. 28 Abs. 4 DSGVO.

## § 8 Unterstützung des Auftraggebers

1. Der Auftragnehmer unterstützt den Auftraggeber im Rahmen des Zumutbaren bei:
   - Anfragen Betroffener (Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit)
   - Meldungen von Datenschutzverletzungen
   - Datenschutz-Folgenabschätzungen
2. Viele dieser Rechte kann der Auftraggeber in der Software selbst erfüllen. Beispiele:
   - Marker, Kommentare, Exporte, Projekte und Share-Links löschen
   - Share-Links widerrufen
   - Mitglieder aus der Organisation entfernen
3. Datenschutzverletzungen meldet der Auftragnehmer unverzüglich, spätestens innerhalb von 48
   Stunden nach Kenntnis, per E-Mail an die Owner des Auftraggebers.

## § 9 Löschung und Rückgabe

1. Löscht der Auftraggeber Inhalte oder seine Organisation in der Software, werden die Daten und
   Dateien sofort gelöscht.
2. Endet der Vertrag auf andere Weise, löscht der Auftragnehmer die Daten des Auftraggebers
   innerhalb von 30 Tagen, soweit keine gesetzliche Pflicht zur Aufbewahrung besteht.
3. Aus Backups verschwinden die Daten mit deren turnusmäßigem Ablauf, spätestens nach 6 Monaten.
4. Vorher kann der Auftraggeber seine Marker über die Plugins in die Schnittsoftware übernehmen
   und auf Anfrage einen Datenbankauszug seiner Organisation erhalten. Die Originale der Videos
   liegen beim Auftraggeber.

## § 10 Kontrollrechte

Der Auftragnehmer weist die Einhaltung dieses Vertrags auf Anfrage nach, in der Regel durch
Auskunft und Vorlage der Dokumentation. Vor-Ort-Kontrollen sind nach Anmeldung mit angemessener
Frist möglich.

## § 11 Unentgeltlichkeit und Haftung

1. Die Leistung ist unentgeltlich. Für Schäden aus der Bereitstellung haftet der Auftragnehmer nur
   bei Vorsatz und grober Fahrlässigkeit (§§ 521, 599 BGB entsprechend).
2. Unberührt bleiben:
   - die Haftung für die Verletzung von Leben, Körper und Gesundheit
   - die Haftung nach Art. 82 DSGVO
3. Ein Anspruch auf eine bestimmte Verfügbarkeit besteht nicht. Einzelheiten regeln die
   [Nutzungsbedingungen](/nutzungsbedingungen).

## § 12 Schlussbestimmungen

1. Der Vertrag ist Teil der [Nutzungsbedingungen](/nutzungsbedingungen) und wird in
   elektronischem Format geschlossen (Art. 28 Abs. 9 DSGVO): Wer eine Organisation anlegt oder als
   Owner verwaltet, schließt ihn für den Auftraggeber, indem er bei der Registrierung den
   Nutzungsbedingungen zustimmt. Die jeweils gültige Fassung ist unter
   [docs.postpin.io/avv](https://docs.postpin.io/avv) abrufbar, frühere Fassungen in der
   Versionsgeschichte dieser Seite auf GitHub.
2. Änderungen kündigt der Auftragnehmer wie in den Nutzungsbedingungen beschrieben 4 Wochen
   vorher an. Für neue Unterauftragsverarbeiter gilt § 7 Abs. 4.
3. Ist eine Bestimmung unwirksam, bleibt der Rest wirksam.

## Anlage

**Technische und organisatorische Maßnahmen (Art. 32 DSGVO)**

### Vertraulichkeit

- **Serverstandort:** Deutschland, Rechenzentrum der Contabo GmbH. Videos und erzeugte Dateien
  dort oder in Cloudflare R2 mit EU-Jurisdiktion.
- **Zutrittskontrolle:** durch Contabo und Cloudflare in den Rechenzentren, siehe deren Verträge
  zur Auftragsverarbeitung und deren technische und organisatorische Maßnahmen.
- **Zugangskontrolle:**
  - Anmeldung mit E-Mail und Passwort. Passwörter werden nur als Hash gespeichert (scrypt).
  - Desktop-App und Plugins melden sich über den Browser an; jede Anmeldung erscheint mit
    Gerätename im Profil und lässt sich dort beenden.
  - Sitzungen laufen nach 7 Tagen ohne Nutzung ab.
  - Anfragen an die Anmeldung sind in der Rate begrenzt.
  - Serverzugang nur per SSH-Schlüssel, Anmeldung als root gesperrt.
- **Zugriffskontrolle:** Rollen je Organisation, aufsteigend:
  - REVIEWER: sieht freigegebene Projekte und Timelines, setzt Marker und Kommentare
  - MEMBER: lädt zusätzlich hoch, benennt um, löscht, lädt ein und erstellt Share-Links
  - ADMIN: verwaltet zusätzlich Mitglieder, Rollen und Einstellungen der Organisation
  - OWNER: benennt zusätzlich die Organisation um oder löscht sie

  REVIEWER und MEMBER sehen nur Projekte und Timelines, für die sie freigeschaltet sind.

- **Gäste:** Share-Links gelten höchstens 30 Tage und lassen sich widerrufen. Gäste sehen nur den
  geteilten Export und nur ihre eigenen Marker. Vom Gast-Cookie wird nur ein Hashwert gespeichert.
- **Medienzugriff:** Videos werden über zeitlich begrenzte, signierte Adressen ausgeliefert, für
  Gäste höchstens 12 Stunden und nie länger als der Share-Link gilt.
- **Trennungskontrolle:** Jeder Datensatz gehört zu einer Organisation, und jede Abfrage ist auf
  die Organisationen und Freigaben des Nutzers beschränkt.
- **Verschlüsselung:**
  - Übertragung ausschließlich per TLS.
  - Videos in R2 werden von Cloudflare verschlüsselt gespeichert.
  - Datenträger des Servers, auch für dort gespeicherte Videos: nicht verschlüsselt.

### Integrität

- **Eingabekontrolle:** Marker, Kommentare, Exporte, Projekte und Share-Links speichern, wer sie
  angelegt hat.
- **Angriffserkennung:** CrowdSec prüft Webserver-Protokolle und Anfragen auf Angriffe und sperrt
  erkannte Angreifer. Deren IP-Adressen werden an die CrowdSec SAS (Paris) gemeldet.
- **Weitergabekontrolle:** keine Übermittlung an Dritte außer den genannten
  Unterauftragsverarbeitern. Keine Analyse- oder Tracking-Dienste.
- **Datensparsamkeit bei Medien:** Vorschauversionen enthalten keine Metadaten der Originaldatei.

### Verfügbarkeit und Belastbarkeit

- **Backups:** Die Datenbank und die Videos auf dem Server werden täglich mit restic in Scaleway
  Object Storage (EU) gesichert. Aufbewahrt werden die Stände der letzten 7 Tage, 4 Wochen und
  6 Monate. Sie werden verschlüsselt, bevor sie den Server verlassen, und von Scaleway zusätzlich
  verschlüsselt gespeichert.
- **Videos in Cloudflare R2:** werden von Cloudflare redundant gespeichert und nicht zusätzlich
  gesichert.
- **Updates:** Container-Images werden automatisch aktualisiert (Watchtower).

### Überprüfung und Datensparsamkeit

- Abgelaufene Sitzungen, Gerätecodes und Einladungen werden regelmäßig gelöscht.
- Überprüfung dieser Maßnahmen: jährlich und bei wesentlichen Änderungen.
