//aside
let money = 0;

let ready = false;


let customer = {
    inShop: false,
    bread: 0,
    apple: 0,
    carrot: 0,
    pumpkinPie: 0,
};

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





//functions

function sell() {
    readyToSell();
    if (ready == false) {
        sound2.play();
        swal("Prepara más comida!", {
            icon: "warning",
        });
    } else {
        money = money + customer.bread * (foods[0].price + foods[0].increase - foods[0].offer);
        money = money + customer.apple * (foods[1].price + foods[1].increase - foods[1].offer);
        money = money + customer.carrot * (foods[2].price + foods[2].increase - foods[2].offer);
        money = money + customer.pumpkinPie * (foods[4].price + foods[4].increase - foods[4].offer);
        foods[0].stock = foods[0].stock - customer.bread;
        foods[1].stock = foods[1].stock - customer.apple;
        foods[2].stock = foods[2].stock - customer.carrot;
        foods[4].stock = foods[4].stock - customer.pumpkinPie;
        foods[0].sold = foods[0].sold + customer.bread;
        foods[1].sold = foods[1].sold + customer.apple;
        foods[2].sold = foods[2].sold + customer.carrot;
        foods[4].sold = foods[4].sold + customer.pumpkinPie;

        document.getElementById("breadStock").innerHTML = "x" + foods[0].stock;
        document.getElementById("appleStock").innerHTML = "x" + foods[1].stock;
        document.getElementById("carrotStock").innerHTML = "x" + foods[2].stock;
        document.getElementById("pumpkinPieStock").innerHTML = "x" + foods[4].stock;
        document.getElementById("cash").innerHTML = "$" + money;
        ask();

    }
    //foodLeft();
}

function customerIn() {
    if (customer.inShop == false) {
        customer.inShop = true;
        document.getElementById("custo").style.animation = "inshop 6s";
    } else {
        customer.inShop = false;
        document.getElementById("custo").style.animation = "outshop 2s"
        setTimeout(() => {
            customerIn();
        }, 2000);
    }
}
/*
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
*/

function ask() {
    if (foods[0].offer != 0) {
        customer.bread = Math.round(Math.random() * (16 - 1) + 1);
    } else if (foods[0].increase != 0) {
        customer.bread = Math.round(Math.random() * (6 - 1) + 1);
    } else {
        customer.bread = Math.round(Math.random() * (8 - 1) + 1);
    }

    if (foods[1].offer != 0) {
        customer.apple = Math.round(Math.random() * (13 - 1) + 1);
    } else if (foods[1].increase != 0) {
        customer.apple = Math.round(Math.random() * (4 - 0) + 0);
    } else {
        customer.apple = Math.round(Math.random() * (6 - 0) + 0);
    }

    if (foods[2].lock == true) {
        customer.carrot = 0;
    } else if (foods[2].offer != 0) {
        customer.carrot = Math.round(Math.random() * (20 - 1) + 1);
    } else if (foods[2].increase != 0) {
        customer.carrot = Math.round(Math.random() * (5 - 0) + 0);
    } else {
        customer.carrot = Math.round(Math.random() * (10 - 0) + 0);
    }

    if (foods[4].lock == true) {
        customer.pumpkinPie = 0;
    } else if (foods[4].offer != 0) {
        customer.pumpkinPie = Math.round(Math.random() * (9 - 0) + 0);
    } else if (foods[4].increase != 0) {
        customer.pumpkinPie = Math.round(Math.random() * (1 - 0) + 0);
    } else {
        customer.pumpkinPie = Math.round(Math.random() * (3 - 0) + 0);
    }

    document.getElementById("askCustomer").innerHTML = `
    <label class="pedido">Pedido</label>
        <div>
            <div class="div__item">
                <img src="images/bread.png" alt="bread">
                <label id="breadAsk">x${customer.bread}</label>
            </div>
            <div class="div__item">
                <img src="images/apple.png" alt="apple">
                <label id="appleAsk">x${customer.apple}</label>
            </div>
            <div class="div__item">
                <img src="images/carrot.png" alt="carrot">
                <label id="carrotAsk">x${customer.carrot}</label>
            </div>
            <div class="div__item">
                <img src="images/pumpkin_pie.png" alt="pumpkinPie">
                <label id="pumpkinPieAsk">x${customer.pumpkinPie}</label>
            </div>
        </div>
    `
    customerIn();
}

