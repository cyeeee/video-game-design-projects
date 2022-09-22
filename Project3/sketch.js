/*
Project 3 - Rotations, Automated Avoidance, and FSM-based NPC Behavior
Author: Chenyi Wang
Date: 09/21/22


*/

var mainChar;
var enemies = [];
var game;

function setup() {
  createCanvas(400, 400);
  customChar();
  mainChar = new mainCharObj(400, 400);
  enemies[0] = new enemyObj(480, 300);
  enemies[1] = new enemyObj(680, 420);
  enemies[2] = new enemyObj(360, 500);
  enemies[3] = new enemyObj(460, 720);
  enemies[4] = new enemyObj(460, 120);
  enemies[5] = new enemyObj(80, 260);
  game = new gameObj();
  game.initialize();
}

function draw() {
  if (game.score === 20) {  // collected all 20 of prizes, win
    background(200, 255, 200);
    fill(0);
    textStyle(BOLD);
    textFont('Courier New', 40);
    text("YOU WIN!", 100, 200);
  }

  else if (game.gameOver === false) { // game continuous
    background(200, 255, 200);  // light green
    push();
    translate(game.xCor, game.yCor);
    game.drawBackground();
    for (var i = 0; i < game.prizes.length; i++) {
      if (game.prizes[i].collected === true) {
        game.prizes[i].remove();  // make the collected prizes invisible
      }
    }
    mainChar.draw();
    mainChar.move();
    for (var i = 0; i < enemies.length; i++) {
      enemies[i].draw();
      enemies[i].move();
    }
    pop();
  }

  else {  // game over
    background(200, 255, 200);
    fill(0);
    textStyle(BOLD);
    textFont('Courier New', 40);
    text("GAME OVER", 80, 200);
  }
  
}