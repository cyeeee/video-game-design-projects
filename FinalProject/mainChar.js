/*
This file contains the settings of the main character 
    
The main character can move forward, move backward, jump (one at a time), and shoot an arrow. 
It can only shoot while it's walking or standing, but not in the air.
When it is shooting arrows, it will stop moving.
*/

// preload images for main character
var mainCharWalk1,
  mainCharWalk2,
  mainCharJump,
  mainCharStand,
  mainCharShoot,
  mainCharDie0,
  mainCharDie1,
  mainCharDie2;

function maincharpreload() {
  mainCharWalk1 = loadImage("walk1.png");
  mainCharWalk2 = loadImage("walk2.png");
  mainCharJump = loadImage("jump.png");
  mainCharStand = loadImage("stand.png");
  mainCharShoot = loadImage("shoot.png");
  mainCharDie0 = loadImage("die0.png");
  mainCharDie1 = loadImage("die1.png");
  mainCharDie2 = loadImage("die2.png");
}

class mainCharObj {
  constructor(x, y) {
    this.pos = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.force = new p5.Vector(0, 0);
    this.size = 45;
    this.jump = 0;
    this.walk = 0;
    this.walkForward = 0;
    this.walkBackward = 0;
    this.shoot = 0;
    this.stand = 1;
    this.dead = 0;
    this.currFrame = frameCount;
    this.walking = 0;
    this.shooting = 0;
    this.arrows = 0;
  }

  draw() {
    //  push();
    //  translate(this.pos);
    if (this.stand === 1) {
      image(mainCharStand, this.pos.x, this.pos.y, this.size, this.size);
    }
    if (this.walk === 1) {
      switch (this.walking) {
        case 0:
          image(mainCharWalk1, this.pos.x, this.pos.y, this.size, this.size);
          break;
        case 1:
          image(mainCharWalk2, this.pos.x, this.pos.y, this.size, this.size);
          break;
      }
      if (this.currFrame < frameCount - 30) {
        this.currFrame = frameCount;
        this.walking++;
        if (this.walking > 1) {
          this.walking = 0;
        }
      }
    }
    if (this.jump === 1) {
      image(mainCharJump, this.pos.x, this.pos.y, this.size, this.size);
    }
    if (this.shoot === 1) {
      this.velocity.x = 0;
      this.stand = 0;
      if (
        arrow[game.prearrow].shoot === 1 &&
        arrow[game.prearrow].pos.x < this.pos.x + 250
      ) {
        image(mainCharShoot, this.pos.x, this.pos.y, this.size, this.size);
      } else {
        this.shoot = 0;
        this.shooting = 0;
        this.arrows--;
      }
    }
    //   pop();
    this.acceleration.set(0, 0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }
  update() {
    this.acceleration.set(0, 0);
    if (this.velocity.x === 0) {
      this.walk = 0;
      if (this.shoot === 0) {
        this.stand = 1;
      }
      if (this.jump === 1) {
        this.stand = 0;
      }
    }
    if (this.walkForward === 1) {
      if (this.jump === 0) {
        this.walk = 1;
        this.stand = 0;
      }
      this.applyForce(walkForce);
      this.walkForward = 0;
    }
    if (this.walkBackward === 1) {
      if (this.jump === 0) {
        this.walk = 1;
        this.stand = 0;
      }
      this.applyForce(backForce);
      this.walkBackward = 0;
    }
    if (this.jump === 2) {
      this.walk = 0;
      this.stand = 0;
      this.applyForce(jumpForce);
      this.jump = 1;
    }
    if (this.jump > 0) {
      this.applyForce(gravity);
    }
    if (this.velocity.x > 0) {
      this.applyForce(ffrictionforce);
    } else if (this.velocity.x < 0) {
      this.applyForce(bfrictionforce);
    }
    // print(this.velocity.x,this.acceleration.x);
    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);

    if (this.pos.y >= 285) {
      this.pos.y = 285;
      this.velocity.y = 0;
      this.jump = 0;
      if (this.velocity.x != 0) {
        this.walk = 1;
      } else {
        this.stand = 1;
      }
    }
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.velocity.x = 0;
      this.walk = 0;
      this.stand = 1;
    }

