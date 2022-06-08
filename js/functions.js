
//---------------OBJECTS---------------//


let userText = document.getElementById("userText");
let userInfo = document.querySelector("#userInfo");
let logOutt = document.querySelector("#logOut");
let pagesList = document.querySelector("#pagesList");

let passValid;
let passValid2;

let user = "";
let namee = "";
let password = "";
let pssconf = "";
let phone = 0;
let adress = "#";
let floor = 0;
let dtt = 0;

let localName = "";
let localCity = "";
let localURL = "";
let localAction = "";
let localSurname = "";
let localImage = "";

let indexLocals = 0;
let indice = "";
let userI = false;

//---------------CLASES----------------//

class User{
    constructor(namee, password, phone, adress, floor, dtt) {
        this.namee = namee;
        this.password = password;
        this.phone = phone;
        this. adress = adress;
        this.floor = floor;
        this.dtt = dtt;
    }
}

class Lugar{
    constructor(localName, localCity, localURL, localAction, localSurname) {
        this.localName = localName;
        this.localCity = localCity;
        this.localURL = localURL;
        this.localAction = localAction;
        this.localSurname = localSurname;
        this.localImage = localImage;
    }
}

//---------------FUNCTIONS---------------//


function userActive(){ 
    indice = JSON.parse(sessionStorage.getItem("indice"));
    if(indice == null){
        console.log("|No user active|");
        userI = false;
    }else{
        const userconf = JSON.parse(localStorage.getItem("users"));
        document.getElementById("userTextt").innerHTML = "@" + userconf[indice].namee;
        console.log("|User active " + userconf[indice].namee + "|");
        userI = true;
    }
}

function userActiveIndex(){
    userI ? registerPart.style.display = "none" : searchRestos.style.margin = "0";
    userI ? userI = false : searchBut.style.margin = " 0 0 0 1em";
}

function restoActive(){
    getLocalsInformation();
    const localconf = JSON.parse(localStorage.getItem("locals"));
    
    ((localconf == null) || (localconf.length == 0)) ? indexLocals = -10 : indexLocals = localconf.length - 1;

    if(indexLocals == -10){
        document.getElementById("articlesContainer").innerHTML +=`
        <p>No se encuentran locales con esas características</p>`
        document.getElementById("articlesContainer").style.height = "29em";
        document.querySelector("body").style.overflow = "hidden";
        document.querySelector("body").style.height = "100vh";
    }else if(indexLocals <= 2){
        document.getElementById("articlesContainer").style.height = "29em";
        document.querySelector("body").style.overflow = "hidden";
        document.querySelector("body").style.height = "100vh";
    }else if(indexLocals <= 5){
        document.getElementById("articlesContainer").style.height = "56em";
    }else if(indexLocals <= 8){
        document.getElementById("articlesContainer").style.height = "83em";
    }

    for(let i = 0; i <= indexLocals; i++){
        document.getElementById("articlesContainer").innerHTML += `
            <article ${localconf[i].localImage}>
                <div class="img"></div>
                <div class="info">
                    <h2>${localconf[i].localName}</h2>
                    <p>${localconf[i].localSurname}</p>
                    <p>◉ ${localconf[i].localCity}</p>
                    <p>- ${localconf[i].localAction}</p>
                </div>
                <a href="${localconf[i].localURL}" class="but"><button>VER MÁS...</button></a>
            </article>
        `
    }
}

function restoListActive(){
    getLocalsInformation();
    const localconf = JSON.parse(localStorage.getItem("locals"));
    
    localconf == null ? console.log("|No locals active|") : indexLocals = localconf.length - 1;
}

function logOut(){
    sessionStorage.removeItem("indice");
    userText.innerHTML = "";
    location.reload();
}

function userInfoOpen(){
    document.querySelector("#userInfo").style.display = "block";
    document.querySelector("#articleBack").style.display = "block";
}

function userInfoClose(){
    userInfo.style.display = "none";
    document.querySelector("#userInfo").style.display = "none";
    document.querySelector("#articleBack").style.display = "none";
}

function pagesListOpen(){
    document.querySelector("#pagessListB").style.display = "block";
    document.querySelector("#articleBack").style.display = "block";
}

