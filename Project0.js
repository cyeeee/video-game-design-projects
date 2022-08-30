function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  
  //noStroke();
  
  //letter 'C'
  fill(255, 210, 40);
  circle(200, 200, 150);  
  fill(220); // same as background
  circle(215, 195, 130);
  
  //leter 'W'
  //stroke(100, 0, 0);
  //strokeWeight(12);
  
  //line(225, 210, 235, 240);
  //line(235, 240, 245, 215);
  //line(245, 215, 255, 240);
  //line(255, 240, 265, 210);
  
  line(210, 205, 225, 245);
  line(225, 245, 240, 215);
  line(240, 215, 255, 245);
  line(255, 245, 270, 205);
  
  //line(220, 200, 235, 240);
  //line(235, 240, 250, 210);
  //line(250, 210, 265, 240);
  //line(265, 240, 280, 200);
  
  //animiation 
  //cloud 1
  fill(200, 240, 255, 230);
  ellipse(150, 240, 90, 50);
  ellipse(100, 230, 70, 45);
  ellipse(140, 220, 70, 60);
  ellipse(190, 225, 60, 35);
  
  //cloud 2
  ellipse(260, 160, 90, 50);
  ellipse(210, 150, 70, 45);
  ellipse(250, 140, 70, 60);
  ellipse(300, 145, 60, 35);
  
  
}
