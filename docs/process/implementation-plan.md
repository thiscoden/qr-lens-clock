# Umsetzungsplan: erster vertikaler Abschnitt (F-002)

Stand: 2026-09-25 · Status: freigegeben

Jeder Schritt ist ein eigenes Issue mit eigenem Branch und Pull Request. Tests kommen zuerst.

## S0: Repository und Dokumente

- **Ziel:** Der Plan liegt als versionierte Doku vor, das GitHub-Repository ist angelegt.
- **Voraussetzungen:** freigegebener Plan, GitHub-Konto, Git.
- **Bereiche:** `docs/`, `CLAUDE.md`, `.claude/`, `.github/ISSUE_TEMPLATE/`, `.github/pull_request_template.md`, `.gitignore`, `.gitattributes`, `README.md`.
- **Tests:** keine, es entsteht nur Doku.
- **Lokal prüfen:** Dateien vorhanden, Links korrekt.
- **CI:** noch keine. Der Branch-Schutz folgt in S1, weil er CI-Status braucht.
- **Abnahme:**
  - Die Doku spiegelt alle bestätigten Entscheidungen.
  - Issues für S1 bis S9 sind angelegt.
- **Risiken:** gering.

## S1: Lauffähiges Grundgerüst und Qualitäts-Pipeline („Walking Skeleton“)

- **Ziel:** Die leere App startet in Expo Go auf dem eigenen Android-Handy. Alle Prüfungen laufen lokal und in der CI.
- **Voraussetzungen:**
  - S0
  - Node LTS, VS Code
  - Expo Go auf dem Handy
  - Android Studio mit Emulator
- **Bereiche:**
  - Projektwurzel: `package.json`, `tsconfig`, `app.config.ts`, ESLint, Prettier, Jest, Husky, commitlint, `.nvmrc`
  - `app/index.tsx`
  - `.github/workflows/ci.yml`
  - Hooks in `.claude/settings.json`
- **Tests:**
  - Ein Smoke-Komponententest prüft, dass der Hauptbildschirm rendert.
  - Die ESLint-Grenzregel wird einmal lokal mit einem absichtlich falschen Import geprüft. Dieser Import wird nicht committet.
- **Umsetzung:**
  - Expo-Template (TypeScript) auf einem SDK, das zu Expo Go im Play Store passt, mit `strict`.
  - Skripte `check`, `test`, `lint`, `typecheck` und `format:check`.
  - Husky-Hooks.
  - CI-Jobs `quality`, `test`, `bundle` und `android-build`.
- **Lokal prüfen:**
  - `npm run check` ist grün.
  - `npx expo start` zeigt die App in Expo Go.
- **CI:**
  - Alle Jobs sind im ersten Pull Request grün.
  - Danach wird der Branch-Schutz mit den Pflicht-Status aktiviert.
- **Abnahme:**
  - Der Merge ist nur über eine grüne CI möglich.
  - Ein direkter Push auf `main` wird abgelehnt (einmal geprüft).
- **Risiken:**
  - Eigenheiten von Windows, etwa Zeilenenden und Husky-Pfade.
  - Die SDK-Version muss zur Expo-Go-Version passen.
  - Node 26 ist lokal installiert. Eine LTS-Version muss festgelegt werden.

## S2: Restzeit-Logik (Domain)

- **Ziel:** Die Restzeit ist korrekt, auch über Mitternacht, beim Aufrunden und bei der Zeitumstellung.
- **Voraussetzungen:** S1.
- **Bereiche:** `src/domain/remainingTime.ts` mit Test.
- **Tests:** T-01, T-02 (fast-check), T-03, T-04, T-25, T-26.
- **Umsetzung:**
  - Eine reine Funktion: aus jetzt, Weckzeit und Zeitzone wird eine Dauer.
  - Sie liefert die echte Dauer.
  - Eine nicht existierende Uhrzeit wird um eine Stunde verschoben.
