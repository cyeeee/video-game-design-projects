/*
Project 9 - Chasing in a maze
Author: Chenyi Wang
Date: 11/02/22

The tilemap in this project follows the instruction on canvas.
There are 5 types of character in the map: wall, pellet, freeze power, main character, and enemy

The main character is controlled with WASD, and the speed is 1.2 pixels per frame
when the player touches a pellet, the pellet disappear
- The player wins when all pellets are gone.
When the player touches a freeze power, the freeze power disapper and all the enemies freeze for 5 sec.

The enemy characters will chase the player at all times.
Each NPC will compute its path using A* search every 40 frames.
Each NPC compute the path in different frames.
- When any enemy character catches the player, the game is over.

When the game ends, click anywhere on the screen to play again (all the characters intact at the original positions)

*/

var mainChar;
var enemys = [];
var game;
var ggraph = [];
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

  ggraph = new Array(20);
  for (var i = 0; i < 20; i++) {
    ggraph[i] = new Array(20);
  }
  
  game = new gameObj();
  game.initialize();
}

function draw() {
  background(215, 230, 215);

  // restart the game
  if (initialize === 1) {
    initialize = 0;
    enemys = [];
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
    game.draw();
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