    if (this.pos.x > 4300) {
      this.pos.x = 4300;
      this.velocity.x = 0;
      this.walk = 0;
      this.stand = 1;
    }
  }
  updategame() {
    if (this.velocity.x > 0) {
      this.force.add(ffrictionforce);
    } else if (this.velocity.x < 0) {
      this.force.add(bfrictionforce);
    }
    this.applyForce(this.force);
    this.applyForce(gravity);
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    this.velocity.x = Math.round(this.velocity.x * 10) / 10;
    this.pos.add(this.velocity);

    for (var i = 0; i < game.grass.length; i++) {
      if (
        this.pos.x + 25 >= game.grass[i].x &&
        this.pos.x + 25 <= game.grass[i].x + 30
      ) {
        if (
          this.pos.y > game.grass[i].y - 35 &&
          this.pos.y < game.grass[i].y - 15
        ) {
          this.pos.y = game.grass[i].y - 35;
          this.velocity.y = 0;
          this.jump = 0;
          if (this.velocity.x != 0) {
            this.walk = 1;
          } else {
            this.stand = 1;
          }
        }
      } else {
        this.force.set(0, 0);
      }
    }

    for (var i = 0; i < game.blocks.length; i++) {
      if (
        dist(
          this.pos.x + 22,
          this.pos.y + 35,
          game.blocks[i].x + 10,
          game.blocks[i].y + 15
        ) < 25
      ) {
        this.force.set(0, 0);
        if (this.velocity.x > 0) {
          this.pos.x -= this.velocity.x;
        } else if (this.velocity.x < 0) {
          this.pos.x -= this.velocity.x;
        }
        this.velocity.x = 0;
      }
    }
    if (this.pos.y > 390) {
      this.dead = 1;
    }
    if (this.dead === 1 && game.currhp > 0) {
      game.currhp--;
      if (game.currhp === 0) {
        game.gameOver = 1;
      } else {
        this.dead = 0;
        this.velocity.x = 0;
        for (var i = 0; i < game.archive.length; i++) {
          if (this.pos.x >= game.archive[i].x) {
            game.xcor =150 - game.archive[i].x;
            this.pos.x = game.archive[i].x;
            this.pos.y = game.archive[i].y;
            if (game.xcor > 0) {
              game.xcor = 0;
            }
           break;
          }
        }
      }
    }

    if (this.velocity.x === 0) {
      this.walk = 0;
      if (this.shoot === 0) {
        this.stand = 1;
      }
      if (this.jump === 1) {
        this.stand = 0;
      }
    }

    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.velocity.x = 0;
      this.walk = 0;
      this.stand = 1;
    }

  }
  initial() {
    this.velocity.set(0, 0);
    this.acceleration.set(0, 0);
    this.force.set(0, 0);
    this.jump = 0;
    this.walk = 0;
    this.walkForward = 0;
    this.walkBackward = 0;
    this.shoot = 0;
    this.stand = 1;
    this.dead = 0;
    this.walking = 0;
    this.shooting = 0;
    this.pos.x=20;
    this.pos.y=285;
  }
}

class arrowObj {
  constructor() {
    this.pos = new p5.Vector(-50, -50);
    this.shoot = 0;
    this.applyshoot = 0;
    this.death = 0;
    this.angle = 0;
    this.step = new p5.Vector(0, 0);
  }

  draw() {
    this.move();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    fill(220);
    triangle(0, 0, 8, 3, 0, 6);
    triangle(-4, 1, 3, 3, -4, 5);
    fill(90, 0, 0);
    rect(-25, 2, 20, 2);
    pop();
  }
  move() {
    this.pos.x += 1.5;

    if (
      this.pos.x > mainChar.pos.x + 100 &&
      this.pos.x < mainChar.pos.x + 120
    ) {
      this.angle += PI / 90;
    }
    this.step.set(cos(this.angle), sin(this.angle));
    this.step.normalize();
    this.pos.add(this.step);

    for (var i = 0; i < game.blocks.length; i++) {
      if (
        dist(this.pos.x, this.pos.y, game.blocks[i].x, game.blocks[i].y) < 10
      ) {
        this.shoot = 0;
      }
    }
    for (var i = 0; i < game.grass.length; i++) {
      if (
        dist(this.pos.x + 10, this.pos.y, game.grass[i].x, game.grass[i].y) < 2
      ) {
        this.shoot = 0;
      }
    }
  }

  reset() {
    this.shoot = 0;
    this.pos.set(-50, -50);
  }
  out() {
    if (this.pos.x > 5000) {
      this.shoot = 0;
    }
  }
}

