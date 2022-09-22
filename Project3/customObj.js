/*
This file contains the function of the custom objects
*/

var objects = [];

function customChar() {
  // prize
  fill(200, 255, 200);
  rect(0, 0, 400, 400);
  noStroke();
  fill(230, 180, 0);
  arc(200, 75, 280, 280, 0, PI, CHORD);
  fill(200, 255, 200); // same as background color
  arc(200, 85, 250, 250, 0, PI, CHORD);
  fill(230, 180, 0);
  rect(175, 250, 50, 70);
  fill(250, 200, 10);
  arc(200, 25, 200, 480, 0, PI, CHORD);
  fill(0);
  rect(120, 320, 160, 50);
  rect(90, 370, 220, 20);
  fill(250, 200, 50);
  rect(150, 340, 100, 30);
  fill(200, 160, 0);
  textSize(140);
  text("☆", 140, 180);
  objects.push(get(0, 0, width, height));

  // rock
  fill(200, 255, 200);
  rect(0, 0, 400, 400);
  noStroke();
  fill(150);
  rect(10, 50, 380, 300, 180, 180, 60, 60);
  fill(180);
  ellipse(270, 130, 170, 100);
  ellipse(200, 90, 200, 60);
  objects.push(get(0, 0, width, height));

  // main character
  fill(200, 255, 200);
  rect(0, 0, 400, 400);
  noStroke();
  fill(0);
  triangle(200, 200, 300, 380, 100, 380);
  circle(200, 130, 220);
  fill(255);
  ellipse(150, 130, 20, 50);
  ellipse(250, 130, 20, 50);
  objects.push(get(0, 0, width, height));

  // enemy
  fill(200, 255, 200);
  rect(0, 0, 400, 400);
  noStroke();
  fill(255, 0, 0);
  triangle(200, 200, 300, 380, 100, 380);
  circle(200, 130, 220);
  rect(250, 300, 30, 5);
  fill(0);
  arc(150, 130, 70, 70, 0, PI + QUARTER_PI, CHORD);
  arc(250, 130, 70, 70, 0 - QUARTER_PI, PI, CHORD);
  triangle(280, 230, 290, 290, 270, 290);
  rect(278, 290, 5, 80);
  objects.push(get(0, 0, width, height));

  // border
  fill(255);
  rect(0, 0, 400, 400);
  objects.push(get(0, 0, width, height));

}
