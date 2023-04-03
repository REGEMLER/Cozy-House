 ///////////////////////////////////////////BURGER MENU
 
 import { blurBG, overflowNav, createPopup } from './effects.js';
 const hamburger = document.getElementById("Hamburger"); 
 const menu = document.querySelector(".header-menu");
 let isMenuOpen = false;

 function showMenu(){
   blurBG(isMenuOpen);
   const nav = document.querySelector(".header-nav");
   menu.classList.add("header-menu__active");
   hamburger.classList.add("hamburger__active"); 
   document.body.style.overflowY = "hidden";
   nav.classList.remove("overflow");
   isMenuOpen = true;
}


 function hideMenu(){
    blurBG(isMenuOpen); 
    menu.classList.remove("header-menu__active");
    hamburger.classList.remove("hamburger__active"); 
    document.body.style.overflowY = "";
    isMenuOpen = false;
 }

 function moveMenuWithBurger(event){
   event.stopPropagation();
    if(menu.classList.contains("header-menu__active")){
        menu.classList.add("header-menu__transition-slow");
        hideMenu(); 
        setTimeout(overflowNav,1100);
        setTimeout(() => {
         menu.classList.remove("header-menu__transition-slow");
       },1100)
    } else {
        showMenu();
    }
 }

 function hideMenuWithBody(event){
    if(!isMenuOpen || event.target.closest(".header-menu")){
        return; 
    }   
    menu.classList.add("header-menu__transition-slow");
    hideMenu(); 
    setTimeout(overflowNav,1100);
    setTimeout(() => {
      menu.classList.remove("header-menu__transition-slow");
    },1100)
 }

 function hideMenuWithLink(event){
    if(event.target.closest(".header-menu-item") && isMenuOpen){
        menu.classList.add("header-menu__transition-fast");
        hideMenu(); 
        overflowNav();
        setTimeout(() => {
         menu.classList.remove("header-menu__transition-fast");
       },500)
    }   
 }


hamburger.addEventListener("click", moveMenuWithBurger); 
document.body.addEventListener("click", hideMenuWithBody);
menu.addEventListener("click", hideMenuWithLink);



 ///////////////////////////////////////////POPUP 
 import animals from './animals.js';
 const cardsMain = document.querySelector(".friends-cards"); 
 let isPopupOpen = false;


 function showPopup(event) {
    if(!event.target.closest(".friend-card")){
        return; 
    }
    event.stopPropagation();
    const card = event.target.closest(".friend-card")
    createPopup(animals, card, false); 
    document.body.style.overflowY = "hidden";
    blurBG(isPopupOpen);
    isPopupOpen = true;  
 }

 function hidePopup(){
    const popup = document.querySelector(".popup"); 
    popup.classList.remove("popup__active"); 
    blurBG(isPopupOpen);
    document.body.style.overflowY = "";
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