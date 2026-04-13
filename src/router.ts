import { renderHome } from './pages/home/home';
import { initOptions, renderOptions } from './pages/options/options';
import { renderAbout } from './pages/about/about';

const routes: Record<string, () => string> = {
    '/': renderHome,
    '/options': renderOptions,
    '/about': renderAbout,
};

function getApp(): HTMLElement {
    const app = document.getElementById('app');
    if (!app) {
        throw new Error('App-Element #app nicht gefunden');
    }
    return app;
}

function renderRoute(path: string): void {
    const app = getApp();
    const page = routes[path] || (() => `<h2>404</h2><p>Seite nicht gefunden</p>`);

    app.classList.remove('show');
    app.classList.add('fade');

    setTimeout(() => {
        app.innerHTML = page();

        if (path === '/options') {
            initOptions();
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