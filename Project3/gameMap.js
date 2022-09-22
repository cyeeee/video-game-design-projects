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
    }
  
    draw() {
      image(objects[1], this.x, this.y, 20, 20);
    }
}
  
class gameObj {
    constructor() {
      this.tilemap = [
        "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        "b                                        b",
        "b                                        b",
        "b             p                    p     b",
        "b                                        b",
        "b          r                p            b",
        "b   p                                    b",
        "b                                        b",
        "b                      p          r      b",
        "b      r                                 b",
        "b                                        b",
        "b  p                                     b",
        "b                                r       b",
        "b                         p              b",
        "b                                        b",
        "b         p                       p      b",
        "b                                        b",
        "b r                   r                  b",
        "b                                        b",
        "b                         p              b",
        "b        p                               b",
        "b                                        b",
        "b                                  p     b",
        "b                                        b",
        "b                  r                     b",
        "b   p                                    b",
        "b                                        b",
        "b                                        b",
        "b                                        b",
        "b                   p          p         b",
        "b                                        b",
        "b                                r       b",
        "b   r     p                              b",
        "b                             p          b",
        "b                                        b",
        "b               p                        b",
        "b                                        b",
        "b                            p           b",
        "b                                        b",
        "b       p            r                   b",
        "b                                        b",
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
            case 'b': image(objects[4], j*20, i*20, 20, 20);
            break;
          }
        }
      }

      // scroll the map as the main character moves around
      if (keyIsDown(LEFT_ARROW)) {
        this.xCor += 2;
      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.xCor -= 2;
      }
      if (keyIsDown(UP_ARROW)) {
        this.yCor += 2;
      }
      if (keyIsDown(DOWN_ARROW)) {
        this.yCor -= 2;
      }
    }
}
