//aside

let breadStock = 0;
let appleStock = 0;
let money = 0;

let ready = false;
let appleCustomer = 0;
let breadCustomer = 0;

let fullAppleStock = 20;
let fullBreadStock = 20;


//awards = [ofertar, aumentar]

let breadAwards = [false, false];
let appleAwards = [false, false];

//foods

let foods = [
    {
        name: "Bread",
        price: 10,
        stockLimit: 20,
        offer: 0,
        increase: 0,
    },
    {
        name: "Apple",
        price: 20,
        stockLimit: 20,
        offer: 0,
        increase: 0,
    }
]

//functions

function sell(){
    readyToSell();
    if(ready == false){
        alert("Keep working");
    }else{
        money = money + breadCustomer*(foods[0].price+foods[0].increase-foods[0].offer);
        money = money + appleCustomer*(foods[1].price+foods[1].increase-foods[1].offer);
        breadStock = breadStock - breadCustomer;
        appleStock = appleStock - appleCustomer;

        document.getElementById("breadStock").innerHTML = "x" + breadStock;
        document.getElementById("appleStock").innerHTML = "x" + appleStock;
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
        appleCustomer = Math.round(Math.random() * (10 - 1) + 1);
    }else if(foods[1].increase!=0){
        appleCustomer = Math.round(Math.random() * (4 - 0) + 0);
    }else{
        appleCustomer = Math.round(Math.random() * (5 - 0) + 0);
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
        </div>
    `
}

function readyToSell(){
    if((appleStock>=appleCustomer) && (breadStock>=breadCustomer)){
        ready=true;
    }else{ready=false;}
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

document.getElementById("vender").addEventListener('click', () => {
    sell();
});


ask();


//actions

document.getElementById("foodNormal").addEventListener('click', () => {
    foodNormal();
    ask();
});

document.getElementById("breadOf").addEventListener('click', () => {
    if(breadAwards[0] == true){
        foods[0].increase = 0;
        foods[0].offer = 2;
        document.getElementById("breadOf").style.backgroundColor = "rgba(145, 255, 163, 0.966)";
        document.getElementById("foodNormal").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("breadIn").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        ask();
    }else{alert("Requiere compra del elemento");}
});

document.getElementById("breadIn").addEventListener('click', () => {
    if(breadAwards[1]==true){
        foods[0].increase = 4;
        foods[0].offer = 0;
        document.getElementById("breadOf").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("foodNormal").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("breadIn").style.backgroundColor = "rgba(145, 255, 163, 0.966)";
        ask();
    }else{alert("Requiere compra del elemento");}
});

document.getElementById("appleOf").addEventListener('click', () => {
    if(appleAwards[0]==true){
        foods[1].increase = 0;
        foods[1].offer = 6;
        document.getElementById("appleIn").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("foodNormal").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("appleOf").style.backgroundColor = "rgba(145, 255, 163, 0.966)";
        ask();
    }else{alert("Requiere compra del elemento");}
});

document.getElementById("appleIn").addEventListener('click', () => {
    if(appleAwards[1]==true){
        foods[1].increase = 2;
        foods[1].offer = 0;
        document.getElementById("appleOf").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("foodNormal").style.backgroundColor = "rgba(127, 255, 212, 0.288)";
        document.getElementById("appleIn").style.backgroundColor = "rgba(145, 255, 163, 0.966)";
        ask();
    }else{alert("Requiere compra del elemento");}
});

//awards

document.getElementById("aBreadOf").addEventListener('click', () => {
    if(money>=500){
        money=money-500;
        document.getElementById("aBreadOf").style.display="none";
        breadAwards[0] = true;
        document.getElementById("cash").innerHTML = "$" + money;
    }else{alert("Dinero insuficiente");}
});

document.getElementById("aAppleOf").addEventListener('click', () => {
    if(money>=750){
        money=money-750;
        document.getElementById("aAppleOf").style.display="none";
        appleAwards[0] = true;
        document.getElementById("cash").innerHTML = "$" + money;
    }else{alert("Dinero insuficiente");}
});

document.getElementById("aBreadIn").addEventListener('click', () => {
    if(money>=750){
        money=money-750;
        document.getElementById("aBreadIn").style.display="none";
        breadAwards[1] = true;
        document.getElementById("cash").innerHTML = "$" + money;
    }else{alert("Dinero insuficiente");}
});

document.getElementById("aAppleIn").addEventListener('click', () => {
    if(money>=1000){
        money=money-1000;
        document.getElementById("aAppleIn").style.display="none";
        appleAwards[1] = true;
        document.getElementById("cash").innerHTML = "$" + money;
    }else{alert("Dinero insuficiente");}
});

document.getElementById("aBreadStockIn").addEventListener('click', () => {
    if(money>=1000){
        money=money-1000;
        document.getElementById("aBreadStockIn").style.display="none";
        foods[0].stockLimit = 30;
        document.getElementById("cash").innerHTML = "$" + money;
        foodLeft();
    }else{alert("Dinero insuficiente");}
});

document.getElementById("aAppleStockIn").addEventListener('click', () => {
    if(money>=1000){
        money=money-1000;
        document.getElementById("aAppleStockIn").style.display="none";
        foods[1].stockLimit = 30;
        document.getElementById("cash").innerHTML = "$" + money;
        foodLeft();
    }else{alert("Dinero insuficiente");}
});

