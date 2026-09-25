# ADR-0001: Expo Development Build mit TypeScript für das Android-MVP

- **Status:** angenommen (2026-09-25)
- **Entscheidende Person:** Projektinhaber, erarbeitet mit Claude Code

## Kontext

- Lernprojekt. Vorhanden sind ein Windows-PC und ein Android-Handy (Android 12). Kein Mac, kein iPhone. Budget 0 €.
- Strenger Wecker:
  - Klingeln endlos bis zum QR-Scan,
  - Vollbild über dem Sperrbildschirm,
  - funktioniert nach einem Neustart,
  - klingelt auch bei Lautlos und „Nicht stören“.
- Live-Updates für Bekannte sind ausdrücklich gewünscht.
- iOS gehört nicht zum MVP. Es kommt später als separates natives Projekt mit denselben Testfällen.
- Ausgangswunsch des Nutzers: Expo mit TypeScript, Start und Verteilung über Expo Go.

## Recherche-Ergebnisse (Stand 2026-09-25, Expo SDK 57)

**Nur Expo Go reicht nicht:**
- Endloses Klingeln und Vollbild über dem Sperrbildschirm sind unmöglich.
- Exakte Alarme, das Weiterlaufen nach einem Neustart und das Klingeln bei Lautlos sind unzuverlässig, weil in Expo Go das Manifest und der Benachrichtigungskanal der Expo-Go-App gelten.
- QR-Scan, QR-PNG mit Teilen, Schrift und AsyncStorage funktionieren dagegen in Expo Go.

**Verteilung über Expo Go ist praktisch ausgeschlossen:**
- iOS verlangt seit SDK 57 dasselbe Expo-Konto auf beiden Seiten.
- EAS Update lädt in Expo Go nur eigene Projekte.
- Auf Android funktioniert es nur, solange der eigene Entwicklungsserver läuft.

**iOS, unabhängig vom Framework:**
- AlarmKit (iOS 26) zeigt immer einen System-Stopp-Knopf.
- Ein eigenes Vollbild über dem Sperrbildschirm ist nicht möglich.
- Eine dauerhafte Installation und die Verteilung kosten 99 $ pro Jahr.

**Android:** alles kostenlos machbar.

Quellen: docs.expo.dev (notifications, camera, svg, captureRef, async-storage, local-app-development), expo.dev/changelog (SDK 57, Expo Go Login, Expo Go Loading Changes Mai 2026), developer.android.com (Android 14 Behavior Changes), developer.apple.com (AlarmKit, WWDC25 „Wake up to the AlarmKit API“).

## Entscheidung

- **Expo mit React Native und TypeScript** (`strict`), eine Codebasis, Paketmanager npm.
- **F-001 und F-002** werden zunächst in Expo Go entwickelt.
- **Ab F-003** läuft die App als eigener Android-Build (Development Build/APK) mit einer Alarm-Bibliothek.
  - Kandidat ist `react-native-alarm-scheduler`.
  - Vorher bestätigt ein Spike die Eignung, das Ergebnis kommt in ADR-0002.
  - Rückfalloption: ein eigenes Kotlin-Modul über die Expo Modules API.
- **Verteilung:** einmal eine signierte APK, danach Live-Updates über EAS Update. Die Updates werden über die Runtime-Version an den nativen Stand gebunden.
- **iOS:** ein separates natives Projekt, das später Spezifikationen, Akzeptanzkriterien und die Blackbox-E2E-Abläufe (Maestro) wiederverwendet.

## Verworfene Optionen

| Option | Grund |
|---|---|
| Nur Expo Go | Kann F-003 (Kern-Wecker) nicht umsetzen. |
| Kotlin nativ | Am zuverlässigsten und nah an Java, aber keine kostenlosen Live-Updates. Diese sind Nutzerwunsch. |
| Flutter | Kein Vorteil gegenüber Expo bei Live-Updates. Code mit iOS zu teilen ist irrelevant, weil iOS separat nativ wird. |
| React Native CLI, .NET MAUI, NativeScript, Ionic/Capacitor, Kotlin Multiplatform | Keine passende Alarm-Unterstützung, keine Live-Updates oder mehr Aufwand ohne Nutzen. |

## Konsequenzen

**Vorteile:**
- Live-Updates
- eine Sprache
- schneller Start in Expo Go
- gute Werkzeuge unter Windows

**Nachteile:**
- Abhängigkeit von Expo/EAS (Konto, Grenzen des kostenlosen Kontingents, Regeländerungen).
- Abhängigkeit von einer Alarm-Bibliothek eines Drittanbieters.
- TypeScript und React sind für den Nutzer neu.
- Die Runtime-Version muss verwaltet werden.
- Mit iOS wird kein Code geteilt.

## Revisionsauslöser

- Die Alarm-Bibliothek fällt im Spike durch: Dann wird ein eigenes Kotlin-Modul in Expo geschrieben. Scheitert auch das, folgt ein neuer ADR mit Kotlin nativ.
- Live-Updates werden nicht mehr gewünscht: Dann wird Kotlin nativ neu bewertet.
- Expo ändert das kostenlose Kontingent oder seine Regeln gravierend: Dann wird neu bewertet.
