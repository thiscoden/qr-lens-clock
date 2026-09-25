# MVP-Abgrenzung

Stand: 2026-09-25 · Status: bestätigt

## Kleinster vollständiger Nutzen

Wecker stellen, der Wecker klingelt zur Weckzeit und verstummt nur, wenn der Nutzer seinen eigenen Code scannt.

## MVP-Umfang

| ID | Feature |
|---|---|
| F-001 | QR-Code beim ersten Aktivieren erzeugen, jederzeit anzeigen, als PNG über das Teilen-Menü exportieren |
| F-002 | Wecker erstellen, ändern, ein- und ausschalten, löschen. Tägliche Weckzeit, Restzeit beim Stellen |
| F-003 | Klingeln zur Weckzeit mit Standard-Beep, endlos, auch bei gesperrtem Gerät, im Vollbild |
| F-004 | Klingeln per Scan des eigenen Codes beenden, fremde Codes werden abgelehnt |

Gestaltung: Code-Look nach VS Code Dark+, Cascadia Mono, immer dunkel, 24-h-Format.

## Nicht im MVP

- F-005 Klingelton-Wahl. Sie ist das erste Feature nach dem MVP.
- Alle Nicht-Ziele aus dem [Product Brief](product-brief.md).
- iOS.

## Reihenfolge

1. F-002
2. F-001
3. Prototyp-Test der Alarm-Bibliothek
4. F-003
5. F-004
6. erste APK mit Live-Update

Begründung: F-001 hängt von F-002 ab, weil der Code beim ersten Aktivieren eines Weckers entsteht.