function readyToSell() {
    ((foods[1].stock >= customer.apple) && (foods[0].stock >= customer.bread)) ? ready = true : ready = false;
    ((foods[2].stock >= customer.carrot) && (ready == true)) ? ready = true : ready = false;
    ((foods[4].stock >= customer.pumpkinPie) && (ready == true)) ? ready = true : ready = false;
}

function closeLockedItems() {
    document.getElementById("lockedItemsShop").style.display = "none";
    document.getElementById("shop").style.display = "flex";
}
function openLockedItems() {
    document.getElementById("lockedItemsShop").style.display = "flex";
    document.getElementById("shop").style.display = "none";
}

function closeUnlockedItems() {
    document.getElementById("unlockedItems").style.display = "none";
    document.getElementById("itemsMod").style.display = "flex";
}
function openUnlockedItems() {
    document.getElementById("unlockedItems").style.display = "flex";
    document.getElementById("itemsMod").style.display = "none";
}

//funtion acctions

function foodNormal() {
    foods[0, 1].offer = 0;
    foods[0, 1].increase = 0;
    document.getElementById("foodNormal").style.backgroundColor = "rgba(145, 255, 163, 0.966)";
    document.getElementById("breadOf").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
    document.getElementById("breadIn").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
    document.getElementById("appleOf").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
    document.getElementById("appleIn").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
}

function sStorageGet() {
    

    if (sessionStorage.getItem("foods")) {
        foods = JSON.parse(sessionStorage.getItem("foods"));
        money = JSON.parse(sessionStorage.getItem("money"));
        document.getElementById("breadStock").innerHTML = "x" + foods[0].stock;
        document.getElementById("appleStock").innerHTML = "x" + foods[1].stock;
        document.getElementById("carrotStock").innerHTML = "x" + foods[2].stock;
        document.getElementById("pumpkinPieStock").innerHTML = "x" + foods[4].stock;
        document.getElementById("cash").innerHTML = "$" + money;
    }


    if (sessionStorage.getItem("customer")) {
        customer = JSON.parse(sessionStorage.getItem("customer"));
        document.getElementById("askCustomer").innerHTML = `
    <label class="pedido">Pedido</label>
        <div>
            <div class="div__item">
                <img src="images/bread.png" alt="bread">
                <label id="breadAsk">x${customer.bread}</label>
            </div>
            <div class="div__item">
                <img src="images/apple.png" alt="apple">
                <label id="appleAsk">x${customer.apple}</label>
            </div>
            <div class="div__item">
                <img src="images/carrot.png" alt="carrot">
                <label id="carrotAsk">x${customer.carrot}</label>
            </div>
            <div class="div__item">
                <img src="images/pumpkin_pie.png" alt="pumpkinPie">
                <label id="pumpkinPieAsk">x${customer.pumpkinPie}</label>
            </div>
        </div>
    `
    } else {
        ask();
    }
}

function sStorageSet() {
    sessionStorage.setItem("foods", JSON.stringify(foods));
    sessionStorage.setItem("money", money);
    sessionStorage.setItem("customer", JSON.stringify(customer));
}



// do

document.getElementById("vender").addEventListener('click', () => {
    sell();
});


sStorageGet();


//actions

document.getElementById("foodNormal").addEventListener('click', () => {
    foodNormal();
    ask();
    sound3.play();
});

document.getElementById("breadOf").addEventListener('click', () => {
    if (breadAwards[0] == true) {
        foods[0].increase = 0;
        foods[0].offer = 2;
        document.getElementById("breadOf").style.backgroundColor = "rgba(145, 255, 163, 0.966)";
        document.getElementById("foodNormal").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("breadIn").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        ask();
        sound3.play();
    } else {
        swal("Necesitas comprar este elemento.", {
            icon: "warning",
        });
    }
});

