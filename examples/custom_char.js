// Start screen to overlap time with creating custom characters
// Note: cannot use preload() to create custom char, since the canvas is not yet set up
// transparency (example from lecture notes)
var images = [];
var customCharMade = 0;
var start = 0;
///// EXPERIMENT /////
function customChar() {
  customCharMade = 1;
  fill(145, 92, 0); // set background of the custom char
  rect(0, 0, 400, 400);
  noStroke();
  fill(255, 255, 255);
  rect(0, 0, 100, 100);
  rect(350, 0, 50, 50);
  rect(0, 350, 50, 50);
  rect(350, 350, 50, 50);
  images.push(get(0, 0, width, height));
  fill(255, 255, 255); // set background of the custom char
  rect(0, 0, 400, 400);
  noStroke();
  fill(255, 0, 0);
  quad(100, 0, 400, 0, 300, 100, 0, 100);
  fill(0, 255, 0);
  rect(0, 100, 300, 300);
  fill(0, 0, 255);
  quad(400, 0, 300, 100, 300, 400, 400, 300);
  images.push(get(0, 0, width, height));
}
function mouseClicked() {
  start = 1;
}
function setup() {
  createCanvas(400, 400);
  customChar();
}
function draw() {
  if (start === 1) {
    background(255, 255, 255);
    image(images[0], 100, 100, 50, 50);
    image(images[0], 200, 200, 20, 20);
    image(images[1], 100, 200, 50, 50);
  } else {
    background(255, 255, 0);
    fill(255, 0, 0);
    textSize(20);
    text("Instructions here.", 20, 20);
    text("Click mouse to begin", 20, 350);
    fill(0, 0, 255);
    text("Use this time to construct \n custom characters", 20, 100);
  }
}
