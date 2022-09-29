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

class ballObj {
  constructor(x, y) {
    this.pos = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.size = 15;
    this.mass = this.size/5;
    this.valid = 1;
  }

  draw() {
    noStroke();
    fill(255, 255, 204);  // light yellow
    circle(this.pos.x, this.pos.y, this.size);
  }

  applyForce(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    var gravityForce = p5.Vector.mult(gravity, this.mass);
    this.applyForce(gravityForce);
    var windForce = p5.Vector.mult(wind, this.mass);
    windForce.mult(windSpeed);
    this.applyForce(windForce);
    var airFriction = p5.Vector.mult(this.velocity, -0.02);
    this.applyForce(airFriction);

    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);
    
    // Each ball will bounce on the stair as it hits the step on the stair
    for (var i = 0; i < 35; i++) {
      if (this.pos.x >= stairs[i].x && this.pos.x <= stairs[i].x+10) {
        if (this.pos.y > (stairs[i].y-this.size/2)) {
          this.pos.y = stairs[i].y-this.size/2;
          this.velocity.y *= -1;
        }
      }
    }

    if (this.pos.x > (width+this.size/2)) {
      this.pos.x = -this.size/2;
    }

    this.acceleration.set(0, 0);

    // When the ball hits the right border of the canvas, it will disappear.
    if (this.pos.x >= 400) {  
      this.valid = 0;
    } 
  }
}

function generateBall() {
  // generate a ball every 2 seconds
  if (frameCount % 120 === 0) {
    balls.push(new ballObj(30, -30));
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
          if (this.pos.y+27 >= stairs[i].y && this.pos.y+27 < stairs[i].y+10) {
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
          if (this.pos.y+27 >= stairs[i].y && this.pos.y+27 < stairs[i].y+10) {
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
    if (this.pos.x >= 10 && this.pos.x <= 50 && this.pos.y < 70 && this.gameOver === 0) {
      this.win = 1;
    }

    // The player loses if the player falls off the stair hitting the bottom border.
    if (this.pos.y+27 >= height) {
      this.gameOver = 1;
    }

    // The player loses when a ball hits the player
    for (var i = 0; i < balls.length; i++) {
      if (this.win === 0 && dist(this.pos.x, this.pos.y, balls[i].pos.x, balls[i].pos.y) < 10) {
        this.gameOver = 1;
      }
    }
  }
}

function initMainChar() {
  mainChar = new mainCharObj(30, 333);
  mainChar.win = 0;
  mainChar.gameOver = 0;
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

function checkRestart() {
  if (keyIsDown(13) && (mainChar.win === 0 || mainChar.gameOver === 0)) {
    initialize = 1;
  }
}

var mainChar;
var balls = [];
var gravity, walkForce, backForce, jumpForce, wind;
var windSpeed = 0.013;
var initialize = 1;

function setup() {
  createCanvas(400, 400);
  gravity = new p5.Vector(0, 0.15);
  walkForce = new p5.Vector(0.2, 0);
  backForce = new p5.Vector(-0.2, 0);
  jumpForce = new p5.Vector(0, -4);
  wind = new p5.Vector(1, 0);
  initializeTilemap();
  initMainChar();
}

function draw() {
  // initialize the game
  if (initialize === 1) {
    initialize = 0;
    initializeTilemap();
    initMainChar();
  }

  background(0);  // black
  displayTilemap();

  mainChar.update();
  mainChar.draw();

  generateBall();
  for (var i = 0; i < balls.length; i++) {
    if (balls[i].valid === 1) {
      balls[i].update();
      balls[i].draw();
    }

  }

  if (mainChar.gameOver === 1) {
    fill(255);
    textStyle(BOLD);
    textFont('Courier New', 40);
    text("GAME OVER", 80, 235);
    textStyle(NORMAL);
    textFont('Courier New', 14);
    text("Press ENTER to restart", 90, 260);
    checkRestart();
  }
  else if (mainChar.win === 1) {
    fill(255);
    textStyle(BOLD);
    textFont('Courier New', 40);
    text("YOU WIN!", 100, 235);
    textStyle(NORMAL);
    textFont('Courier New', 14);
    text("Press ENTER to restart", 90, 260);
    checkRestart();
  }

}
