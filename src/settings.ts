export interface Player {
    index: number;
    themes: string;
    choosePlayer: "blue" | "orange";
    BoardSize: number;
}

export const player: Player = {
    index: 0,
    themes: "",
    choosePlayer: "blue",
    BoardSize: 16,
};

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
