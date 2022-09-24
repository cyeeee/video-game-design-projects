/*
This file contains the settings of the enemies 
*/

class wanderState {
    constructor() {
      this.wanderDist = 0;
      this.step = new p5.Vector(0, 0);
    }
  
    execute(me) {
      me.avoidRocks();
      if (this.wanderDist <= 0) {
        this.wanderDist = random(50, 80);
        me.angle = random(0, 360);
        this.step.set(cos(me.angle), sin(me.angle));
        this.step.normalize();
        this.step.div(5);
      }
      this.wanderDist--;
      me.position.add(this.step);
      me.stay();

      // The enemies should also try to avoid being hit by a missile
      if (dist(missile.position.x, missile.position.y, me.position.x, me.position.y) < 30) {
        me.changeState(2);
      } 
      // when enemies see the main character, they will chase the main character
      if (dist(mainChar.position.x, mainChar.position.y, me.position.x, me.position.y) < 80) {
        me.changeState(1);
      } 
    }
  } 
  
  class chaseState {
    constructor() {
      this.step = new p5.Vector(0, 0);
    }
  
    execute(me) {
      if (dist(mainChar.position.x, mainChar.position.y, me.position.x, me.position.y) > 10) {
        me.avoidRocks();
        this.step.set(mainChar.position.x - me.position.x, mainChar.position.y - me.position.y);
        this.step.normalize();
        me.angle = this.step.heading() + HALF_PI;
        me.position.add(this.step);
        me.stay();
      }
      else {
        game.gameOver = true; // enemy caught the main character
      } 
  
      if (dist(me.position.x, me.position.y, mainChar.position.x, mainChar.position.y) > 80) {
        me.changeState(0);
      } 
      if (dist(missile.position.x, missile.position.y, me.position.x, me.position.y) < 30) {
        me.changeState(2);
      } 
    }
  }

  class avoidMissileState {
    constructor() {
      this.step = new p5.Vector(0, 0);
    }
  
    execute(me) {
      if (dist(me.position.x, me.position.y, missile.position.x, missile.position.y) > 10) {
        me.avoidRocks();
        me.angle = missile.angle;
        this.step.set(sin(me.angle), -cos(me.angle));
        this.step.normalize();
        me.position.add(this.step);
        me.stay();
      }
      else { 
        if (me.injured === true) {
            me.dead = true;
        }
        me.injured = true;
        missile.reset();
      }
  
      if (missile.fire === 0 || dist(missile.position.x, missile.position.y, me.position.x, me.position.y) > 30) {
        me.changeState(0);
      } 
    }
  }
    
  class enemyObj {
      constructor(x, y) {
        this.position = new p5.Vector(x, y);
        this.state = [new wanderState(), new chaseState(), new avoidMissileState()];
        this.currState = 0;
        this.angle = 0;
        this.injured = false;
        this.dead = false;
      }
  
      changeState(x) {
        this.currState = x;
      }
    
      draw() {
        push();
        translate(this.position);
        rotate(this.angle);   
        if (this.injured === true) {
          image(objects[4], -10, -10, 20, 20);
        }
        else {
          image(objects[3], -10, -10, 20, 20);
        }
        pop(); 
      }

      avoidRocks() {
        for (var i = 0; i < game.rocks.length; i++) {
          if (game.rocks[i].hit === false 
            && dist(this.position.x, this.position.y, game.rocks[i].x, game.rocks[i].y) < 25) {
              this.position.x--;
              this.position.y--;
            }
        }
      }
  
      stay() {
        // stay inside the tilemap 
        if (this.position.x < 30) {
          this.position.x += 5;
        }
        if (this.position.x > 810) {
          this.position.x -= 5;
        }
        if (this.position.y < 30) {
          this.position.y += 5;
        }
        if (this.position.y > 810) {
          this.position.y -= 5;
        }
      }
  }
    
  