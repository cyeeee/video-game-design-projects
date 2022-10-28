/*
Project 8 - Tropical Fish Aquarium
Author: Chenyi Wang
Date: 10/26/22

The aquarium in this project is 1500 pixels wide and 400 pixels long.
The screen can be scrolled by pressing left and right arrow keys.

There are seaweeds and rocks at the bottom of the aquarium.
There are bubbles blown out of the rocks periodically.

There are 3 different types of tropical fish, and their tails are animated.
The size of each fish is different.
There are 3 schools of fish swim together and another 10 individual fish swim by itself.

*/

var aquarium;
var bubbles = [];
var upForce;
var fishs = [];
var fishSchool1, fishSchool2, fishSchool3;
var tenDegrees;
var cohesionDist = 500;

function setup() {
  createCanvas(400, 400);
  angleMode(RADIANS);
  tenDegrees = PI/18;
  upForce = new p5.Vector(0, -0.003);
  aquarium = new aquariumObj();
  aquarium.initialize();

  bubbles.push(new bubbleObj(0, 400));
  bubbles.push(new bubbleObj(380, 400));
  bubbles.push(new bubbleObj(680, 400));
  bubbles.push(new bubbleObj(1000, 400));
  bubbles.push(new bubbleObj(1280, 400));

  fishs[0] = new fish2Obj(400, 400);
  fishs[1] = new fish2Obj(3800, 800);
  fishs[2] = new fish2Obj(1500, 2000);
  fishs[3] = new fish2Obj(1400, 1800);
  fishs[4] = new fish2Obj(3200, 1500);
  fishs[5] = new fish2Obj(4200, 800);
  fishs[6] = new fish2Obj(200, 1000);
  fishs[7] = new fish2Obj(2000, 2400); 
  fishs[8] = new fish2Obj(3300, 900);  
  fishs[9] = new fish2Obj(2500, 2000);  

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

  for (var i = 0; i < fishs.length; i++) {
    if (fishs[i].out === 0) {
      fishs[i].draw();
      fishs[i].move();
    }
    else {
      fishs[i] = new fish2Obj(0, 1000);
    }
  }

  if (fishSchool1.out === 0) {
    fishSchool1.display();
  }
  else {
    fishSchool1 = new swarm1Obj();
  }

  if (fishSchool2.out === 0) {
    fishSchool2.display();
  }
  else {
    fishSchool2 = new swarm2Obj();
  }
  if (fishSchool3.out === 0) {
    fishSchool3.display();
  }
  else {
    fishSchool3 = new swarm3Obj();
  }

  if (frameCount % 60 === 0) {
    fishSchool1.swarm();
    fishSchool2.swarm();
    fishSchool3.swarm();
  }

  pop();
}
