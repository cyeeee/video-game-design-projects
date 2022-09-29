/*
Project 4 - Hopper
Author: Chenyi Wang
Date: 09/27/22



*/

var tileMap = [
  "                                        ",
  "                                        ",
  "                                        ",
  "                                        ",
  "                                        ",
  "                                        ",
  "                                        ",
  "ssssss                                  ",
  "                                        ",
  "                                        ",
  "       ssssss                           ",
  "                                        ",
  "                                        ",
  "              ssssss                    ",
  "                                        ",
  "                                        ",
  "                     ssssss             ",
  "                                        ",
  "                                        ",
  "                            ssssss      ",
  "                                        ",
  "                                        ",
  "                                   sssss",
  "                                        ",
  "                                        ",
  "                            ssssss      ",
  "                                        ",
  "                                        ",
  "                     ssssss             ",
  "                                        ",
  "                                        ",
  "              ssssss                    ",
  "                                        ",
  "                                        ",
  "       ssssss                           ",
  "                                        ",
  "                                        ",
  "ssssss                                  ",
  "                                        ",
  "                                        ",
  "                                        ",];

class stairObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

var stairs = [];
function initializeTilemap() {
  for (var i = 0; i < tileMap.length; i++) {
    for (var j = 0; j < tileMap[i].length; j++) {
      if (tileMap[i][j] === 's') {
        stairs.push(new stairObj(j*10, i*10));
      }
    }
  }
}

function displayTilemap() {
  fill(150);  // grey
  noStroke();
  for (var i = 0; i < stairs.length; i++) {
    square(stairs[i].x, stairs[i].y, 10);
  }
}

class mainCharObj {
  constructor(x, y) {
    this.pos = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.force = new p5.Vector(0, 0);
    this.jump = 0;
    this.gameOver = 0;
    this.win = 0;
  }

  draw() {
    noStroke();
    fill(204, 255, 255);  // light blue
    switch (this.jump) {
      case 0: // normal mode       
        triangle(this.pos.x, this.pos.y, this.pos.x+10, this.pos.y+22, this.pos.x-10, this.pos.y+22);
        circle(this.pos.x, this.pos.y-5, 20);
        rect(this.pos.x-4, this.pos.y+22, 2, 5);
        rect(this.pos.x+3, this.pos.y+22, 2, 5);
        fill(0);
        ellipse(this.pos.x-5, this.pos.y-5, 3, 7);
        ellipse(this.pos.x+5, this.pos.y-5, 3, 7);
        break;
      case 1: // jump mode
        triangle(this.pos.x, this.pos.y, this.pos.x+7, this.pos.y+27, this.pos.x-7, this.pos.y+27);
        circle(this.pos.x, this.pos.y-5, 20);
        fill(0);
        ellipse(this.pos.x-5, this.pos.y-5, 3, 5);
        ellipse(this.pos.x+5, this.pos.y-5, 3, 5);
        break;
    }

    this.acceleration.set(0, 0);  // reset acceleration
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.applyForce(this.force);
    this.applyForce(gravity);
    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);
    
    // land on the staircases
    if (this.pos.y+27 > 197) {
      for (var i = 30; i < stairs.length; i++) {
        if (this.pos.x >= stairs[i].x && this.pos.x <= stairs[i].x+10) {
          if (this.pos.y >= stairs[i].y-27) {
            this.pos.y = stairs[i].y-27;
            this.velocity.y = 0;  // reset velocity on landing
            this.jump = 0;
          }
        }
        else {
          this.force.set(0, 0);
        }
      }
    }
    else {
      for (var i = 0; i < 35; i++) {
        if (this.pos.x >= stairs[i].x && this.pos.x <= stairs[i].x+10) {
          if (this.pos.y >= stairs[i].y-27) {
            this.pos.y = stairs[i].y-27;
            this.velocity.y = 0;  // reset velocity on landing
            this.jump = 0;
          }
        }
        else {
          this.force.set(0, 0);
        }
      }
    }

    // stay inside the map
    if (this.pos.x < 10) {
      this.pos.x = 10;
      this.velocity.x = 0;
    }
    else if (this.pos.x > 390) {
      this.pos.x = 390;
      this.velocity.x = 0;
    }

    // The player wins when the player character reaches the top of the stairs.
    if (this.pos.x >= 10 && this.pos.x <= 50 && this.pos.y < 70) {
      this.win = 1;
    }

  }

}

function keyPressed() {
  // The main player starts at the bottom-left and is controlled with WAD 
  // where W means to jump, while AD is to move left/right.
  if (keyCode === 68) { // D
    mainChar.force.add(walkForce);
  }
  if (keyCode === 65) { // A
    mainChar.force.add(backForce);
  }
  if (keyCode === 87 && mainChar.jump === 0) { // W
    mainChar.force.add(jumpForce);
    mainChar.jump = 1;
  }
}

function keyReleased() {
  mainChar.force.set(0, 0);
}

var mainChar;
var gravity, walkForce, backForce, jumpForce;

function setup() {
  createCanvas(400, 400);
  angleMode(RADIANS);
  initializeTilemap();
  gravity = new p5.Vector(0, 0.15);
  walkForce = new p5.Vector(0.2, 0);
  backForce = new p5.Vector(-0.2, 0);
  jumpForce = new p5.Vector(0, -4);
  mainChar = new mainCharObj(30, 333);
}

function draw() {
  background(0);  // black
  displayTilemap();

  mainChar.update();
  mainChar.draw();
}
