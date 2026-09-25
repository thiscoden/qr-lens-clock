# QR-Wecker

Android-Wecker, der nur per QR-Scan verstummt. Lernprojekt. Produkt- und Feature-Doku liegt in `docs/`, der aktuelle Schritt steht in `docs/process/implementation-plan.md`.

## Stack (fest, siehe docs/adr/0001-expo-dev-build.md)

- Expo (React Native), TypeScript `strict`, npm.
- Nur Android, ab Android 12 (API 31). Kein iOS, kein Web.
- F-001 und F-002 müssen in Expo Go laufen, also ohne eigenen nativen Code. Ab F-003 läuft die App als Development Build.
- Sprache: Code, Bezeichner, Commits und Code-Kommentare auf Englisch. Doku in `docs/` und diese Datei auf Deutsch.

## Befehle (verfügbar ab S1)

- `npm run check`: format:check, lint, typecheck, test. Muss vor jedem Pull Request grün sein.
- `npm test`: Jest.
- `npm run e2e`: Maestro, braucht Emulator oder Gerät.
- `npx expo start`: Entwicklung mit Expo Go.
- Abhängigkeiten installieren nur mit `npx expo install <paket>`.

## Architektur (Details: docs/process/architecture.md)

- `src/domain`: reine TS-Logik. Keine Imports aus react, react-native, expo oder Bibliotheken.
- Die Außenwelt wird nur über `src/ports` angesprochen. Die Umsetzungen liegen in `src/adapters`, verdrahtet nur im Composition Root.
- `app/` (Expo Router) enthält nur Verdrahtung, keine Logik.
- Tests verwenden Fakes aus `test/fakes/`, keine Mocks interner Module.

## Arbeitsweise

- Vor dem Code die zugehörige Spezifikation in `docs/features/` lesen. Nichts bauen, was nicht spezifiziert ist.
- Testgetrieben arbeiten: Zuerst kommt der Test zum Akzeptanzkriterium. Er muss fehlschlagen, erst dann wird umgesetzt.
- Tests prüfen fachliches Verhalten, nicht Interna und nicht nur einzelne Beispielwerte.
- Nie auf `main` arbeiten. Branches heißen `feat/F-xxx-…`, `fix/…`, `chore/…`, `docs/…`, `spike/…`.
- Commits folgen Conventional Commits mit F-ID als Scope, z. B. `feat(F-002): …`.
- Fertig ist nur, was `docs/quality/definition-of-done.md` erfüllt.

## Verboten

- Prüfungen umgehen: `.skip`, `.only`, `eslint-disable`, `@ts-ignore`, `any`, gesenkte Schwellen, `--no-verify`, Force-Push.
- Tests so ändern, dass sie grün werden, statt den Code zu korrigieren.
- Geheimnisse, Schlüssel oder persönliche Daten ins Repository legen. Das Repository ist öffentlich.

## Neue Abhängigkeiten

- Nur nach Rückfrage beim Nutzer.
- Vorher prüfen und im Pull Request begründen:
  - Läuft die Bibliothek in Expo Go? Das gilt bis F-002.
  - Wird sie gewartet?
  - Welche Lizenz hat sie?
  - Enthält sie nativen Code? Dann ist eine neue APK nötig.
