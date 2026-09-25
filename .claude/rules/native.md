---
paths:
  - "app.config.*"
  - "app.json"
  - "package.json"
  - "src/adapters/**"
  - "modules/**"
  - "plugins/**"
---

# Regeln für nativen Code und Konfiguration

- Plattformspezifischer Code liegt nur in `src/adapters/` und bei Bedarf in `modules/` (eigene Expo-Module).
- Bis F-002 einschließlich muss alles in Expo Go laufen. Keine Bibliothek mit eigenem nativem Code ohne Rückfrage.
- Jede native Änderung braucht eine neue APK, und Live-Updates allein reichen dann nicht. Native Änderungen sind neue native Abhängigkeiten, Config-Plugins, Berechtigungen und Änderungen an `app.config`. Im Pull Request wird das vermerkt, und die Runtime-Version muss sich ändern.
- Nur Berechtigungen, die in `docs/process/architecture.md` aufgeführt sind. Jede neue Berechtigung braucht eine Begründung im Pull Request.
- Keine Geheimnisse in der Konfiguration. Signaturschlüssel und Tokens liegen nur in den GitHub-Secrets.
