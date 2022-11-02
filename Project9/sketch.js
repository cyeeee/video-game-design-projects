/*
Project 9 - Chasing in a maze
Author: Chenyi Wang
Date: 11/02/22

*/

var mainChar;
var enemys = [];
var game;

function setup() {
  createCanvas(400, 400);
  angleMode(RADIANS);
  customChar();
  game = new gameObj();
  game.initialize();
}

function draw() {
  background(215, 230, 215);

  //  the player wins when all pellets are gone
  if (game.score === game.pellets.length) { 
    fill(0);
    textStyle(BOLD);
    textFont('Courier New', 40);
    text("YOU WIN!", 100, 200);
  }

  else {
    game.drawBackground();

    // always display the number of pellets in the game screen
    fill(255);
    text(20);
    text("Pellets:  " + game.score + " / " + game.pellets.length, 300, 13);  
  }

}
