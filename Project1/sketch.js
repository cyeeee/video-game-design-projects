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

class Gun {
  constructor(x) {
    this.x = x;
  }

  draw() {
    fill(0);
    
  }
}

var ball;

function setup() {
  createCanvas(400, 400);
  ball = new Ball(200, 200);   
}

function draw() {
  background(255);

  ball.draw();
  ball.move();
}
