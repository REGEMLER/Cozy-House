 const hamburger = document.getElementById("Hamburger"); 
 const menu = document.querySelector(".header-menu");

 function hideMenu(){
    menu.classList.remove("header-menu__active");
    hamburger.classList.remove("hamburger__active"); 
    document.body.style.overflowY = "";
    document.body.style.overflowX = "hidden";
    document.body.style.background = "transparent";
    changeClear(false); 
 }

 function showMenu(){
    menu.classList.add("header-menu__active");
    hamburger.classList.add("hamburger__active"); 
    document.body.style.overflowY = "hidden";
    changeClear(true);
 }

 function hideMenuWithBody(event){
    if(event.target.closest(".header-menu") || event.target.closest("#Hamburger")){
        return; 
    }   
    hideMenu(); 
 }

 function hideMenuWithLink(event){
    if(event.target.closest(".header-menu-item")){
        hideMenu(); 
    }   
 }


 function changeClear(isClear) {
    const containers  = [...document.querySelectorAll(".container")]; 
    containers.forEach(item => {
        if(isClear){
            item.style.background = "#5C5C5C";
        } else{
            item.style.background = "transparent";
        }
    })
 }


 function handler(){

    if(menu.classList.contains("header-menu__active")){
        hideMenu() 
    } else {
        showMenu() 
    }
 }

hamburger.addEventListener("click", handler); 
document.body.addEventListener("click", hideMenuWithBody);
menu.addEventListener("click", hideMenuWithLink);