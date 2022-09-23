/*
Project 3 - Rotations, Automated Avoidance, and FSM-based NPC Behavior
Author: Chenyi Wang
Date: 09/21/22


*/

var mainChar;
var missile;
var enemies = [];
var game;

function setup() {
  createCanvas(400, 400);
  customChar();
  mainChar = new mainCharObj(400, 400);
  missile = new missileObj();
  enemies[0] = new enemyObj(480, 300);
  enemies[1] = new enemyObj(680, 420);
  enemies[2] = new enemyObj(360, 500);
  enemies[3] = new enemyObj(460, 720);
  enemies[4] = new enemyObj(460, 120);
  enemies[5] = new enemyObj(80, 260);
  game = new gameObj();
  game.initialize();
  angleMode(RADIANS);
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
    for (var i = 0; i < game.rocks.length; i++) {
      if (game.rocks[i].hit === true) {
        game.rocks[i].remove();  // make the hit rocks invisible
      }
    }
    checkFire();
    if (missile.fire === 1) {
      missile.draw();
    }
    mainChar.draw();
    mainChar.move();
    for (var i = 0; i < enemies.length; i++) {
      enemies[i].state[enemies[i].currState].execute(enemies[i]);
      enemies[i].draw();
    }
    pop();
    // display the score
    fill(0);
    textStyle(BOLD);
    textFont('Times New Roman', 15);
    text("prizes collected: " + game.score + "/20", 255, 20);

  }

  else {  // game over
    background(200, 255, 200);
    fill(0);
    textStyle(BOLD);
    textFont('Courier New', 40);
    text("GAME OVER", 80, 200);
  }
  
}