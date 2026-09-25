# F-002 Wecker stellen

Stand: 2026-09-25 · Status: Spezifikation, Akzeptanzkriterien und Testmatrix bestätigt

## Spezifikation

**Nutzerziel:** Eine tägliche Weckzeit festlegen, ändern, ein- und ausschalten oder löschen.

**Auslöser:**
- Tippen auf „+“ erstellt einen neuen Wecker.
- Tippen auf den Listeneintrag ändert den Wecker.
- Der Schalter schaltet ein oder aus.
- Wischen löscht.

**Voraussetzungen:** Die App ist installiert. Für den Zustand „an“ sind die Android-Berechtigungen erteilt.

### Zustände des Hauptbildschirms

- **Kein Wecker:** „--:--“ (dünn, Cascadia Mono), ein Hinweis zum Tippen und „+“ im Rechteck.
- **Wecker vorhanden:** Eine vertikale Liste mit genau einem Eintrag: Weckzeit hh:mm groß und ein An/Aus-Schalter. „+“ ist ausgeblendet.

### Normaler Ablauf: Wecker erstellen

1. „+“ antippen. Die Bearbeitungsansicht öffnet sich, die Räder stehen auf **04:30**, die Restzeit steht darunter.
2. Räder drehen. Die Restzeit aktualisiert sich sofort.
3. „Speichern“ tippen. Der Eintrag erscheint, der Wecker ist **an**.

### Alternative Abläufe

- **Ändern:** Eintrag antippen. Die Räder zeigen die aktuelle Weckzeit, die Restzeit ist sichtbar. Nach „Speichern“ bleibt der An/Aus-Zustand unverändert.
- **Ein- und Ausschalten:** Per Schalter, sofort wirksam, ohne Bearbeitungsansicht.
- **Löschen:** Eintrag zur Seite wischen, dann erscheint eine Rückfrage.
  - Bestätigen führt zum Leerzustand.
  - Ablehnen lässt alles unverändert.
  - Löschen ist zusätzlich ohne Wischgeste als Bedienungshilfen-Aktion erreichbar.
- **Weckzeit gleich der aktuellen Minute:** Beim Speichern oder Einschalten zeigt die Restzeit 00:00, und der Wecker klingelt sofort. Das Klingeln selbst gehört zu F-003.

### Abbruch

- „Abbrechen“ oder die Zurück-Taste verwirft ungespeicherte Änderungen ohne Rückfrage.
- Wird das Neu-Erstellen abgebrochen, entsteht kein Wecker.

### Leer-, Lade- und Fehlerzustände

- **Leer:** siehe „Kein Wecker“.
- **Laden:** Der gespeicherte Wecker ist beim App-Start sofort sichtbar. Es gibt keinen Lade-Indikator, weil die Daten lokal liegen.
- **Berechtigung verweigert:** Der Wecker bleibt gespeichert, der Schalter steht auf aus. Ein verständlicher Hinweis zeigt den Weg zu den Einstellungen.
- **Lokales Speichern fehlgeschlagen:** Ein Hinweis erscheint, der vorherige Stand bleibt.

### Daten und Eingaben

- Stunde 0–23, Minute 0–59. Die Eingabe läuft nur über die Räder, ungültige Eingaben sind nicht möglich.
- Zustand an oder aus.
- Immer 24-h-Format, unabhängig von der Systemeinstellung.

### Sichtbare Ergebnisse

- Weckzeit hh:mm
- Schalterzustand
- Restzeit hh:mm (nur in der Bearbeitungsansicht)

### Restzeit-Regeln

- Restzeit = Weckzeit minus aktuelle Zeit, mit Übertrag über Mitternacht. Beispiel: 23:30 und Weckzeit 07:00 ergibt 07:30.
- Gleiche Minute ergibt 00:00. Angebrochene Minuten werden **aufgerundet**: um 06:59:30 bei Weckzeit 07:00 zeigt die Restzeit 00:01. 00:00 erscheint erst ab 07:00:00.
- In Nächten mit Zeitumstellung zeigt die Restzeit die **echte verbleibende Dauer**.
- Fällt die Weckzeit in die übersprungene Stunde (März), verschiebt sie sich um die fehlende Stunde nach vorn. Beispiel: 02:30 wird zu 03:30. Das Klingelverhalten gehört zu F-003.

