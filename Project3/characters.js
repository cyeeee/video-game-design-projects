/*
This file contains the settings of the main character and enemies 
*/

class mainCharObj {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.angle = 0;
    }
  
    draw() {
      image(objects[2], this.x, this.y, 20, 20);
    }
  
    move() {
      // The main character is controlled by the arrow keys or WASD.
      // LEFT and RIGHT-arrows to rotate the main character a small angle. 
      // UP and DOWN-arrows to move forward / backward.
      if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        this.x -= 2;
      }
      if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        this.x += 2;
      }
      if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        this.y -= 2;
      }
      if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        this.y += 2;
      }
  
      // stay inside the tilemap
      if (this.x < 20) {
        this.x = 20;
      }
      else if (this.x > 800) {
        this.x = 800;
      }
      else if (this.y < 20) {
        this.y = 20;
      }
      else if (this.y > 800) {
        this.y = 800;
      }
  
      // the prizes are collected when the main character touches it
      for (var i = 0; i < game.prizes.length; i++) {
        if (game.prizes[i].collected === false && dist(this.x, this.y, game.prizes[i].x, game.prizes[i].y) < 15) {
          game.prizes[i].collected = true;
          game.score++;
        }
      }
  
      // bounce back a little when bumping into a rock
      for (var i = 0; i < game.rocks.length; i++) {
        if (dist(this.x, this.y, game.rocks[i].x, game.rocks[i].y) < 20) {
          if (this.x < game.rocks[i].x) {
            this.x -= 5;
            game.xCor += 5;
          }
          if (this.x > game.rocks[i].x) {
            this.x += 5;
            game.xCor -= 5;
          }
          if (this.y < game.rocks[i].y) {
            this.y -= 5;
            game.yCor += 5;
          }
          if (this.y > game.rocks[i].y) {
            this.y -= 5;
            game.yCor += 5;
          }
        }
      }
    }
}
  
  
class enemyObj {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.xDir = random(-0.2, 0.2);
      this.yDir = random(-0.2, 0.2);
      this.step = new p5.Vector(0, -1);
      this.angle = 0;
    }
  
    draw() {
      image(objects[3], this.x, this.y, 20, 20);
    }
  
    move() {
      // the enemies wander around
      this.x += this.xDir;
      this.y += this.yDir;
  
      // stay inside the tilemap
      if (this.x >= 800 || this.x < 20) {
        this.xDir = -this.xDir; 
      }
      if (this.y >= 800 || this.y < 20) {
        this.yDir = -this.yDir; 
      }
  
      // bounce back a little when bumping into a rock
      for (var i = 0; i < game.rocks.length; i++) {
        if (dist(this.x, this.y, game.rocks[i].x, game.rocks[i].y) < 20) {
          if (this.x < game.rocks[i].x) {
            this.x -= 5;
          }
          if (this.x > game.rocks[i].x) {
            this.x += 5;
          }
          if (this.y < game.rocks[i].y) {
            this.y -= 5;
          }
          if (this.y > game.rocks[i].y) {
            this.y -= 5;
          }
        }
      }
  
      // when enemies see the main character, they will chase the main character
      if (dist(this.x, this.y, mainChar.x, mainChar.y) < 60) {
        this.step.set(mainChar.x - this.x, mainChar.y - this.y);
        this.step.normalize();
        this.angle = this.step.heading() + HALF_PI;
        this.x += this.step.x;
        this.y += this.step.y;
        if (dist(this.x, this.y, mainChar.x, mainChar.y) < 10) {
          game.gameOver = true; // enemy caught the main character
        }
      }
    }
}
  