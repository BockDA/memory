import "./options.scss";
import optionsTemplate from "./options.html?raw";
import {player} from "./../../settings";

console.log("Starte ts options.ts");

export const themes = [
  {
    id: "theme-A",
    image: "/themes/ThemeVisual_one.png",
  },
  {
    id: "theme-B",
    image: "/themes/ThemeVisual_two.png",
  },
  {
    id: "theme-C",
    image: "/themes/ThemeVisual_three.png",
  },
  {
    id: "theme-D",
    image: "/themes/ThemeVisual_four.png",
  },
];

export function renderOptions(): string {
  //schreibt text in platzhalter
  return optionsTemplate;
}

export function initOptions(): void {
  //const radiobtn = document.querySelectorAll('input[type="radio"]');
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
      console.log("drücken", index);
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


  const activeSelections = Array.from(

    document.querySelectorAll<HTMLInputElement>('input[type="radio"]:checked')
  ).map((radio) => {
    const label = radio.closest("label");
    if (label) setLine(label);

    const selectedName = label?.textContent?.replace(/\s+/g, " ").trim() ?? "";
    return ` ${selectedName}`;
  });

  selectionWrite(activeSelections);

}

function setLine(label: HTMLLabelElement) {
  const img = document.createElement("img");
  img.src = "/images/selectLine.png";
  img.classList.add("theme-img");
  label.appendChild(img);
  label.style.fontWeight = '700';
}

function selectionWrite(activeSelections: string[]): void {
  document.getElementById("theme")!.textContent = activeSelections[0];
  document.getElementById("player")!.textContent = activeSelections[1];
  document.getElementById("boardSize")!.textContent = activeSelections[2];
}


export function writeData(): void {
  console.log("write data wird aufgerufen");

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

}
