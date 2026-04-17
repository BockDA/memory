import "./options.scss";
import optionsTemplate from "./options.html?raw";

export const themes = [
  {
    id: "theme-1",
    image: "/themes/Theme Visua_one.png",
  },
  {
    id: "theme-2",
    image: "/themes/Theme Visual_two.png",
  },
  {
    id: "theme-3",
    image: "/themes/Theme Visual_three.png",
  },
  {
    id: "theme-4",
    image: "/themes/Theme Visual_four.png",
  },
];

export function renderOptions(): string {
  //schreibt text in platzhalter
  return optionsTemplate;
}

export function initOptions(): void {
  const radiobtn = document.querySelectorAll('input[type="radio"]');
  if (!radiobtn) {
    return;
  }
  radioselect(radiobtn);
}

function radioselect(radiobtn: any[] | NodeListOf<Element>): void {
  radiobtn.forEach((btn,index) => {
    btn.addEventListener("mouseenter", () => {
      console.log("drüber",index,btn.value );
      setpicture();
    });

btn.addEventListener("mousedown", () => {
      console.log("drücken",btn.value );
      
    });

  });
}


function setpicture():void{
  const pic = document.getElementById("picThemes") as HTMLImageElement 
  pic.src = "/themes/ThemeVisual_four.png";

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
