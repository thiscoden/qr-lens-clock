# GitHub- und CI-Workflow

Stand: 2026-09-25 · Status: bestätigt

## Repository

- **Öffentlich.** Branch-Schutz und Actions-Minuten sind dadurch kostenlos.
- **Folge:** Keine persönlichen Daten, Schlüssel oder Tokens im Repository, nur in den GitHub-Secrets.

## Branches und Issues

- Niemals direkt auf `main` arbeiten. Pro Issue gibt es einen Branch:
  - `feat/F-002-wecker-stellen`
  - `fix/123-restzeit-mitternacht`
  - `chore/…`, `docs/…`, `test/…`
  - `spike/alarm-bibliothek`
- Issue-Vorlagen:
  - **Feature:** F-ID, Nutzerziel, Link zur Spezifikation, AC-Liste, Test-IDs.
  - **Fehler:** Schritte, erwartet, tatsächlich, Android-Version, Gerät, App-Version, betroffenes AC.
- Ein Feature darf in mehrere kleine Issues und Pull Requests zerlegt werden.

## Commits

- Conventional Commits auf Englisch, mit der F-ID als Scope. Beispiele: `feat(F-002): show remaining time while editing`, `fix(F-002): …`, `test: …`, `docs: …`, `chore: …`.
- Erzwungen durch commitlint im `commit-msg`-Hook. Die CI prüft zusätzlich den PR-Titel, weil er beim Squash-Merge zur Commit-Nachricht wird.

## Pull-Request-Ablauf

1. Issue anlegen, Branch erstellen, in kleinen Commits arbeiten, pushen.
2. Pull Request öffnen und die Vorlage ausfüllen.
3. Die CI muss grün sein.
4. Selbst-Review: Diff und Checkliste prüfen.
5. Squash-Merge, dann den Branch löschen.

Ein KI-Review ist optional und ersetzt keine Pflichtprüfung.

## Stufe 1: schnelle lokale Prüfungen (Husky, lint-staged)

| Hook | Inhalt |
|---|---|
| `pre-commit` | Prettier und ESLint auf den geänderten Dateien |
| `commit-msg` | commitlint |
| `pre-push` | `tsc --noEmit` und `jest` |

Die Hooks sind Komfort, keine Sicherheit, weil sie sich umgehen lassen. Die CI prüft deshalb alles erneut.

## Stufe 2: vollständige CI (`.github/workflows/ci.yml`)

Läuft bei jedem Pull Request und bei jedem Push auf `main`.

| Job | Inhalt | Pflicht-Status |
|---|---|---|
| `quality` | `npm ci`, Prettier-Check, ESLint, `tsc --noEmit`, PR-Titel-Check | ja |
| `test` | alle Jest-Tests inkl. Kontrast-Test, `TZ=Europe/Berlin`, fester fast-check-Seed | ja |
| `bundle` | `expo export --platform android` | ja |
| `android-build` | `expo prebuild` und Gradle-Debug-APK. Der Build läuft nur bei nativen Änderungen (`app.config.*`, `package.json`, Plugins, native Module), auf `main` immer. Der Job läuft immer und überspringt die Build-Schritte über einen Pfadfilter, damit der Status stets vorhanden ist. | ja |

**Determinismus:**
- feste Node-Version (`.nvmrc`)
- `npm ci` mit Lockfile
- keine Netzaufrufe in Tests
- feste Uhr, Zeitzone und Zufalls-Seeds

Eine KI-Bewertung ist nie eine Pflichtprüfung.

## Stufe 3: optionale E2E (`.github/workflows/e2e.yml`)

- Manuell auslösbar (`workflow_dispatch`), optional nächtlich.
- Android-Emulator auf einem Linux-Runner mit Maestro-Abläufen.
- Kein Pflicht-Status. Vor dem Merge von Features, die UI-Abläufe ändern, lokal ausführen (DoD-Checkliste).

## Stufe 4: Release und Deployment (getrennt von der CI)

- **`release.yml`** läuft beim manuell gesetzten Tag `v*`. Er baut eine signierte Release-APK mit dem Schlüssel aus den Secrets und hängt sie an einen GitHub Release. Von dort geht sie an die Bekannten.
- **`update.yml`** wird manuell auf `main` ausgelöst (`workflow_dispatch`) und veröffentlicht ein EAS Update. Das betrifft nur JavaScript-Änderungen und prüft die Runtime-Version. Ein Update wird nie automatisch bei jedem Merge veröffentlicht.

## Schutzregeln für `main`

- Pull Request erforderlich. Keine direkten Pushes, kein Force-Push, kein Löschen.
- Pflicht-Status: `quality`, `test`, `bundle`, `android-build`.
- Der Branch muss vor dem Merge aktuell sein. Nur Squash-Merge.
- Keine Pflicht-Freigabe durch eine zweite Person. Das Projekt wird allein entwickelt, und GitHub erlaubt keine Selbst-Freigabe.

## Umgang mit fehlgeschlagenen Tests

- Rot bedeutet kein Merge. Der Fix kommt auf denselben Branch.
- Kein `.skip` oder `.only`, keine gesenkten Schwellen, kein „so lange neu starten, bis es grün ist“.
- Ein instabiler Test bekommt ein Fehler-Issue, und die Ursache wird behoben. Vorübergehend deaktivieren ist nur mit Issue-Link und Begründung im Pull Request erlaubt.
- Ein Fehler auf `main` wird sofort mit einem `fix/`-Branch oder einem Revert-PR behoben.

## Datenmigrationen

- Es gibt keine Datenbank.
- Das AsyncStorage-Format hat eine `schemaVersion`. Jede Formatänderung braucht eine Migrationsfunktion und einen Unit-Test von alt nach neu. Die PR-Vorlage fragt das als Haken ab.
