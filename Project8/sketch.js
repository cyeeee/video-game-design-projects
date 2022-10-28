/*
Project 8 - Tropical Fish Aquarium
Author: Chenyi Wang
Date: 10/26/22

*/

var aquarium;
var bubbles = [];
var fish1, fish2, fish3;

function setup() {
  createCanvas(400, 400);
  upForce = new p5.Vector(0, -0.003);
  aquarium = new aquariumObj();
  aquarium.initialize();
  bubbles.push(new bubbleObj(0, 400));
  bubbles.push(new bubbleObj(380, 400));
  bubbles.push(new bubbleObj(680, 400));
  bubbles.push(new bubbleObj(1000, 400));
  bubbles.push(new bubbleObj(1280, 400));
  fish1 = new fish1Obj(200, 200);
  fish2 = new fish2Obj(400, 400);
  fish3 = new fish3Obj(600, 600);

}

function draw() {
  background(90, 240, 240);  // light blueish cyan

  push();
  translate(aquarium.xCor, aquarium.yCor);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].execute();
  }
  aquarium.drawBackground();
  fish1.draw();
  fish2.draw();
  fish3.draw();

  pop();
}
