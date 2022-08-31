// paddle controlled by mouse
// simple collision check
// gameOver variable

class ballObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xDir = random(1, 3);
    this.yDir = random(1, 3);
    this.size = 20;
  }

  draw() {
    noStroke();
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size, this.size);
  }

  ///// Experiment /////
  move() {
    this.x += this.xDir;
    this.y += this.yDir;
    // why 10?
    if (this.x > width - 10 || this.x < 10) {
      this.xDir = -this.xDir;
    }
    if (this.y > height - 10 || this.y < 10) {
      this.yDir = -this.yDir;
    }
    ///// Experiment /////
    if (this.y > 370) {
      if (dist(this.x, 0, paddle.x, 0) <= 45) {
        this.yDir = -this.yDir;
        // play a sound (check p5.sound.js)
      } else {
        gameOver = true;
      }
    }
  }
}

// mouseX
class paddleObj {
  constructor(x) {
    this.x = x;
    this.size = 80;
  }
  
  draw() {
    fill(0, 0, 0);
    this.x = mouseX;
    rect(this.x - 40, 380, this.size, 20);
  }
}

var ball;
var paddle;
var gameOver = false;

function setup() {
  createCanvas(400, 400);
  frameRate(60); // Experiment this rate
  ball = new ballObj(width / 2, height / 2);
  paddle = new paddleObj(200);
}

function draw() {
  background(0, 255, 255);
  if (gameOver === false) {
    ball.draw();
    ball.move();
    paddle.draw();
  } else {
    textSize(50);
    text("Game Over", 80, 200);
  }
}
