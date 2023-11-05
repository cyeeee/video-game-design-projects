/* 
Project 0 - Logo Animation
Author: Chenyi Wang
Date: 08/30/2022

Introduction:
This program creates a logo with animation using two letters
in my name, 'C' and 'W', which also is my initial.

Description:
Since the shape of the letter 'C' resembles a crescent, 
the begining of the animation will only have two clouds in the frame 
indicates that this is a night sky. 
Then, a yellow crescent, which is the letter 'C', will slowly rise up 
till it reaches the middle of the frame.
Next, the clouds will be removed from the frame by moving it to the right.
After that, the letter 'W' will fade in till its value of transparency reaches maximum.
After the logo is fully displayed, a subtitle with my full name will be shown up
by slowly moving upwards from the bottom.
Thus, all the animation is finished.
*/

class LetterC {
  /*
  This class draws the letter 'C'.
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
  
  move() {
    // rise up the object, target position (190, 200)
    if (this.y > 200) {
      this.y--;  // move the object upwards
    }
  }
}

class LetterW {
  /*
  This class draws the letter 'W'.
  The letter 'W' is formed by combining 4 different sizes of quadrilaterals.
  The coordinate of this letter is set to be 
  the corrdinate of the first point of the left most quad.
  */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.fade = 0;  // the value of transparency, initially fully transparent
  }
  
  draw() {
    noStroke();
    fill(192, 192, 192, this.fade);  // silver gray
    quad(this.x, this.y, this.x+15, this.y, this.x+40, this.y+75, this.x+25, this.y+75);
    quad(this.x+50, this.y+25, this.x+55, this.y+25, this.x+40, this.y+75, this.x+35, this.y+75);
    quad(this.x+45, this.y+25, this.x+60, this.y+25, this.x+75, this.y+75, this.x+60, this.y+75);
    quad(this.x+95, this.y, 295, this.y, this.x+75, this.y+75, this.x+70, this.y+75);
  }
  
  fadeIn() {
    // slowly fade in the object till its color becomes solid
    if (this.fade < 255) {
      this.fade++;
    }
  }
}

class Cloud {
  /*
  This class draws a cloud for animation.
  The cloud is formed by combining 4 different sizes of ellipses.
  The coordinate of the cloud is set to be 
  the position of the very bottom ellipse.
  */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 50;
  }
  
  draw() {
    noStroke();
    fill(200, 240, 255, 230);   // light blue, with transparencey of 230
    ellipse(this.x, this.y, this.width, this.height);
    ellipse(this.x-50, this.y-10, this.width-20, this.height-5);
    ellipse(this.x-10, this.y-20, this.width-20, this.height+10);
    ellipse(this.x+40, this.y-15, this.width-30, this.height-15);
  }
  
  move() {
    // move out the object
    this.x++;  // move to the right
  }
}

class Subtitle {
  /* 
  This class displays a subtitle with my full name using text() 
  */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 16;  // text size
    this.str = "C H E N Y I     W A N G";  // content to display
  }
  
  display() {
    fill(255);  // white
    textSize(this.size);
    text(this.str, this.x, this.y);
  }
  
  move() {
    // display the subtitle by rising it up from the bottom, target position (115, 310)
    if (this.y > 310) {
      this.y--;  // move the object upwards
    }
  }
}

var letterC;
var letterW;
var clouds = [];
var subtitle;

function setup() {
  createCanvas(400, 400);
  letterC = new LetterC(190, 500);  // initially locate outside of the canvas
  letterW = new LetterW(195, 170);
  clouds[0] = new Cloud(150, 240);
  clouds[1] = new Cloud(260, 160);
  subtitle = new Subtitle(115, 500);  // initially locate outside of the canvas
}

function draw() {
  background(0);
  
  //letter 'C'
  letterC.draw();
  letterC.move();
  
  //letter 'W' 
  letterW.draw();
  // fade in the letter 'W' when the clouds are starting get out
  if (clouds[1].x > width) {
    letterW.fadeIn();  
  }

  //clouds
  for (var i = 0; i < clouds.length; i++) {
    clouds[i].draw();
    // remove the clouds after the letter ‘C' reaches it target position
    if (letterC.y == 200) {
      clouds[i].move();
    }
  }
  
  //subtitle
  subtitle.display();
  // show the subtitle when the logo is fully displayed
  if (letterW.fade == 255) {
    subtitle.move();
  }
  
}