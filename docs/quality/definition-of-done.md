# Definition of Done

Stand: 2026-09-25 · Status: bestätigt

Ein Feature oder Schritt ist erst fertig, wenn alle Punkte erfüllt sind:

1. Alle betroffenen Akzeptanzkriterien sind erfüllt und im Pull Request einzeln mit Test-ID oder manueller Prüfung nachgewiesen.
2. Alle in der Testmatrix vorgesehenen automatisierten Tests existieren und bestehen.
3. Alle CI-Pflichtprüfungen sind grün: Formatierung, Lint, Typen, Tests inkl. Kontrast, Bundle, Android-Build.
4. Keine Prüfung wurde deaktiviert, übersprungen oder abgeschwächt, weder mit `.skip` oder `.only` noch mit `eslint-disable`, `@ts-ignore`, `any`, gesenkten Schwellen oder `--no-verify`. Ausnahmen gibt es nur mit Begründung und Issue-Link im Pull Request.
5. Die manuellen Prüfungen aus der Testmatrix sind auf dem Android-Gerät (Android 12) und im Emulator (aktuelle Android-Version) durchgeführt und abgehakt.
6. Relevante Plattformunterschiede sind berücksichtigt, etwa das Berechtigungsverhalten je Android-Version.
7. Feature-Spezifikation, ADRs, manuelle Checkliste und bei Bedarf CLAUDE.md sind aktualisiert.
8. Hat der Schritt die UI-Abläufe geändert, lief der E2E-Ablauf lokal erfolgreich.
9. Der Pull Request ist per Selbst-Review freigegeben: Diff und Checkliste sind geprüft, die CI ist grün. Danach folgt der Squash-Merge nach `main`.
