 ///////////////////////////////////////////BURGER MENU
 
 const hamburger = document.getElementById("Hamburger"); 
 const menu = document.querySelector(".header-menu");
 let isMenuOpen = false;
 let isPopupOpen = false;


 function blurBG(isBlured) {

    if(!isBlured){
        const temp  = document.createElement("DIV");
        temp.classList.add("temp");
        document.body.append(temp); 
    } else{
        const temp  = document.querySelector(".temp");
        temp.remove(); 
    }
 }


 function makeOverflowHidden() {
    const nav = document.querySelector(".header-nav");
    nav.classList.add("overflow-x");
 }

 function hideMenu(){
    blurBG(isMenuOpen); 
    menu.classList.remove("header-menu__active");
    hamburger.classList.remove("hamburger__active"); 
    document.body.style.overflowY = "";
    isMenuOpen = false;
 }

 function showMenu(){
    blurBG(isMenuOpen);
    const nav = document.querySelector(".header-nav");
    menu.classList.add("header-menu__active");
    hamburger.classList.add("hamburger__active"); 
    document.body.style.overflowY = "hidden";
    nav.classList.remove("overflow-x");
    isMenuOpen = true;
 }

 function hideMenuWithBody(event){
    if(!isMenuOpen || event.target.closest(".header-menu") || event.target.closest("#Hamburger")){
        return; 
    }   
    hideMenu(); 
    setTimeout(makeOverflowHidden,1100);
 }

 function hideMenuWithLink(event){
    if(event.target.closest(".header-menu-item") && isMenuOpen){
        hideMenu(); 
        makeOverflowHidden();
    }   
 }

 function moveMenuWithBurger(){
    if(menu.classList.contains("header-menu__active")){
        hideMenu(); 
        setTimeout(makeOverflowHidden,1100);
    } else {
        showMenu();
    }
 }

hamburger.addEventListener("click", moveMenuWithBurger); 
document.body.addEventListener("click", hideMenuWithBody);
menu.addEventListener("click", hideMenuWithLink);

 ///////////////////////////////////////////POPUP 

 import animals from './animals.js';
 const cardsMain = document.querySelector(".friends-cards"); 

 function showPopup(event) {
    if(event.target.tagName !== "BUTTON"){
        return; 
    }
    event.stopPropagation();
    const popup = document.querySelector(".popup"); 
    const animal = animals.find(item => item.id == event.target.id);
    const popupIMG = document.querySelector(".popup-img img");
    popupIMG.src = animal.img; 
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

 cardsMain.addEventListener("click", showPopup);
 document.body.addEventListener("click", hidePopupWithBody);