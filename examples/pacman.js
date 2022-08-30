let myPI = 3.141592653589793;
let two_degrees = myPI / 90;
//let two_degrees = myPI / 50; //faster
let max_angle = myPI / 3;

class Pacman {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.openingRate = two_degrees;
  }
  
  draw() {
    fill(255, 255, 0);
    noStroke();
    /*
    ellipse(this.x, this.y, 50, 50);
    fill(0, 0, 255);
    arc(this.x, this.y, 50, 50, -this.angle, this.angle);
    */
    arc(this.x, this.y, 50, 50, this.angle, TWO_PI - this.angle);
  }
  
  update() {
    this.angle += this.openingRate;
    if (this.angle >= max_angle || this.angle <= 0) {
      this.openingRate = -this.openingRate;
    }
  }
  
  move() {
    this.x++;
    if (this.x > 425) {
      this.x = -25;
    }
  }
}

var pacman = [];

function setup() {
  createCanvas(400, 400);
  angleMode(RADIANS);
  pacman[0] = new Pacman(100, 100);
  pacman[1] = new Pacman(200, 200);
  pacman[2] = new Pacman(300, 300);
}

function draw() {
  background(0, 0, 225);
  
  for (var i = 0; i < pacman.length; i++) {
    pacman[i].draw();
    pacman[i].update();
    pacman[i].move();
  }
  
}