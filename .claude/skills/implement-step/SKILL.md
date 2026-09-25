---
name: implement-step
description: Setzt einen Schritt aus docs/process/implementation-plan.md testgetrieben auf einem eigenen Branch um. Zuerst fehlschlagende Tests zu den Akzeptanzkriterien, dann die Umsetzung, dann die lokalen Prüfungen. Verwenden, wenn der Nutzer einen Schritt wie „S2“ umsetzen lassen will.
---

# Schritt testgetrieben umsetzen

## Vorbereitung

1. Lies den Schritt in `docs/process/implementation-plan.md` und die zugehörige Feature-Spezifikation in `docs/features/`. Notiere die betroffenen AC- und Test-IDs.
2. Prüfe die Voraussetzungen: Sind die vorherigen Schritte gemergt? Fehlt etwas, stoppe und melde es.
3. Wechsle auf einen neuen Branch mit `git switch -c feat/F-xxx-<kurz>`, oder `chore/`, `test/` bzw. `spike/`, je nach Schritt. Nie auf `main` arbeiten.

## Zyklus pro Test-ID

1. Schreibe den Test mit der Test-ID im Titel. Er prüft das Verhalten aus dem Akzeptanzkriterium und verwendet Fakes aus `test/fakes/`.
2. Führe ihn aus. **Er muss fehlschlagen**, und zwar aus dem richtigen Grund. Zeige dem Nutzer die entscheidende Zeile der Fehlermeldung.
3. Setze das Minimum um, das den Test grün macht. Beachte dabei die Architekturgrenzen aus `CLAUDE.md` und `.claude/rules/`.
4. Führe die Tests erneut aus und räume auf, solange alles grün bleibt.
5. Committe mit einer Conventional-Commit-Nachricht, z. B. `test(F-002): …` oder `feat(F-002): …`.

## Abschluss

1. Führe `npm run check` aus. Alles muss grün sein. Umgehungen sind verboten, siehe `CLAUDE.md`.
2. Braucht der Schritt manuelle Prüfungen oder E2E-Tests, gib dem Nutzer die konkrete Anleitung. Führe sie nicht als erledigt, solange der Nutzer sie nicht bestätigt hat.
3. Aktualisiere die Doku, wenn sich Entscheidungen ergeben haben, z. B. Spezifikation, ADR oder offene Fragen.
4. Frage vor dem Push nach. Weiter geht es mit dem Skill `prepare-pr`.

## Stopp-Bedingungen

- Eine neue Abhängigkeit wäre nötig: erst nachfragen.
- Die Spezifikation ist unklar oder widersprüchlich: nachfragen, nicht raten.
- Ein Test lässt sich nur durch Aufweichen grün machen: stoppen und die Ursache melden.
