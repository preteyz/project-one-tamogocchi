/*   NOTE..............................
*    Idea for changing difficulty of the game
*    NOTE..............................
*
* MISSING TIME COMPONENT
* HP AND STAMINA CAN GO BELOW 0 AND OVER 100
* NO ENDGAME COMPONENT
* Battle component of the game can be implemented in future version
* Add name
*
*/

// enemyConstructor(difficulty){
//     switch(difficulty){
//         case "easy":
//             low stats
//         case "medium":
//             med stats
//         case "hard":
//             high stats
//     }
// }

class characterObj{
    exhausted = false;
    isResting = false;
    isSheathed = true;
    level = 1;
    lvlUp = 100;
    exp = 0;

    constructor(hp, stamina, attack){
        this.hp = hp;
        this.maxHp = hp;
        this.stamina = stamina;
        this.maxStamina = stamina;
        this.attack = attack;
    }

    attack(target){
        target.hp -= this.attack
    }

    hpChange(amt){
        if(amt < this.maxHp - this.hp){
            this.hp += amt;
        } else if(amt < 0){
            this.hp -= amt;
        } else {
            this.hp += this.maxHp-this.hp;
        }
    }

    staminaChange(amt){
        if(amt < this.maxStamina - this.stamina){
            this.stamina += amt;
        } else if(amt < 0){
            this.stamina -= amt;
        } else {
            this.stamina += this.maxStamina-this.stamina;
        }
    }

    gainExp(amt){
        this.exp += amt;
        if (this.exp > this.lvlUp){
            this.level += 1;
            // this.lvlUp += 20;
            remainTime += 30;
            this.exp = 0;
        }
    }
}


// Global Variables
const mainCharacter = new characterObj(100, 100, 50);
const attackBtn = document.getElementById("attack");
const advanceBtn = document.getElementById("advance");
const restBtn = document.getElementById("rest");
const swordBtn = document.getElementById("sword");
const gameOver = document.getElementById("game-over");
const charName = prompt("Player name: ");
document.getElementById("player-name").innerHTML = charName;
let remainTime = 120;
let staminaDecrement = 1;


// Function to update html page/bars
function elemUpdate(elemId, stat) {
    let elem = document.getElementById(elemId);
    if(elemId === "remain"){
        elem.innerHTML = stat;
    } else{
        elem.setAttribute("value", stat);
    }
    // create a function to increment by changes in each bar by 1%;
    // var id = setInterval(frame, 1);
    // function frame() {
    //     if (width >= barId.value) {
    //     clearInterval(id);
    //     } else {
    //     width++; 
    //     elem.style.width = width + '%'; 
    //     }
    // }
}

function pageUpdate() {
    elemUpdate("remain", remainTime);
    elemUpdate("hp-bar", mainCharacter.hp);
    elemUpdate("stamina-bar", mainCharacter.stamina);
    elemUpdate("exp-bar", mainCharacter.exp);
    document.getElementById("HP-percent").innerHTML = `${mainCharacter.hp}%`;
    document.getElementById("stamina-percent").innerHTML = `${mainCharacter.stamina}%`;
    document.getElementById("lvl-percent").innerHTML = `${(mainCharacter.exp)}%`;
    document.getElementById("player-level").innerHTML = `Level: ${(mainCharacter.level)}`;
}
    

function clearBox(elementID){
    document.getElementById(elementID).innerHTML = "";
}

function appendImage(imageId, imageClass, imageSource) {
    const imgHTML = `<img id="${imageId}" class="${imageClass}"  src="${imageSource}" alt="main-character">`
    const sprites = document.getElementById("sprites");
    sprites.innerHTML = imgHTML;

}

function playerAdvance(){
    mainCharacter.staminaChange(-25);
    mainCharacter.hpChange(-5);
    mainCharacter.gainExp(20);
    clearBox("sprites");
    appendImage("main-char", "pixelart character-run", "images/main/main-run.png");
}

function playerAttack(){
    mainCharacter.staminaChange(-10);
    mainCharacter.hpChange(-25);
    mainCharacter.gainExp(30);
    clearBox("sprites");
    appendImage("main-char", "pixelart character-atk1", "images/Main/main-atk1.png");
}

function playerRest(){
    mainCharacter.staminaChange(25);
    mainCharacter.hpChange(25);
    remainTime -= 10;
    console.log(remainTime);

    clearBox("sprites");
    appendImage("main-char", "pixelart character-idle", "images/Main/main-rest.png");
}

function playerSword(){
    clearBox("sprites");    
    mainCharacter.staminaChange(-2);

    if(mainCharacter.isSheathed){
        mainCharacter.isSheathed = false;
        advanceBtn.className = "nes-btn is-disabled";
        attackBtn.className = "nes-btn is-error";
        appendImage("main-char", "pixelart character-idle", "images/main/main-unsheath.png");
    } else{
        mainCharacter.isSheathed = true;
        attackBtn.className = "nes-btn is-disabled";
        advanceBtn.className = "nes-btn";
        appendImage("main-char", "pixelart character-idle", "images/main/main-idle.png");
    }
}



function playGame(e){
    let userInput = e.target.id;

    if (userInput === "advance" && advanceBtn.className !== "nes-btn is-disabled"){
        playerAdvance();
    } else if(userInput === "attack" && attackBtn.className !== "nes-btn is-disabled"){
        playerAttack();
    } else if(userInput === "rest"){
        playerRest();
    } else if(userInput === "sword"){
        playerSword();
    }
    pageUpdate();

}

let interval = "";


function startIntervals(){
    interval = setInterval(function(){ 
        let count = 0;
        remainTime -= 1;
        mainCharacter.hp -= 1;
        mainCharacter.stamina -= 1;
        console.log(remainTime);
        count += 1;
        pageUpdate();
        // Gameover condition
        if(remainTime <= 0 || mainCharacter.hp <= 0 || mainCharacter.stamina <= 0){
            clearInterval(interval);
            appendImage("main-char", "pixelart character-dead", "images/main/main-death.png");
            attackBtn.className = "nes-btn is-disabled";
            advanceBtn.className = "nes-btn is-disabled";
            restBtn.className = "nes-btn is-disabled";
            swordBtn.className = "nes-btn is-disabled";
            attackBtn.disabled = true;
            advanceBtn.disabled = true;
            restBtn.disabled = true;
            swordBtn.disabled = true;

            const gameOver = document.createElement("img");
            gameOver.setAttribute("src", "images/game-over.png");
            gameOver.setAttribute("id", "game-over");
            gameOver.setAttribute("class", "animate__animated animated__fadeIn");
            document.getElementById('play').appendChild(gameOver);
            pageUpdate();
        }

        
    ; }, 1000);
    
}




startIntervals();

document.getElementById("advance").addEventListener("click", playGame);
document.getElementById("attack").addEventListener("click", playGame);
document.getElementById("rest").addEventListener("click", playGame);
document.getElementById("sword").addEventListener("click", playGame);