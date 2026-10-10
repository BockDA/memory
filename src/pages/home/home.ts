import './home.scss';
import homeTemplate from './home.html?raw';

const homeData = {
    title: 'Home',
    message: 'Willkommen auf der Startseite.',
};

export function renderHome(): string {                  
    return homeTemplate
        .replace('{{title}}', homeData.title)
        .replace('{{message}}', homeData.message);
}