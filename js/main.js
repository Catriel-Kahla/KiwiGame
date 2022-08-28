//aside

let breadStock = 0;
let appleStock = 0;
let carrotStock = 0;
let pumpkinStock = 0;
let pumpkinPieStock = 0;
let money = 0;

let ready = false;
let appleCustomer = 0;
let breadCustomer = 0;
let carrotCustomer = 0;
let pumpkinPieCustomer = 0;

let fullAppleStock = 20;
let fullBreadStock = 20;

let sound1 = new Audio();
sound1.src = "sounds/Blackberry-SMS.mp3";

let sound2 = new Audio();
sound2.src = "sounds/explosion-bang_1635134169.mp3";

let sound3 = new Audio();
sound3.src = "sounds/pacman-come-cereza_1635131044.mp3";

//awards = [ofertar, aumentar]

let breadAwards = [false, false];
let appleAwards = [false, false];
let carrotAwards = [false, false];
let pumpkinPieAwards = [false, false];

//foods

let foods = [
    {
        name: "Bread",
        price: 10,
        stockLimit: 20,
        offer: 0,
        increase: 0,
        sold: 0,
    },
    {
        name: "Apple",
        price: 20,
        stockLimit: 20,
        offer: 0,
        increase: 0,
        sold: 0,
    },{
        name: "Carrot",
        price: 18,
        stockLimit: 20,
        offer: 0,
        increase: 0,
        lock: true,
        sold: 0,
    },
    {
        name: "Pumpkin",
        price: 20,
        stockLimit: 10,
        offer: 0,
        increase: 0,
        lock: true,
    },
    {
        name: "PumpkinPie",
        price: 25,
        stockLimit: 15,
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

function sell(){
    readyToSell();
    if(ready == false){
        sound2.play();
        swal("Prepara más comida!", {
            icon: "warning",
        });
    }else{
        money = money + breadCustomer*(foods[0].price+foods[0].increase-foods[0].offer);
        money = money + appleCustomer*(foods[1].price+foods[1].increase-foods[1].offer);
        money = money + carrotCustomer*(foods[2].price+foods[2].increase-foods[2].offer);
        money = money + pumpkinPieCustomer*(foods[4].price+foods[4].increase-foods[4].offer);
        breadStock = breadStock - breadCustomer;
        appleStock = appleStock - appleCustomer;
        carrotStock = carrotStock - carrotCustomer;
        pumpkinPieStock = pumpkinPieStock - pumpkinPieCustomer;
        foods[0].sold = foods[0].sold + breadCustomer;
        foods[1].sold = foods[1].sold + appleCustomer;
        foods[2].sold = foods[2].sold + carrotCustomer;
        foods[4].sold = foods[4].sold + pumpkinPieCustomer;

        document.getElementById("breadStock").innerHTML = "x" + breadStock;
        document.getElementById("appleStock").innerHTML = "x" + appleStock;
        document.getElementById("carrotStock").innerHTML = "x" + carrotStock;
        document.getElementById("pumpkinPieStock").innerHTML = "x" + pumpkinPieStock;
        document.getElementById("cash").innerHTML = "$" + money;

        ask();
    }
    foodLeft();
}

function makeBread(){
    breadStock = breadStock + 1;
    document.getElementById("breadStock").innerHTML = "x" + breadStock;
    foodLeft();
}

function makeApple(){
    appleStock = appleStock + 1;
    document.getElementById("appleStock").innerHTML = "x" + appleStock;
    foodLeft();
}

function makeCarrot(){
    carrotStock = carrotStock + 1;
    document.getElementById("carrotStock").innerHTML = "x" + carrotStock;
    foodLeft();
}

function makePumpkin(){
    pumpkinStock = pumpkinStock + 1;
    document.getElementById("pumpkinStock").innerHTML = "x" + pumpkinStock;
    foodLeft();
}

function makePumpkinPie(){
    if(pumpkinStock>=2){
        pumpkinStock = pumpkinStock - 2;
        pumpkinPieStock = pumpkinPieStock + 1;
        document.getElementById("pumpkinPieStock").innerHTML = "x" + pumpkinPieStock;
        document.getElementById("pumpkinStock").innerHTML = "x" + pumpkinStock;
        foodLeft();
    }else if(pumpkinPieLimit==true){
        
    }else{alert("Necesitas más calabazas");}
}

function foodLeft(){
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
    
}

function ask(){
    if(foods[0].offer!=0){
        breadCustomer = Math.round(Math.random() * (16 - 1) + 1);
    }else if(foods[0].increase!=0){
        breadCustomer = Math.round(Math.random() * (6 - 1) + 1);
    }else{
        breadCustomer = Math.round(Math.random() * (8 - 1) + 1);
    }

    if(foods[1].offer!=0){
        appleCustomer = Math.round(Math.random() * (13 - 1) + 1);
    }else if(foods[1].increase!=0){
        appleCustomer = Math.round(Math.random() * (4 - 0) + 0);
    }else{
        appleCustomer = Math.round(Math.random() * (6 - 0) + 0);
    }

    if(foods[2].lock==true){
        carrotCustomer = 0;
    }else if(foods[2].offer!=0){
        carrotCustomer = Math.round(Math.random() * (20 - 1) + 1);
    }else if(foods[2].increase!=0){
        carrotCustomer = Math.round(Math.random() * (5 - 0) + 0);
    }else{
        carrotCustomer = Math.round(Math.random() * (10 - 0) + 0);
    }

    if(foods[4].lock==true){
        pumpkinPieCustomer = 0;
    }else if(foods[4].offer!=0){
        pumpkinPieCustomer = Math.round(Math.random() * (9 - 0) + 0);
    }else if(foods[4].increase!=0){
        pumpkinPieCustomer = Math.round(Math.random() * (1 - 0) + 0);
    }else{
        pumpkinPieCustomer = Math.round(Math.random() * (3 - 0) + 0);
    }

    document.getElementById("askCustomer").innerHTML = `
    <label class="pedido">Pedido</label>
        <div>
            <div class="div__item">
                <img src="images/bread.png" alt="bread">
                <label id="breadAsk">x${breadCustomer}</label>
            </div>
            <div class="div__item">
                <img src="images/apple.png" alt="apple">
                <label id="appleAsk">x${appleCustomer}</label>
            </div>
            <div class="div__item">
                <img src="images/carrot.png" alt="carrot">
                <label id="carrotAsk">x${carrotCustomer}</label>
            </div>
            <div class="div__item">
                <img src="images/pumpkin_pie.png" alt="pumpkinPie">
                <label id="pumpkinPieAsk">x${pumpkinPieCustomer}</label>
            </div>
        </div>
    `
}

function readyToSell(){
    ((appleStock>=appleCustomer) && (breadStock>=breadCustomer)) ? ready=true : ready=false;
    ((carrotStock>=carrotCustomer) && (ready==true)) ? ready=true : ready=false;
    ((pumpkinPieStock>=pumpkinPieCustomer) && (ready==true)) ? ready=true : ready=false;
}

function closeLockedItems(){
    document.getElementById("lockedItemsShop").style.display = "none";
    document.getElementById("shop").style.display = "flex";
}
function openLockedItems(){
    document.getElementById("lockedItemsShop").style.display = "flex";
    document.getElementById("shop").style.display = "none";
}

function closeUnlockedItems(){
    document.getElementById("unlockedItems").style.display = "none";
    document.getElementById("itemsMod").style.display = "flex";
}
function openUnlockedItems(){
    document.getElementById("unlockedItems").style.display = "flex";
    document.getElementById("itemsMod").style.display = "none";
}

//funtion acctions

function foodNormal(){
    foods[0,1].offer = 0;
    foods[0,1].increase = 0;
    document.getElementById("foodNormal").style.backgroundColor = "rgba(145, 255, 163, 0.966)";
    document.getElementById("breadOf").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
    document.getElementById("breadIn").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
    document.getElementById("appleOf").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
    document.getElementById("appleIn").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
}



// do


document.getElementById("breadBut").addEventListener('click', () => {
    makeBread();
});

document.getElementById("appleBut").addEventListener('click', () => {
    makeApple();
});

document.getElementById("carrotBut").addEventListener('click', () => {
    makeCarrot();
});

document.getElementById("pumpkinBut").addEventListener('click', () => {
    makePumpkin();
});

document.getElementById("pumpkinPieBut").addEventListener('click', () => {
    makePumpkinPie();
});

document.getElementById("vender").addEventListener('click', () => {
    sell();
});


ask();


//actions

document.getElementById("foodNormal").addEventListener('click', () => {
    foodNormal();
    ask();
    sound3.play();
});

document.getElementById("breadOf").addEventListener('click', () => {
    if(breadAwards[0] == true){
        foods[0].increase = 0;
        foods[0].offer = 2;
        document.getElementById("breadOf").style.backgroundColor = "rgba(145, 255, 163, 0.966)";
        document.getElementById("foodNormal").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("breadIn").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        ask();
        sound3.play();
    }else{
        swal("Necesitas comprar este elemento.", {
            icon: "warning",
        });
    }
});

document.getElementById("breadIn").addEventListener('click', () => {
    if(breadAwards[1]==true){
        foods[0].increase = 4;
        foods[0].offer = 0;
        document.getElementById("breadOf").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("foodNormal").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("breadIn").style.backgroundColor = "rgba(145, 255, 163, 0.966)";
        ask();
        sound3.play();
    }else{
        swal("Necesitas comprar este elemento.", {
            icon: "warning",
        });
    }
});

document.getElementById("appleOf").addEventListener('click', () => {
    if(appleAwards[0]==true){
        foods[1].increase = 0;
        foods[1].offer = 6;
        document.getElementById("appleIn").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("foodNormal").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("appleOf").style.backgroundColor = "rgba(145, 255, 163, 0.966)";
        ask();
        sound3.play();
    }else{
        swal("Necesitas comprar este elemento.", {
            icon: "warning",
        });
    }
});

document.getElementById("appleIn").addEventListener('click', () => {
    if(appleAwards[1]==true){
        foods[1].increase = 2;
        foods[1].offer = 0;
        document.getElementById("appleOf").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("foodNormal").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("appleIn").style.backgroundColor = "rgba(145, 255, 163, 0.966)";
        ask();
        sound3.play();
    }else{
        swal("Necesitas comprar este elemento.", {
            icon: "warning",
        });
    }
});

//awards

document.getElementById("aBreadOf").addEventListener('click', () => {
    if(money>=500){
        money=money-500;
        document.getElementById("aBreadOf").style.display="none";
        breadAwards[0] = true;
        document.getElementById("cash").innerHTML = "$" + money;
        sound1.play();
    }else{
        sound2.play();
        alert("Dinero insuficiente");
    }
});

document.getElementById("aAppleOf").addEventListener('click', () => {
    if(money>=750){
        money=money-750;
        document.getElementById("aAppleOf").style.display="none";
        appleAwards[0] = true;
        document.getElementById("cash").innerHTML = "$" + money;
        sound1.play();
    }else{
        sound2.play();
        alert("Dinero insuficiente");
    }
});

document.getElementById("aBreadIn").addEventListener('click', () => {
    if(money>=750){
        money=money-750;
        document.getElementById("aBreadIn").style.display="none";
        breadAwards[1] = true;
        document.getElementById("cash").innerHTML = "$" + money;
        sound1.play();
    }else{
        sound2.play();
        alert("Dinero insuficiente");
    }
});

document.getElementById("aAppleIn").addEventListener('click', () => {
    if(money>=1000){
        money=money-1000;
        document.getElementById("aAppleIn").style.display="none";
        appleAwards[1] = true;
        document.getElementById("cash").innerHTML = "$" + money;
        sound1.play();
    }else{
        sound2.play();
        alert("Dinero insuficiente");
    }
});

document.getElementById("aBreadStockIn").addEventListener('click', () => {
    if(money>=1000){
        money=money-1000;
        document.getElementById("aBreadStockIn").style.display="none";
        foods[0].stockLimit = 30;
        document.getElementById("cash").innerHTML = "$" + money;
        sound1.play();
        foodLeft();
    }else{
        sound2.play();
        alert("Dinero insuficiente");
    }
});

document.getElementById("aAppleStockIn").addEventListener('click', () => {
    if(money>=1000){
        money=money-1000;
        document.getElementById("aAppleStockIn").style.display="none";
        foods[1].stockLimit = 30;
        document.getElementById("cash").innerHTML = "$" + money;
        sound1.play();
        foodLeft();
    }else{
        sound2.play();
        alert("Dinero insuficiente");
    }
});


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
});

//close windows

document.getElementById("closeBut").addEventListener('click', () => {
    closeLockedItems()
});

document.getElementById("shop").addEventListener('click', () => {
    openLockedItems()
});

document.getElementById("closeButD").addEventListener('click', () => {
    closeUnlockedItems()
});

document.getElementById("itemsMod").addEventListener('click', () => {
    openUnlockedItems()
});