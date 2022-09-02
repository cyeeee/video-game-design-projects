var gameStart = 0;
function mouseClicked() {
  var xCor = mouseX;
  var yCor = mouseY;
  // check if clicked in the correct box
  if (xCor > 50 && xCor < 100 && yCor > 200 && yCor < 250) {
    gameStart = 1;
    print(gameStart);
  }
  print(xCor + " " + yCor);
}

function mouseDragged() {
  stroke(255, 0, 0);
  point(mouseX, mouseY);
  line(pmouseX, pmouseY, mouseX, mouseY);
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  //background(0, 0, 255
  fill(255, 0, 0);
  rect(50, 200, 50, 50);
}