- **Lokal prüfen:** Tests erst rot, dann grün. Danach `npm run check`.
- **CI:** Job `test` mit `TZ=Europe/Berlin`.
- **Abnahme:** Alle genannten Tests sind grün, die Domain hat keine Framework-Imports.
- **Risiken:** Datumsrechnung und Zeitzonen können sich in Hermes und Node unterscheiden. Eventuell wird eine kleine Datumsbibliothek nötig. Das ist eine neue Abhängigkeit, also vorher nachfragen.

## S3: Wecker-Regeln, Ports, Fakes

- **Ziel:** Das Domain-Modell „kein / aus / an“ gilt:
  - Es gibt höchstens einen Wecker.
  - Ändern behält den Zustand.
  - Umschalten behält die Zeit.
- **Voraussetzungen:** S1.
- **Bereiche:** `src/domain/alarm.ts`, `src/ports/*`, `test/fakes/*`.
- **Tests:** T-05.
- **Umsetzung:**
  - Ergebnis-Objekte statt Exceptions.
  - Ports `Clock`, `AlarmStore`, `AlarmScheduler` und `Permissions`.
- **Lokal prüfen und CI:** wie in S2.
- **Abnahme:** T-05 ist grün, die Fakes sind nutzbar.
- **Risiken:** Überabstraktion. Es werden nur die Ports angelegt, die F-002 braucht.

## S4: Theme, Schrift, Kontrast

- **Ziel:** Es gibt Dark+-Farbtoken, Cascadia Mono ist geladen, und der Kontrast ist nachweislich ausreichend.
- **Voraussetzungen:** S1.
- **Bereiche:** `src/ui/theme.ts`, `assets/fonts/` mit OFL-Lizenz, eine Basis-Textkomponente.
- **Tests:** Ein Kontrast-Test prüft alle Token-Paare nach WCAG: Text ≥ 4,5:1, große Ziffern ≥ 3:1.
- **Umsetzung:** Farben mit zu wenig Kontrast werden leicht aufgehellt, die Abweichung wird dokumentiert.
- **Lokal prüfen:** Test grün, Sichtprüfung in Expo Go.
- **CI:** Job `test`.
- **Abnahme:** Der Kontrast-Test ist grün, die Schrift ist sichtbar.
- **Risiken:** Ist der dünne Schnitt schlecht lesbar, wird eine Stufe dickerer Schnitt verwendet.

## S5: Leerzustand und Wecker erstellen

- **Ziel:** AC-01, AC-02, AC-03, AC-04 und AC-14 sind in der UI umgesetzt, zunächst mit Fakes.
- **Voraussetzungen:** S2, S3, S4.
- **Bereiche:** `app/index.tsx`, `app/edit.tsx`, `src/features/alarm-edit/*`, `src/ui/WheelPicker`.
- **Tests:** T-06, T-07, T-08, T-09.
- **Umsetzung:**
  - In diesem Schritt fällt die Entscheidung über die Scroll-Räder: eigene Komponente oder Bibliothek. Eine Bibliothek nur nach Rückfrage und nur, wenn sie in Expo Go läuft.
  - Die Restzeit aktualisiert sich live.
  - Speichern.
- **Lokal prüfen:** Tests, dann den Ablauf in Expo Go auf dem Handy durchspielen.
- **CI:** alle Pflicht-Jobs.
- **Abnahme:** Die genannten ACs sind im Pull Request mit Test-IDs nachgewiesen.
- **Risiken:** Die Räder könnten mit TalkBack schlecht bedienbar sein. Das früh prüfen.

## S6: Ändern, Abbrechen, Umschalten, Löschen

- **Ziel:** AC-05 bis AC-09.
- **Voraussetzungen:** S5.
- **Bereiche:** `src/features/alarm-edit/*`, Listeneintrag.
- **Tests:** T-10, T-11, T-12, T-13.
- **Umsetzung:**
  - Antippen öffnet die Bearbeitung.
  - Schalter.
  - Wischen mit Rückfrage.
  - Löschen zusätzlich als Bedienungshilfen-Aktion.
