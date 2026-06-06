import endscreenTemplate from './endscreen.html?raw';
import winnerTemplate from './winner.html?raw';
import gameOverTemplate from './gameOver.html?raw';
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
