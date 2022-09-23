/*
This file contains the settings of the main character and enemies 
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
        this.angle -= PI/180;
      }
      if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        this.angle += PI/180;
      }
      if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        this.step.set(sin(this.angle), -cos(this.angle));
        this.step.normalize();
        this.position.x += this.step.x;
        this.position.y += this.step.y;
      }
      if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        this.step.set(-sin(this.angle), cos(this.angle));
        this.step.normalize();
        this.position.x += this.step.x;
        this.position.y += this.step.y;
      }
    }
  
    move() {
      this.control();
  
      // stay inside the tilemap
      if (this.position.x < 20) {
        this.position.x = 20;
      }
      else if (this.position.x > 800) {
        this.position.x = 800;
      }
      else if (this.position.y < 20) {
        this.position.y = 20;
      }
      else if (this.position.y > 800) {
        this.position.y = 800;
      }
  
      // the prizes are collected when the main character touches it
      for (var i = 0; i < game.prizes.length; i++) {
        if (game.prizes[i].collected === false && dist(this.position.x, this.position.y, game.prizes[i].x+10, game.prizes[i].y+10) < 15) {
          game.prizes[i].collected = true;
          game.score++;
        }
      }
  
      // bounce back a little when bumping into a rock
      for (var i = 0; i < game.rocks.length; i++) {
        if (dist(this.position.x, this.position.y, game.rocks[i].x+10, game.rocks[i].y+10) < 20) {
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
  
      /* // when enemies see the main character, they will chase the main character
      if (dist(this.x, this.y, mainChar.x, mainChar.y) < 60) {
        this.step.set(mainChar.x - this.x, mainChar.y - this.y);
        this.step.normalize();
        this.angle = this.step.heading() + HALF_PI;
        this.x += this.step.x;
        this.y += this.step.y;
        if (dist(this.x, this.y, mainChar.x, mainChar.y) < 10) {
          game.gameOver = true; // enemy caught the main character
        }
      } */
    }
}
  