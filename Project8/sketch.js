/*
Project 8 - Tropical Fish Aquarium
Author: Chenyi Wang
Date: 10/26/22

*/


var aquarium;
var fish1, fish2;

function setup() {
  createCanvas(400, 400);
  aquarium = new aquariumObj();
  aquarium.initialize();
  fish1 = new fish1Obj(200, 200);
  fish2 = new fish2Obj(400, 400);
}

function draw() {
  background(90, 240, 240);  // light blueish cyan

  push();
  translate(aquarium.xCor, aquarium.yCor);
  aquarium.drawBackground();

  push();
  scale(0.2);
  fish1.draw();
  fish2.draw();
  pop();

  pop();
}
