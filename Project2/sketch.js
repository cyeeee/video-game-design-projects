/*
Project 2 - Simple Game with Tilemap
Author: Chenyi Wang
Date: 09/14/22
  
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
    else if (keyIsDown(RIGHT_ARROW)) {
      this.x += 2;
    }
    else if (keyIsDown(UP_ARROW)) {
      this.y -= 2;
    }
    else if (keyIsDown(DOWN_ARROW)) {
      this.y += 2;
    }
    // stay inside the tilemap
    if (this.x < 0) {
      this.x = 0;
    }
    else if (this.x > 800) {
      this.x = 800;
    }
    else if (this.y < 0) {
      this.y = 0;
    }
    else if (this.y > 800) {
      this.y = 800;
    }
    // the prizes are collected when the main character touches it
    for (var i = 0; i < game.prizes.length; i++) {
      if (dist(this.x, this.y, game.prizes[i].x, game.prizes[i].y) < 15) {
        game.prizes[i].collected = true;
      }
    }
    // bounce back a little when bumping into a rock
  }
}

class enemyObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xDir = random(-0.2, 0.2);
    this.yDir = random(-0.2, 0.2);
  }

  draw() {
    image(objects[3], this.x, this.y, 20, 20);
  }

  /*
  move() {
    // the enemies wander around
    this.x += this.xDir;
    this.y += this.yDir;
    // stay inside the tilemap
    if (this.x >= (800 - 10) || this.x < 10) {
      this.xDir = -this.xDir; 
    }
    if (this.y >= (800 - 10) || this.y < 10) {
      this.yDir = -this.yDir; 
    }
    // when enemies see the main character, they will chase the main character

    // bounce back a little when bumping into a rock

  }
  */
}

class gameObj {
  constructor() {
    this.tilemap = [
      "                                        ",
      "         p                              ",
      "                                        ",
      "                r            p          ",
      "              p                         ",
      "                                        ",
      "                                  p     ",
      "     p                                  ",
      "                                        ",
      "                   p                    ",
      "                                        ",
      "         r                      r       ",
      "                                        ",
      "               p                        ",
      "                                 p      ",
      "    p                                   ",
      "                                        ",
      "     r                                  ",
      "                   r     p              ",
      "                                        ",
      "                                        ",
      "                                        ",
      "          p                             ",
      "                            p           ",
      "                                        ",
      "  p                            r        ",
      "                                        ",
      "     r                             p    ",
      "           p                            ",
      "                                        ",
      "                          p             ",
      "                                        ",
      "    p              r                p   ",
      "                                        ",
      "                                        ",
      "  r                                     ",
      "                               p        ",
      "            p                           ",
      "                                        ",
      "                            r           ",];
    //todo
    this.prizes = [];
    this.rocks = [];
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
        }
      }
    }
  }
}

var mainChar;
var enemies = [];
var game;

function setup() {
  createCanvas(400, 400);
  customChar();
  mainChar = new mainCharObj(100, 100);

  enemies[0] = new enemyObj(480, 300);
  enemies[1] = new enemyObj(680, 420);
  enemies[2] = new enemyObj(360, 500);
  enemies[3] = new enemyObj(460, 720);
  enemies[4] = new enemyObj(460, 120);
  enemies[5] = new enemyObj(80, 260);

  game = new gameObj();
}

function draw() {
  background(200, 255, 200);  // light green

  game.initialize();
  game.drawBackground(); 

  for (var i = 0; i < game.prizes.length; i++) {
    if (game.prizes[i].collected === true) {
      game.prizes[i].remove();
    }
  }
  
  mainChar.draw();
  mainChar.move();
  
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].draw();
    //enemies[i].move();
  }
  
}
