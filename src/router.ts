import { renderHome } from './pages/home/home';
import { initOptions, renderOptions } from './pages/options/options';
import { renderAbout } from './pages/about/about';
import { renderPlayfield, writeSCSSVariables } from './playfield/playfield';
import { createCards, initPlayfield } from './playfield/playfield';


const routes: Record<string, () => string> = {
    '/': renderHome,
    '/options': renderOptions,
    '/about': renderAbout,
    '/playfield': renderPlayfield
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
    const page = routes[path] || (() => `<h2>404</h2><p>Seite nicht gefunden</p>`);

    app.classList.remove('show');
    app.classList.add('fade');

    setTimeout(() => {
        app.innerHTML = page();

        if (path === '/options') {
            initOptions();
        }

        if (path === '/playfield') {
            writeSCSSVariables();
            createCards(18);
            initPlayfield();
        }

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