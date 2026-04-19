import "./playfield.scss";
import playfieldTemplate from "./playfield.html?raw";


export function renderPlayfield(): string {
    //schreibt text in platzhalter
    return playfieldTemplate;
}