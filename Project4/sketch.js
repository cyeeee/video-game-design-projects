/*
Project 4 - Hopper
Author: Chenyi Wang
Date: 09/27/22



*/

var tileMap = [
  "                                        ",
  "                                        ",
  "                                        ",
  "                                        ",
  "                                        ",
  "                                        ",
  "ssssss                                  ",
  "ssssss                                  ",
  "                                        ",
  "       ssssss                           ",
  "       ssssss                           ",
  "                                        ",
  "              ssssss                    ",
  "              ssssss                    ",
  "                                        ",
  "                     ssssss             ",
  "                     ssssss             ",
  "                                        ",
  "                            ssssss      ",
  "                            ssssss      ",
  "                                        ",
  "                                   sssss",
  "                                   sssss",
  "                                        ",
  "                            ssssss      ",
  "                            ssssss      ",
  "                                        ",
  "                     ssssss             ",
  "                     ssssss             ",
  "                                        ",
  "              ssssss                    ",
  "              ssssss                    ",
  "                                        ",
  "       ssssss                           ",
  "       ssssss                           ",
  "                                        ",
  "ssssss                                  ",
  "ssssss                                  ",
  "                                        ",
  "                                        ",
  "                                        ",];

class stairObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

var stairs = [];
function initializeTilemap() {
  for (var i = 0; i < tileMap.length; i++) {
    for (var j = 0; j < tileMap[i].length; j++) {
      if (tileMap[i][j] === 's') {
        stairs.push(new stairObj(j*10, i*10));
      }
    }
  }
}

function displayTilemap() {
  fill(255, 0, 0);  // red
  noStroke();
  for (var i = 0; i < stairs.length; i++) {
    square(stairs[i].x, stairs[i].y, 10);
  }
}



function setup() {
  createCanvas(400, 400);
  angleMode(RADIANS);
  initializeTilemap();
}

function draw() {
  background(220);
  displayTilemap();
}
