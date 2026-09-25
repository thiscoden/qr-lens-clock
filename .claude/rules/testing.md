---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "test/**"
  - "e2e/**"
---

# Regeln für Tests

- Jeder Test nennt im `describe`- oder `it`-Titel die Test-ID aus der Testmatrix, z. B. `T-07`, und prüft das zugehörige Akzeptanzkriterium.
- Geprüft wird sichtbares oder fachliches Verhalten. Komponententests fragen Elemente über Rolle, Text oder Beschriftung ab, nicht über Implementierungsdetails.
- Außenwelt wird über Fakes aus `test/fakes/` ersetzt, etwa FakeClock, InMemoryAlarmStore, FakeScheduler und FakePermissions. Interne Module werden nicht gemockt.
- Tests sind deterministisch: feste Uhr, Zeitzone `Europe/Berlin`, fester fast-check-Seed, kein Netz.
- Verboten sind `.skip`, `.only`, Snapshot-Tests als einziger Nachweis eines Verhaltens und Erwartungen, die nur die Umsetzung spiegeln.
- Schlägt ein Test fehl, wird zuerst der Code geprüft. Ein Test wird nur geändert, wenn er nachweislich die Spezifikation falsch abbildet, und das wird im Pull Request begründet.