### Persistenz

Der Wecker bleibt nach dem Schließen und nach einem Neustart der App erhalten.

### Datenschutz und Sicherheit

- Alles liegt lokal. Es gibt keine Netzverbindung und keine personenbezogenen Daten.
- Keine besonderen Sicherheitsanforderungen (kein Konto, kein Server).

### Barrierefreiheit

- TalkBack liest Weckzeit und Schalterzustand vor, z. B. „Weckzeit 04:30, an“.
- Die Räder sind mit TalkBack bedienbar.
- Löschen funktioniert auch ohne Wischgeste.
- Der Kontrast reicht trotz dünner Schrift, das prüft ein automatischer Test.
- Die Systemschriftgröße wird berücksichtigt.

### Gestaltung

Code-Look nach VS Code Dark+, immer dunkel, normale Texte ohne Code-Syntax.

| Element | Farbe |
|---|---|
| Hintergrund | `#1E1E1E` |
| Ziffern der Weckzeit | `#B5CEA8` |
| „:“ und „--:--“ | `#D4D4D4` |
| „+“ und Schalter | `#569CD6` |
| Restzeit und Hinweise | `#6A9955` |
| Warnungen | `#CE9178` |

Farben mit zu wenig Kontrast werden leicht aufgehellt, die Abweichung wird dokumentiert.

### Plattformunterschiede

- Nur Android, ab Android 12 (API 31).
- Ab Android 12 braucht die App die Berechtigung für exakte Alarme, ab Android 13 die Berechtigung für Benachrichtigungen.
- In Expo Go gelten die Berechtigungen der Expo-Go-App. Deshalb lässt sich AC-11 dort nur mit Test-Ersatz prüfen. Der echte Test (T-21) folgt mit F-003 im Development Build.

### Ausdrücklich ausgeschlossen

- Klingeln (F-003)
- QR-Anzeige nach dem ersten Aktivieren (F-001)
- Klingelton-Wahl (F-005)
- mehrere Wecker
- Wochentage
- Snooze

## Akzeptanzkriterien

| ID | Gegeben | Wenn | Dann |
|---|---|---|---|
| AC-01 | kein Wecker | die App geöffnet wird | erscheinen „--:--“, ein Tipp-Hinweis und der „+“-Knopf |
| AC-02 | kein Wecker | „+“ angetippt wird | öffnet sich die Bearbeitungsansicht mit Rädern auf 04:30 und sichtbarer Restzeit |
| AC-03 | die Bearbeitungsansicht | die Räder gedreht werden | zeigt die Restzeit die Differenz bis zur gewählten Zeit (z. B. 23:30 bis 07:00 ergibt 07:30; 06:00 bis 07:15 ergibt 01:15) |
| AC-04 | die Bearbeitungsansicht eines neuen Weckers | „Speichern“ gedrückt wird | erscheint genau ein Eintrag mit der gewählten Zeit und Schalter an; „+“ verschwindet; die Restzeit ist nicht mehr sichtbar |
| AC-05 | die Bearbeitungsansicht | „Abbrechen“ oder Zurück gedrückt wird | bleibt der vorherige Stand unverändert |
| AC-06 | ein vorhandener Wecker | der Eintrag angetippt, die Zeit geändert und gespeichert wird | zeigt der Eintrag die neue Zeit; der An/Aus-Zustand ist unverändert |
| AC-07 | ein eingeschalteter Wecker | der Schalter betätigt wird | ist der Wecker aus (und umgekehrt); die Zeit ist unverändert |
| AC-08 | ein vorhandener Wecker | der Eintrag weggewischt und die Rückfrage bestätigt wird | erscheint der Leerzustand |
| AC-09 | ein vorhandener Wecker | der Eintrag weggewischt und die Rückfrage abgelehnt wird | bleibt der Wecker unverändert |
| AC-10 | die aktuelle Zeit 07:00 | die Weckzeit 07:00 eingestellt ist | zeigt die Restzeit 00:00 |
| AC-11 | eine nötige Berechtigung ist verweigert | der Wecker gespeichert oder eingeschaltet wird | bleibt der Wecker gespeichert, der Schalter steht auf aus, und ein verständlicher Hinweis mit Weg zu den Einstellungen erscheint |
| AC-12 | ein gespeicherter Wecker | die App beendet und neu geöffnet wird | sind Zeit und Zustand unverändert |
| AC-13 | die Systemeinstellung 12 h | die Weckzeit angezeigt wird | erscheint sie im 24-h-Format ohne AM/PM |
| AC-14 | ein vorhandener Wecker | der Hauptbildschirm angezeigt wird | ist „+“ nicht sichtbar und kein zweiter Wecker anlegbar |
| AC-15 | TalkBack ist aktiv | der Eintrag fokussiert wird | werden Weckzeit und Zustand vorgelesen; Löschen ist ohne Wischgeste erreichbar |
| AC-16 | eine Nacht mit Zeitumstellung | die Restzeit angezeigt wird | entspricht sie der tatsächlich verbleibenden Dauer bis zur Weckzeit |

