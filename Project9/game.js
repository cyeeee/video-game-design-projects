/* This file contains the main settings of games */

class mainCharObj {
    constructor(x, y) {
      this.pos = new p5.Vector(x, y);
      this.speed = 1.2;
      this.direction = 0;
    }
  
    draw() {
      image(main, this.pos.x-10, this.pos.y-10, 20, 20);
      this.move();
    }
  
    collide() {
      // block by wall
      var c = 0;
      for (var i = 0; i < game.wall.length; i++) {
        if (dist(this.pos.x+10, this.pos.y+10, game.wall[i].pos.x+10, game.wall[i].pos.y+10) < 18.8) {
          c = 1;
        }
      }
      return c;
    }
  
    move() {
      switch (this.direction) {
        case 1: //left
          this.pos.x -= this.speed;
          if (this.collide() === 1) {
            this.pos.x += this.speed;
          }
          break;
        case 2: //right
          this.pos.x += this.speed;
            if (this.collide() === 1) {
              this.pos.x -= this.speed;
            }
          break;
        case 3: //up
          this.pos.y -= this.speed;
            if (this.collide() === 1) {
              this.pos.y += this.speed;
            }
          break;
        case 4: //down
          this.pos.y += this.speed;
            if (this.collide() === 1) {
              this.pos.y -= this.speed;
            }
          break;
      }
  
      // When there is no wall at the borders, the player character can wrap around and enter from the other side
      if (this.pos.x > 420) {
        this.pos.x = -20;
      }
      if (this.pos.x < -20) {
        this.pos.x = 400;
      }
      if (this.pos.y > 420) {
        this.pos.y = -20;
      }
      if (this.pos.y < -20) {
        this.pos.y = 400;
      }
    }
}

// The player character is controlled with WASD
function keyPressed() {
    if (keyCode === 65) { //A
      mainChar.direction = 1;
    }
    else if (keyCode === 68) {  //D
      mainChar.direction = 2;
    }
    else if (keyCode === 87) {  //W
      mainChar.direction = 3;
    }
    else if (keyCode === 83) {  //S
      mainChar.direction = 4;
    }
}

class gameObj {
    constructor() {
        this.tilemap = [
            "wwwwwwwwwww-w-wwwwww",
            "w++++E++p+--w+++-++w",
            "w-wwwww+www-wwwwww+w",
            "w+++++w+++w-+++++w+w",
            "w+wwwwwww+ww--ww-w+w",
            "w+++++-+++wE--Ew+w-w",
            "w-wwwww+w-wwwwww-w+w",
            "--++++++w----p---+--",
            "www-www-ww-wwwww-w-w",
            "w-------ww+++++++w-w",
            "w+w+www-ww+wwwww+w-w",
            "w+w+++w-M--w---w+--w",
            "w+w+w+wwwwww-w+++www",
            "--w+++-+++w--w-w+w--",
            "w-p-www+w-+-ww-w+w+w",
            "wwwww+++wwwww--w+++w",
            "-+++++w-w+++++wwwwE-",
            "w-wwwww-w-wwwwwwww-w",
            "wE++++++++++-++++++w",
            "wwwwwwwwwww-w-wwwwww",];
        this.wall = [];
        this.pellets = [];
        this.freezePowers = [];
        this.score = 0;
        this.freeze = 0;
        this.end = 0;
        this.enemyFrames = [7, 14, 21, 28, 35, 42];
    }

    initialize() {
        this.end = 0;
        this.score = 0;
        this.wall = [];
        this.pellets = [];
        this.freezePowers = [];
        for (var i = 0; i < this.tilemap.length; i++) {
            for (var j = 0; j < this.tilemap[i].length; j++) {
              if (this.tilemap[i][j] === 'w') {
                ggraph[i][j] = -1;
              }
              else {
                ggraph[i][j] = 0;
              }
              switch (this.tilemap[i][j]) {
                case 'w': 
                  this.wall.push(new wallObj(j*20+10, i*20+10));
                  break;
                case '+': 
                  this.pellets.push(new pelletObj(j*20+10, i*20+10));
                  break;
                case 'p': 
                  this.freezePowers.push(new freezePowerObj(j*20+10, i*20+10));
                  break;
                case 'E': 
                  enemys.push(new enemyObj(j*20+10, i*20+10));
                  break;
                case 'M': 
                  mainChar = new mainCharObj(j*20+10, i*20+10);
                  break;
              }
            }
        }
    }

