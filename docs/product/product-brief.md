# Product Brief

Stand: 2026-09-25 · Status: bestätigt

## Pitch

„Minimalistischer Wecker ohne Snooze und Aus-Knopf, der erst verstummt, wenn du deinen persönlichen QR-Code scannst.“

## Nutzergruppen

- Primär: ich selbst.
- Sekundär: einige Bekannte (Android, Verteilung per APK).

## Primäre Nutzungssituation

Morgens im Bett, der Wecker klingelt. Der QR-Code befindet sich irgendwo, der Ort liegt beim Nutzer.

## Zentraler Nutzerablauf

1. Wecker erstellen: Weckzeit mit Scroll-Rädern setzen und speichern. Beim ersten Aktivieren erzeugt die App einmalig den QR-Code, den der Nutzer als PNG teilt.
2. Die Weckzeit gilt täglich. Vor dem Klingeln ist sie jederzeit änderbar, abschaltbar und löschbar.
3. Zur Weckzeit klingelt der Wecker endlos. Er verstummt nur, wenn der Nutzer den eigenen Code in der App scannt. Am nächsten Tag klingelt er erneut.

## Verhaltensregeln

- Eine Weckzeit, täglich gleich, gilt bis zur Änderung. Immer höchstens ein Wecker.
- Zustände: „kein Wecker“, „Wecker aus“, „Wecker an“.
- Die QR-Pflicht gilt nur, solange der Wecker klingelt.
- Ein QR-Code pro Installation, er bleibt dauerhaft gleich. Nach einer Neuinstallation entsteht ein neuer Code, der alte Ausdruck wird ungültig.
- Der Wecker klingelt endlos bis zum Scan, oder bis das Gerät ausgeht oder der Akku leer ist.
- Er klingelt auch bei Lautlos und „Nicht stören“.

## Wichtigstes Ergebnis für den Nutzer

[H] Der Nutzer ist nach der Weckzeit körperlich aufgestanden, weil er den Wecker sonst nicht abschalten kann.

## Produktziele

- Ein zuverlässig klingelnder Wecker, der sich nur per QR-Scan abschalten lässt.
- Minimalistische Darstellung im Code-Look:
  - große dünne Ziffern hh:mm in Cascadia Mono,
  - Farben nach VS Code Dark+,
  - immer dunkel.

## Nicht-Ziele

- Mehrere Wecker.
- Konto, Cloud, Synchronisation.
- Statistik, Schlaftracking.
- Umgehungsschutz (Foto, Screenshot, Stummschalten, App beenden).
- Webversion.
- iOS im MVP. iOS kommt später als separates natives Projekt mit denselben Testfällen.

## Erfolgskriterien

- Das MVP läuft im Alltag auf dem eigenen Android-Handy. Das ist bewusst nicht quantifiziert.
- Der Workflow ist wiederholbar: Ein neues Feature lässt sich mit Claude Code nach denselben Regeln ohne Nacharbeit umsetzen.

## Risiken und unsichere Annahmen

- Zuverlässiges Klingeln bei gesperrtem Gerät, App im Hintergrund und Energiesparmodi der Hersteller.
- Neue Sprache (TypeScript/React) bei Java-Hintergrund.
- QR-Scan morgens bei wenig Licht.
- H1 ist unbewiesen. Für ein Lernprojekt ist das akzeptabel.

## Zu überprüfende Produkthypothesen

- H1: Der QR-Zwang bringt mich zuverlässiger aus dem Bett.
- H2: Ein dauerhafter Code reicht, ein Wechsel ist nicht nötig.
- H3: Endloses Klingeln ohne Zeitlimit ist im Alltag akzeptabel, auch gegenüber Nachbarn und Mitbewohnern.