function pagesListClose(){
    document.querySelector("#pagessListB").style.display = "none";
    document.querySelector("#articleBack").style.display = "none";
}

function info(){
    if(sessionStorage.getItem("indice") == null){
        alert("No hay ningun usuario iniciado.")
    }else{
        const userconf = JSON.parse(localStorage.getItem("users"));
        indice = JSON.parse(sessionStorage.getItem("indice"));
        namee = userconf[indice].namee;
        phone = userconf[indice].phone;
        adress = userconf[indice].adress;
        floor = userconf[indice].floor;
        dtt = userconf[indice].dtt;
    }
}

function regOut(){
    localStorage.removeItem("users");
    alert("Registro limpio");
    sessionStorage.removeItem("indice");
    userText.innerHTML = "";
    location.reload();
}

function signUp(){
    password = document.getElementById("password").value;
    pssconf = document.getElementById("pssconf").value;
    namee = document.getElementById("user").value;
    phone = document.getElementById("phone").value;
    adress = document.getElementById("adress").value;
    floor = document.getElementById("floor").value;
    dtt = document.getElementById("dtt").value;


    passValid = password == pssconf ? true : false;
    passValid2 = ((password == "") || (namee == "")) ? true : false;

    const userconf = JSON.parse(localStorage.getItem("users")) || [];

    if((passValid == false) || (passValid2 == true)){
        swal("Las constraseñas no coinciden", "o algunos espacios se encuentran vacíos.", "error");
    }else if(userconf == null){
        user = new User(namee, password, phone, adress, floor, dtt);
        userconf.push(user);
        localStorage.setItem("users", JSON.stringify(userconf));
        swal({
            icon: "success",
            title: "Creando usuario...",
            text: "Enviando a base de datos...",
            button: false,
            timer: 1000,
        });
        setTimeout("location.reload(true);", 1050);
    }else if(userconf != null){
        let maxUsers = userconf.length - 1;
        let userExist = false;
        for(let i = 0; i <= maxUsers; i++){
            if(userExist == true){
                userExist = true;
            }else if(userconf[i].namee == namee){
                userExist = true;
            } else {
                userExist = false;
            }
        }
        if(userExist == true){
            swal("Este usuario ya existe", "Inicie sesión o utilice otro usuario", "error");
        }else{
            user = new User(namee, password, phone, adress, floor, dtt);
            userconf.push(user);
            localStorage.setItem("users", JSON.stringify(userconf));
            swal({
                icon: "success",
                title: "Creando usuario...",
                text: "Enviando a base de datos...",
                button: false,
                timer: 1000,
            });
            setTimeout("location.reload(true);", 1050);
        }
    }
}

async function getLocalsInformation(){
    try{
        let response = await fetch("../json/localsData.json");
        let localsData = await response.json();
        localStorage.setItem("locals", JSON.stringify(localsData));
    }catch(error){
        console.log("error 404 localsData");
    }
}

function showLocals(){
    const localconf = JSON.parse(localStorage.getItem("locals"));
    let indexLocals;
    localconf == null ? console.log("|No locals active|") : indexLocals = localconf.length - 1;
    let localList = document.getElementById("locals");

    for(let i = 0; i <= indexLocals; i++){
        localList.innerHTML += `
        <label>◉ ${localconf[i].localName}</label><br>
        `
    }
}

function deleteLastLocal(){
    const localdel = JSON.parse(localStorage.getItem("locals"));
    localdel.pop();
    localStorage.setItem("locals", JSON.stringify(localdel));
    location.reload();
}

function deleteFirstLocal(){
    const localdel = JSON.parse(localStorage.getItem("locals"));
    localdel.shift();
    localStorage.setItem("locals", JSON.stringify(localdel));
    location.reload();
}

