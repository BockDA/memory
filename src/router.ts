import { renderHome } from './pages/home/home';
import { initOptions, renderOptions } from './pages/options/options';
import { renderAbout } from './pages/about/about';
import { renderPlayfield, writeSCSSVariables } from './playfield/playfield';
import { createCards, initPlayfield } from './playfield/playfield';
import { initGameOver, initWinner, renderWinner, renderGameOver } from './endscreen/endscreen';
import { player } from './settings';


interface Route {
    render: () => string;
    init?: () => void;
}

function initPlayfieldPage(): void {
    const totalCards = [16, 24, 36].includes(player.BoardSize) ? player.BoardSize : 16;
    const pairCount = totalCards / 2;

    writeSCSSVariables();
    createCards(pairCount);
    initPlayfield();
}

const routes: Record<string, Route> = {
    '/': { render: renderHome },
    '/options': { render: renderOptions, init: initOptions },
    '/about': { render: renderAbout },
    '/playfield': { render: renderPlayfield, init: initPlayfieldPage },
    '/winner': { render: renderWinner, init: initWinner },
    '/gameover': { render: renderGameOver, init: initGameOver },
};

function getApp(): HTMLElement {
    const app = document.getElementById('app');
    if (!app) {
        throw new Error('App-Element #app nicht gefunden');
    }
    return app;
}


function renderRoute(path: string): void {
    // Entferne abschließenden Slash, außer bei Root-Pfad
    if (path.length > 1 && path.endsWith('/')) {
        path = path.slice(0, -1);
    }
    const app = getApp();
    const route = routes[path];

    app.classList.remove('show');
    app.classList.add('fade');

    setTimeout(() => {
        app.innerHTML = route ? route.render() : `<h2>404</h2><p>Seite nicht gefunden</p>`;
        route?.init?.();

        app.classList.remove('fade');
        app.classList.add('show');
    }, 150);
}

export function navigateTo(path: string): void {
    window.history.pushState({}, '', path);
    renderRoute(path);
}

export function initRouter(): void {
    window.addEventListener('popstate', () => {
        renderRoute(window.location.pathname);
    });

    renderRoute(window.location.pathname);
}
