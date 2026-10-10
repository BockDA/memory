<div align="center">

# 🃏 Memory

**Ein Memory-Kartenspiel für zwei Spieler – gebaut mit TypeScript, SCSS und Vite, ganz ohne Framework.**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

### [▶️ Live spielen](https://christian-bock.developerakademie.net/Projekte/memory/)

</div>

---

## 📖 Über das Projekt

Zwei Spieler – **Blau** und **Orange** – decken abwechselnd je zwei Karten auf.
Wer ein passendes Paar findet, bekommt einen Punkt und darf weiterspielen.
Passen die Karten nicht zusammen, werden sie wieder umgedreht und der andere Spieler ist dran.
Sind alle Paare gefunden, gewinnt der Spieler mit den meisten Punkten.

Das Projekt ist im Rahmen einer **Weiterbildung** entstanden. Der Schwerpunkt liegt darauf,
eine Single Page Application mit reinem TypeScript zu verstehen: DOM-Manipulation,
eigener Router, Spiellogik und themenbasiertes Styling.

## 🎨 Themes

<table>
  <tr>
    <td align="center"><img src="public/themes/ThemeVisual_one.png" width="320" alt="Code vibes theme" /><br /><b>Code vibes</b></td>
    <td align="center"><img src="public/themes/ThemeVisual_two.png" width="320" alt="Gaming theme" /><br /><b>Gaming</b></td>
  </tr>
</table>

Weitere Themes (*DA Projects*, *Foods*) sind vorbereitet, aber noch nicht freigeschaltet.

## ✨ Features

- 👥 **Zwei Spieler** an einem Gerät, mit Punkteanzeige und Anzeige des aktuellen Spielers
- 🎨 **Zwei Themes** mit eigenen Farben, Kartenmotiven und Spielerfiguren
- 🔢 **Drei Spielfeldgrößen:** 16, 24 oder 36 Karten
- 📐 **Responsive Spielfeld:** Die Karten passen sich der Fensterhöhe an
- 🏆 **Endbildschirme** für Sieg, Unentschieden und Game over
- 🚪 **Exit-Dialog** mit Sicherheitsabfrage, um ein laufendes Spiel zu verlassen
- 💾 **Einstellungen bleiben erhalten**, auch wenn die Seite neu geladen wird

## 🚀 Installation & Start

**Voraussetzung:** [Node.js](https://nodejs.org/) (empfohlen: Version 20 oder neuer)

```bash
# Repository klonen
git clone https://github.com/BockDA/memory.git
cd memory

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Danach ist das Spiel unter **http://localhost:5173/Projekte/memory/** erreichbar.

> [!NOTE]
> Der Pfad `/Projekte/memory/` kommt aus der Einstellung `base` in `vite.config.ts`
> (siehe [Deployment](#-deployment-per-ftp)). `http://localhost:5173` allein zeigt keine Seite.

### Verfügbare Befehle

| Befehl            | Beschreibung                                               |
| ----------------- | ---------------------------------------------------------- |
| `npm run dev`     | Startet den Entwicklungsserver mit automatischem Neuladen  |
| `npm run build`   | Prüft die Typen und erstellt eine optimierte Version in `dist/` |
| `npm run preview` | Zeigt die gebaute Version aus `dist/` lokal an             |

## 🌐 Deployment per FTP

Nach dem Build besteht das Spiel nur aus statischen Dateien (HTML, CSS, JavaScript, Bilder).
Ein normaler Webspace mit Apache reicht aus, ein Node.js-Server ist nicht nötig.

1. **Bauen:**
   ```bash
   npm run build
   ```
2. **Hochladen:** Den **Inhalt** des Ordners `dist/` per FTP (z. B. mit FileZilla)
   in den Zielordner auf dem Server kopieren – inklusive der versteckten Datei `.htaccess`.
3. **Aufrufen:** `https://<deine-domain>/Projekte/memory/`

### In einem anderen Ordner veröffentlichen

Das Spiel ist für den Unterordner `/Projekte/memory/` eingerichtet.
Für einen anderen Ort müssen **zwei Stellen** gleich angepasst werden:

| Datei              | Einstellung                      |
| ------------------ | -------------------------------- |
| `vite.config.ts`   | `base: '/Projekte/memory/'`      |
| `public/.htaccess` | `RewriteBase /Projekte/memory/`  |

Liegt das Spiel direkt an der Domain-Wurzel, ist in beiden Dateien `/` einzutragen.

### Warum die `.htaccess` nötig ist

Der Router ändert die Adresse (z. B. auf `/Projekte/memory/options`), ohne dass dafür eine Datei
auf dem Server existiert. Beim Neuladen (F5) würde der Server deshalb mit **404** antworten.
Die `.htaccess` sorgt dafür, dass in diesem Fall `index.html` ausgeliefert wird –
der Router zeigt dann die richtige Seite an.

## 🗂️ Projektstruktur

```
memory/
├── index.html               # Einstiegspunkt der App (inkl. Favicon)
├── vite.config.ts           # Vite-Einstellungen, u. a. Basis-Pfad für den Server
├── public/                  # Bilder, Fonts und Theme-Grafiken (unverändert nach dist/)
│   └── .htaccess            # Server-Regel: Unterseiten liefern index.html aus
└── src/
    ├── main.ts              # Startet die App und fängt Link-Klicks ab
    ├── router.ts            # Eigener Router (History API)
    ├── settings.ts          # Spielereinstellungen und Theme-Interface
    ├── style.scss           # Globale Styles
    ├── assets/JSON/
    │   ├── cards.json       # Kartenmotive pro Theme
    │   └── theme.json       # Farben und Bilder pro Theme
    ├── pages/
    │   ├── home/            # Startseite
    │   └── options/         # Auswahl von Theme, Spieler und Spielfeldgröße
    ├── playfield/
    │   ├── playfield.ts     # Aufbau des Spielfelds und der Karten
    │   └── gameLogic.ts     # Spielregeln, Punkte und Spielerwechsel
    ├── endscreen/           # Winner-, Draw- und Game-over-Bildschirm
    └── styles/              # SCSS-Variablen, Mixins und Typografie
```

## 🛠️ Technischer Überblick

- **Kein Framework:** Die Seiten werden als HTML-Templates geladen (`?raw`-Import von Vite)
  und per `innerHTML` in die Seite eingesetzt.
- **Eigener Router:** `router.ts` ordnet jedem Pfad eine Render- und eine Init-Funktion zu
  und nutzt die History API (`pushState` / `popstate`) für die Navigation ohne Neuladen.
  Den Basis-Pfad liest er aus `import.meta.env.BASE_URL`, damit die App auch in einem
  Unterordner läuft.
- **Relative Bildpfade:** Bilder in Templates, TypeScript und JSON werden ohne führenden `/`
  angegeben (`images/…`), damit sie unabhängig vom Ordner auf dem Server gefunden werden.
- **Themes über JSON:** Farben und Bilder stehen in `theme.json` und werden zur Laufzeit
  als CSS-Variablen gesetzt. Dadurch braucht jedes Theme kein eigenes Stylesheet.
- **Spiellogik getrennt vom Aufbau:** `playfield.ts` erzeugt die Karten,
  `gameLogic.ts` entscheidet über Treffer, Punkte und das Spielende.

## 👤 Autor

**BockDA** – [github.com/BockDA](https://github.com/BockDA)

---

<div align="center">
<sub>Entstanden im Rahmen einer Weiterbildung zum Thema Webentwicklung.</sub>
</div>
