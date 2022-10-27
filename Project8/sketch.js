/*
Project 8 - Tropical Fish Aquarium
Author: Chenyi Wang
Date: 10/26/22

*/

class aquariumObj {
  constructor() {
    // the aquarium is 1500 pixels wide and 400 pixels long

    this.xCor = 0;
    this.yCor = 0;
  }

  drawBackground() {
    fill(90, 240, 240);  // light blueish cyan
    rect(0, 0, 1500, 400);

    // The player uses the left and right arrow keys to scroll the screen
    if (keyIsDown(RIGHT_ARROW)) {
      this.xCor -= 5;
    }
    if (keyIsDown(LEFT_ARROW)) {
      //if (this.xCor < 0) {
        this.xCor += 5;
      //}
    }
  }
}

var aquarium;

function setup() {
  createCanvas(400, 400);
  aquarium = new aquariumObj();
}

function draw() {
  background(0);

  push();
  translate(aquarium.xCor, aquarium.yCor);
  aquarium.drawBackground();
  pop();
}
