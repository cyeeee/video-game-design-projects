/*
This file contains the settings of the main character
*/

class mainCharObj {
    constructor(x, y) {
      this.position = new p5.Vector(x, y);
      this.step = new p5.Vector(0, -1);
      this.angle = 0;
    }
  
    draw() {
      push();
      translate(this.position);
      rotate(this.angle);   
      image(objects[2], -10, -10, 20, 20);
      pop();
    }

    control() {
      // The main character is controlled by the arrow keys or WASD.
      // LEFT and RIGHT-arrows to rotate the main character a small angle. 
      // UP and DOWN-arrows to move forward / backward.
      if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        this.angle -= PI/90; // two degrees
      }
      if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        this.angle += PI/90;
      }
      if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        this.step.set(sin(this.angle), -cos(this.angle));
        this.step.normalize();
        this.step.mult(2);
        this.position.add(this.step);
      }
      if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        this.step.set(-sin(this.angle), cos(this.angle));
        this.step.normalize();
        this.step.mult(2);
        this.position.add(this.step);

      }
    }
  
    move() {
      this.control();
  
      // stay inside the tilemap
      if (this.position.x < 30) {
        this.position.x = 30;
      }
      else if (this.position.x > 810) {
        this.position.x = 810;
      }
      else if (this.position.y < 30) {
        this.position.y = 30;
      }
      else if (this.position.y > 810) {
        this.position.y = 810;
      }
  
      // the prizes are collected when the main character touches it
      for (var i = 0; i < game.prizes.length; i++) {
        if (game.prizes[i].collected === false 
          && dist(this.position.x, this.position.y, game.prizes[i].x+10, game.prizes[i].y+10) < 15) {
          game.prizes[i].collected = true;
          game.score++;
        }
      }
  
      // bounce back a little when bumping into a rock
      for (var i = 0; i < game.rocks.length; i++) {
        if (game.rocks[i].hit === false 
          && dist(this.position.x, this.position.y, game.rocks[i].x+10, game.rocks[i].y+10) < 20) {
          if (this.position.x < game.rocks[i].x) {
            this.position.x -= this.step.x*5;
            game.xCor += this.step.x*5;
          }
          if (this.position.x > game.rocks[i].x) {
            this.position.x += this.step.x*5;
            game.xCor -= this.step.x*5;
          }
          if (this.position.y < game.rocks[i].y) {
            this.position.y -= this.step.y*5;
            game.yCor += this.step.y*5;
          }
          if (this.position.y > game.rocks[i].y) {
            this.position.y -= this.step.y*5;
            game.yCor += this.step.y*5;
          }
        }
      }
    }
}

class missileObj {
  constructor() {
    this.position = new p5.Vector(-200, -200);
    this.step = new p5.Vector(0, 0);
    this.angle = 0;
    this.fire = 0;
  }

  draw() {
    push();
    translate(this.position);
    rotate(this.angle);   
    image(objects[5], -7, -7, 15, 15);
    this.step.set(sin(this.angle), -cos(this.angle));
    this.step.normalize();
    this.step.mult(5);
    this.position.add(this.step);
    // When a missile hits a rock, both the missile and the rock will disappear.
    for (var i = 0; i < game.rocks.length; i++) {
      if (game.rocks[i].hit === false 
        && dist(this.position.x, this.position.y, game.rocks[i].x+10, game.rocks[i].y+10) < 10) {
          game.rocks[i].hit = true;
          this.reset();
        }
    }
    // missile disappears when going out of the game area
    if (this.position.x < 30 || this.position.x > 810 || this.position.y < 30 || this.position.y > 810) {
      this.reset();
    }
    pop(); 
  }

  reset() {
    this.fire = 0;
    this.position.set(-200, 200);
  }
} 

function checkFire() {
  if (keyIsDown(32)) {
    missile.fire = 1;
    missile.angle = mainChar.angle;
    missile.position.x = mainChar.position.x;
    missile.position.y = mainChar.position.y;
  }
}
