# Manuelle Prüfungen

Diese Checkliste wird vor dem Merge von Features ausgeführt, die sichtbares Verhalten ändern. Das Ergebnis wird im Pull Request abgehakt.

**Geräte:**
- eigenes Android-Handy (Android 12)
- Emulator mit aktueller Android-Version

## F-002 Wecker stellen

| Test-ID | Prüfung | Gerät | Emulator |
|---|---|---|---|
| T-21 | Berechtigung im Systemdialog verweigern, dann erteilen. Verhalten wie AC-11. **Erst mit F-003 im Development Build.** | ☐ | ☐ |
| T-22 | Optik: Cascadia Mono dünn und lesbar, nichts abgeschnitten, auf kleinem und großem Bildschirm | ☐ | ☐ |
| T-23 | TalkBack: Eintrag, Räder und Löschen werden vorgelesen und sind bedienbar | ☐ | ☐ |
| T-24 | Systemschrift auf 200 %: nichts abgeschnitten oder überlappend | ☐ | ☐ |
