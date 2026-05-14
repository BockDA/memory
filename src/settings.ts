export interface Player {
    index: number;
    themes: string;
    choosePlayer: string;
    BoardSize: number;
}

export const player: Player = {
    index:0,
    themes: "",
    choosePlayer: "",
    BoardSize: 0,
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
        "playerText": string,
        "opponentText": string,
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
        "image": string,
    }
}






