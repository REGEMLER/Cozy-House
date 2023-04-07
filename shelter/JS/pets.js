 ///////////////////////////////////////////BURGER MENU
 
 import { blurBG, overflowNav, createPopup, createPetsArr } from './effects.js';
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
 const cardsMain = document.querySelector(".pets-grid"); 
 let isPopupOpen = false;


 function showPopup(event) {
   if(!event.target.closest(".pet-card")){
       return; 
   }
   event.stopPropagation();
   const card = event.target.closest(".pet-card")
   createPopup(animals, card, true); 
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



///////////////////////////////////////////PAGINATION 

const buttonFirstPage = document.getElementById("buttonFirstPage");
const buttonBack = document.getElementById("buttonBack");
const pageNumber = document.getElementById("pageNumber");
const buttonNext = document.getElementById("buttonNext");
const buttonLastPage = document.getElementById("buttonLastPage");

let allCards = createPetsArr(animals);  

let innerWIdth = window.innerWidth; 
let cardsInPage = innerWIdth > 900 ? 8 : innerWIdth > 550 ? 6 : 3; 
let amountOfPages = allCards.length / cardsInPage; 
let currentPage = 1; 
let firstCardOnPage = cardsInPage * (currentPage - 1) + 1;


function makePage(){
      for(let i = firstCardOnPage - 1, j = 1; j < cardsInPage + 1; i++,j++){
         const card = document.querySelector(`.pet-card${j}`);
         card.id = allCards[i].id; 
         const img = card.querySelector(".pet-img img");
         img.src = "../" +  allCards[i].img; 
         const h3 = card.querySelector(".pet-subtitle");
         h3.textContent = allCards[i].name; 
      }
}

function makeEnabled(btn){
   btn.classList.remove("pets-btn__desabled");
   btn.classList.add("pets-btn__enabled");
}

function makeDesabled(btn){
   btn.classList.add("pets-btn__desabled");
   btn.classList.remove("pets-btn__enabled");
}

function setPage(){
   pageNumber.textContent = currentPage; 
   firstCardOnPage = cardsInPage * (currentPage - 1) + 1;
   makePage(); 
}

function nextPage(){
   if(currentPage >= amountOfPages){
      return; 
   }

   makeEnabled(buttonFirstPage);
   makeEnabled(buttonBack);

   if(currentPage == amountOfPages - 1){
      makeDesabled(buttonLastPage);
      makeDesabled(buttonNext);
   }
   currentPage++; 
   setPage();
}

function backPage(){
   if(currentPage == 1){
      return; 
   }
   makeEnabled(buttonLastPage);
   makeEnabled(buttonNext);

   if(currentPage == 2){
      makeDesabled(buttonFirstPage);
      makeDesabled(buttonBack);
   }

   currentPage--; 
   setPage();
}

function firstPage(){
   makeDesabled(buttonFirstPage);
   makeDesabled(buttonBack);
   makeEnabled(buttonLastPage);
   makeEnabled(buttonNext);
   currentPage = 1; 
   setPage();
}

function lastPage(){
   makeDesabled(buttonLastPage);
   makeDesabled(buttonNext);
   makeEnabled(buttonFirstPage);
   makeEnabled(buttonBack);
   currentPage = amountOfPages; 
   setPage();
}

function changeInnerWIdth(){
   innerWIdth = window.innerWidth; 
   cardsInPage = innerWIdth > 900 ? 8 : innerWIdth > 550 ? 6 : 3; 
   amountOfPages = allCards.length / cardsInPage; 
   currentPage = Math.ceil(firstCardOnPage / cardsInPage); 
   setPage();

   if(currentPage == amountOfPages){
      makeDesabled(buttonLastPage);
      makeDesabled(buttonNext);
   }

   if(currentPage == 1){
      makeDesabled(buttonFirstPage);
      makeDesabled(buttonBack);
   }
}


window.addEventListener("resize",changeInnerWIdth);
buttonFirstPage.addEventListener("click", firstPage);
buttonBack.addEventListener("click", backPage);
buttonNext.addEventListener("click", nextPage);
buttonLastPage.addEventListener("click", lastPage);

