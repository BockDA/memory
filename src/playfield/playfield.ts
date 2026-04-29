import "./playfield.scss";
import playfieldTemplate from "./playfield.html?raw";
import { player } from "../settings";


document.addEventListener("DOMContentLoaded", () => {
    console.log("Lade dom");

    const app = document.getElementById("app");
    if (app) {
        app.innerHTML = renderPlayfield(); // 👉 HIER passiert das echte Rendering
    }

    writeSCSSVariables(); // 👉 danach erst!
});



/*



document.addEventListener("DOMContentLoaded", () => {
    console.log("Lade dom");
    writeSCSSVariables();
});



*/

export function renderPlayfield(): string {
    return playfieldTemplate
}




export function writeSCSSVariables(): void {
    console.log("writeSCSSVariables called");
   
    const playfield = document.querySelector(".player-section") as HTMLElement;

    playfield.style.background = "green";

    console.log("playfield element:", playfield);

}







