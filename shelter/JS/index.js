 ///////////////////////////////////////////BURGER MENU
 
 const hamburger = document.getElementById("Hamburger"); 
 const menu = document.querySelector(".header-menu");
 let isMenuOpen = false;

 function blurBG(isBlured) {
    const containers  = [...document.querySelectorAll(".container")]; 
    containers.forEach(item => {
        if(!isBlured){
            item.style.background = "#5C5C5C";
        } else{
            item.style.background = "transparent";
        }
    })
 }

 function makeOverflowHidden() {
    const nav = document.querySelector(".header-nav");
    nav.classList.add("overflow-x");
 }

 function hideMenu(){
    menu.classList.remove("header-menu__active");
    hamburger.classList.remove("hamburger__active"); 
    document.body.style.overflowY = "";
    blurBG(isMenuOpen); 
    isMenuOpen = false;
 }

 function showMenu(){
    const nav = document.querySelector(".header-nav");
    menu.classList.add("header-menu__active");
    hamburger.classList.add("hamburger__active"); 
    document.body.style.overflowY = "hidden";
    nav.classList.remove("overflow-x");
    blurBG(isMenuOpen);
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