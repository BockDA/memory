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
    console.log("aktuller index", player.index);
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

        card: {
            "frontCardIMG": themes[player.index].card.frontCardIMG,
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

export class Card {
    id: number;
    name: string;
    picture: string;
    constructor(id: number, name: string, picture: string) {
        this.id = id;
        this.name = name;
        this.picture = picture;
    }

    /**
     * Registriert einen Click-Listener auf das übergebene DOM-Element.
     * @param element Das DOM-Element der Karte
     * @param callback Die Callback-Funktion, die beim Klick ausgeführt wird
     */
    addClickListener(element: HTMLElement, callback: (card: Card, event: MouseEvent) => void) {
        element.addEventListener('click', (event) => {
            callback(this, event);
        });
    }
}


    




// 8 verschiedene Kartenpaare (insgesamt 16 Karten)
export const cards: Card[] = [];

export function createCards(anzahl: number): void {
    cards.length = 0; // Array leeren, falls schon Karten vorhanden sind
    for (let i = 1; i <= anzahl; i++) {
        const name = `card${i}`;
        const picture = `/cards/card${i}.png`;
        // Jedes Kartenpaar zweimal hinzufügen
        cards.push(new Card(i, name, picture));
        cards.push(new Card(i, name, picture));
    }
    console.log("cards array", cards);
    cardMix();
}

export function cardMix(): void {
    // Fisher-Yates Shuffle Algorithmus
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

}


export function initPlayfield(): void {

    console.log("init playfield");
    const cardField = document.querySelector('.card-Field');
    if (!cardField) return;

    // Rechteckige Grid-Anordnung berechnen
    const cardCount = cards.length;
    let columns = Math.ceil(Math.sqrt(cardCount));
    while (cardCount % columns !== 0 && columns < cardCount) {
        columns++;
    }
    cardField.setAttribute('style', `display: grid; grid-template-columns: repeat(${columns}, 1fr); gap: 1rem;`);

    // Vorherigen Inhalt entfernen
    cardField.innerHTML = '';

    // Hole das aktuelle Theme für die Vorderseite


    cards.forEach((card, idx) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.dataset.index = idx.toString();
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        // Optional: Kartenname anzeigen
        // const nameP = document.createElement('p');
        // nameP.textContent = card.name;
        // cardFront.appendChild(nameP);
        const frontImgEl = document.createElement('img');
        frontImgEl.src = themes[player.index].card.frontCardIMG;
        cardFront.appendChild(frontImgEl);

        //Rücksteite der Karte
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        const backImgEl = document.createElement('img');
        backImgEl.src = card.picture;
        cardBack.appendChild(backImgEl);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardDiv.appendChild(cardInner);
        cardField.appendChild(cardDiv);
    });
}


