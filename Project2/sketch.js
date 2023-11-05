/*
Project 2 - Simple Game with Tilemap
Author: Chenyi Wang
Date: 09/14/22

This program has a tilemap of size 800 x 800.
The outer edges of the game area is marked with white borders.
There are 20 prizes, 10 rocks, 6 enemies and 1 main character inside 
the tilemap, each is 20 x 20 pixels.
The main character moves with the arrow keys, it can move around inside 
the game area, and the tilemap will scroll as the character moves.
The enemies wander around, but will chase the main character when they 
are close to each other.
When a enemy catches the main character, game over.
A separate game over screen will then show. 
When enemies or main character bumpes into a rock, it bouces back a little.
When the character touches a prize, it will collect it.
When all the prizes are collected, the player win.
A separate win screen will then show. 
*/

var objects = [];

function customChar() {
  // prize
  fill(200, 255, 200);
  rect(0, 0, 400, 400);
  noStroke();
  fill(230, 180, 0);
  arc(200, 75, 280, 280, 0, PI, CHORD);
  fill(200, 255, 200); // same as background color
  arc(200, 85, 250, 250, 0, PI, CHORD);
  fill(230, 180, 0);
  rect(175, 250, 50, 70);
  fill(250, 200, 10);
  arc(200, 25, 200, 480, 0, PI, CHORD);
  fill(0);
  rect(120, 320, 160, 50);
  rect(90, 370, 220, 20);
  fill(250, 200, 50);
  rect(150, 340, 100, 30);
  fill(200, 160, 0);
  textSize(140);
  text("☆", 140, 180);
  objects.push(get(0, 0, width, height));

  // rock
  fill(200, 255, 200);
  rect(0, 0, 400, 400);
  noStroke();
  fill(150);
  rect(10, 50, 380, 300, 180, 180, 60, 60);
  fill(180);
  ellipse(270, 130, 170, 100);
  ellipse(200, 90, 200, 60);
  objects.push(get(0, 0, width, height));

  // main character
  fill(200, 255, 200);
  rect(0, 0, 400, 400);
  noStroke();
  fill(0);
  triangle(200, 200, 300, 380, 100, 380);
  circle(200, 130, 220);
  fill(255);
  ellipse(150, 130, 20, 50);
  ellipse(250, 130, 20, 50);
  objects.push(get(0, 0, width, height));

  // enemy
  fill(200, 255, 200);
  rect(0, 0, 400, 400);
  noStroke();
  fill(255, 0, 0);
  triangle(200, 200, 300, 380, 100, 380);
  circle(200, 130, 220);
  rect(250, 300, 30, 5);
  fill(0);
  arc(150, 130, 70, 70, 0, PI + QUARTER_PI, CHORD);
  arc(250, 130, 70, 70, 0 - QUARTER_PI, PI, CHORD);
  triangle(280, 230, 290, 290, 270, 290);
  rect(278, 290, 5, 80);
  objects.push(get(0, 0, width, height));

  // border
  fill(255);
  rect(0, 0, 400, 400);
  objects.push(get(0, 0, width, height));

}

class prizeObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.collected = false;
  }

  draw() {
    image(objects[0], this.x, this.y, 20, 20);
  }

  remove() {  
    // cover the image of prize with a squire with color of background
    fill(200, 255, 200);  // same as background color
    square(this.x, this.y, 20);
  }
}

class rockObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    image(objects[1], this.x, this.y, 20, 20);
  }
}

class mainCharObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    image(objects[2], this.x, this.y, 20, 20);
  }

  move() {
    // The main character moves with the arrow keys.
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 2;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 2;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= 2;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += 2;
    }

    // stay inside the tilemap
    if (this.x < 20) {
      this.x = 20;
    }
    else if (this.x > 800) {
      this.x = 800;
    }
    else if (this.y < 20) {
      this.y = 20;
    }
    else if (this.y > 800) {
      this.y = 800;
    }

    // the prizes are collected when the main character touches it
    for (var i = 0; i < game.prizes.length; i++) {
      if (game.prizes[i].collected === false && dist(this.x, this.y, game.prizes[i].x, game.prizes[i].y) < 15) {
        game.prizes[i].collected = true;
        game.score++;
      }
    }

    // bounce back a little when bumping into a rock
    for (var i = 0; i < game.rocks.length; i++) {
      if (dist(this.x, this.y, game.rocks[i].x, game.rocks[i].y) < 20) {
        if (this.x < game.rocks[i].x) {
          this.x -= 5;
          game.xCor += 5;
        }
        if (this.x > game.rocks[i].x) {
          this.x += 5;
          game.xCor -= 5;
        }
        if (this.y < game.rocks[i].y) {
          this.y -= 5;
          game.yCor += 5;
        }
        if (this.y > game.rocks[i].y) {
          this.y -= 5;
          game.yCor += 5;
        }
      }
    }
  }
}

class enemyObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xDir = random(-0.2, 0.2);
    this.yDir = random(-0.2, 0.2);
    this.step = new p5.Vector(0, -1);
    this.angle = 0;
  }

  draw() {
    image(objects[3], this.x, this.y, 20, 20);
  }

  move() {
    // the enemies wander around
    this.x += this.xDir;
    this.y += this.yDir;

    // stay inside the tilemap
    if (this.x >= 800 || this.x < 20) {
      this.xDir = -this.xDir; 
    }
    if (this.y >= 800 || this.y < 20) {
      this.yDir = -this.yDir; 
    }

    // bounce back a little when bumping into a rock
    for (var i = 0; i < game.rocks.length; i++) {
      if (dist(this.x, this.y, game.rocks[i].x, game.rocks[i].y) < 20) {
        if (this.x < game.rocks[i].x) {
          this.x -= 5;
        }
        if (this.x > game.rocks[i].x) {
          this.x += 5;
        }
        if (this.y < game.rocks[i].y) {
          this.y -= 5;
        }
        if (this.y > game.rocks[i].y) {
          this.y -= 5;
        }
      }
    }

    // when enemies see the main character, they will chase the main character
    if (dist(this.x, this.y, mainChar.x, mainChar.y) < 60) {
      this.step.set(mainChar.x - this.x, mainChar.y - this.y);
      this.step.normalize();
      this.angle = this.step.heading() + HALF_PI;
      this.x += this.step.x;
      this.y += this.step.y;
      if (dist(this.x, this.y, mainChar.x, mainChar.y) < 10) {
        game.gameOver = true; // enemy caught the main character
      }
    }
  }
}

class gameObj {
  constructor() {
    this.tilemap = [
      "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "b                                        b",
      "b                                        b",
      "b             p                    p     b",
      "b                                        b",
      "b          r                p            b",
      "b   p                                    b",
      "b                                        b",
      "b                      p          r      b",
      "b      r                                 b",
      "b                                        b",
      "b  p                                     b",
      "b                                r       b",
      "b                         p              b",
      "b                                        b",
      "b         p                       p      b",
      "b                                        b",
      "b r                   r                  b",
      "b                                        b",
      "b                         p              b",
      "b        p                               b",
      "b                                        b",
      "b                                  p     b",
      "b                                        b",
      "b                  r                     b",
      "b   p                                    b",
      "b                                        b",
      "b                                        b",
      "b                                        b",
      "b                   p          p         b",
      "b                                        b",
      "b                                r       b",
      "b   r     p                              b",
      "b                             p          b",
      "b                                        b",
      "b               p                        b",
      "b                                        b",
      "b                            p           b",
      "b                                        b",
      "b       p            r                   b",
      "b                                        b",
      "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",];
    this.prizes = [];
    this.rocks = [];
    this.score = 0;
    this.gameOver = false;
    this.xCor = -200;
    this.yCor = -200;
  }

  initialize() {
    for (var i = 0; i < this.tilemap.length; i++) {
      for (var j = 0; j < this.tilemap[i].length; j++) {
        switch (this.tilemap[i][j]) {
          case 'p': this.prizes.push(new prizeObj(j*20, i*20));
          break;
          case 'r': this.rocks.push(new rockObj(j*20, i*20));
          break;
        }
      }
    }
  }

  drawBackground() {
    for (var i = 0; i < this.tilemap.length; i++) {
      for (var j = 0; j < this.tilemap[i].length; j++) {
        switch (this.tilemap[i][j]) {
          case 'p': image(objects[0], j*20, i*20, 20, 20);
          break;
          case 'r': image(objects[1], j*20, i*20, 20, 20);
          break;
          case 'b': image(objects[4], j*20, i*20, 20, 20);
          break;
        }
      }
    }
    // scroll the map as the main character moves around
    if (keyIsDown(LEFT_ARROW)) {
      this.xCor += 2;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.xCor -= 2;
    }
    if (keyIsDown(UP_ARROW)) {
      this.yCor += 2;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.yCor -= 2;
    }
  }
}

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
