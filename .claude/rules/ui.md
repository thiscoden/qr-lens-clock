---
paths:
  - "app/**"
  - "src/features/**"
  - "src/ui/**"
---

# Regeln für die UI

- `app/` enthält nur Bildschirm-Verdrahtung. Logik gehört in `src/domain`, Zustand und Abläufe in Hooks unter `src/features/`.
- Farben, Schriftgrößen und Abstände kommen nur aus `src/ui/theme.ts`. Keine Farbwerte direkt im Code.
- Die Optik folgt VS Code Dark+ im Code-Look, immer dunkel. Texte sind normale Sprache, keine Code-Syntax wie `//`. Schrift: Cascadia Mono.
- Uhrzeiten werden immer im 24-h-Format angezeigt, unabhängig von der Systemeinstellung.
- Jedes bedienbare Element hat `accessibilityRole` und `accessibilityLabel`. Gesten wie Wischen brauchen eine gleichwertige Bedienungshilfen-Aktion.
- Die Systemschriftgröße wird respektiert, `allowFontScaling` wird nicht abgeschaltet.
