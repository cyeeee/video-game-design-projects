/*
Project 8 - Tropical Fish Aquarium
Author: Chenyi Wang
Date: 10/26/22

*/

var aquarium;
var bubbles = [];
var upForce;
var fish1, fish2, fish3;
var fishSchool1, fishSchool2, fishSchool3;
var fiveDegrees;
var cohesionDist = 200;

function setup() {
  createCanvas(400, 400);
  angleMode(RADIANS);
  fiveDegrees = PI/36;
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
  fishSchool1 = new swarm1Obj();
  fishSchool2 = new swarm2Obj();
  fishSchool3 = new swarm3Obj();
}

function draw() {
  background(90, 240, 240);  // light blueish cyan

  push();
  translate(aquarium.xCor, aquarium.yCor);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].execute();
  }
  aquarium.drawBackground();
  if (fish1.out === 0) {
    fish1.draw();
    fish1.move();
  }
  else {
    fish1 = new fish1Obj(0, 200);
  }
  if (fish2.out === 0) {
    fish2.draw();
    fish2.move();
  }
  else {
    fish2 = new fish2Obj(0, 400);
  }

  if (fish3.out === 0) {
    fish3.draw();
    fish3.move();
  }
  else {
    fish3 = new fish3Obj(0, 600);
  }

  fishSchool1.display();
  fishSchool2.display();
  fishSchool3.display();
  if (frameCount % 180 === 0) {
    fishSchool1.swarm();
    fishSchool2.swarm();
    fishSchool3.swarm();
  }

  pop();
}
