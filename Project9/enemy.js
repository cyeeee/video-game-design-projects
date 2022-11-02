/* This file contains the settings of enemy characters */

class enemyObj {
    constructor(x, y) {
      this.pos = new p5.Vector(x, y);
    }
  
    draw() {
      if (game.freeze === 1) {
        image(enemy1, this.pos.x, this.pos.y, 20, 20);
      }
      else {
        image(enemy, this.pos.x, this.pos.y, 20, 20);
      }
    }
}