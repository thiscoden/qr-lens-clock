# F-001 QR-Code erzeugen, anzeigen, teilen

Stand: 2026-09-25 · Status: Entscheidungen gesammelt. Spezifikation, Akzeptanzkriterien und Testmatrix folgen in einer eigenen Runde (Phasen 4 und 5), bevor die Umsetzung beginnt.

## Bestätigte Entscheidungen

- **Erzeugung:** Der Code entsteht, wenn zum ersten Mal ein Wecker aktiviert wird.
- **Anzeige:** Nach jedem Erstellen eines Weckers erscheint derselbe Code, auch nach Löschen und Neuerstellen.
- **Dauerhaftigkeit:** Der Code ist jederzeit einsehbar und exportierbar. Es ist immer derselbe Code.
- **Zugang:** über ein QR-Symbol auf dem Hauptbildschirm.
- **Export:** nur über das Android-Teilen-Menü.
- **PNG-Inhalt:** nur der QR-Code mit weißem Rand, kein Text.
- **Neuinstallation:** Wird die App neu installiert oder werden ihre Daten gelöscht, entsteht ein neuer Code, und der alte Ausdruck wird ungültig. Das ist akzeptiert.
- **Verwendung des PNG:** drucken, als Hintergrundbild nutzen oder anderes. Das ist Sache des Nutzers, die App berücksichtigt es nicht.

## Empfehlungen

- **Inhalt des Codes:** eine zufällige Kennung, eindeutig pro Installation, ohne personenbezogene Daten. Sie wird mit kryptografisch sicherem Zufall erzeugt.
- **Abhängigkeit:** F-001 hängt von F-002 ab, weil der Code beim Aktivieren eines Weckers entsteht.
