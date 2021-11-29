/*   NOTE..............................
*    Idea for changing difficulty of the game
*    NOTE..............................
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

mainCharacter.staminaChange(-1);
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


function buttonClick(e){
    let userInput = e.target.id;
    console.log(userInput);
    let message = "";

    if (userInput = "attack"){
        ussAssembly.attack(alienFleet[0]);
        message = `The alien ship has ${alienFleet[0].hull} hull points left`;

        if(alienFleet[0].hull > 0){
            alienFleet[0].attack(ussAssembly);
            message = `The USS Assembly has ${ussAssembly.hull} hull points left`;
        } else{
            message = "Alien ship destroyed";
            alienFleet.shift();
        }
    } else if(userInput = "retreat"){
        message = "why you running";
}


document.querySelector('#results').innerText = message;
console.log(message);

}

  document.getElementById("checkHP").addEventListener("click", buttonClick);
  document.getElementById("attack").addEventListener("click", buttonClick);