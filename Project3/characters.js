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
        this.angle -= PI/180; // one degree
      }
      if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        this.angle += PI/180;
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
    this.position = createVector(mainChar.position.x, mainChar.position.y);
    this.step = new p5.Vector(0, -1);
    this.angle = 0;
    this.fire = 0;
  }

  draw() {
    push();
    translate(this.position);
    rotate(this.angle);   
    image(objects[4], -7, -7, 15, 15);
    this.step.set(sin(this.angle), -cos(this.angle));
    this.step.normalize();
    this.step.mult(5);
    this.position.add(this.step);
    // When a missile hits a rock, both the missile and the rock will disappear.
    for (var i = 0; i < game.rocks.length; i++) {
      if (game.rocks[i].hit === false 
        && dist(this.position.x, this.position.y, game.rocks[i].x+10, game.rocks[i].y+10) < 10) {
          game.rocks[i].hit = true;
          this.fire = 0;
        }
    }
    //todo
    pop(); 
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

class wanderState {
  constructor() {
    this.wanderDist = 0;
    this.step = new p5.Vector(0, 0);
  }

  execute(me) {
    if (this.wanderDist <= 0) {
      this.wanderDist = random(50, 80);
      me.angle = random(0, 360);
      this.step.set(cos(me.angle), sin(me.angle));
      this.step.normalize();
      this.step.div(5);
    }
    this.wanderDist--;
    me.position.add(this.step);
    // stay inside the tilemap 
    // (bounce back a little bit when hit the border)
    if (me.position.x < 30) {
      me.position.x += 5;
    }
    if (me.position.x > 810) {
      me.position.x -= 5;
    }
    if (me.position.y < 30) {
      me.position.y += 5;
    }
    if (me.position.y > 810) {
      me.position.y -= 5;
    }

    // when enemies see the main character, they will chase the main character
    if (dist(mainChar.position.x, mainChar.position.y, me.position.x, me.position.y) < 80) {
      me.changeState(1);
    } 
    // avoid rocks
    if (me.toRock === true) {
      me.changeState(2);
    }
  }
} 

class chaseState {
  constructor() {
    this.step = new p5.Vector(0, 0);
  }

  execute(me) {
    if (dist(mainChar.position.x, mainChar.position.y, me.position.x, me.position.y) > 10) {
      if (me.toRock === true) {
        me.changeState(2);
      }
      this.step.set(mainChar.position.x - me.position.x, mainChar.position.y - me.position.y);
      this.step.normalize();
      //this.step.div(2);
      me.angle = this.step.heading() + HALF_PI;
      me.position.add(this.step);
    }
    else {
      game.gameOver = true; // enemy caught the main character
    } 

    if (dist(me.position.x, me.position.y, mainChar.position.x, mainChar.position.y) > 80) {
      me.changeState(0);
    } 
  }
}

class avoidRockState {
  constructor() {
    this.step = new p5.Vector(0, 0);
  }

  execute(me) {
    var rockPos = createVector(game.rocks[enemies.rockIdx].x+10, game.rocks[enemies.rockIdx].y+10); // center of the object
    var pos = createVector(me.position.x+10, me.position.y+10);
    var vec = p5.Vector.sub(rockPos, pos);
    var angle = me.angle - HALF_PI - vec.heading();
    var y = vec.mag() * cos(angle);
    if (y > -1 && y < 200) {  // -1 instead of 0 to account for cos() = 0;
      var x = vec.mag() * sin(angle);
      if (x > 0 && x < 150) {
        me.angle += PI/180;
      }
      else if (x <= 0 && x > -150) {
        me.angle -= PI/180;
      }
      this.step.set(sin(me.angle), -cos(me.angle));
      this.step.normalize();
      me.position.add(this.step);
    }

    if (dist(this.position.x, this.position.y, game.rocks[enemies.rockIdx].x, game.rocks[enemies.rockIdx].y) > 30) {
      me.toRock = false;
      me.changeState(0);
    }
  }
}
  
class enemyObj {
    constructor(x, y) {
      this.position = new p5.Vector(x, y);
      this.state = [new wanderState(), new chaseState(), new avoidRockState()];
      this.currState = 0;
      this.angle = 0;
      this.toRock = false;
      this.rockIdx = 0;
    }

    changeState(x) {
      this.currState = x;
    }
  
    draw() {
      push();
      translate(this.position);
      rotate(this.angle);   
      image(objects[3], -10, -10, 20, 20);
      pop(); 
    }

    checkRocks() {
      for (var i = 0; i < game.rocks.length; i++) {
        if (game.rocks[i].hit === false 
          && dist(this.position.x, this.position.y, game.rocks[i].x, game.rocks[i].y) < 30) {
          this.toRock = true;
          this.rockIdx = i;
        }
      }
    }
}
  
