//aside

//const { default: swal } = require("sweetalert");
let money = 0;

let ready = false;
let appleCustomer = 0;
let breadCustomer = 0;
let carrotCustomer = 0;
let pumpkinPieCustomer = 0;

let fullAppleStock = 20;
let fullBreadStock = 20;

let customer = true;

let sound1 = new Audio();
sound1.src = "../sounds/Blackberry-SMS.mp3";

let sound2 = new Audio();
sound2.src = "../sounds/explosion-bang_1635134169.mp3";

let sound3 = new Audio();
sound3.src = "../sounds/pacman-come-cereza_1635131044.mp3";

//awards = [ofertar, aumentar]

let breadAwards = [false, false];
let appleAwards = [false, false];
let carrotAwards = [false, false];
let pumpkinPieAwards = [false, false];

//foods

let foods = [
    {
        name: "Bread",
        stock: 0,
        price: 10,
        stockLimit: 20,
        offer: 0,
        increase: 0,
        sold: 0,
    },
    {
        name: "Apple",
        stock: 0,
        price: 20,
        stockLimit: 20,
        offer: 0,
        increase: 0,
        sold: 0,
    }, {
        name: "Carrot",
        stock: 0,
        price: 18,
        stockLimit: 20,
        offer: 0,
        increase: 0,
        lock: true,
        sold: 0,
    },
    {
        name: "Pumpkin",
        stock: 0,
        price: 20,
        stockLimit: 10,
        offer: 0,
        increase: 0,
        lock: true,
    },
    {
        name: "PumpkinPie",
        stock: 0,
        price: 25,
        stockLimit: 15,
        offer: 0,
        increase: 0,
        lock: true,
        sold: 0,
    },
    {
        name: "Wheat",
        stock: 0,
        price: 0,
        stockLimit: 45,
        offer: 0,
        increase: 0,
        lock: true,
        sold: 0,
    }

]

let pumpkinPieLimit = false;


let level = {
    name: "testing",
    cash: 0,
    bread: 0,
    apple: 0,
    carrot: 0,
    pumpkin: 0,
    pumpkinPie: 0,
    unlockedLevel: 0,
    appleItemStock: false,
    appleItemPrice: false,
    appleItemOffer: false,
    breadItemStock: false,
    breadItemPrice: false,
    breadItemOffer: false,

}


//functions

function createApple() {
    let appleTimer = Math.round(Math.random() * (20 - 5) + 5) * 1000;
    setTimeout(() => {
        document.getElementById("appleTree").style.display = "inline-block";
    }, appleTimer);
}
function createAppleB() {
    let appleTimer = Math.round(Math.random() * (20 - 5) + 5) * 1000;
    setTimeout(() => {
        document.getElementById("appleTreeB").style.display = "inline-block";
    }, appleTimer);
}
function createWheat() {
    let wheatTimer = Math.round(Math.random() * (10 - 4) + 4) * 1000;
    setTimeout(() => {
        document.getElementById("wheatSeed").src = "../images/wheat_plant.png";
    }, wheatTimer);
}
function createWheatB() {
    let wheatTimer = Math.round(Math.random() * (10 - 4) + 4) * 1000;
    setTimeout(() => {
        document.getElementById("wheatSeedB").src = "../images/wheat_plant.png";
    }, wheatTimer);
}
function createWheatC() {
    let wheatTimer = Math.round(Math.random() * (10 - 4) + 4) * 1000;
    setTimeout(() => {
        document.getElementById("wheatSeedC").src = "/images/wheat_plant.png";
    }, wheatTimer);
}

function makeWheat() {
    foods[5].stock = foods[5].stock + 1;
    document.getElementById("wheatStock").innerHTML = "x" + foods[5].stock;
}

function makeBread() {
    if (foods[5].stock > 2) {
        foods[5].stock = foods[5].stock - 3;
        foods[0].stock = foods[0].stock + 1;
        document.getElementById("breadStock").innerHTML = "x" + foods[0].stock;
        document.getElementById("wheatStock").innerHTML = "x" + foods[5].stock;
    } else {
        swal("Necesitas cultivar 3 de trigo para crear 1 pan", {
            icon: "warning",
        });
    }
}

