## Bezug

- Issue: #
- Feature / Schritt: F-xxx / Sx
- Spezifikation: docs/features/…

## Was ändert sich?

<!-- Kurz, aus Sicht der nutzenden Person -->

## Nachweis der Akzeptanzkriterien

| AC | Nachweis (Test-ID oder manuelle Prüfung) | Ergebnis |
|---|---|---|
| AC-xx | T-xx | ✅ |

## Prüfungen

- [ ] `npm run check` lokal grün
- [ ] CI grün (quality, test, bundle, android-build)
- [ ] Neue Tests sind zuerst fehlgeschlagen (testgetrieben)
- [ ] E2E lokal ausgeführt (falls sich UI-Abläufe geändert haben)
- [ ] Manuelle Prüfungen aus `docs/quality/manual-checks.md` auf dem Gerät (Android 12) und im Emulator (aktuell) durchgeführt

## Definition of Done

- [ ] Keine Prüfung deaktiviert oder abgeschwächt (`.skip`, `.only`, `eslint-disable`, `@ts-ignore`, `any`, gesenkte Schwellen). Ausnahmen mit Begründung:
- [ ] Architekturgrenzen eingehalten (Domain ohne Framework-Imports, Farben nur aus dem Theme)
- [ ] Doku aktualisiert (Spezifikation, ADR, manuelle Checkliste, offene Fragen)
- [ ] Datenformat geändert? Dann Migration mit Test vorhanden (oder: nicht zutreffend)

## Native Änderungen

- [ ] Keine nativen Änderungen, Live-Update genügt
- [ ] Native Änderungen (Abhängigkeit, Plugin, Berechtigung, app.config), neue APK nötig, Runtime-Version angepasst

## Screenshots

<!-- optional -->