/*make sure that we only have 5 arrows in the map */
function checkFire() {
  if (arrow[game.currarrow].shoot === 0) {
    if (arrow[game.currarrow].applyshoot === 1 && mainChar.jump === 0) {
      mainChar.shoot = 1;
      arrow[game.currarrow].shoot = 1;
      arrow[game.currarrow].pos.x = mainChar.pos.x + 35;
      arrow[game.currarrow].pos.y = mainChar.pos.y + 20;
      arrow[game.currarrow].applyshoot = 0;
      game.prearrow = game.currarrow;
      game.currarrow++;
      if (game.currarrow > 4) {
        game.currarrow = 0;
      }
    }
  }
}

var mainChar;
var arrow = [];
var gravity, ffrictionforce, bfrictionforce, walkForce, backForce, jumpForce,coaljumpForce;

function introinitMainChar() {
  mainChar = new mainCharObj(180, 285);
}

function moveForwardAnim() {
  mainChar.walkForward = 1;
  if (mainChar.pos.x > 186) {
    mainChar.walkForward = 0;
  }
  mainChar.update();
  if (mainChar.velocity.x >= 0 && mainChar.velocity.x < 0.1) {
    intro.stopflag = true;
    mainChar.velocity.x = 0;
    textSize(15);
    textFont("Georgia");
    textStyle(BOLD);
    fill(0);
    text("Press [Space] to show again", 110, 150);
    text("Press [Enter] to return", 110, 180);
  } else {
    textSize(15);
    textFont("Georgia");
    textStyle(BOLD);
    fill(255, 0, 0);
    text("Press [D] or [→] to move right", 90, 150);
  }
}

function moveBackwardAnim() {
  mainChar.walkBackward = 1;
  if (mainChar.pos.x < 173) {
    mainChar.walkBackward = 0;
  }
  mainChar.update();
  if (mainChar.velocity.x >= 0 && mainChar.velocity.x < 0.1) {
    mainChar.velocity.x = 0;
    textSize(15);
    textFont("Georgia");
    textStyle(BOLD);
    fill(0);
    intro.stopflag = true;
    text("Press [Space] to show again", 110, 150);
    text("Press [Enter] to return", 110, 180);
  } else {
    textSize(15);
    textFont("Georgia");
    textStyle(BOLD);
    fill(255, 0, 0);
    text("Press [A] or [←] to move left", 90, 150);
  }
}

function jumpAnim() {
  if (!intro.jumpflag) {
    mainChar.jump = 2;
  }
  if (mainChar.pos.y < 285) {
    mainChar.jump = 1;
  }
  mainChar.update();
  if (mainChar.jump === 0) {
    // mainChar.velocity.y=0;
    intro.stopflag = true;
    intro.jumpflag = true;
    textSize(15);
    textFont("Georgia");
    textStyle(BOLD);
    fill(0);
    text("Press [Space] to show again", 110, 150);
    text("Press [Enter] to return", 110, 180);
  } else {
    textSize(15);
    textFont("Georgia");
    textStyle(BOLD);
    fill(255, 0, 0);
    text("Press [W] or [↑] to move jump", 90, 150);
  }
}

function shootanimate() {
  if (!intro.startshoot) {
    arrow[game.currarrow].applyshoot = 1;
    intro.startshoot = true;
  }
  checkFire();
  mainChar.update();
  if (arrow[game.prearrow].shoot === 1) {
    arrow[game.prearrow].draw();
  }
  if (arrow[game.prearrow].shoot === 0) {
    intro.stopflag = true;
    textSize(15);
    textFont("Georgia");
    textStyle(BOLD);
    fill(0);
    text("Press [Space] to show again", 110, 150);
    text("Press [Enter] to return", 110, 180);
  } else {
    textSize(15);
    textFont("Georgia");
    textStyle(BOLD);
    fill(255, 0, 0);
    text("Press [Space] to shoot the arrow", 90, 150);
  }
}

function maincharsetup() {
  createCanvas(400, 400);
  gravity = new p5.Vector(0, 0.15);
  ffrictionforce = new p5.Vector(-0.01, 0);
  bfrictionforce = new p5.Vector(0.01, 0);
  walkForce = new p5.Vector(0.2, 0);
  backForce = new p5.Vector(-0.2, 0);
  jumpForce = new p5.Vector(0, -4);
  coaljumpForce=new p5.Vector(0, -7);
  mainChar = new mainCharObj(20, 285);
  arrow = [
    new arrowObj(),
    new arrowObj(),
    new arrowObj(),
    new arrowObj(),
    new arrowObj(),
  ];
}

function mainchardraw() {
  // background(220);
  checkFire();
  for (var i = 0; i < arrow.length; i++) {
    if (arrow[i].shoot === 1) {
      arrow[i].draw();
    }
  }
  mainChar.update();
  mainChar.draw();
}