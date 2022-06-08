
//---------------OBJECTS---------------//

let butSignIn = document.getElementById("signIn");

let userText = document.getElementById("userText");
let userInfo = document.getElementById("userInfo");
let articleUser = document.getElementById("articleUser");

let logOutt = document.querySelector("#logOut");

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

//---------------FUNCTIONS---------------//

function userActive(){
    indice = JSON.parse(sessionStorage.getItem("indice"));
    if(indice == null){
        console.log("|No user active|");
    }else{
        const userconf = JSON.parse(localStorage.getItem("users"));
        document.getElementById("userTextt").innerHTML = "@" + userconf[indice].namee;
        console.log("|User active " + userconf[indice].namee + "|");

        document.getElementById("articleUser").style.animationName = "rightOpen";
        document.getElementById("articleUser").style.right = "1em";
        document.querySelector(".sec1__imgkw").style.animationName = "userClose";
        document.querySelector(".sec1__imgkw").style.marginBottom = "5em";
        document.querySelector(".intro div").style.display = "none";
        document.querySelector(".but").style.display = "none";
        document.querySelector(".intro a").style.display = "none";
        document.getElementById("articleResto").style.animationName = "restoOpen";
        document.getElementById("articleResto").style.bottom = "10em";
        document.getElementById("articleLinks").style.animationName = "linksOpen";
        document.getElementById("articleLinks").style.left = "1em";

        
    }
}

function signIn(){
    namee = document.getElementById("user").value;
    password = document.getElementById("password").value;

    if((namee == "") || (password == "")){
        swal("Completá con tus datos!", "No dejes espacios en blanco", "warning");
    }else if(localStorage.getItem("users") == null){
        swal("Usuario no registrado!", "", "error");
    }else if(localStorage.getItem("users") != null){
        const userconf = JSON.parse(localStorage.getItem("users"));
        let maxUsers = userconf.length - 1;
        let indice;

        for(let i = 0; i <= maxUsers; i++){
            userconf[i].namee == namee && (indice = i);
        }


        if(indice == null){
            swal("Usuario no registrado!", "", "error");
        }else if((userconf[indice].namee == namee) && (userconf[indice].password == password)){
            userTextt.innerHTML = "@" + namee;
            sessionStorage.setItem("indice", JSON.stringify(indice));
            swal({
                icon: "success",
                title: namee,
                text: "Ingresando...",
                button: false,
                timer: 1000,
            });
            setTimeout("location.reload(true);", 1050);
        }else{
            swal("El usuario y la contraseña no coinciden!", "", "error");
        }
    }
}

function logOut(){
    sessionStorage.removeItem("indice");
    userTextt.innerHTML = "";
    location.reload();
}

function userInfoOpen(){
    document.getElementById("userInfo").style.display = "block";
}

function userInfoClose(){
    document.getElementById("userInfo").style.display = "none";
}

async function getLocalsInformation(){
    try{
        let response = await fetch("json/localsData.json");
        let localsData = await response.json();
        localStorage.setItem("locals", JSON.stringify(localsData));
    }catch(error){
        console.log("error 404 usersData");
    }
}



//---------------FUNCTIONS ACTIVE---------------//

userActive();
getLocalsInformation();

butSignIn.addEventListener('click', () => {
    signIn();
});

userTextt.addEventListener('click', () => {
    userInfoOpen();
});

userInfo.addEventListener('click', () => {
    userInfoClose();
});

logOutt.addEventListener('click', () => {
    logOut();
});

