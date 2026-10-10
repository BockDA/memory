export interface Player {
    index: number;
    themes: string;
    choosePlayer: "blue" | "orange";
    BoardSize: number;
}

const STORAGE_KEY = "memory-player";
export const player: Player = {
    index: 0,
    themes: "",
    choosePlayer: "blue",
    BoardSize: 16,
};

// Einstellungen überleben einen Reload der Seite (z. B. auf /playfield)
export function savePlayer(): void {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(player));
    } catch {
        // Storage nicht verfügbar – Einstellungen gelten nur bis zum Reload
    }
}

function loadPlayer(): void {
    try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
            Object.assign(player, JSON.parse(stored));
        }
    } catch {
        // ungültige oder fehlende Daten ignorieren, Defaults bleiben
    }
}

loadPlayer();
export interface Theme {
    playerSettings: {
        themeIndex: number;
        theme: string;
        player: string;
        boardSize: number;
    };

    id: number;
    title: string;
    playField: {
        "background": string;
    };

    card: {
        "frontCardIMG": string;
    },

    playerHeader: {
        "backgroundColor": string,
        "borderColor": string,
        "borderRadius": string,
        "fontColor": string,
    };
    playerSection: {
        "backgroundColor": string,
        "borderColor": string,
        "borderRadius": string,
        "fontColorPlayer": string,
        "fontColoropponent": string,
        "imagePlayerOne": string,
        "imagePlayerTwo": string,
        "fontSize": string,
    };

    playerCurrent: {
        "fontColor": string,
        "image": string,
        "fontSize": string,
        "fontWight": number,
    };

    exitGameButton: {
        "backgroundColor": string,
        "borderColor": string,
        "borderRadius": string,
        "fontColor": string,
        "fontSize": string,
        "fontWight": number,
        "borderWidth": string,
        "popupButtonBorderRadius": string,
    }
}
