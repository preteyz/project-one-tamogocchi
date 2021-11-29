/*   NOTE..............................
*    Idea for changing difficulty of the game
*    NOTE..............................
*
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

// Global Variables
const attackBtn = document.getElementById("attack");
const advanceBtn = document.getElementById("advance");
const mainCharacter = new characterObj(100, 100, 50);
let staminaDecrement = 1;

// Create main character object that is affected by stamina decay over time
class characterObj{

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

    takeDamage(damage){
        this.hp -= damage;

    }

    staminaChange(delta){
        this.stamina += delta;
        console.log(this.stamina);
    }

    gainExp(amt){
        this.exp += amt;
        if (this.exp > this.lvlUp){
            this.level += 1;
            this.lvlUp += 20;

        }
        
    }

}





// Function to update progress bars
function barUpdate(barId, stat) {
    var elem = document.getElementById(barId);   
    var width = stat;
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


function clearBox(elementID){
    document.getElementById(elementID).innerHTML = "";
}

function appendImage(imageId, imageClass, imageSource) {
    const imgHTML = `<img id="${imageId}" class="${imageClass}"  src="${imageSource}" alt="main-character">`
    const sprites = document.getElementById("sprites");
    sprites.innerHTML = imgHTML;

}

function playerAdvance(){
    clearBox("sprites");
    appendImage("main-char", "pixelart character-run", "images/main/main-run.png");
}

function playerAttack(){
    clearBox("sprites");
    appendImage("main-char", "pixelart character-atk1", "images/Main/main-atk1.png");
}

function playerRest(){
    clearBox("sprites");
    appendImage("main-char", "pixelart character-idle", "images/Main/main-rest.png");
}

function playerSword(){
    clearBox("sprites");
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

}





  document.getElementById("advance").addEventListener("click", playGame);
  document.getElementById("attack").addEventListener("click", playGame);
  document.getElementById("rest").addEventListener("click", playGame);
  document.getElementById("sword").addEventListener("click", playGame);