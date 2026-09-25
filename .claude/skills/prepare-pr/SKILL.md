---
name: prepare-pr
description: Bereitet einen Pull Request vor. Führt alle lokalen Prüfungen aus, prüft die Definition of Done und füllt die PR-Vorlage mit dem Nachweis zu jedem Akzeptanzkriterium und jeder Test-ID. Verwenden, nachdem ein Schritt umgesetzt ist.
---

# Pull Request vorbereiten

1. Stelle sicher, dass du nicht auf `main` bist und der Branch aktuell zu `main` ist.
2. Führe `npm run check` aus. Ist etwas rot, wird zuerst dieser Fehler behoben. Umgehungen sind verboten.
3. Prüfe den Diff auf verbotene Muster: `.skip`, `.only`, `eslint-disable`, `@ts-ignore`, `any`, gesenkte Schwellen, Geheimnisse, direkte Farbwerte außerhalb von `src/ui/theme.ts` und Framework-Imports in `src/domain`.
4. Prüfe, ob sich native Teile geändert haben: `package.json`, `app.config.*`, Plugins, `modules/`. Wenn ja, vermerke im Pull Request, dass eine neue APK nötig ist.
5. Gehe `docs/quality/definition-of-done.md` Punkt für Punkt durch und markiere, was offen ist, etwa manuelle Prüfungen durch den Nutzer.
6. Fülle `.github/pull_request_template.md` aus:
   - verknüpftes Issue und F-ID,
   - eine Zeile pro Akzeptanzkriterium mit Test-ID oder manueller Prüfung,
   - die ausgeführten Prüfungen mit Ergebnis.
7. Der PR-Titel folgt Conventional Commits, z. B. `feat(F-002): create alarm with wheel picker`.
8. Frage den Nutzer, bevor gepusht wird. Nach dem Push erstellt der Nutzer den Pull Request auf GitHub, oder Claude erstellt ihn, falls `gh` verfügbar ist und der Nutzer zustimmt.
9. Eine KI-Bewertung ersetzt keine Pflichtprüfung. Der Merge erfolgt erst bei grüner CI und nach dem Selbst-Review des Nutzers.
