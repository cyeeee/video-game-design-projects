function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  
  noStroke();
  
  //letter 'C'
  fill(255, 210, 40);
  circle(190, 200, 150);  
  fill(0); // same as background
  circle(202, 200, 130);
  
  //leter 'W' 
  fill(127, 0, 255);  
  quad(195, 170, 210, 170, 235, 245, 220, 245);
  quad(245, 195, 250, 195, 235, 245, 230, 245);
  quad(240, 195, 255, 195, 270, 245, 255, 245);
  quad(290, 170, 295, 170, 270, 245, 265, 245);
  
  
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
  

  fill(255);
  textSize(16);
  text("C H E N Y I     W A N G", 115, 310);
  
}
