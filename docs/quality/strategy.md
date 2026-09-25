# Qualitätsstrategie

Stand: 2026-09-25 · Status: bestätigt

## Prüfungen

| Prüfung | Werkzeug | Erzwungen durch |
|---|---|---|
| Formatierung | Prettier `--check` | Pre-commit-Hook und CI |
| Linting | ESLint (Expo-Konfiguration, react-hooks, Import-Grenzen, Barrierefreiheits-Plugin, Verbots-Regeln) | Pre-commit-Hook und CI |
| Statische Typen | `tsc --noEmit`, `strict: true`, kein `any` | CI |
| Unit-Tests | Jest, fast-check | Pre-push-Hook und CI |
| Komponententests | Jest, @testing-library/react-native, Fakes | Pre-push-Hook und CI |
| Integrationstests | Jest mit echten Adaptern und dem offiziellen AsyncStorage-Test-Ersatz | Pre-push-Hook und CI |
| Kontrast | Ein Unit-Test berechnet den WCAG-Kontrast aller Farb-Token-Paare: mindestens 4,5:1 für Text, 3:1 für große Ziffern | CI |
| Build | `expo export --platform android` bei jedem Pull Request; APK-Build bei nativen Änderungen | CI |
| End-to-End | Maestro | lokal, CI optional |
| Manuell visuell | [Checkliste](manual-checks.md) | Haken in der PR-Vorlage |
| Barrierefreiheit | Beschriftungen per Komponententest; TalkBack und 200 % Schrift manuell | CI und Checkliste |

## Teststruktur

| Ebene | Ort |
|---|---|
| Unit | `src/domain/**/*.test.ts` |
| Komponente | `src/features/**/*.test.tsx`, `src/ui/**/*.test.tsx` |
| Integration | `src/adapters/**/*.test.ts` |
| Test-Ersatz | `test/fakes/` |
| E2E | `e2e/*.yaml` |
| Manuell | [manual-checks.md](manual-checks.md) |

## Grundsätze

- Tests prüfen fachliches Verhalten aus den Akzeptanzkriterien, nicht interne Implementierung und nicht nur einzelne Beispielwerte.
- Der größte Teil der Fälle liegt auf der günstigsten Ebene, die das Verhalten nachweisen kann (meist Unit). E2E bleibt auf einen Durchlauf pro Feature beschränkt.
- Tests sind deterministisch: feste Uhr, Zeitzone `Europe/Berlin`, fester Zufalls-Seed, keine Netzaufrufe.
- Der Standard ist Test-Ersatz über Ports (Fakes). Interne Module werden nicht gemockt.
- Ein Test zu einem Akzeptanzkriterium wird vor der Umsetzung geschrieben und muss zuerst fehlschlagen.
