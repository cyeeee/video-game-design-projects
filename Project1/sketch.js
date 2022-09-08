class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.xDir = random(1, 3);
    this.yDir = random(1, 3);
    //random color
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }
  
  draw() {
    noStroke();
    fill(this.r, this.g, this.b);  // random color
    ellipse(this.x, this.y, this.size, this.size);
  }
  
  move() {
    this.x += this.xDir;
    this.y += this.yDir;
    if (this.x >= (width - 10) || this.x < 10) {
      this.xDir = -this.xDir; 
      //change color when hit the boundaries
      this.r = random(255);
      this.g = random(255);
      this.b = random(255);
    }
    if (this.y >= (height - 10) || this.y < 10) {
      this.yDir = -this.yDir; 
      //change color when hit the boundaries
      this.r = random(255);
      this.g = random(255);
      this.b = random(255);
    }
  }
}

class Invader {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  draw() {
    fill(0, 255, 255);
    noStroke();
    rect(this.x, this.y, 15, 7);
    rect(this.x-3, this.y+2, 21, 2);
    rect(this.x+3, this.y-3, 9, 3);
    rect(this.x+3, this.y+7, 2, 3);
    rect(this.x+10, this.y+7, 2, 3);
    quad(this.x+1, this.y-6, this.x+3, this.y-6, 
      this.x+6, this.y-3, this.x+4, this.y-3);
    quad(this.x+12, this.y-6, this.x+14, this.y-6, 
      this.x+11, this.y-3, this.x+9, this.y-3);
    fill(0);
    square(this.x+3, this.y+1, 2);
    square(this.x+10, this.y+1, 2);
  }
}

class Gun {
  constructor(x) {
    this.x = x;
  }

  draw() {
    fill(109, 113, 46); // green
    noStroke();
    rect(this.x, 395, 40, 5);
    rect(this.x+7, 385, 26, 10);
    rect(this.x+17, 380, 6, 5);
  }

  move() {
    if (keyArray[LEFT_ARROW] === 1 && this.x >= 0) {
      this.x--;
    }
    if (keyArray[RIGHT_ARROW] === 1 && this.x <= (width-40)) {
      this.x++;
    }
  }
}

var ball;
var gun;
var invader;
var keyArray = [];

function keyPressed() {
  keyArray[keyCode] = 1;
}
function keyReleased() {
  keyArray[keyCode] = 0;
}

function setup() {
  createCanvas(400, 400);
  ball = new Ball(200, 200);
  gun = new Gun(180);
  invader = new Invader(200, 200);
}

function draw() {
  background(0);

  ball.draw();
  ball.move();

  invader.draw();

  gun.draw();
  gun.move();
}
