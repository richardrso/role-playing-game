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
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
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

function fightDragon() {
  console.log("Fighting dragon.");
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

function fightSlime() {}
function fightBeast() {}
