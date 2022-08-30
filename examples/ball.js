class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.xDir = random(1, 3);
    this.yDir = random(1, 3);
  }
  
  draw() {
    noStroke();
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size, this.size);
  }
  
  move() {
    this.x += this.xDir;
    this.y += this.yDir;
    if (this.x >= (width - 10) || this.x < 10) {
      this.xDir = -this.xDir; 
    }
    if (this.y >= (height - 10) || this.y < 10) {
      this.yDir = -this.yDir; 
    }
  }
}

var ball = [];

function setup() {
  createCanvas(400, 400);
  
  for (var i = 0; i < 5; i++){
    ball[i] = new Ball(200, 200);   
  }
  
}

function draw() {
  background(220);
  
  if (frameCount > 240) frameRate(10); //slow down
  
  for (var i = 0; i < ball.length; i++){     
    ball[i].draw();
    ball[i].move();
  }

}