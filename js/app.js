/*   NOTE..............................
*    Idea for changing difficulty of the game
*    NOTE..............................
*
* MISSING TIME COMPONENT
* HP AND STAMINA CAN GO BELOW 0 AND OVER 100
* NO ENDGAME COMPONENT
* Battle component of the game can be implemented in future version
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
        this.stamina = stamina;
        this.attack = attack;
    }

    attack(target){
        target.hp -= this.attack
    }

    hpChange(amt){
        if(amt > 0 && this.hp > 100){
            this.hp += amt;
        } else {
            this.hp -= amt;
        }
    }

    staminaChange(amt){
        this.stamina += amt;
        console.log(this.stamina);
    }

    gainExp(amt){
        this.exp += amt;
        if (this.exp > this.lvlUp){
            this.level += 1;
            this.lvlUp += 20;
            this.exp = 0;
        }
    }
}


// Global Variables
const mainCharacter = new characterObj(100, 100, 50);
const attackBtn = document.getElementById("attack");
const advanceBtn = document.getElementById("advance");
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
    mainCharacter.gainExp(40);
    clearBox("sprites");
    appendImage("main-char", "pixelart character-atk1", "images/Main/main-atk1.png");
}

function playerRest(){
    mainCharacter.staminaChange(25);
    mainCharacter.hpChange(10);
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





  document.getElementById("advance").addEventListener("click", playGame);
  document.getElementById("attack").addEventListener("click", playGame);
  document.getElementById("rest").addEventListener("click", playGame);
  document.getElementById("sword").addEventListener("click", playGame);