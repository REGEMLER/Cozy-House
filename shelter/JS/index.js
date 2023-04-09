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



 //////////////////////////////////////////SLIDER

 const arrowLeft = document.querySelector(".friends-left");
 const arrowRight = document.querySelector(".friends-right"); 
 const carusel = document.querySelector(".friends-inner"); 

 const leftItems = document.querySelector(".friends-back");
 const centreItems = document.querySelector(".friends-center");
 const rightItems = document.querySelector(".friends-forward");

 function createNewSlides(direction){
   let newCardsArr = [...animals].filter(item => {
      const card1 = centreItems.querySelector(".friend-card1");
      const card2 = centreItems.querySelector(".friend-card2");
      const card3 = centreItems.querySelector(".friend-card3");
      return item.id !== card1.id && item.id !== card2.id && item.id !== card3.id; 
   }).sort(() => Math.random() - 0.5);

   for(let i = 1; i < 4; i++){
      const card = direction.querySelector(`.friend-card${i}`);
      card.id = newCardsArr[i].id;
      const img = card.querySelector("img");
      img.src = newCardsArr[i].img;
      const h3 = card.querySelector("h3");
      h3.textContent = newCardsArr[i].name;
   }
 }

 function moveLeft() { 
   carusel.classList.add("carusel-left");
   leftItems.classList.add("slide__animated");
   arrowLeft.removeEventListener("click", moveLeft);
   arrowRight.removeEventListener("click", moveRight);
 }

 function moveRight() {
   carusel.classList.add("carusel-right");
   rightItems.classList.add("slide__animated");
   arrowRight.removeEventListener("click", moveRight);
   arrowLeft.removeEventListener("click", moveLeft);
 }

 function animed(event){

   if(event.animationName === "slider-left" || event.animationName === "slider-left-mid" || event.animationName === "slider-left-small"){
      carusel.classList.remove("carusel-left"); 
      leftItems.classList.remove("slide__animated");
      rightItems.innerHTML = centreItems.innerHTML; 
      centreItems.innerHTML = leftItems.innerHTML; 
      createNewSlides(leftItems);

   } else{
      carusel.classList.remove("carusel-right"); 
      rightItems.classList.remove("slide__animated");
      leftItems.innerHTML = centreItems.innerHTML; 
      centreItems.innerHTML = rightItems.innerHTML; 
      createNewSlides(rightItems);
   }

   arrowLeft.addEventListener("click", moveLeft);
   arrowRight.addEventListener("click", moveRight);
 }

 arrowLeft.addEventListener("click", moveLeft);
 arrowRight.addEventListener("click", moveRight);
 carusel.addEventListener("animationend", animed); 