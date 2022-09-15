/*
var tilemap = [
  "                                        ",
  "wwwwwwwwwwwww       ",
  "w           w       ",
  "w           w       ",
  "w           www     ",
  "w                  w",
  "w                  w",
  "w                  w",
  "wwwwwwwwwwww       w",
  "w                  w",
  "w               c  w",
  "w                  w",
  "w                  w",
  "w                  w",
  "w                 ww",
  "w                www",
  "w               wwww",
  "w             wwwwww",
  "w        wwwwwwwwwww",
  "gggggggggggggggggggg",];
  */

var objects = [];

function customChar() {

  // main character
  fill(255, 0);
  rect(0, 0, 400, 400);
  //temp
  fill(0);
  circle(200, 200, 300);
  objects.push(get(0, 0, width, height));

  // enemy
  fill(255, 0);
  rect(0, 0, 400, 400);
  //temp
  fill(255, 0, 0);
  circle(200, 200, 300);
  objects.push(get(0, 0, width, height));

}

class mainCharObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    //todo
    image(objects[0], this.x, this.y, 20, 20);
  }

  move() {
    // The main character moves with the arrow keys.
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 3;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      this.x += 3;
    }
    else if (keyIsDown(UP_ARROW)) {
      this.y -= 3;
    }
    else if (keyIsDown(DOWN_ARROW)) {
      this.y += 3;
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
  }
}

class enemyObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xDir = random(-0.5, 0.5);
    this.yDir = random(-0.5, 0.5);
  }

  draw() {
    //todo
    image(objects[1], this.x, this.y, 20, 20);
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

  }
}

var mainChar;
var enemies;

function setup() {
  createCanvas(400, 400);
  customChar();
  mainChar = new mainCharObj(100, 100);
  enemies = new enemyObj(200, 200);
}

function draw() {
  background(220);

  mainChar.draw();
  mainChar.move();
  
  enemies.draw();
  enemies.move();
}
