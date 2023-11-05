/*
This file contains the settings of the game map 
*/

class prizeObj {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.collected = false;
    }
  
    draw() {
      image(objects[0], this.x, this.y, 20, 20);
    }
  
    remove() {  
      // cover the image of prize with a squire with color of background
      fill(200, 255, 200);  // same as background color
      square(this.x, this.y, 20);
    }
}
  
class rockObj {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.hit = false;
    }
  
    draw() {
      image(objects[1], this.x, this.y, 20, 20);
    }

    remove() {  
      // cover the image of rock with a squire with color of background
      fill(200, 255, 200);  // same as background color
      square(this.x, this.y, 20);
    }
}
  
class gameObj {
    constructor() {
      // 50 rocks, 20 prizes
      this.tilemap = [
        "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        "b                 r                r     b",
        "b    r                     r             b",
        "b             p                    p     b",
        "b                     r                  b",
        "b          r                p            b",
        "b   p                                r   b",
        "b                  r                     b",
        "b             r        p          r      b",
        "b      r                                 b",
        "b              r                         b",
        "b  p                     r           r   b",
        "b         r                      r       b",
        "b                         p              b",
        "b   r             r                      b",
        "b         p                       p      b",
        "b                                        b",
        "b r       r           r                  b",
        "b            r                    r      b",
        "b                         p              b",
        "b        p       r                       b",
        "b                     r           r      b",
        "b   r                              p     b",
        "b            r           r               b",
        "b                  r                  r  b",
        "b   p                                    b",
        "b                       r        r       b",
        "b           r                            b",
        "b                                        b",
        "b    r              p          p        rb",
        "b             r                          b",
        "b                                r       b",
        "b   r     p      r      r                b",
        "b                             p       r  b",
        "b                                        b",
        "b      r        p                        b",
        "b                       r            r   b",
        "b  r          r              p           b",
        "b                                        b",
        "b       p            r      r            b",
        "b                                   r    b",
        "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",];
      this.prizes = [];
      this.rocks = [];
      this.score = 0;
      this.gameOver = false;
      this.xCor = -200;
      this.yCor = -200;
    }
  
    initialize() {
      for (var i = 0; i < this.tilemap.length; i++) {
        for (var j = 0; j < this.tilemap[i].length; j++) {
          switch (this.tilemap[i][j]) {
            case 'p': this.prizes.push(new prizeObj(j*20, i*20));
            break;
            case 'r': this.rocks.push(new rockObj(j*20, i*20));
            break;
          }
        }
      }
    }
  
    drawBackground() {
      for (var i = 0; i < this.tilemap.length; i++) {
        for (var j = 0; j < this.tilemap[i].length; j++) {
          switch (this.tilemap[i][j]) {
            case 'p': image(objects[0], j*20, i*20, 20, 20);
            break;
            case 'r': image(objects[1], j*20, i*20, 20, 20);
            break;
            case 'b': image(objects[6], j*20, i*20, 20, 20);
            break;
          }
        }
      }

      // scroll the map as the main character moves around
      if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        this.xCor -= mainChar.step.x;
        this.yCor -= mainChar.step.y;
      }
      if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        this.xCor -= mainChar.step.x;
        this.yCor -= mainChar.step.y;
      }
    }
}
