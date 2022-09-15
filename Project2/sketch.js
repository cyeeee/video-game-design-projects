/*
Project 2 - Simple Game with Tilemap
Author: Chenyi Wang
Date: 09/14/22
  
*/

var objects = [];

function customChar() {
  // prize
  fill(255);
  rect(0, 0, 400, 400);
  noStroke();
  fill(230, 180, 0);
  arc(200, 75, 280, 280, 0, PI, CHORD);
  fill(255);
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
  fill(255);
  rect(0, 0, 400, 400);
  noStroke();
  fill(150);
  rect(10, 50, 380, 300, 180, 180, 60, 60);
  fill(180);
  ellipse(270, 130, 170, 100);
  ellipse(200, 90, 200, 60);
  objects.push(get(0, 0, width, height));

  // main character
  fill(255);
  rect(0, 0, 400, 400);
  //todo
  fill(0);
  circle(200, 200, 300);
  objects.push(get(0, 0, width, height));

  // enemy
  fill(255);
  rect(0, 0, 400, 400);
  //todo
  fill(255, 0, 0);
  circle(200, 200, 300);
  objects.push(get(0, 0, width, height));

}

class prizeObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class rockObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
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
  background(255);

  game.initialize();
  game.drawBackground(); 
  
  mainChar.draw();
  mainChar.move();
  
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].draw();
    enemies[i].move();
  }
  
}