function userActiveInfo(){
    indice = JSON.parse(sessionStorage.getItem("indice"));
    if(indice != null){
        const userconf = JSON.parse(localStorage.getItem("users"));
        
        document.querySelector("#formUser").innerHTML = `
            <label for="">Usuario:</label>
            <input type="text" name="" autofocus placeholder="${userconf[indice].namee}" id="user">
            <label for="">Nueva contraseña:</label>
            <input type="text" name="" placeholder="**************" id="password"><br>
            <label for="">Télefono:</label>
            <input type="number" placeholder="${userconf[indice].phone}" id="phone">
            <label for="">Antigua contraseña:</label>
            <input type="text" name="" placeholder="**************" id="pssconf">
            <label for="">Dirección:</label>
            <input type="text" placeholder="${userconf[indice].adress}" id="adress">
            <label for="">Piso:</label>
            <input class="short" type="number" min="-5" max="20" name="" placeholder="${userconf[indice].floor}" id="floor">
            <label for="">Dto:</label>
            <input class="short" type="number" min="0" max="30" name="" placeholder="${userconf[indice].dtt}" id="dtt">
            <label for=""><i>(0 = PB)</i></label><br>
        `
    }
}

function editUserInfo(){
    indice = JSON.parse(sessionStorage.getItem("indice"));
    if(indice != null){
        const userconf = JSON.parse(localStorage.getItem("users"));
        
        password = document.getElementById("password").value;
        pssconf = document.getElementById("pssconf").value;
        namee = document.getElementById("user").value;
        phone = document.getElementById("phone").value;
        adress = document.getElementById("adress").value;
        floor = document.getElementById("floor").value;
        dtt = document.getElementById("dtt").value;


        passValid = userconf[indice].password == pssconf ? true : false;

        if(passValid == false){
            swal("Las constraseñas no coinciden", "o algunos espacios se encuentran vacíos.", "error");
        }else{
            userconf[indice].namee = namee || userconf[indice].namee;
            userconf[indice].password = password || userconf[indice].password;
            userconf[indice].phone = phone || userconf[indice].phone;
            userconf[indice].adress = adress || userconf[indice].adress;
            userconf[indice].floor = floor || userconf[indice].floor;
            userconf[indice].dtt = dtt || userconf[indice].dtt;
            localStorage.setItem("users", JSON.stringify(userconf));
            swal({
                icon: "success",
                title: "Usuario editado",
                text: "Enviando a base de datos...",
                button: false,
                timer: 1000,
            });
            setTimeout("location.reload(true);", 1050);
        }
    }else{swal("No hay usuario iniciado", "Por favor inicie sesión", "warning");}
}

function searchBar(){
    if(document.querySelector("#searchRestos").value == ""){
        getLocalsInformation();
        location.reload();
    }else{
        searchFilter();
    }
}

function searchFilter(){
    let restoReg = JSON.parse(localStorage.getItem("locals"));
    let restoFiltered
    let restoFilteredName = (restoReg.filter(function(resto) {
        return resto.localName === document.querySelector("#searchRestos").value
    }))

    let restoFilteredCity = (restoReg.filter(function(resto) {
        return resto.localCity === document.querySelector("#searchRestos").value
    }))

    let restoFilteredAction = (restoReg.filter(function(resto) {
        return resto.localAction === document.querySelector("#searchRestos").value
    }))

    let restoFilteredSurname = (restoReg.filter(function(resto) {
        return resto.localSurname === document.querySelector("#searchRestos").value
    }))

    if(restoFilteredName.length >= 1){
        restoFiltered = restoFilteredName;
        console.log(restoFiltered);
    } else if(restoFilteredCity.length >= 1){
        restoFiltered = restoFilteredCity;
        console.log(restoFiltered);
    } else if(restoFilteredAction.length >= 1){
        restoFiltered = restoFilteredAction;
        console.log(restoFiltered);
    } else if(restoFilteredSurname.length >= 1){
        restoFiltered = restoFilteredSurname;
        console.log(restoFiltered);
    } 


    restoFiltered != null ? localStorage.setItem("locals", JSON.stringify(restoFiltered)) : localStorage.removeItem("locals");
    location.reload();
    
    
}

//---------------FUNCTIONS-ACTIVE---------------//

userActive();
restoListActive();


//nav
document.querySelector("#pagesList").addEventListener('click', () => {
    pagesListOpen();
});

document.querySelector("#articleBack").addEventListener('click', () => {
    pagesListClose();
});

document.querySelector("#userTextt").addEventListener('click', () => {
    userInfoOpen();
});

document.querySelector("#articleBack").addEventListener('click', () => {
    userInfoClose();
});

logOutt.addEventListener('click', () => {
    logOut();
});
//navEnd