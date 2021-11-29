/*   NOTE..............................
*    Idea for changing difficulty of the game
*    NOTE..............................

disable attack button until sword is unsheathed
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

// Create main character object that is affected by stamina decay over time
class characterObj{

    isResting = false;
    isSheathed = true;

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

}



const mainCharacter = new characterObj(100, 100, 50);


// console.log(mainCharacter.stamina);

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

function buttonClick(e){
    let userInput = e.target.id;
    const attackBtn = document.getElementById("attack");
    const advanceBtn = document.getElementById("advance");


    let message = "";

    console.log(userInput);

    /*
    <div class="character">
    <img id="main-idle" class="pixelart character-idle"  src="images/Main/main-idle.png" alt="main-character">
    <img id="main-idle-unsheath" class="pixelart character-idle"  src="images/Main/main-unsheath.png" alt="main-character">
    <img id="main-run" class="pixelart character-run"  src="images/Main/main-run.png" alt="main-character">
    <img id="main-atk1" class="pixelart character-atk1"  src="images/Main/main-atk1.png" alt="main-character">
    */
    if (userInput === "advance"){
        clearBox("sprites");
        appendImage("main-char", "pixelart character-run", "images/main/main-run.png");
    } else if(userInput === "attack"){
        clearBox("sprites");
        appendImage("main-char", "pixelart character-atk1", "images/Main/main-atk1.png");
    } else if(userInput === "rest"){
        clearBox("sprites");
        appendImage("main-char", "pixelart character-run", "images/Main/main-rest.png");
    } else if(userInput === "sword"){
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

}





  document.getElementById("advance").addEventListener("click", buttonClick);
  document.getElementById("attack").addEventListener("click", buttonClick);
  document.getElementById("rest").addEventListener("click", buttonClick);
  document.getElementById("sword").addEventListener("click", buttonClick);