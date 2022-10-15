/*
Project 5 - NPC Hopper
Author: Chenyi Wang
Date: 10/04/22

This project has a tilemap of 400x400 with several staircases.
There are 3 NPC hoppers start at different locations on the stairs, and will climb upward.
The player can control the dropping of the balls with the space-bar.

The NPC dies when a ball hits it or fall off the stairs.
When all NPC characters have been killed, the player wins.
When any NPC reaches the second highest step in the stair-case, game over.

When the player either wins or loses, if the ENTER key is pressed, the game will restart.

Note: Each NPC has knowledge of the staircase, as well as the positions of all the balls.
The NPC will avoid the ball by taking a step back when it is not in the jump state.
When the ball is on the same step as the NPC and is very close to the NPC, the NPC will jump over the ball.
*/

var tileMap = [
  "      ",
  "      ",
  "s     ",
  " s    ",
  "  s   ",
  "   s  ",
  "    s ",
  "     s",
  "    s ",
  "   s  ",
  "  s   ",
  " s    ",
  "s     ",
  "      ",
  "      ",
  "      ",];

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
        stairs.push(new stairObj(j*68, i*30));
      }
    }
  }
}

function displayTilemap() {
  fill(150);  // grey
  noStroke();
  for (var i = 0; i < stairs.length; i++) {
    rect(stairs[i].x, stairs[i].y, 60, 10);
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
    this.angle = 0;
    this.aVelocity = 0;
    this.trajectory = new p5.Vector(0, 0);
    this.pPos = new p5.Vector(0, 0);  // previous position
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    noStroke();
    fill(255, 255, 204);  // light yellow
    circle(0, 0, this.size);
    fill(255, 102, 102);  // light red
    textSize(15);
    text("★", -6, 5);
    pop();
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
    
    this.pPos.set(this.pos.x, this.pos.y);
    this.pos.add(this.velocity);
    this.trajectory.set(this.pos.x-this.pPos.x, this.pos.y-this.pPos.y);

    // the ball spins while in air or rolling
    this.aVelocity = this.velocity.mag() * 6;
    this.angle += this.aVelocity;
    
    // Each ball will bounce on the stair as it hits the step on the stair
    for (var i = 0; i < stairs.length; i++) {
      if (this.pos.x >= stairs[i].x && this.pos.x <= stairs[i].x+60) {
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

class npcObj {
  constructor(x, y) {
    this.pos = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.force = new p5.Vector(0, 0);
    this.jump = 0;
    this.inAir = 0;
    this.left = 0;
    this.right = 0;
    this.botHalf = 0;
    this.dead = 0;
    this.avoidTarget = new p5.Vector(0, 0);
  }

  draw() {
    noStroke();
    fill(204, 255, 255);  // light blue
    switch (this.inAir) {
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

  move() {
    if (this.left === 1) {
      this.velocity.x = 0;
      this.force.set(backForce);
    }
    if (this.right === 1) {
      this.velocity.x = 0;
      this.force.set(walkForce);
    }
    if (this.jump === 1) {
      this.force.add(jumpForce);
      this.inAir = 1;
    }
  }

   avoidBall() {
    for (var i = 0; i < balls.length; i++) {
      var distance = dist(balls[i].pos.x, balls[i].pos.y, this.pos.x, this.pos.y);
      if (this.botHalf === 0 && balls[i].pos.x < this.pos.x 
        && distance > 10 && distance < 70) {
        this.avoidTarget.set(balls[i].trajectory.x, balls[i].trajectory.y);
        this.avoidTarget.mult(15);
        this.avoidTarget.x += balls[i].pos.x;
        this.avoidTarget.y += balls[i].pos.y;

        if (this.inAir === 0) {
          this.left = 0;
          if (this.avoidTarget.x < this.pos.x) {
            if ((this.pos.x-this.avoidTarget.x) < 3 && this.avoidTarget.y > this.pos.y + 20) {
              this.jump = 1;
            }
            if (this.avoidTarget.y > this.pos.y) {
              this.right = 1;
            }
          }
          else {
            this.left = 1;
          }
        }
      }
    }
  } 

  climb() {
    if (this.botHalf === 1) {
      for (var i = 5; i < stairs.length; i++) {
        if (this.pos.x >= stairs[i].x && this.pos.x <= stairs[i].x+60) {
          if (this.pos.y+27 >= stairs[i].y && this.pos.y+27 < stairs[i].y+10) {
            this.pos.y = stairs[i].y-27;
            this.velocity.y = 0;  // reset velocity on landing
            this.jump = 0;
            this.inAir = 0;
          }
          this.left = 0;
          this.right = 1;
        }
        else {
          if (this.inAir === 0){
            if (this.pos.x < stairs[i].x) {
              this.jump = 1;
            }
          }
          else {
            this.jump = 0;
          }
          this.force.set(0, 0);
        }
      }
    }
    else {
      for (var i = 0; i < 6; i++) {
        if (this.pos.x >= stairs[i].x && this.pos.x <= stairs[i].x+60) {
          if (this.pos.y+27 >= stairs[i].y && this.pos.y+27 < stairs[i].y+10) {
            this.pos.y = stairs[i].y-27;
            this.velocity.y = 0;  // reset velocity on landing
            this.jump = 0;
            this.inAir = 0;
          }
          this.right = 0;
          this.left = 1;
        }
        else {
          if (this.inAir === 0){
            if (this.pos.x > stairs[i].x) {
              this.jump = 1;
            }
          }
          else {
            this.jump = 0;
          }
          this.force.set(0, 0);
        }
      }
    }
  }

  update() {
    if (win === 0 && gameOver === 0) {
      this.avoidBall();
    } 
    this.move();
    this.applyForce(this.force);
    this.applyForce(gravity);
    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);

    if (this.pos.y+27 > 230) {
      this.botHalf = 1;
    }
    if (this.pos.x >= 385) {
      this.botHalf = 0;
    }
    
    this.climb();
    this.stay();
    this.checkState();
  }

  stay() {
    // stay inside the map
    if (this.pos.x < 15) {
      this.pos.x = 15;
      this.velocity.x = 0;
    }
    else if (this.pos.x > 390) {
      this.pos.x = 390;
      this.velocity.x = 0;
    }
  }

  checkState() {
    // The player loses when any NPC reaches the second highest step in the stair-case.
    if (this.pos.x >= 10 && this.pos.x <= 120 && this.pos.y < 100) {
      gameOver = 1;
    }

    // The NPC dies when fall off the stairs hitting the bottom border.
    if (this.pos.y+27 >= height) {
      this.dead = 1;
    }

    // When a ball hits the NPC, the NPC dies and disappears.
    for (var i = 0; i < balls.length; i++) {
      if (gameOver === 0 && this.dead === 0 
        && dist(this.pos.x, this.pos.y, balls[i].pos.x, balls[i].pos.y) < 15) {
        this.dead = 1;
      }
    } 
  }
}

function initNPC() {
  npcChar = [new npcObj(30, 333), new npcObj(80, 303), new npcObj(160, 273)];
}

function keyPressed() {
  // generate a ball when the space-bar is pressed
  if (keyCode === 32) { 
    balls.push(new ballObj(30, -30));
  }
}

function checkRestart() {
  if (keyIsDown(13) && (win === 0 || gameOver === 0)) {
    initialize = 1;
  }
}

var npcChar;
var balls = [];
var gravity, walkForce, backForce, jumpForce, wind;
var windSpeed = 0.018;
var initialize = 1;
var gameOver = 0;
var win = 1;

function setup() {
  createCanvas(400, 400);
  gravity = new p5.Vector(0, 0.15);
  walkForce = new p5.Vector(0.6, 0);
  backForce = new p5.Vector(-0.6, 0);
  jumpForce = new p5.Vector(0, -4);
  wind = new p5.Vector(1, 0);
  initializeTilemap();
  initNPC();
}

function draw() {
   // initialize the game
   if (initialize === 1) {
    initialize = 0;
    initializeTilemap();
    initNPC();
    balls = [];
    gameOver = 0;
  } 

  background(0);  // black
  displayTilemap();
  
  win = 1;
  for (var i = 0; i < 3; i++) {
    if (npcChar[i].dead === 0) {
      win = 0;
      npcChar[i].update();
      npcChar[i].draw();
    }
  } 

  for (var i = 0; i < balls.length; i++) {
    if (balls[i].valid === 1) {
      balls[i].update();
      balls[i].draw();
    }
  }

   if (gameOver === 1) {
    fill(255);
    textStyle(BOLD);
    textFont('Courier New', 40);
    text("GAME OVER", 80, 235);
    textStyle(NORMAL);
    textFont('Courier New', 14);
    text("Press ENTER to restart", 90, 260);
    checkRestart();
  }
  else if (win === 1) {
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
