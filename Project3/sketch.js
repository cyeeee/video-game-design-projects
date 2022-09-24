/*
Project 3 - Rotations, Automated Avoidance, and FSM-based NPC Behavior
Author: Chenyi Wang
Date: 09/21/22

This program has a tilemap of size 800 x 800.
There are 50 rocks, 20 prizes, 6 enemies, and 1 main character inside the map.

The main character can be controlled by either arrows keys or WASD.
- LEFT and RIGHT-arrows (A and D) to rotate the main character by 1 degree.
- UP and DOWN-arrows (W and S) to move forward and backward respectively.
When enemies or main character bumpes into a rock, it bouces back a little.
When the character touches a prize, it will collect it.
The number of prizes collected will be shown at the top right corner of the screen.
When all the prizes are collected, the player win.
A separate win screen will then show. 

The main character can fire a missile by using the space bar.
The missile will move in a straight line in the direction of the main character facing.
When a missile hits a rock, both the missile and the rock will disappear.
The enemies always face the direction of their moving.
The behavior of enemies has 4 states:
1. wander: The enemies wander around when they are far away from other objects
2. chase: The enemies will chase the main character when they are close to each other
3. avoid rocks: The enemies will always avoid the rocks
4. avoid missile: The enemies will try to avoid being hit by a missile
When a missile hits an enemy, the color of the enemy will be changed 
to indicate that it is injured, and the missile will disappear. 
When a second missile hits a injured enemy, the enemy will disappear.

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
      if (enemies[i].dead === false) {
        enemies[i].state[enemies[i].currState].execute(enemies[i]);
        enemies[i].draw();
      }
    }
    pop();

    // always display the score in the game screen
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