const readline = require("readline");

const MAX_GUESSES = 20;
var guessCount = 0;

const NUM_SHIPS = 2;
var ships = [];

class Ship {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isSunk = false;
  }

  hit() {
    this.isSunk = true;
  }
}

function gameInit() {
  generateShips();
  console.log("Begin Game!");
}

function generateShips() {
  let long = [0, 1, 2, 3, 4, 5, 6, 7];
  let lat = [0, 1, 2, 3, 4, 5, 6, 7];
  shuffleArray(long);
  shuffleArray(lat);

  for (let i = 0; i < NUM_SHIPS; i++) {
    ships.push(new Ship(long[i], lat[i]));
  }
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function checkContact(x, y) {
  for (i = 0; i < ships.length; i++) {
    if (x == ships[i].x && y == ships[i].y) {
      ships[i].hit();
      console.log("Direct Hit!");
      return;
    }

    if (ships[i].isSunk == false) {
      let distance = Math.abs(x - ships[i].x) + Math.abs(y - ships[i].y);
      if (distance <= 2) {
        console.log("hot");
      } else if (distance <= 4) {
        console.log("warm");
      } else {
        console.log("cold");
      }
    }
  }
}

function getUserInput(prompt, callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(prompt, function onInput(input) {
    rl.close();
    callback(input);
  });
}

const prompt_ = "Guess the X and Y coordinates (two numbers between 0 - 7): ";

function play(guess) {
  let [x, y] = guess.match(/[0-9]/g);
  guessCount++;
  console.log("Guesses remaining: ", 20 - guessCount);
  console.log("Your guess: ", x, y);

  checkContact(x, y);

  if (boardIsEmpty()) {
    console.log("You win!");
  } else if (guessCount >= MAX_GUESSES) {
    console.log("You lose (max number of guesses reached)");
  } else {
    getUserInput(prompt_, play);
  }
}

function boardIsEmpty() {
  return ships[0].isSunk && ships[1].isSunk;
}

gameInit();
getUserInput(prompt_, play);
