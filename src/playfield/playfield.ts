import "./playfield.scss";
import playfieldTemplate from "./playfield.html?raw";
import { themes } from "../assets/JSON/theme.json";
import type { Theme } from "../settings";
import { player } from "../settings"


export function renderPlayfield(): string {
    console.log("Gebeb dom zurück");
    return playfieldTemplate
}

function writeJSONData(): Theme {
    console.log("aktuller index",player.index);
    
    const theme: Theme = {
        playerSettings: {
            themeIndex: player.index,
            theme: player.themes,
            player: player.choosePlayer,
            boardSize: player.BoardSize,
        },

        id: themes[player.index].id,
        title: themes[player.index].title,

        playField: {
            "background": themes[player.index].playField.backgroundColor,
        },
        playerHeader: {
            "backgroundColor": themes[player.index].playerHeader.backgroundColor,
            "borderColor": themes[player.index].playerHeader.borderColor,
            "borderRadius": themes[player.index].playerHeader.borderRadius,
            "fontColor": themes[player.index].playerHeader.fontColor,
        },
        playerSection: {
            "backgroundColor": themes[player.index].playerSection.backgroundColor,
            "borderColor": themes[player.index].playerSection.borderColor,
            "borderRadius": themes[player.index].playerSection.borderRadius,
            "fontColorPlayer": themes[player.index].playerSection.fontColorPlayer,
            "fontColoropponent": themes[player.index].playerSection.fontColoropponent,
            "playerText": themes[player.index].playerSection.playerText,
            "opponentText": themes[player.index].playerSection.opponentText,
            "imagePlayerOne": themes[player.index].playerSection.imagePlayerOne,
            "imagePlayerTwo": themes[player.index].playerSection.imagePlayerTwo,
            "fontSize": themes[player.index].playerSection.fontSize,
        },
        playerCurrent: {
            "fontColor": themes[player.index].playerCurrent.fontColor,
            "image": themes[player.index].playerCurrent.image,
            "fontSize": themes[player.index].playerCurrent.fontSize,
            "fontWight": themes[player.index].playerCurrent.fontWight,
        },
        exitGameButton: {
            "backgroundColor": themes[player.index].exitGameButton.backgroundColor,
            "borderColor": themes[player.index].exitGameButton.borderColor,
            "borderRadius": themes[player.index].exitGameButton.borderRadius,
            "fontColor": themes[player.index].exitGameButton.fontColor,
            "fontSize": themes[player.index].exitGameButton.fontSize,
            "fontWight": themes[player.index].exitGameButton.fontWight,   
            "borderWidth": themes[player.index].exitGameButton.borderWidth
        }
    }
    console.log("Eintrag von themes", theme);
    return theme;
}



//wird in  routers aufgerufen, wenn die playfield seite aufgerufen wird, um die scss variablen zu setzen
export function writeSCSSVariables(): void {
    const currentTheme = writeJSONData()
    
    const playerImg = document.querySelector(".player-picture") as HTMLImageElement | null;
    if (playerImg) {
        playerImg.src = currentTheme.playerSection.imagePlayerOne;
    }

    const opponentImg = document.querySelector(".opponent-picture") as HTMLImageElement | null;
    if (opponentImg) {
        opponentImg.src = currentTheme.playerSection.imagePlayerTwo;
    }

    //Player Texte
    const playerName = document.querySelector(".player-name") as HTMLElement | null;
    if (playerName) {
        playerName.style.color = currentTheme.playerSection.fontColorPlayer;
        playerName.innerText = currentTheme.playerSection.playerText;
    }

    //opponent Texte
    const opponentName = document.querySelector(".opponent-name") as HTMLElement | null;
    if (opponentName) {
        opponentName.style.color = currentTheme.playerSection.fontColoropponent;
        opponentName.innerText = currentTheme.playerSection.opponentText;
    }



    //Spielstand Player and Opponent
    const playerPoints = document.querySelector(".player-points") as HTMLElement | null;
    if (playerPoints) {
        playerPoints.style.color = currentTheme.playerSection.fontColorPlayer;
        playerPoints.innerText = "0";
    }       
    const opponentPoints = document.querySelector(".opponent-points") as HTMLElement | null;
    if (opponentPoints) {
        opponentPoints.style.color = currentTheme.playerSection.fontColoropponent;
        opponentPoints.innerText = "0";
    }



//Playfield

    document.documentElement.style.setProperty(
        '--playField_Background',
        currentTheme.playField.background
    );

    document.documentElement.style.setProperty(
        '--playerHeader_Background',
        currentTheme.playerHeader.backgroundColor
    );

    document.documentElement.style.setProperty(
        '--playerHeader_FontColor',
        currentTheme.playerHeader.fontColor
    );


    //Player Section
    document.documentElement.style.setProperty(
        '--playerSection_Background',
        currentTheme.playerSection.backgroundColor
    );

    document.documentElement.style.setProperty(
        '--playerSection_FontSize',
        currentTheme.playerSection.fontSize
    );

    document.documentElement.style.setProperty(
        '--playerSection_BorderRadius',
        currentTheme.playerSection.borderRadius
    )


//Current Player

    document.documentElement.style.setProperty(
        '--currentPlayer_FontColor',
        currentTheme.playerCurrent.fontColor
    );

    document.documentElement.style.setProperty(
        '--currentPlayer_FontSize',
        currentTheme.playerCurrent.fontSize         
    );
    document.documentElement.style.setProperty(
        '--currentPlayer_FontWight',
        currentTheme.playerCurrent.fontWight.toString()
        );
        
    const currentPlayerImg = document.querySelector(".current-player-picture") as HTMLImageElement | null;
    if (currentPlayerImg) {
        currentPlayerImg.src = currentTheme.playerCurrent.image;
    }


    //Exit Button
    document.documentElement.style.setProperty(
        '--exitGameButton_backgroundColor',
        currentTheme.exitGameButton.backgroundColor
    );

    document.documentElement.style.setProperty(
        '--exitGameButton_borderColor',
        currentTheme.exitGameButton.borderColor
    );

    document.documentElement.style.setProperty(
        '--exitGameButton_borderRadius',
        currentTheme.exitGameButton.borderRadius
    );
    
    document.documentElement.style.setProperty(
        '--exitGameButton_borderWidth',
        currentTheme.exitGameButton.borderWidth
    );
    
    
    
    document.documentElement.style.setProperty(
        '--exitGameButton_fontColor',
        currentTheme.exitGameButton.fontColor
    );
    
    document.documentElement.style.setProperty(
        '--exitGameButton_fontSize',
        currentTheme.exitGameButton.fontSize
    );
    document.documentElement.style.setProperty(
        '--exitGameButton_fontWight',
        currentTheme.exitGameButton.fontWight.toString()
    );

}