function makeApple() {
    foods[1].stock = foods[1].stock + 1;
    document.getElementById("appleStock").innerHTML = "x" + foods[1].stock;
    //foodLeft();
}

function makeCarrot() {
    foods[2].stock = foods[2].stock + 1;
    document.getElementById("carrotStock").innerHTML = "x" + foods[2].stock;
    foodLeft();
}

function makePumpkin() {
    foods[3].stock = foods[3].stock + 1;
    document.getElementById("pumpkinStock").innerHTML = "x" + foods[3].stock;
    foodLeft();
}

function makePumpkinPie() {
    if (foods[3].stock >= 2) {
        foods[3].stock = foods[3].stock - 2;
        foods[4].stock = foods[4].stock + 1;
        document.getElementById("pumpkinPieStock").innerHTML = "x" + foods[4].stock;
        document.getElementById("pumpkinStock").innerHTML = "x" + foods[3].stock;
    } else if (pumpkinPieLimit == true) {

    } else { alert("completar") }
}

function sStorageGet() {

    if (sessionStorage.getItem("foods")) {
        foods = JSON.parse(sessionStorage.getItem("foods"));
        money = JSON.parse(sessionStorage.getItem("money"));
        
        document.getElementById("wheatStock").innerHTML = "x" + foods[5].stock;
        document.getElementById("breadStock").innerHTML = "x" + foods[0].stock;
        document.getElementById("appleStock").innerHTML = "x" + foods[1].stock;
        document.getElementById("carrotStock").innerHTML = "x" + foods[2].stock;
        document.getElementById("pumpkinStock").innerHTML = "x" + foods[3].stock;
        document.getElementById("pumpkinPieStock").innerHTML = "x" + foods[4].stock;
        document.getElementById("cash").innerHTML = "$" + money;
    }
}

function sStorageSet() {
    sessionStorage.setItem("foods", JSON.stringify(foods));
    sessionStorage.setItem("money", money);
}

/*function foodLeft(){
    if(appleStock==foods[1].stockLimit){
        document.getElementById("appleSignD").style.backgroundColor = "rgba(255, 190, 190, 0.808)";
    }else if(appleStock==foods[1].stockLimit+1){
        document.getElementById("appleSignD").style.backgroundColor = "rgba(255, 190, 190, 0.808)";
        appleStock = appleStock - 1;
        document.getElementById("appleStock").innerHTML = "x" + appleStock;
    }else{
        document.getElementById("appleSignD").style.backgroundColor = "rgba(215, 245, 250, 0.596)";
    }

    if(breadStock==foods[0].stockLimit){
        document.getElementById("breadSignD").style.backgroundColor = "rgba(255, 190, 190, 0.808)";
    }else if(breadStock==foods[0].stockLimit+1){
        document.getElementById("breadSignD").style.backgroundColor = "rgba(255, 190, 190, 0.808)";
        breadStock = breadStock - 1;
        document.getElementById("breadStock").innerHTML = "x" + breadStock;
    }else{
        document.getElementById("breadSignD").style.backgroundColor = "rgba(215, 245, 250, 0.596)";
    }

    if(carrotStock==foods[2].stockLimit){
        document.getElementById("carrotSignD").style.backgroundColor = "rgba(255, 190, 190, 0.808)";
    }else if(carrotStock==foods[2].stockLimit+1){
        document.getElementById("carrotSignD").style.backgroundColor = "rgba(255, 190, 190, 0.808)";
        carrotStock = carrotStock - 1;
        document.getElementById("carrotStock").innerHTML = "x" + carrotStock;
    }else{
        document.getElementById("carrotSignD").style.backgroundColor = "rgba(215, 245, 250, 0.596)";
    }

    if(pumpkinStock==foods[3].stockLimit){
        document.getElementById("pumpkinSignD").style.backgroundColor = "rgba(255, 190, 190, 0.808)";
    }else if(pumpkinStock==foods[3].stockLimit+1){
        document.getElementById("pumpkinSignD").style.backgroundColor = "rgba(255, 190, 190, 0.808)";
        pumpkinStock = pumpkinStock - 1;
        document.getElementById("pumpkinStock").innerHTML = "x" + pumpkinStock;
    }else{
        document.getElementById("pumpkinSignD").style.backgroundColor = "rgba(215, 245, 250, 0.596)";
    }

    if(pumpkinPieStock==foods[4].stockLimit){
        document.getElementById("pumpkinPieSignD").style.backgroundColor = "rgba(255, 190, 190, 0.808)";
        pumpkinPieLimit = true;
    }else if(pumpkinPieStock==foods[4].stockLimit+1){
        document.getElementById("pumpkinPieSignD").style.backgroundColor = "rgba(255, 190, 190, 0.808)";
        pumpkinPieLimit = true;
        pumpkinPieStock = pumpkinPieStock - 1;
        document.getElementById("pumpkinPieStock").innerHTML = "x" + pumpkinPieStock;
    }else{
        document.getElementById("pumpkinPieSignD").style.backgroundColor = "rgba(215, 245, 250, 0.596)";
        pumpkinPieLimit = false;
    }
    
}*/





