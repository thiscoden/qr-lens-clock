---
paths:
  - "src/domain/**"
---

# Regeln für src/domain

- Nur reine TypeScript-Logik. Keine Imports aus `react`, `react-native`, `expo*`, `@react-native-*` oder anderen Bibliotheken.
- Keine direkten Zugriffe auf `Date.now()`, `Math.random()` oder globale Zustände. Zeit und Zufall kommen als Parameter oder über Ports.
- Für erwartbare Fehler werden Ergebnis-Objekte zurückgegeben (`{ ok: true, value }` oder `{ ok: false, error }`), keine Exceptions.
- Regeln mit vielen möglichen Eingaben, etwa die Restzeit, bekommen Eigenschaftstests mit fast-check (fester Seed) und zusätzlich benannte Grenzfälle.
- Diese Regeln setzt ESLint `no-restricted-imports` in der CI durch.
