# Architektur

Stand: 2026-09-25 · Status: bestätigt

## Projektstruktur

```
app/                      Expo-Router-Bildschirme (nur Verdrahtung, keine Logik)
  index.tsx               Hauptbildschirm (Liste / Leerzustand)
  edit.tsx                Bearbeiten (Räder, Restzeit, Speichern/Abbrechen)
  qr.tsx                  QR anzeigen und teilen            (F-001)
  ringing.tsx             Klingel-Bildschirm und Scanner    (F-003/F-004)
src/
  domain/                 reine TS-Logik: Wecker-Regeln, Restzeit, QR-ID-Prüfung
  ports/                  Schnittstellen: Clock, AlarmStore, AlarmScheduler, Permissions, Sharer, IdGenerator
  adapters/               Umsetzungen der Ports (AsyncStorage, Alarm-Bibliothek, expo-sharing, Systemuhr)
  features/<feature>/     Komponenten und Hooks je Feature (alarm-edit, qr, ringing)
  ui/                     Theme-Tokens (Dark+), Schrift, Basiskomponenten (Text, WheelPicker, Switch)
test/fakes/               FakeClock, InMemoryAlarmStore, FakeScheduler, FakePermissions
e2e/                      Maestro-Abläufe (YAML)
assets/fonts/             Cascadia Mono und OFL-Lizenz
```

Die Tests liegen neben dem Code (`*.test.ts` und `*.test.tsx`). Ports werden erst angelegt, wenn ein Feature sie braucht.

## Modulgrenzen (Ports und Adapter)

- `src/domain` importiert nichts aus React, React Native, Expo oder Bibliotheken. Damit ist die Domain auch die Referenz für eine spätere iOS-Portierung.
- `app` und `features` sprechen nur über `ports` mit der Außenwelt.
- `adapters` werden an genau einer Stelle verdrahtet, im Composition Root.
- Durchgesetzt wird das mit ESLint `no-restricted-imports` in der CI.

## Datenfluss und Zustand

- Die einzige Quelle der Wahrheit ist `AlarmStore` (persistiert).
- Ein React-Context mit dem Hook `useAlarm()` hält den geladenen Wecker im Speicher.
- Eine Aktion läuft so ab:
  1. Die Domain-Regel prüft.
  2. Der Store speichert.
  3. Der Scheduler plant den Alarm oder entfernt ihn.
  4. Die UI aktualisiert sich.
- Es gibt keine Zustandsbibliothek.

## Fehlerbehandlung

- Die Domain liefert für erwartbare Fälle Ergebnis-Objekte (`ok` oder `error` mit Grund), keine Exceptions. Beispiele: „Wecker existiert schon“, „Berechtigung fehlt“.
- Adapter fangen technische Fehler ab und übersetzen sie in definierte Fehlerarten.
- Die UI zeigt einen verständlichen Hinweis, der vorherige Zustand bleibt.

## Datenspeicherung

- AsyncStorage mit einem Schlüssel für den Wecker (`{ hour, minute, enabled }`) und einem für die QR-ID.
- Das Format ist versioniert (`schemaVersion`). Jede Formatänderung braucht eine Migrationsfunktion mit Unit-Test.

## API-Schicht

Es gibt kein Backend. Die einzige Netzverbindung ist EAS Update, verwaltet von Expo.

## Plattformspezifischer Code

- Plattformspezifischer Code liegt nur in `src/adapters/`.
- Ab F-003 kommt die Alarm-Bibliothek dazu, als Rückfall ein eigenes Kotlin-Modul über die Expo Modules API.
- F-001 und F-002 bleiben Expo-Go-kompatibel, also ohne eigenen nativen Code.

## Sicherheitsgrenzen

- Keine personenbezogenen Daten.
- Die QR-ID entsteht aus kryptografisch sicherem Zufall und wird nicht aus Gerätedaten abgeleitet.
- Keine Geheimnisse im Repository. Der APK-Signaturschlüssel und das Expo-Token liegen nur in den GitHub-Secrets.
- Nur die nötigen Berechtigungen:
  - exakte Alarme
  - Benachrichtigungen
  - Vollbild
  - Kamera
  - Start nach Neustart

## Konfiguration und Geheimnisse

- Die Expo-Konfiguration liegt in `app.config.ts`.
- Die Runtime-Version für EAS Update ist an den nativen Stand gebunden. So bekommt eine App kein inkompatibles Live-Update.
- Im MVP gibt es keine `.env`-Werte. `.env*` steht in `.gitignore`.