    draw() {
      // freeze for 5 seconds
      if (this.freeze === 1 && frameCount === freezeFrame+300) {
          this.freeze = 0;
      }
      for (var i = 0; i < this.wall.length; i++) {
          this.wall[i].draw();
      }
      for (var i = 0; i < this.pellets.length; i++) {
          if (this.pellets[i].collected === 0) {
              this.pellets[i].draw();
          }
      }
      for (var i = 0; i < this.freezePowers.length; i++) {
          if (this.freezePowers[i].collected === 0) {
              this.freezePowers[i].draw();
          }
      }
      mainChar.draw();
      for (var i = 0; i < enemys.length; i++) {
          if ((frameCount+this.enemyFrames[i]) % 40 === 0) {
            enemys[i].findPath();
          }
          enemys[i].draw();
      }
    }
}

class wallObj {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y);
    }
    
    draw() {
        noStroke();
        fill(78); 
        square(this.pos.x-10, this.pos.y-10, 20);
    }
}

class pelletObj {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y);
        this.collected = 0;
    }
    
    draw() {
        this.update();
        noStroke();
        fill(0, 140, 140);
        circle(this.pos.x, this.pos.y, 7);
    }

    update() {
        if (dist(mainChar.pos.x, mainChar.pos.y, this.pos.x, this.pos.y) < 11) {
            this.collected = 1;
            game.score++;
        }
    }
}

var freezeFrame;

class freezePowerObj {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y);
        this.collected = 0;
    }
    
    draw() {
        this.update();
        noStroke();
        fill(0, 50, 150);  //blue
        push();
        translate(this.pos.x, this.pos.y-7);
        rotate(PI/4);
        square(0, 0, 10);
        pop();
    }

    update() {
        if (dist(mainChar.pos.x, mainChar.pos.y, this.pos.x, this.pos.y) < 10) {
            this.collected = 1;
            game.freeze = 1;
            freezeFrame = frameCount;
        }
    }
}

var main;
var enemy, enemy1;

function customChar() {
    // main character
    noStroke();
    fill(0, 0);
    rect(0, 0, 400, 400);
    fill(0);
    triangle(200, 200, 300, 380, 100, 380);
    circle(200, 130, 220);
    fill(255);
    ellipse(150, 130, 20, 50);
    ellipse(250, 130, 20, 50);
    //objects.push(get(0, 0, width, height));
    main = get(0, 0, width, height);

    // enemy (normal)
    noStroke();
    fill(0, 0);
    rect(0, 0, 400, 400);
    fill(230, 0, 0);
    triangle(200, 200, 300, 380, 100, 380);
    circle(200, 130, 220);
    rect(250, 300, 30, 5);
    fill(0);
    arc(150, 130, 70, 70, 0, PI + QUARTER_PI, CHORD);
    arc(250, 130, 70, 70, 0 - QUARTER_PI, PI, CHORD);
    triangle(280, 230, 290, 290, 270, 290);
    rect(278, 290, 5, 80);
    enemy = get(0, 0, width, height);

    // enemy (freeze)
    noStroke();
    fill(0, 0);
    rect(0, 0, 400, 400);
    fill(0, 0, 230);
    triangle(200, 200, 300, 380, 100, 380);
    circle(200, 130, 220);
    rect(250, 300, 30, 5);
    fill(180);
    arc(150, 130, 70, 70, 0, PI + QUARTER_PI, CHORD);
    arc(250, 130, 70, 70, 0 - QUARTER_PI, PI, CHORD);
    fill(0);
    triangle(280, 230, 290, 290, 270, 290);
    rect(278, 290, 5, 80);
    enemy1 = get(0, 0, width, height);
}
