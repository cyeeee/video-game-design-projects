class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.xDir = random(1, 2);
    this.yDir = random(1, 2);
    //random color
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }
  
  draw() {
    noStroke();
    fill(this.r, this.g, this.b);  // random color
    ellipse(this.x, this.y, this.size, this.size);
  }
  
  move() {
    this.x += this.xDir;
    this.y += this.yDir;
    // bounce off the borders
    if (this.x >= (width - 10) || this.x < 10) {
      this.xDir = -this.xDir; 
      //change color when hit the boundaries
      this.r = random(255);
      this.g = random(255);
      this.b = random(255);
    }
    if (this.y >= (height - 10) || this.y < 10) {
      this.yDir = -this.yDir; 
      //change color when hit the boundaries
      this.r = random(255);
      this.g = random(255);
      this.b = random(255);
    }
    // catch by a paddle(gun)
    if (this.y > 370) {
      if (dist(this.x, 0, gun.x, 0) < 38) {
        this.yDir = -this.yDir;
      }
      else {
        gameOver = 1;
      }
    }
    // bounce when touch a invader
    /* for (var i = 0; i < invaders.length; i++) {
      if (invaders[i].dead === 0 
        && dist(this.x, this.y, invaders[i].x, invaders[i].y) < 27) {
          //this.xDir = -this.xDir;
          this.yDir = -this.yDir;
          this.r = random(255);
          this.g = random(255);
          this.b = random(255);
      }
    }   */  
  }
}

class Invader {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dead = 0;
  }
  
  draw() {
    fill(150, 255, 255);  // light cyan
    noStroke();
    rect(this.x, this.y, 15, 7);
    rect(this.x-3, this.y+2, 21, 2);
    rect(this.x+3, this.y-3, 9, 3);
    rect(this.x+3, this.y+7, 2, 3);
    rect(this.x+10, this.y+7, 2, 3);
    quad(this.x+1, this.y-6, this.x+3, this.y-6, 
      this.x+6, this.y-3, this.x+4, this.y-3);
    quad(this.x+12, this.y-6, this.x+14, this.y-6, 
      this.x+11, this.y-3, this.x+9, this.y-3);
    fill(0);
    square(this.x+3, this.y+1, 2);
    square(this.x+10, this.y+1, 2);
  }

  move() {
    this.x += invDir;
    if (this.x < 3 || this.x > 380) {
      invDir = -invDir;
      this.x += invDir;
      lowerInvaders();  // bring all invaders down
    }
  }
}

class Bomb {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.dropped = 0;
    this.valid = 0;
  }

  draw() {
    fill(192, 192, 192);  // silver gray
    circle(this.x, this.y, 5);
    this.y++;
    if (this.y > 400) {
      this.dropped = 0;
    }
    if (this.y > 390) {
      if (this.x > gun.x - 10 && this.x < gun.x + 10) {
        gameOver = 1;
      }
    }
    // disappear when touches a ball
    for (var i = 0; i < balls.length; i++) {
      if (this.x > balls[i].x - 8 && this.x < balls[i].x + 8 
        && this.y > balls[i].y - 8 && this.y < balls[i].y + 8){
        this.valid = 1;
      }
    }
    
  }
}

class Gun {
  constructor(x) {
    this.x = x;
  }

  draw() {
    fill(0, 150, 0); // green
    noStroke();
    rect(this.x-17, 395, 40, 5);
    rect(this.x-10, 385, 26, 10);
    rect(this.x, 380, 6, 5);
  }

  move() {
    if (keyArray[LEFT_ARROW] === 1 && this.x >= 17) {
      this.x -= 3;
    }
    if (keyArray[RIGHT_ARROW] === 1 && this.x <= (width-23)) {
      this.x += 3;
    }
  }
}

class Bullet {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.fire = 0;
  }

  draw() {
    fill(255, 255, 100);  // light yellow
    rect(this.x, this.y, 2, 6);
    this.y -= 5;
    if (this.y < 0) {
      this.fire = 0;
    }
    for (var i = 0; i < invaders.length; i++) {
      if (invaders[i].dead === 0 
        && dist(this.x, this.y, invaders[i].x, invaders[i].y) < 12) {
        invaders[i].dead = 1;
        this.fire = 0;
      }
    }
    // If the ball is shot, spawn another ball
    for (var i = 0; i < balls.length; i++) {
      if (dist(this.x, this.y, balls[i].x, balls[i].y) < 10) {
        balls.push(new Ball(200, 200));
        this.fire = 0;
      }
    }
  }
}

// global variables
var gameOver = false;
var balls = [];
var gun;
var invaders = [];
var invDir = 0.75;
var bombs = [];
var bullets;
var bulletIndex = 0;
var keyArray = [];
var currFrameCount = 0;

function keyPressed() {
  keyArray[keyCode] = 1;
}
function keyReleased() {
  keyArray[keyCode] = 0;
}

function lowerInvaders() {
  for (var i = 0; i < invaders.length; i++) {
    invaders[i].y += 5;
  }
}

function checkFire() {
  if (keyArray[32] === 1) {
    if (currFrameCount < frameCount - 10) {
      currFrameCount = frameCount;
      bullets[bulletIndex].fire = 1;
      bullets[bulletIndex].x = gun.x+2;
      bullets[bulletIndex].y = 380;
      bulletIndex++;
      if (bulletIndex > 4) {
        bulletIndex = 0;
      }
    }
  }
}

function setup() {
  createCanvas(400, 400);
  balls[0] = new Ball(200, 200);
  gun = new Gun(200);
  bullets = [new Bullet(), new Bullet(), new Bullet(), new Bullet(), new Bullet()];
  // initialize invaders
  var a = 80;
  var b = 25;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 10; j++) {
      invaders.push(new Invader(a, b));
      bombs.push(new Bomb());
      a += 27;
    }
    a = 80;
    b += 25;
  }
}

function draw() {
  background(0);

  if (gameOver === false) {
    
    for (var i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].move();
    }

    for (var i = 0; i < invaders.length; i++) {        
      if (invaders[i].dead === 0) {
        invaders[i].draw();
        invaders[i].move();
        if (bombs[i].dropped === 1 && bombs[i].valid === 0) {
          bombs[i].draw();
        } 
        else {
          if (random(0, 10000) < 2) {
            bombs[i].dropped = 1;
            bombs[i].x = invaders[i].x;
            bombs[i].y = invaders[i].y + 5;
          }
        }
      }
    }

    gun.draw();
    gun.move();

    checkFire();
    for (var i = 0; i < 5; i++) {
      if (bullets[i].fire === 1) {
        bullets[i].draw(); 
      }
    }
  }

  else {
    fill(255);
    textStyle(BOLD);
    textFont('Courier New', 40);
    text("GAME OVER", 80, 200);
  } 
}
