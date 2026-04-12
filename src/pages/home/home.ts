import './home.scss';
import homeTemplate from './home.html?raw';

const homeData = {
    title: 'Home',
    message: 'Willkommen auf der Startseite.',
};



export function renderHome(): string {                  //schreibt text in platzhalter
    return homeTemplate
        .replace('{{title}}', homeData.title)
        .replace('{{message}}', homeData.message);
}