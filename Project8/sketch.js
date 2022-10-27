/*
Project 8 - Tropical Fish Aquarium
Author: Chenyi Wang
Date: 10/26/22

*/


var aquarium;

function setup() {
  createCanvas(400, 400);
  aquarium = new aquariumObj();
  aquarium.initialize();
}

function draw() {
  background(90, 240, 240);  // light blueish cyan

  push();
  translate(aquarium.xCor, aquarium.yCor);
  aquarium.drawBackground();
  pop();
}
