export function blurBG(isBlured) {

    if(!isBlured){
        const temp  = document.createElement("DIV");
        temp.classList.add("temp");
        document.body.append(temp); 
    } else{
        const temp  = document.querySelector(".temp");
        temp.remove(); 
    }
    
 }

 export function overflowNav() {
    const nav = document.querySelector(".header-nav");
    nav.classList.add("overflow");
 }

 export function createPopup(animals,eventTarget,isPagePets){
    const popup = document.querySelector(".popup"); 
    const animal = animals.find(item => item.id == eventTarget.id);
    const popupTitle = document.querySelector(".popup-title");
    popupTitle.textContent = animal.name;
    const popupSubtitle = document.querySelector(".popup-subtitle");
    popupSubtitle.textContent = animal.type + " " + animal.breed;
    const popupText = document.querySelector(".popup-text");
    popupText.textContent = animal.description;
    const popupAge = document.querySelector(".popup-item-age");
    popupAge.textContent = animal.age;
    const popupInoculations = document.querySelector(".popup-item-ino");
    popupInoculations.textContent = animal.inoculations.join(", ");
    const popupDiseases = document.querySelector(".popup-item-deseases");
    popupDiseases.textContent = animal.diseases.join(", ");
    const popupParasites = document.querySelector(".popup-item-parasites");
    popupParasites.textContent = animal.parasites.join(", ");
    const popupIMG = document.querySelector(".popup-img img");
    if(!isPagePets){
       popupIMG.src = animal.img; 
    } else{
       popupIMG.src = "../" + animal.img; 
    }
    popup.classList.add("popup__active"); 
 }