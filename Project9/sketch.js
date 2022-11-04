/*
Project 9 - Chasing in a maze
Author: Chenyi Wang
Date: 11/02/22

*/

var mainChar;
var enemys = [];
var game;
var graph = [];
var initialize = 1;

function mouseClicked() {
  if (game.end === 1 || game.score === game.pellets.length) {
    initialize = 1;
  }
}

function setup() {
  createCanvas(400, 400);
  angleMode(RADIANS);
  customChar();

  graph = new Array(20);
  for (var i = 0; i < 20; i++) {
    graph[i] = new Array(20);
  }

  /* graph = new Array(20);
  cost = new Array(20);
  inq = new Array(20);
  comefrom = new Array(20);
  for (var i = 0; i < 20; i++) {
    graph[i] = new Array(20);
    cost[i] = new Array(20);
    inq[i] = new Array(20);
    comefrom[i] = new Array(20);
  }
  for (i = 0; i < 400; i++) {
    path.push(new p5.Vector(0, 0));
    q.push(new qObj(0, 0));
  }
  for (i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      comefrom[i][j] = new p5.Vector(0, 0);
    }
  }
  target = new targetObj(0, 0);
  targetPos = new targetObj(0, 0);
  finalDest = new targetObj(0, 0); */
  
  game = new gameObj();
  game.initialize();
}

function draw() {
  background(215, 230, 215);

  // restart the game
  if (initialize === 1) {
    initialize = 0;
    game.initialize();
  }

  // the player wins when all pellets are gone
  if (game.score === game.pellets.length) { 
    fill(0);
    textStyle(BOLD);
    textFont('Courier New', 40);
    text("YOU WIN!", 100, 200);
    textSize(16);
    text("click ANYWHERE to play again", 65, 240);
  }
  // game continues
  else if (game.end === 0) {
    game.draw();
    // always display the number of pellets in the game screen
    fill(255);
    textFont("Arial", 12);
    textStyle(NORMAL);
    text("Pellets:  " + game.score + " / " + game.pellets.length, 300, 13);  
  }
  // game over
  else {
    fill(0);
    textStyle(BOLD);
    textFont('Courier New', 40);
    text("GAME OVER", 80, 200);
    textSize(16);
    text("click ANYWHERE to play again", 65, 240);
  }
}
