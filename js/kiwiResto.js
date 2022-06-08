
//---------------OBJECTS---------------//

let registerPart = document.querySelector("#registerBox");
let searchRestos = document.querySelector("#searchRestos");

//---------------FUNCTIONS---------------//

userActiveIndex();
restoActive();

document.querySelector("#searchBut").addEventListener('click', () => {
    searchBar();
});



