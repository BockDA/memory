import './style.scss';
import { initRouter, navigateTo } from './router';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root-Element #root nicht gefunden');
}

root.innerHTML = `
    <main id="app"></main>
 `;

initRouter();

root.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const link = target.closest<HTMLElement>('[data-link]');
  const path = link?.dataset.link;

  if (!path) {
    return;
  }

  navigateTo(path);
});