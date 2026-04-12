import './options.scss';
import optionsTemplate from './options.html?raw';


export const themes = [
  {
    id: 'theme-1',
    name: 'Theme Visual One',
    image: '/themes/Theme Visua_one.png',
  },
  {
    id: 'theme-2',
    name: 'Theme Visual Two',
    image: '/themes/Theme Visual_two.png',
  },
  {
    id: 'theme-3',
    name: 'Theme Visual Three',
    image: '/themes/Theme Visual_three.png',
  },
  {
    id: 'theme-4',
    name: 'Theme Visual Four',
    image: '/themes/Theme Visual_four.png',
  },
];



export function renderOptions(): string {                  //schreibt text in platzhalter
  return optionsTemplate;

}


