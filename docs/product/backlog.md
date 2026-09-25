# Feature-Backlog

Stand: 2026-09-25

| ID | Feature (vertikal) | Priorität | Abhängig von | Status |
|---|---|---|---|---|
| F-002 | Wecker erstellen, ändern, ein- und ausschalten, löschen; tägliche Weckzeit; Restzeit beim Stellen | MVP | – | spezifiziert ([Spezifikation](../features/F-002-wecker-stellen.md)) |
| F-001 | QR-Code beim ersten Aktivieren erzeugen, jederzeit anzeigen, PNG teilen | MVP | F-002 | Entscheidungen gesammelt ([Notizen](../features/F-001-qr-code.md)), Spezifikation offen |
| F-003 | Klingeln zur Weckzeit: Standard-Beep, endlos, gesperrtes Gerät, Vollbild, Lautlos/Nicht stören, nach Neustart | MVP | F-002, Alarm-Spike | offen |
| F-004 | Klingeln durch Scan des eigenen Codes beenden; fremde Codes werden abgelehnt | MVP | F-001, F-003 | offen |
| F-005 | Klingelton auswählen | nach MVP | F-003 | offen |

## Begründung der Priorisierung

- F-001 bis F-004 bilden zusammen den kleinsten vollständigen Nutzen. Ohne eines davon gibt es keinen Wecker, der sich nur per QR abschalten lässt.
- F-005 bringt keinen zusätzlichen Kernnutzen.

## Technische Vorarbeit (kein Feature)

- **Spike Alarm-Bibliothek** vor F-003. Er prüft im Development Build auf Android 12 und im Emulator mit aktueller Android-Version:
  - endloses Klingeln,
  - Vollbild,
  - Neustart,
  - Lautlos/Nicht stören.

  Das Ergebnis wird in ADR-002 festgehalten.
