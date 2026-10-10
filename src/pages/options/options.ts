import "./options.scss";
import optionsTemplate from "./options.html?raw";
import { player, savePlayer } from "./../../settings";

export const themes = [
  {
    id: "theme-A",
    image: "themes/ThemeVisual_one.png",
  },
  {
    id: "theme-B",
    image: "themes/ThemeVisual_two.png",
  },
  {
    id: "theme-C",
    image: "themes/ThemeVisual_three.png",
  },
  {
    id: "theme-D",
    image: "themes/ThemeVisual_four.png",
  },
];

export function renderOptions(): string {
  return optionsTemplate;
}

export function initOptions(): void {
   const radiobtn = document.querySelectorAll<HTMLLabelElement>("label");
  if (!radiobtn) {
    return;
  }
  radioselect(radiobtn);
  setLineselection();
  initStartButton();
}

function initStartButton(): void {
  const startBtn = document.getElementById("startBtn");
  if (!startBtn) {
    return;
  }

  startBtn.addEventListener("click", () => {
    writeData();
  });
}

function radioselect(radiobtn: NodeListOf<HTMLLabelElement>): void {
  radiobtn.forEach((btn, index) => {
    const radio = btn.querySelector('input[type="radio"]') as HTMLInputElement | null;
    btn.addEventListener("mouseenter", () => {
      if (index > 3) return;
      setpicture(index);
      setThemeHoverLine(btn);
    });

    btn.addEventListener("mouseleave", () => {
      if (index > 3) return;
      setLineselection();
    });

    btn.addEventListener("mousedown", () => {
      if (index <= 3) {
        setpicture(index);
          }
    });
    radio?.addEventListener("change", () => {
      if (index <= 3) setpicture(index);
      setLineselection();
    });
  });
}

function setThemeHoverLine(label: HTMLLabelElement): void {
  document
    .querySelectorAll('input[name="game-theme"]')
    .forEach((radio) => radio.closest("label")?.querySelector(".theme-img")?.remove());
  setLine(label);
}

function setpicture(index: number): void {
  const pic = document.getElementById("picThemes") as HTMLImageElement;
  if (!pic) return;
  pic.src = themes[index].image;
}

function setLineselection() {
  document.querySelectorAll<HTMLLabelElement>("label").forEach((label) => {
    label.style.fontWeight = "400";
  });
  document.querySelectorAll(".theme-img").forEach((image) => image.remove());
  document.querySelectorAll<HTMLInputElement>('input[type="radio"]:checked').forEach((radio) => {
    const label = radio.closest("label");
    if (label) setLine(label);
  });
  selectionWrite();
  updateStartButton();
}

// Der Start-Button ist nur benutzbar, wenn in allen drei Gruppen etwas ausgewählt ist
function updateStartButton(): void {
  const startBtn = document.getElementById("startBtn");
  if (!startBtn) return;
  const allSelected =
    document.querySelector('input[name="game-theme"]:checked') !== null &&
    document.querySelector('input[name="Chooseplayer"]:checked') !== null &&
    document.querySelector('input[name="Boardsize"]:checked') !== null;
  startBtn.classList.toggle("btn--disabled", !allSelected);
}

function setLine(label: HTMLLabelElement) {
  const img = document.createElement("img");
  img.src = "images/selectLine.png";
  img.classList.add("theme-img");
  label.appendChild(img);
  label.style.fontWeight = '700';
}

function selectionWrite(): void {
  writeSelection("game-theme", "theme", "Game theme");
  writeSelection("Chooseplayer", "player", "Player");
  writeSelection("Boardsize", "boardSize", "Board size");
}

// Jede Gruppe wird einzeln geprüft, damit die Auswahl immer im richtigen Feld landet.
// Ist in der Gruppe noch nichts ausgewählt, wird der Platzhalter angezeigt.
function writeSelection(groupName: string, fieldId: string, placeholder: string): void {
  const field = document.getElementById(fieldId);
  if (!field) return;
  const checkedRadio = document.querySelector<HTMLInputElement>(`input[name="${groupName}"]:checked`);
  const label = checkedRadio?.closest("label");
  const selectedName = label?.textContent?.replace(/\s+/g, " ").trim();
  field.textContent = selectedName || placeholder;
}


export function writeData(): void {
  const selectedThemeRadio = document.querySelector<HTMLInputElement>('input[name="game-theme"]:checked');
  const selectedPlayerRadio = document.querySelector<HTMLInputElement>('input[name="Chooseplayer"]:checked');
  const selectedBoardSizeRadio = document.querySelector<HTMLInputElement>('input[name="Boardsize"]:checked');
  const selectedThemeIndex = selectedThemeRadio
    ? Math.max(parseInt(selectedThemeRadio.value.replace("theme-", ""), 10) - 1, 0)
    : 0;
  player.index = selectedThemeIndex;
  player.themes = themes[selectedThemeIndex]?.id || "theme-A";
  player.choosePlayer = selectedPlayerRadio?.value === "2" ? "orange" : "blue";
  const selectedBoardSize = selectedBoardSizeRadio
    ? parseInt(selectedBoardSizeRadio.value, 10)
    : 16;
  player.BoardSize = [16, 24, 36].includes(selectedBoardSize) ? selectedBoardSize : 16;
  savePlayer();
}
