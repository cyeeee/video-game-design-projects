function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  //(0, 0) is at up left coner

  // airplane without border
  fill(0, 255, 9);
  noStroke(); // no border

  // ellipse(x, y, width, height)
  ellipse(200, 200, 10, 50); // body
  
  fill(255, 0, 0);
  ellipse(185, 190, 3, 10); // engines
  ellipse(215, 190, 3, 10);
  
  fill(0, 255, 9);
  ellipse(200, 195, 50, 10); // wings
  ellipse(200, 220, 25, 5); // tail
}
