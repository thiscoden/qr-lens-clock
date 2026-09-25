---
name: spec-feature
description: Spezifiziert ein Feature aus dem Backlog (docs/product/backlog.md) im Interview mit dem Nutzer und legt Spezifikation, Akzeptanzkriterien und Testmatrix in docs/features/F-xxx-*.md an. Verwenden, bevor ein neues Feature umgesetzt wird.
---

# Feature spezifizieren

Ziel: eine bestätigte, überprüfbare Spezifikation für genau ein Feature. Es wird kein Code geschrieben.

## Ablauf

1. Lies `docs/product/backlog.md`, `docs/product/product-brief.md`, eine eventuell vorhandene Notizdatei `docs/features/F-xxx-*.md` und `docs/features/F-002-wecker-stellen.md` als Formatvorlage.
2. Nenne dem Nutzer bereits bestätigte Entscheidungen und offene Punkte, getrennt nach bestätigt, Hypothese, Empfehlung und offen.
3. Führe ein Interview mit höchstens vier Fragen pro Runde über AskUserQuestion, mit konkreten Optionen. Keine stillen Annahmen, keine ungefragten Zusatzfeatures. Weise auf Widersprüche hin.
4. Entwirf die Spezifikation mit Nutzerziel, Auslöser, Voraussetzungen, normalem Ablauf, alternativen Abläufen, Abbruch, Leer-, Lade- und Fehlerzuständen, Daten, sichtbaren Ergebnissen, Datenschutz, Sicherheit, Barrierefreiheit, Plattformunterschieden und Ausschlüssen.
5. Formuliere die Akzeptanzkriterien im Format „Gegeben … wenn … dann …“. Sie beschreiben nur beobachtbares Verhalten, keine Implementierung. Die IDs werden pro Feature fortlaufend vergeben.
6. **Warte auf die Bestätigung der Akzeptanzkriterien.**
7. Erstelle die Testmatrix mit den Spalten Test-ID, AC, Ebene, Ausgangszustand, Aktion, Erwartet, Prio, Auto/Man, Plattform und Testdaten/Mocks. Begründe die Wahl der Ebene: die günstigste, die das Verhalten nachweist. Decke Grenzfälle, ungültige Eingaben, fehlende Berechtigungen, leere Zustände, wiederholte Aktionen und Regression ab.
8. **Warte auf die Bestätigung der Testmatrix.**
9. Schreibe die Datei `docs/features/F-xxx-<name>.md` und aktualisiere den Status in `docs/product/backlog.md`. Ergänze bei Bedarf `docs/quality/manual-checks.md` und `docs/process/open-questions.md`.