## Testmatrix

### Ebenen-Strategie

- **Unit:** Restzeit-Rechnung und Wecker-Regeln. Hier liegen die meisten Fälle. Die Tests prüfen Eigenschaften, nicht nur einzelne Beispielwerte.
- **Komponente:** sichtbares Verhalten der Bildschirme. Uhr, Speicherung und Berechtigung werden durch Test-Ersatz ausgetauscht.
- **Integration:** Speicher-Adapter, Berechtigungs-Ergebnis, Fehlerpfade.
- **E2E:** ein einziger Durchlauf auf dem Android-Emulator. E2E-Tests sind wartungsintensiv, deshalb bleibt es bei einem.
- **Manuell:** echter Berechtigungsdialog, Optik, TalkBack, Schriftgröße.
- **Nicht relevant:** Netzwerk, weil die App kein Netz nutzt. iOS ist nicht Teil des MVP.

### Matrix

| Test-ID | AC | Ebene | Ausgangszustand | Aktion | Erwartet | Prio | Auto/Man | Plattform | Testdaten/Mocks |
|---|---|---|---|---|---|---|---|---|---|
| T-01 | AC-03, AC-10 | Unit | feste Uhrzeit | Restzeit für die Paare 06:00→07:15, 23:30→07:00 und 07:00→07:00 berechnen | 01:15, 07:30, 00:00 | P1 | auto | – | kontrollierte Uhr |
| T-02 | AC-03, AC-10 | Unit (Eigenschaft) | zufällige Zeit und Weckzeit | Restzeit berechnen | immer 0 ≤ R < 24 h; jetzt + R trifft die Weckzeit; R = 0 genau bei gleicher Minute | P1 | auto | – | fast-check mit festem Seed |
| T-03 | AC-03 | Unit (Grenzfall) | um Mitternacht | Weckzeit 00:00 um 23:59; Weckzeit 23:59 um 00:00 | 00:01; 23:59 | P1 | auto | – | kontrollierte Uhr |
| T-04 | AC-16 | Unit (Grenzfall) | Umstellungsnacht Europe/Berlin (März, Oktober) | Restzeit berechnen | echte Dauer (z. B. März, 23:00 bis 07:00 ergibt 07:00) | P1 | auto | – | Zeitzone und Datum fest |
| T-05 | AC-06, AC-07, AC-14 | Unit | Wecker vorhanden | ändern / umschalten / zweiten anlegen | Zustand bleibt / Zeit bleibt / abgelehnt | P1 | auto | – | – |
| T-06 | AC-01 | Komponente | kein Wecker | Hauptbildschirm rendern | „--:--“, Hinweis, „+“ | P1 | auto | Android | leere Speicherung |
| T-07 | AC-02 | Komponente | kein Wecker | „+“ tippen | Räder auf 04:30, Restzeit sichtbar | P1 | auto | Android | kontrollierte Uhr |
| T-08 | AC-03 | Komponente | Bearbeitungsansicht offen | Räder ändern | Restzeit aktualisiert sich sofort | P1 | auto | Android | kontrollierte Uhr |
| T-09 | AC-04, AC-14 | Komponente | neuer Wecker in Bearbeitung | Speichern | ein Eintrag, an, „+“ weg, Restzeit weg | P1 | auto | Android | Berechtigung erteilt (Fake) |
| T-10 | AC-05 | Komponente | neuer oder bestehender Wecker in Bearbeitung | Abbrechen, Zurück | vorheriger Stand; bei neuem Wecker kein Wecker | P1 | auto | Android | – |
| T-11 | AC-06 | Komponente | Wecker an | antippen, ändern, speichern | neue Zeit, weiterhin an | P1 | auto | Android | – |
| T-12 | AC-07 | Komponente | Wecker an | Schalter mehrfach schnell betätigen | Endzustand entspricht der Anzahl der Betätigungen, Zeit unverändert | P2 | auto | Android | – |
| T-13 | AC-08, AC-09 | Komponente | Wecker vorhanden | wischen, dann bestätigen / ablehnen | Leerzustand / unverändert | P1 | auto | Android | – |
| T-14 | AC-13 | Komponente | System auf 12 h | Weckzeit anzeigen | 24 h, kein AM/PM | P2 | auto | Android | Gebietsschema en-US |
| T-15 | AC-15 | Komponente | Wecker vorhanden | Beschriftungen für Bedienungshilfen prüfen | „Weckzeit hh:mm, an/aus“; Lösch-Aktion vorhanden | P2 | auto | Android | – |
| T-16 | AC-12 | Integration | Wecker gespeichert | App-Zustand neu laden | Zeit und Zustand identisch | P1 | auto | Android | offizieller AsyncStorage-Test-Ersatz |
| T-17 | – (Fehlerzustand) | Integration | Speicherung schlägt fehl | Speichern | Hinweis, alter Stand bleibt | P2 | auto | Android | Speicherfehler simuliert |
| T-18 | AC-11 | Integration | Berechtigung verweigert | Speichern / Einschalten | gespeichert, Schalter aus, Hinweis mit Weg zu Einstellungen | P1 | auto | Android | Berechtigung „verweigert“ (Fake) |
| T-19 | AC-04 | Integration | neuer Wecker in Bearbeitung | Speichern doppelt schnell tippen | genau ein Wecker | P2 | auto | Android | – |
| T-20 | AC-01, 02, 04, 06, 07, 08, 12 | E2E | frische Installation, Emulator | erstellen, ändern, umschalten, neu starten, löschen | jeweiliges Ergebnis sichtbar | P2 | auto (in CI optional) | Android-Emulator | – |
| T-21 | AC-11 | Manuell | echtes Gerät, Android 12+ | Berechtigung im Systemdialog verweigern, dann erteilen | Verhalten wie AC-11; nach dem Erteilen einschaltbar | P1 | manuell | Android-Gerät | erst mit F-003 (Development Build) |
| T-22 | – (Design) | Manuell visuell | Wecker vorhanden | Ansicht auf kleinem und großem Bildschirm prüfen | Cascadia Mono dünn, lesbar, nichts abgeschnitten | P2 | manuell | Android-Gerät | – |
| T-23 | AC-15 | Barrierefreiheit manuell | TalkBack an | Eintrag, Räder und Löschen bedienen | alles wird vorgelesen und ist bedienbar | P1 | manuell | Android-Gerät | – |
| T-24 | AC-15 | Barrierefreiheit manuell | Systemschrift 200 % | alle Ansichten öffnen | nichts abgeschnitten oder überlappend | P2 | manuell | Android-Gerät | – |
| T-25 | AC-03, AC-10 | Unit (Grenzfall) | 06:59:30, Weckzeit 07:00 | Restzeit berechnen | 00:01 (aufgerundet); 00:00 erst ab 07:00:00 | P1 | auto | – | Uhr mit Sekunden |
| T-26 | AC-16 | Unit (Grenzfall) | März-Umstellungsnacht, Weckzeit 02:30 | Restzeit berechnen | Dauer bis 03:30 | P2 | auto | – | Zeitzone und Datum fest |

**Regression:** F-002 ist das erste Feature, es gibt keine Vorgänger. Ab F-001 läuft bei jeder Änderung die gesamte automatisierte Suite.
