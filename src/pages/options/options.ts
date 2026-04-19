import "./options.scss";
import optionsTemplate from "./options.html?raw";

export const themes = [
  {
    id: "theme-A",
    image: "/themes/ThemeVisual_one.png",
  },
  {
    id: "theme-B",
    image: "/themes/ThemeVisual_two.png",
  },
  {
    id: "theme-C",
    image: "/themes/ThemeVisual_three.png",
  },
  {
    id: "theme-D",
    image: "/themes/ThemeVisual_four.png",
  },
];

export function renderOptions(): string {
  //schreibt text in platzhalter
  return optionsTemplate;
}

export function initOptions(): void {
  //const radiobtn = document.querySelectorAll('input[type="radio"]');
    const radiobtn = document.querySelectorAll('label');
  if (!radiobtn) {
    return;
  }
  radioselect(radiobtn);
}


function radioselect(radiobtn: any[] | NodeListOf<Element>): void {
  radiobtn.forEach((btn,index) => {
    btn.addEventListener("mouseenter", () => {
      console.log("drüber",index,btn.value );
      if (index >3 )return;  
      setpicture(index);
    });

btn.addEventListener("mousedown", () => {
      console.log("drücken",index );
      
    });

  });
}


function setpicture(index: number): void {
  const pic = document.getElementById("picThemes") as HTMLImageElement;
  if (!pic) return;
  console.log(index);
  pic.src = themes[index].image;
}






/* 
  const themesById = new Map(themes.map((theme) => [theme.id, theme]));
  //console.log(themesById);

  const setPreview = (themeId: string): void => {
    const theme = themesById.get(themeId);

    if (!theme) {
      return;
    }

    previewImage.src = theme.image;
    
  };

  const syncPreviewWithSelection = (): void => {
    const checkedThemeId = themeForm.querySelector<HTMLInputElement>('input[name="game-theme"]:checked')?.value ?? themes[0]?.id;

    if (checkedThemeId) {
      setPreview(checkedThemeId);

    }
  };

  themeForm.addEventListener('change', (event) => {
    const target = event.target;

    console.log('bin bei :', target);




    if (!(target instanceof HTMLInputElement) || target.name !== 'game-theme') {
      return;
    }

    setPreview(target.value);
  });


  themeForm.querySelectorAll<HTMLLabelElement>('label[data-theme-id]').forEach((label) => {
    const themeId = label.dataset.themeId;

    if (!themeId) {
      return;
    }

    label.addEventListener('mouseenter', () => {
      setPreview(themeId);
    });

    label.addEventListener('mouseleave', () => {
      syncPreviewWithSelection();
    });

    label.addEventListener('focusin', () => {
      setPreview(themeId);
    });

    label.addEventListener('focusout', () => {
      syncPreviewWithSelection();
    });
  });

  syncPreviewWithSelection();
}



export  function setLine(): void {


}

*/
