const readline = require("readline");

const MAX_GUESSES = 20;
const PROMPT_ = "Guess the X and Y coordinates (two numbers between 0 - 7): ";
const ships = [];
const NUM_SHIPS = 2;
let guessCount = 0;

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
  console.log(ships);
}

function generateShips() {
  let occupiedCoord = [];

  while (ships.length < NUM_SHIPS) {
    let randomX = getRandomInt(0, 7);
    let randomY = getRandomInt(0, 7);
    let newCoord = [randomX, randomY];

    if (!exists(occupiedCoord, newCoord)) {
      ships.push(new Ship(randomX, randomY));
      occupiedCoord.push(newCoord);
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function exists(arr, search) {
  return arr.some((row) => row.includes(search));
}

function checkContact(x, y) {
  for (i = 0; i < ships.length; i++) {
    if (x == ships[i].x && y == ships[i].y && !ships[i].isSunk) {
      ships[i].hit();
      console.log("Direct Hit!");
      return;
    }

    if (!ships[i].isSunk) {
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

function play(guess) {
  if (!guess.match(/[0-9]/g)) {
    console.log("Invalid Guess");
    getUserInput(PROMPT_, play);
  } else {
    let [x, y] = guess.match(/[0-9]/g);
    guessCount++;
    console.log("Guesses remaining: ", 20 - guessCount);
    console.log("Your guess X:", x, " Y:", y);

    checkContact(x, y);

    if (boardIsEmpty()) {
      console.log("You win!");
    } else if (guessCount >= MAX_GUESSES) {
      console.log("You lose (max number of guesses reached)");
    } else {
      getUserInput(PROMPT_, play);
    }
  }
}

function boardIsEmpty() {
  function checkSunk(ship) {
    return ship.isSunk;
  }

  return ships.every(checkSunk);
}

gameInit();
getUserInput(PROMPT_, play);
