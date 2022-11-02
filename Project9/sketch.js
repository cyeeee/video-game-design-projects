/*
Project 9 - Chasing in a maze
Author: Chenyi Wang
Date: 11/02/22

*/

class mainCharObj {
  constructor(x, y) {
    this.pos = new p5.Vector(x, y);
  }

  draw() {
    image(main, this.pos.x, this.pos.y, 20, 20);
  }
}

var mainChar;
var enemys = [];
var game;

class enemyObj {
  constructor(x, y) {
    this.pos = new p5.Vector(x, y);
  }

  draw() {
    image(enemy, this.pos.x, this.pos.y, 20, 20);
  }
}

function setup() {
  createCanvas(400, 400);
  angleMode(RADIANS);
  customChar();
  game = new gameObj();
  game.initialize();
}

function draw() {
  background(215, 230, 215);

  game.drawBackground();
}
