//aside

let breadStock = 0;
let appleStock = 0;
let money = 0;

let ready = false;
let appleCustomer = 0;
let breadCustomer = 0;

//foods

function sell(){
    readyToSell();
    if(ready == false){
        alert("Keep working");
    }else{
        money = money + breadCustomer*10;
        money = money + appleCustomer*20;
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
    if(appleStock==20){
        document.getElementById("appleSignD").style.backgroundColor = "rgba(255, 190, 190, 0.808)";
    }else if(appleStock==21){
        document.getElementById("appleSignD").style.backgroundColor = "rgba(255, 190, 190, 0.808)";
        appleStock = appleStock - 1;
        document.getElementById("appleStock").innerHTML = "x" + appleStock;
    }else{
        document.getElementById("appleSignD").style.backgroundColor = "rgba(215, 245, 250, 0.596)";
    }

    if(breadStock==20){
        document.getElementById("breadSignD").style.backgroundColor = "rgba(255, 190, 190, 0.808)";
    }else if(breadStock==21){
        document.getElementById("breadSignD").style.backgroundColor = "rgba(255, 190, 190, 0.808)";
        breadStock = breadStock - 1;
        document.getElementById("breadStock").innerHTML = "x" + breadStock;
    }else{
        document.getElementById("breadSignD").style.backgroundColor = "rgba(215, 245, 250, 0.596)";
    }
    
}

function ask(){
    appleCustomer = Math.round(Math.random() * (4 - 0) + 0);
    breadCustomer = Math.round(Math.random() * (8 - 1) + 1);

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