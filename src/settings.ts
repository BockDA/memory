type Player = {
    name: string;
    points: number;
    picture: string;
}


type PlayField = {
    theme: string;
    colorPlayer: string;
    cards: number;
}


export const playfields: PlayField = [

    {
        id: 1,
        theme: "codevibestheme",
        backgroundColor: "#ffffff",
        backColorHeader: "#ffffff",
        colorPlayer: "blue",
        colorAndOpponent: "orange",
        picturePlayer: "/themes/ThemeVisual_one.png",
        pictureOpponent: "/themes/ThemeVisual_two.png",
        pictureCurrentPlayer: "/themes/ThemeVisual_three.png",
   
        colorCards: "#ffffff",
        font: "Arial",
    
    }



]