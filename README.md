# Messenger App pre Mac

Jednoduchá aplikácia pre Messenger na Mac.

## Ako to skompilovať

### 1. Otvor Terminal a choď do zložky s projektom:
```bash
cd cesta/k/messenger-app
```

### 2. Nainštaluj závislosti (prvýkrát):
```bash
npm install
```
Toto potrvá pár minút - sťahuje to Electron a electron-builder.

### 3. Skompiluj aplikáciu:
```bash
npm run build
```

### 4. Výsledok:
Po kompilácii nájdeš aplikáciu v zložke `dist/`:
- `Messenger.app` - hlavná aplikácia
- `Messenger-1.0.0.dmg` - inštalátor

### Spustenie (bez kompilácie):
Ak len chceš otestovať:
```bash
npm start
```

## Čo aplikácia robí:

✅ Otvára messenger.com v samostatnom okne
✅ Funguje ako normálna Mac aplikácia
✅ Podporuje notifikácie
✅ Externé odkazy otvára v prehliadači
✅ Bezpečnosť - nemôže ísť na cudzie stránky

## Súbory:

- `main.js` - hlavný kód aplikácie (všetky komentáre v slovenčine)
- `package.json` - konfigurácia projektu
- `icon.png` - ikona aplikácie
- `README.md` - tento súbor

## Veľkosť:

Hotová aplikácia bude mať cca 150-200 MB (Electron obsahuje celý Chrome engine).

## Poznámky:

- Prvá kompilácia trvá dlhšie (5-10 minút)
- Ďalšie kompilácie sú rýchlejšie (1-2 minúty)
- Aplikácia funguje len na macOS

____

claude ai generated every single line of code.
