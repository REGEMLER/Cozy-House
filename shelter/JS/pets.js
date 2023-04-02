import animals from './animals.js';
const cardsPets = document.querySelector(".pets-grid"); 
let isPopupOpen = false;

 function hidePopup(){
    const popup = document.querySelector(".popup"); 
    popup.classList.remove("popup__active"); 
    document.body.style.overflowY = "";
    blurBG(isPopupOpen);
    isPopupOpen = false; 
 }

 function hidePopupWithBody(event){
    if(!isPopupOpen || event.target.closest(".popup-content")){
        return; 
    }   
    hidePopup(); 
 }



 function showPopup(event) {
    if(event.target.tagName !== "BUTTON"){
        return; 
    }
    event.stopPropagation();
    const popup = document.querySelector(".popup"); 
    const animal = animals.find(item => item.id == event.target.id);
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
    popup.classList.add("popup__active"); 
    document.body.style.overflowY = "hidden";
    blurBG(isPopupOpen);
    isPopupOpen = true;  
 }

cardsPets.addEventListener("click", showPopup);
document.body.addEventListener("click", hidePopupWithBody);
