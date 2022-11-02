/*
Project 9 - Chasing in a maze
Author: Chenyi Wang
Date: 11/02/22

*/

var mainChar;
var enemys = [];
var game;
var initialize = 1;

function mouseClicked() {
  if (game.end === 1 || game.score === game.pellets.length) {
    initialize = 1;
  }
}

function setup() {
  createCanvas(400, 400);
  angleMode(RADIANS);
  customChar();
  game = new gameObj();
  game.initialize();
}

function draw() {
  background(215, 230, 215);

  // restart the game
  if (initialize === 1) {
    initialize = 0;
    game.initialize();
  }

  // the player wins when all pellets are gone
  if (game.score === game.pellets.length) { 
    fill(0);
    textStyle(BOLD);
    textFont('Courier New', 40);
    text("YOU WIN!", 100, 200);
    textSize(16);
    text("click ANYWHERE to play again", 65, 240);
  }
  // game continues
  else if (game.end === 0) {
    game.drawBackground();
    // always display the number of pellets in the game screen
    fill(255);
    textFont("Arial", 12);
    textStyle(NORMAL);
    text("Pellets:  " + game.score + " / " + game.pellets.length, 300, 13);  
  }
  // game over
  else {
    fill(0);
    textStyle(BOLD);
    textFont('Courier New', 40);
    text("GAME OVER", 80, 200);
    textSize(16);
    text("click ANYWHERE to play again", 65, 240);
  }
}
