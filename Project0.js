/* 
Project 0 - Logo Animation
Author: Chenyi Wang
Date: 08/30/2022

This program creates a logo with animation using two letters
in your name, 'C' and 'W', which is my initial.

*/

class LetterC {
  /*
  The letter 'C' is formed by covering a part of a solid circle 
  with a smaller circle that is colored the same as the background.
  */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 150;  // diameter of the solid circle
  }
  
  draw() {
    noStroke();
    //draw a solid circle
    fill(255, 210, 40);  // yellow
    circle(this.x, this.y, this.size);
    //draw a smaller circle
    fill(0);  // same as the background color (black)
    circle(this.x + 12, this.y, this.size - 20);
  }
}

class LetterW {
  /*
  The letter 'W' is formed by combining 4 quadrilaterals.
  The coordinate of this letter is set to be 
  the corrdinate of the first point of the left most quad.
  */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  draw() {
    noStroke();
    fill(127, 0, 255);  // purple  
    quad(this.x, this.y, this.x+15, this.y, this.x+40, this.y+75, this.x+25, this.y+75);
    quad(this.x+50, this.y+25, this.x+55, this.y+25, this.x+40, this.y+75, this.x+35, this.y+75);
    quad(this.x+45, this.y+25, this.x+60, this.y+25, this.x+75, this.y+75, this.x+60, this.y+75);
    quad(this.x+95, this.y, 295, this.y, this.x+75, this.y+75, this.x+70, this.y+75);
  }
}

var letterC;
var letterW;

function setup() {
  createCanvas(400, 400);
  letterC = new LetterC(190, 200);
  letterW = new LetterW(195, 170);
}

function draw() {
  background(0);
  
  noStroke();
  
  //letter 'C'
  /*
  fill(255, 210, 40);
  circle(190, 200, 150);  
  fill(0); // same as background
  circle(202, 200, 130);
  */
  letterC.draw();
  
  //leter 'W' 
  /*
  fill(127, 0, 255);  
  quad(195, 170, 210, 170, 235, 245, 220, 245);
  quad(245, 195, 250, 195, 235, 245, 230, 245);
  quad(240, 195, 255, 195, 270, 245, 255, 245);
  quad(290, 170, 295, 170, 270, 245, 265, 245);
  */
  letterW.draw();
  
  
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
