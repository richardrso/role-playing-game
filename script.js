let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  //this array hold objects
  {
    name: "stick", //object propertie 1
    power: 5, //object propertie 2
  },

  {
    name: "dagger",
    power: 30,
  },

  {
    name: "claw hammer",
    power: 50,
  },

  {
    name: "sword",
    power: 100,
  },
];

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
  },
];

const locations = [
  {
    name: "town square", //object key:"value"
    "button text": ["Go to store", "Go to cave", "Fight dragon"], //array of strings
    "button functions": [goStore, goCave, fightDragon], //array with variables
    text: 'You are in the town square. You see a sign that says "Store".',
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.', //single quotes to the string and double quotes to include quotation marks inside a string.
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. ☠️"
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none"; //monster's stat box should no longer display.
  button1.innerText = location["button text"][0]; //index location
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}
//functions
function goTown() {
  update(locations[0]); // bracket notation valion, acessed by index, indices start at 0 - this is called zero-based indexing
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}



function buyHealth() {
  if (gold >= 10) {
    //if statement to run the code conditionally
    gold -= 10; //changes the value of gold variable
    health += 10; // this is a compound assignment same thing as 'health = health + 10',
    goldText.innerText = gold; //This will replace whatever text is currently inside the goldText element with the value of gold variable
    healthText.innerText = health;
  } else text.innerText = "You do not have enough gold to buy health.";
  {
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    //check if currentWeapon is less than the length of the weapons array
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++; //increase currentWeapon by 1
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name; //bracket notation to access an object within the weapons array, accessing the property or index by the value of that variable.
      text.innerText = "You now have a " + newWeapon + "."; //string with the concatenation operator +
      inventory.push(newWeapon); //Add newWeapon to the end of the inventory array using the push() method.
      text.innerText += " In your inventory you have: " + inventory + " "; //add text to the end of text.innerText and add the contents of inventory to the string using concatenation operator
    } else text.innerText = "You do not have enough gold to buy a weapon.";
    {
    }
  } else text.innerText = "You already have the most powerful weapon!";
  button2.innerText = "Sell weapon for 15 gold";
  button2.onclick = sellWeapon;
  {
  }
}

function sellWeapon(){
 
  if (inventory.length > 1){
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift(); //shift() method on an array removes the first element in the array and returns //using the let keyword instead of var, the new currentWeapon is scoped only to this if statement
    text.innerText = "You sold a "+currentWeapon+".";
    text.innerText += " In your inventory you have: "+inventory+" ";
  } else text.innerText = "Don't sell your only weapon!";
  {
    
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight(){
 update(locations[3]);
 monsterHealth = monsters[fighting].health;
 monsterStats.style.display = "block"; //Display the monsterStats element by updating the display property of the style property to block.
 monsterName.innerText = monsters[fighting].name;
 monsterHealthText.innerText = monsterHealth; 
}

function attack(){
  text.innerText = "The "+monsters[fighting].name+" attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level); //sets health equal to health minus the return value of the getMonsterAttackValue function, and passes the level of the monster as an argument.
  if(isMonsterHit()){
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random()* xp) + 1; // generates a random number  between 1 and the value of xp | decreases the monster's health by the power of the current weapon plus a random bonus.
  } else { 
    text.innerText += " You miss.";
  
  }
  healthText.innerText = health; // show the player's current health.
  monsterHealthText.innerText = monsterHealth; // show the monster's current health.
  if (health <= 0) {
    lose();
  }
  else if(monsterHealth <= 0){
    fighting === 2 ? winGame() : defeatMonster(); //strict equality (===) operator to - check if the values are equal and if they are the same data type
  // if-else statement changed to a ternary:can be used as a one-line if-else statement
  }
}

function getMonsterAttackValue(level){
  const hit = (level * 5) - (Math.floor(Math.random() *xp)); //set the monster's attack to five times their level minus a random number between 0 and the player's xp.
  console.log(hit); //Log the value of hit to the console to use in debugging
  return hit > 0? hit:0; //tanary operadtor: returns hit if hit is greater than 0, or returns 0 if it is not.
}

function defeatMonster(){
  gold += Math.floor(monsters[fighting].level * 6.7); //multiplies the monster's level by 6.7 to calculate the amount of gold the player should receive, and then rounds down to the nearest whole number using Math.floor
  xp += monsters[fighting].level; //increase the player's experience points (xp
  goldText.innerText= gold;
  xpText.innerText= xp;
  update(locations[4]);
}

function lose(){
  update(locations[5]);
}

function winGame(){
  update(locations[6]);
}

function dodge(){
  text.innerText = "You dodge the attack from the "+monsters[fighting].name+"";

}

function restart(){
xp = 0;
health = 100;
gold = 50;
currentWeapon = 0;
fighting;
inventory = ["stick"];
goldText.innerText = gold;
healthText.innerText = health;
xpText.innerText = xp;
goTown();

}