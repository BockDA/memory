export interface Player {
    themes: string;
    choosePlayer: string;
    BoardSize: number;
}

export const player: Player = {
    themes: "green",
    choosePlayer: "",
    BoardSize: 0
};



export interface SettingsThemeCodevibes {
   PlayFieldBackground: string;
   CardFieldBackground: string;
    
   

    
}

export const settings: SettingsThemeCodevibes = {
    PlayFieldBackground: "",
    CardFieldBackground: "",

};