// do


document.getElementById("breadBut").addEventListener('click', () => {
    makeBread();
});

document.getElementById("appleTree").addEventListener('click', () => {
    document.getElementById("appleTree").style.display = "none";
    makeApple();
    createApple();
});
document.getElementById("appleTreeB").addEventListener('click', () => {
    document.getElementById("appleTreeB").style.display = "none";
    makeApple();
    createAppleB();
});
document.getElementById("wheatSeed").addEventListener('click', () => {
    document.getElementById("wheatSeed").src = "../images/wheat_seeds.png";
    makeWheat();
    createWheat();
});
document.getElementById("wheatSeedB").addEventListener('click', () => {
    document.getElementById("wheatSeedB").src = "../images/wheat_seeds.png";
    makeWheat();
    createWheatB();
});
document.getElementById("wheatSeedC").addEventListener('click', () => {
    document.getElementById("wheatSeedC").src = "../images/wheat_seeds.png";
    makeWheat();
    createWheatC();
});

document.getElementById("next").addEventListener('click', () => {
    sStorageSet();
    location.href = "../index.html";
});

createWheat();
createWheatB();
createWheatC();
sStorageGet();


/*document.getElementById("carrotBut").addEventListener('click', () => {
    makeCarrot();
});

document.getElementById("pumpkinBut").addEventListener('click', () => {
    makePumpkin();
});*/

/*document.getElementById("pumpkinPieBut").addEventListener('click', () => {
    makePumpkinPie();
});*/

/*



//locked buttons

document.getElementById("firstLockedBut").addEventListener('click', () => {
    if((foods[0].sold < 50)||(foods[1].sold < 50)){
        swal("Necesitas vender 50 manzanas y 50 panes. Has vendido " + foods[0].sold + " panes y "
        + foods[1].sold + " manzanas.", {
            icon: "error",
          });
    }else{
        foods[2].lock = false;
        ask();
        swal({
            icon: "success",
          });
        document.getElementById("carrotBut").style.display="flex";
        document.getElementById("firstLockedBut").style.display="none";
    }
});

document.getElementById("secondLockedBut").addEventListener('click', () => {
    if((foods[1].sold < 150)||(foods[2].sold < 75)){
        swal("Necesitas vender 150 manzanas y 75 zanahorias. Has vendido " + foods[1].sold + " manzanas y "
        + foods[2].sold + " zanahorias.", {
            icon: "error",
          });

    }else{
        foods[3].lock = false;
        foods[4].lock = false;
        ask();
        swal({
            icon: "success",
          });
        document.getElementById("pumpkinBut").style.display="flex";
        document.getElementById("secondLockedBut").style.display="none";
    }
});*/



