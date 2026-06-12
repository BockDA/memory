import endscreenTemplate from './endscreen.html?raw';
import winnerTemplate from './winner.html?raw';
import gameOverTemplate from './gameOver.html?raw';
import { themes } from "../assets/JSON/theme.json";
import { player } from "../settings";
import { getScoreSnapshot } from "../playfield/gameLogic";
import "./endscreen.scss";

export function renderEndscreen(): string {
	return endscreenTemplate;
}

export function renderWinner(): string {
	return winnerTemplate;
}

export function renderGameOver(): string {
	return gameOverTemplate;
}

function getThemeImageByPlayerColor(
	currentTheme: (typeof themes)[number],
	playerColor: "blue" | "orange"
): string {
	const imagePool = [
		currentTheme.playerSection.imagePlayerOne,
		currentTheme.playerSection.imagePlayerTwo,
	];

	return imagePool.find((image) => image.toLowerCase().includes(playerColor)) ?? imagePool[0];
}

export function initWinner(): void {
	const currentTheme = themes[player.index] ?? themes[0];
	const winnerTheme = currentTheme.winner ?? themes[0].winner;
	const scores = getScoreSnapshot();
	const isDraw = scores.blue === scores.orange;
	const winnerColor: "blue" | "orange" = scores.orange > scores.blue ? "orange" : "blue";
	const winnerImage = getThemeImageByPlayerColor(currentTheme, winnerColor);
	const screen = document.querySelector('.winner-screen') as HTMLElement | null;
	const winnerName = document.querySelector('[data-winner-name]') as HTMLElement | null;
	const winnerIcon = document.querySelector('[data-winner-icon]') as HTMLImageElement | null;
	const winnerColorValue = winnerColor === "blue" ? winnerTheme.blueColor : winnerTheme.orangeColor;

	document.documentElement.style.setProperty('--winner_Background', winnerTheme.backgroundColor);
	document.documentElement.style.setProperty('--winner_LabelColor', winnerTheme.labelColor);
	document.documentElement.style.setProperty('--winner_PlayerColor', winnerColorValue);
	document.documentElement.style.setProperty('--winner_DrawColor', winnerTheme.drawColor);
	document.documentElement.style.setProperty('--winner_ButtonBackground', winnerTheme.buttonBackgroundColor);
	document.documentElement.style.setProperty('--winner_ButtonBorderColor', winnerTheme.buttonBorderColor);
	document.documentElement.style.setProperty('--winner_ButtonFontColor', winnerTheme.buttonFontColor);
	document.documentElement.style.setProperty('--winner_FontFamily', winnerTheme.fontFamily);

	if (screen) {
		screen.classList.toggle('winner-screen--draw', isDraw);
	}

	if (winnerName) {
		winnerName.innerText = `${winnerColor.toUpperCase()} PLAYER`;
	}

	if (winnerIcon) {
		winnerIcon.src = winnerImage;
	}
}

export function initGameOver(): void {
	const currentTheme = themes[player.index] ?? themes[0];
	const gameOverTheme = currentTheme.gameOver ?? themes[0].gameOver;
	const scores = getScoreSnapshot();
	const winnerColor = scores.orange > scores.blue ? "orange" : "blue";
	const winnerImage = winnerColor === "orange"
		? currentTheme.playerSection.imagePlayerOne
		: currentTheme.playerSection.imagePlayerTwo;
	const screen = document.querySelector('.game-over') as HTMLElement | null;

	document.documentElement.style.setProperty('--gameOver_Background', gameOverTheme.backgroundColor);
	document.documentElement.style.setProperty('--gameOver_TitleColor', gameOverTheme.titleColor);
	document.documentElement.style.setProperty('--gameOver_TitleShadowColor', gameOverTheme.titleShadowColor);
	document.documentElement.style.setProperty('--gameOver_LabelColor', gameOverTheme.labelColor);
	document.documentElement.style.setProperty('--gameOver_ScoreBoxBackground', gameOverTheme.scoreBoxBackgroundColor);
	document.documentElement.style.setProperty('--gameOver_BlueColor', gameOverTheme.blueColor);
	document.documentElement.style.setProperty('--gameOver_OrangeColor', gameOverTheme.orangeColor);
	document.documentElement.style.setProperty('--gameOver_FontSize', gameOverTheme.fontSize);
	document.documentElement.style.setProperty('--gameOver_FontWeight', gameOverTheme.fontWight.toString());
	document.documentElement.style.setProperty('--gameOver_FontFamily', gameOverTheme.fontFamily);
	document.documentElement.style.setProperty('--gameOver_WinnerColor', gameOverTheme.orangeColor);
	document.documentElement.style.setProperty('--gameOver_ButtonBackground', gameOverTheme.buttonBackgroundColor);
	document.documentElement.style.setProperty('--gameOver_ButtonBorderColor', gameOverTheme.buttonBorderColor);
	document.documentElement.style.setProperty('--gameOver_ButtonFontColor', gameOverTheme.buttonFontColor);
	document.documentElement.style.setProperty('--gameOver_ButtonBorderRadius', gameOverTheme.buttonBorderRadius);

	if (screen) {
		screen.classList.toggle('game-over--winner-mode', gameOverTheme.mode === "winner");
		screen.classList.toggle('game-over--theme2', player.index === 1);
	}

	const title = document.querySelector('.game-over__title') as HTMLElement | null;
	const blueScore = document.querySelector('[data-score-blue]') as HTMLElement | null;
	const orangeScore = document.querySelector('[data-score-orange]') as HTMLElement | null;
	const winnerName = document.querySelector('[data-winner-name]') as HTMLElement | null;
	const winnerIcon = document.querySelector('[data-winner-icon]') as HTMLImageElement | null;

	if (title && gameOverTheme.titleText) {
		title.innerText = gameOverTheme.titleText;
	}

	if (blueScore) {
		blueScore.innerText = String(scores.blue);
	}

	if (orangeScore) {
		orangeScore.innerText = String(scores.orange);
	}

	if (winnerName) {
		winnerName.innerText = `${winnerColor.toUpperCase()} PLAYER`;
	}

	if (winnerIcon) {
		winnerIcon.src = winnerImage;
	}
}
