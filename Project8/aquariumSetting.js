/* This file contains the aquarium settings*/

class seaweedObj {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.cx1 = this.x - 40;
      this.cy1 = this.y - 30;
      this.cx2 = this.x + 20;
      this.cy2 = this.y - 60;
      this.x1 = this.x - 20;
      this.y1 = this.y - 100;
      this.cx1Dir = 0.5;
      this.cx2Dir = -0.25;
      this.x1Dir = -0.5;
    }
  
    draw() {
      stroke(10, 90, 10);   // dark green
      fill(10, 90, 10);
      bezier(this.x, this.y, this.cx1, this.cy1, this.cx2, this.cy2, this.x1, this.y1);
      this.sway();
    }
  
    sway() {
      this.cx1 += this.cx1Dir;
      if (this.cx1 < this.x1 || this.cx1 > this.x) {
        this.cx1Dir = -this.cx1Dir;
      }
      this.cx2 += this.cx2Dir;
      if (this.cx2 > this.x || this.cx2 < this.x1) {
        this.cx2Dir = -this.cx2Dir;
      }
      this.x1 += this.x1Dir;
      if (abs(this.x - this.x1) > 40 || this.x1 > this.x) {
        this.x1Dir = -this.x1Dir;
      }
    }
}

class rockObj {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = random(70, 100);   // random width
        this.h = random(30, 60);    // random height
        this.color = random(90, 180);   // random gray color
    }

    draw() {
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.w, this.h);
    }
}

class aquariumObj {
    constructor() {
      this.tilemap = [
        "                              ",
        "                              ",
        "                              ",
        "                              ",
        "                              ",
        "                              ",
        "                              ",
        "                              ",
        "rss   srr   srrss  rsr   rrsss",
      ];
      this.seaweeds = [];
      this.rocks = [];
      this.xCor = 0;
      this.yCor = 0;
    }

    initialize() {
        for (var i = 0; i < this.tilemap.length; i++) {
            for (var j = 0; j < this.tilemap[i].length; j++) {
                switch (this.tilemap[i][j]) {
                case 's':
                    this.seaweeds.push(new seaweedObj(j*50, i*50));
                break;
                case 'r':
                    this.rocks.push(new rockObj(j*50, i*50));
                break;
                }
            }
        }
    }
  
    drawBackground() {
      for (var i = 0; i < this.seaweeds.length; i++) {
        this.seaweeds[i].draw();
      }

      for (var i =0; i < this.rocks.length; i++) {
        this.rocks[i].draw();
      }
  
      // The player uses the left and right arrow keys to scroll the screen
      // the aquarium is 1500 pixels wide and 400 pixels long
      if (keyIsDown(RIGHT_ARROW) && this.xCor > -1100) {
        this.xCor -= 5;
      }
      if (keyIsDown(LEFT_ARROW) && this.xCor < 0) {
          this.xCor += 5;
      }
    }
  }