# Technische Anforderungen

Stand: 2026-09-25 · Status: bestätigt

## Funktional-technisch

| ID | Anforderung | Feature |
|---|---|---|
| TA-01 | Exakter täglicher Alarm (Berechtigung für exakte Alarme ab Android 12) | F-002, F-003 |
| TA-02 | Der Alarm geht auch bei geschlossener oder weggewischter App los und nach einem Neustart, ohne dass die App geöffnet wird | F-003 |
| TA-03 | Endloser Ton bis zum gültigen Scan, über die Alarm-Lautstärke, auch bei Lautlos und „Nicht stören“ | F-003 |
| TA-04 | Vollbild über dem Sperrbildschirm beim Klingeln, sofort scanbereit (ab Android 14 muss die Berechtigung eventuell von Hand erteilt werden) | F-003 |
| TA-05 | QR-Scan mit der Kamera, Kamera-Berechtigung | F-004 |
| TA-06 | QR-Code als PNG erzeugen, über das Teilen-Menü exportieren | F-001 |
| TA-07 | Lokale Speicherung: ein Wecker, eine Zufalls-ID | F-001, F-002 |
| TA-08 | Schrift Cascadia Mono eingebettet, OFL-Lizenztext wird mitgeliefert | alle |

## Nichtfunktional

| ID | Anforderung |
|---|---|
| NF-01 | Offline. Einzige Netzverbindung ist der Abruf von Live-Updates. |
| NF-02 | Barrierefreiheit wie in der F-002-Spezifikation: TalkBack, Schriftgröße, Kontrast. |
| NF-03 | Die Klingel-Ansicht ist spätestens etwa 2 Sekunden nach der Weckzeit sichtbar, der Scanner sofort bereit. |
| NF-04 | Die Scroll-Räder laufen flüssig, sonst gibt es keine besonderen Animationen. |

## Plattform

- Nur Android im MVP, **ab Android 12 (API 31)**. Das eigene Gerät läuft mit Android 12.
- Verhalten von Android 13 bis 16 wird im Emulator geprüft: Benachrichtigungs-Berechtigung und die Vollbild-Einschränkung ab 14.
- Keine Webversion.
- iOS später als separates natives Projekt.

## Datenschutz und Sicherheit

- Keine personenbezogenen Daten, kein Konto, keine Synchronisation, keine externe API.
- Der QR-Code enthält nur eine zufällige Kennung.
- Drittanbieter: Expo (EAS Update) für Live-Updates.

## Offene technische Risiken

Siehe [open-questions.md](open-questions.md).