- **Lokal prüfen und CI:** wie in S5.
- **Abnahme:** Die ACs sind nachgewiesen. Die Tests aus S5 sind weiterhin grün.
- **Risiken:** Für das Wischen wird eventuell eine Gesten-Bibliothek gebraucht. Bei der Umsetzung prüfen, ob sie in Expo Go enthalten ist.

## S7: Persistenz

- **Ziel:** AC-12, dazu Speicherfehler und doppeltes Speichern.
- **Voraussetzungen:** S3, S5.
- **Bereiche:** `src/adapters/asyncStorageAlarmStore.ts`, Composition Root.
- **Tests:**
  - T-16, T-17, T-19
  - Migrations-Grundgerüst mit `schemaVersion` und Test
- **Umsetzung:** AsyncStorage-Adapter mit versioniertem Format.
- **Lokal prüfen:** Tests. Dann die App in Expo Go schließen und öffnen, der Wecker muss bleiben.
- **CI:** Pflicht-Jobs.
- **Abnahme:** AC-12 ist nachgewiesen.
- **Risiken:** gering.

## S8: Verhalten bei Berechtigungen (über den Port)

- **Ziel:** AC-11: Der Wecker bleibt gespeichert, der Schalter steht auf aus, ein Hinweis zeigt den Weg zu den Einstellungen.
- **Voraussetzungen:** S7.
- **Bereiche:** `src/features/alarm-edit/*`, `src/ports/Permissions`, Fake-Adapter.
- **Tests:** T-18 mit einem Fake, der „verweigert“ meldet.
- **Umsetzung:** Das UI-Verhalten wird gegen den Port gebaut.
- **Einschränkung:** Der echte Android-Berechtigungsdialog ist in Expo Go nicht der Dialog der eigenen App. Der echte Adapter und der manuelle Test T-21 wandern deshalb zu F-003 (Development Build).
- **Lokal prüfen und CI:** wie zuvor.
- **Abnahme:** T-18 ist grün. T-21 ist als offener Punkt im F-003-Issue vermerkt.
- **Risiken:** AC-11 wird erst mit F-003 vollständig unter echten Bedingungen geprüft.

## S9: 24 h, Barrierefreiheit, E2E, manuelle Abnahme (F-002 fertig)

- **Ziel:** AC-13 und AC-15, ein End-to-End-Durchlauf und alle manuellen Prüfungen.
- **Voraussetzungen:** S5 bis S8.
- **Bereiche:** Anzeige-Formatierung, Beschriftungen für Bedienungshilfen, `e2e/f002-alarm.yaml`, `docs/quality/manual-checks.md`.
- **Tests:**
  - T-14, T-15
  - T-20 mit Maestro
  - T-22, T-23, T-24 manuell
- **Umsetzung:** feste 24-h-Formatierung, Beschriftungen, Maestro-Ablauf.
- **Lokal prüfen:**
  - `npm run check`
  - `npm run e2e`
  - manuelle Checkliste auf dem Android-12-Handy und im aktuellen Emulator
- **CI:** Pflicht-Jobs. `e2e.yml` wird einmal manuell ausgelöst.
- **Abnahme:** Die Definition of Done für F-002 ist vollständig erfüllt.
- **Risiken:** Maestro gegen Expo Go ist eventuell umständlich. Dann läuft der E2E-Test gegen eine Debug-APK im Emulator.

## Danach

Für jedes dieser Vorhaben gibt es vorher eine eigene Spezifikations- und Testrunde.

1. **Spike Alarm-Bibliothek** im Development Build. Er prüft endloses Klingeln, Vollbild, Neustart und Lautlos auf Android 12 und im Emulator mit Android 14 und 16. Das Ergebnis kommt in ADR-0002: die Bibliothek, ein eigenes Kotlin-Modul oder Kotlin nativ.
2. F-001 QR-Code erzeugen, anzeigen und teilen.
3. F-003 Klingeln, einschließlich echter Berechtigungen und T-21.
4. F-004 Scan beendet das Klingeln.
5. Erste signierte APK und EAS Update. Damit steht das MVP.
6. F-005 Klingelton-Wahl.
