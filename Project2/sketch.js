
var objects = [];

function customChar() {

  fill(255, 0);
  rect(0, 0, 400, 400);
  //temp
  fill(0);
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

var mainChar;

function setup() {
  createCanvas(400, 400);
  customChar();
  mainChar = new mainCharObj(100, 100);
}

function draw() {
  background(220);

  mainChar.draw();
  mainChar.move();
  
}
