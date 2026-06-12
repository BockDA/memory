import { player } from '../settings';

const openCards: HTMLElement[] = [];
let boardLocked = false;
type PlayerColor = 'blue' | 'orange';

export type GameResult = 'win' | 'loss' | 'draw';
export let playerResult: GameResult = 'draw';

const scores: Record<PlayerColor, number> = {
	blue: 0,
	orange: 0,
};

let currentTurn: PlayerColor = 'blue';
let playerImages: Record<PlayerColor, string> = {
	blue: '',
	orange: '',
};

function normalizePlayerName(value: string): PlayerColor {
	return value.trim().toLowerCase() === 'orange' ? 'orange' : 'blue';
}

function renderHud(): void {
	const playerNameEl = document.querySelector('.player-name') as HTMLElement | null;
	const opponentNameEl = document.querySelector('.opponent-name') as HTMLElement | null;
	const playerPointsEl = document.querySelector('.player-points') as HTMLElement | null;
	const opponentPointsEl = document.querySelector('.opponent-points') as HTMLElement | null;
	const currentPlayerImgEl = document.querySelector('.current-player-picture') as HTMLImageElement | null;

	if (playerNameEl && playerPointsEl) {
		const playerSide = normalizePlayerName(playerNameEl.innerText);
		playerPointsEl.innerText = String(scores[playerSide]);
	}

	if (opponentNameEl && opponentPointsEl) {
		const opponentSide = normalizePlayerName(opponentNameEl.innerText);
		opponentPointsEl.innerText = String(scores[opponentSide]);
	}

	

	if (currentPlayerImgEl && playerImages[currentTurn]) {
		currentPlayerImgEl.src = playerImages[currentTurn];
	}
}

function getCardInner(cardElement: HTMLElement): HTMLElement | null {
	return cardElement.querySelector('.card-inner');
}

function isFlipped(cardElement: HTMLElement): boolean {
	return getCardInner(cardElement)?.classList.contains('flipped') ?? false;
}

function setFlipped(cardElement: HTMLElement, flipped: boolean): void {
	const cardInner = getCardInner(cardElement);
	if (!cardInner) {
		return;
	}

	cardInner.classList.toggle('flipped', flipped);
}

export function resetCardCounter(): void {
	openCards.length = 0;
	boardLocked = false;
}

export function initGameLogic(startingPlayer: PlayerColor, blueImage = '', orangeImage = ''): void {
	resetCardCounter();
	scores.blue = 0;
	scores.orange = 0;
	currentTurn = startingPlayer;
	playerImages = {
		blue: blueImage,
		orange: orangeImage,
	};

	renderHud();
}

export function getScoreSnapshot(): Record<PlayerColor, number> {
	return {
		blue: scores.blue,
		orange: scores.orange,
	};
}

function allCardsFlipped(): boolean {
	const allCards = document.querySelectorAll('.card');
	return allCards.length > 0 && Array.from(allCards).every(card =>
		card.querySelector('.card-inner')?.classList.contains('flipped') ?? false
	);
}

export function finishGame(): void {
	const myColor = player.choosePlayer;
	const opponentColor: PlayerColor = myColor === 'blue' ? 'orange' : 'blue';
	const myScore = scores[myColor];
	const opponentScore = scores[opponentColor];

	if (myScore > opponentScore) {
		playerResult = 'win';
	} else if (myScore < opponentScore) {
		playerResult = 'loss';
	} else {
		playerResult = 'draw';
	}

	console.log(`Game finished. Player result: ${playerResult} (Player: ${myScore}, Opponent: ${opponentScore})`);
	const route = playerResult === 'loss' ? '/gameover' : '/winner';
	window.history.pushState({}, '', route);
	window.dispatchEvent(new PopStateEvent('popstate'));
}

export function counterCard(cardElement: HTMLElement): void {
	if (boardLocked || isFlipped(cardElement)) {
		return;
	}

	setFlipped(cardElement, true);
	openCards.push(cardElement);

	if (openCards.length < 2) {
		return;
	}

	const [firstCard, secondCard] = openCards;
	const isMatch = firstCard.dataset.cardId === secondCard.dataset.cardId;

	if (isMatch) {
		scores[currentTurn] += 1;
		openCards.length = 0;
		renderHud();
		if (allCardsFlipped()) {
			finishGame();
		}
		return;
	}

	boardLocked = true;
	setTimeout(() => {
		setFlipped(firstCard, false);
		setFlipped(secondCard, false);
		openCards.length = 0;
		currentTurn = currentTurn === 'blue' ? 'orange' : 'blue';
		renderHud();
		boardLocked = false;
	}, 1000);
}