document.getElementById("breadIn").addEventListener('click', () => {
    if (breadAwards[1] == true) {
        foods[0].increase = 4;
        foods[0].offer = 0;
        document.getElementById("breadOf").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("foodNormal").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("breadIn").style.backgroundColor = "rgba(145, 255, 163, 0.966)";
        ask();
        sound3.play();
    } else {
        swal("Necesitas comprar este elemento.", {
            icon: "warning",
        });
    }
});

document.getElementById("appleOf").addEventListener('click', () => {
    if (appleAwards[0] == true) {
        foods[1].increase = 0;
        foods[1].offer = 6;
        document.getElementById("appleIn").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("foodNormal").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("appleOf").style.backgroundColor = "rgba(145, 255, 163, 0.966)";
        ask();
        sound3.play();
    } else {
        swal("Necesitas comprar este elemento.", {
            icon: "warning",
        });
    }
});

document.getElementById("appleIn").addEventListener('click', () => {
    if (appleAwards[1] == true) {
        foods[1].increase = 2;
        foods[1].offer = 0;
        document.getElementById("appleOf").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("foodNormal").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("appleIn").style.backgroundColor = "rgba(145, 255, 163, 0.966)";
        ask();
        sound3.play();
    } else {
        swal("Necesitas comprar este elemento.", {
            icon: "warning",
        });
    }
});

//awards

document.getElementById("aBreadOf").addEventListener('click', () => {
    if (money >= 500) {
        money = money - 500;
        document.getElementById("aBreadOf").style.display = "none";
        breadAwards[0] = true;
        document.getElementById("cash").innerHTML = "$" + money;
        sound1.play();
    } else {
        sound2.play();
        alert("Dinero insuficiente");
    }
});

document.getElementById("aAppleOf").addEventListener('click', () => {
    if (money >= 750) {
        money = money - 750;
        document.getElementById("aAppleOf").style.display = "none";
        appleAwards[0] = true;
        document.getElementById("cash").innerHTML = "$" + money;
        sound1.play();
    } else {
        sound2.play();
        alert("Dinero insuficiente");
    }
});

document.getElementById("aBreadIn").addEventListener('click', () => {
    if (money >= 750) {
        money = money - 750;
        document.getElementById("aBreadIn").style.display = "none";
        breadAwards[1] = true;
        document.getElementById("cash").innerHTML = "$" + money;
        sound1.play();
    } else {
        sound2.play();
        alert("Dinero insuficiente");
    }
});

document.getElementById("aAppleIn").addEventListener('click', () => {
    if (money >= 1000) {
        money = money - 1000;
        document.getElementById("aAppleIn").style.display = "none";
        appleAwards[1] = true;
        document.getElementById("cash").innerHTML = "$" + money;
        sound1.play();
    } else {
        sound2.play();
        alert("Dinero insuficiente");
    }
});

document.getElementById("aBreadStockIn").addEventListener('click', () => {
    if (money >= 1000) {
        money = money - 1000;
        document.getElementById("aBreadStockIn").style.display = "none";
        foods[0].stockLimit = 30;
        document.getElementById("cash").innerHTML = "$" + money;
        sound1.play();
        foodLeft();
    } else {
        sound2.play();
        alert("Dinero insuficiente");
    }
});

document.getElementById("aAppleStockIn").addEventListener('click', () => {
    if (money >= 1000) {
        money = money - 1000;
        document.getElementById("aAppleStockIn").style.display = "none";
        foods[1].stockLimit = 30;
        document.getElementById("cash").innerHTML = "$" + money;
        sound1.play();
        foodLeft();
    } else {
        sound2.play();
        alert("Dinero insuficiente");
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

//people


document.getElementById("next").addEventListener('click', () => {
    sStorageSet();
    location.href = "../index.html";
});

