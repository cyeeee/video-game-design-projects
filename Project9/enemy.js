/* This file contains the settings of enemy characters */

var targetObj = function (x, y) {
  this.x = x;
  this.y = y;
};
var qObj = function (x, y) {
  this.x = x;
  this.y = y;
  this.fcost = 0;
};
qObj.prototype.set = function (a, b) {
  this.x = a;
  this.y = b;
};

class enemyObj {
    constructor(x, y) {
      this.pos = new p5.Vector(x, y);
      this.step = new p5.Vector(0, 0);
      this.speed = 1;
      this.direction = 1;
      this.graph = ggraph;
      this.cost = new Array(20);
      this.inq = new Array(20);
      this.comefrom = new Array(20);
      for (var i = 0; i < 20; i++) {
        this.cost[i] = new Array(20);
        this.inq[i] = new Array(20);
        this.comefrom[i] = new Array(20);
      }
      for (i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
          this.comefrom[i][j] = new p5.Vector(0, 0);
        }
      }
      this.path = [];
      this.q = [];
      for (i = 0; i < 400; i++) {
        this.path.push(new p5.Vector(0, 0));
        this.q.push(new qObj(0, 0));
      }
      this.pathLen = 0;
      this.pathFound = 0;
      this.qLen = 0;
      this.qStart = 0;
      
      this.target = new targetObj(0, 0);
      this.targetPos = new targetObj(0, 0);
      this.finalDest = new targetObj(0, 0);
    }

    draw() {
      if (game.freeze === 1) {
        image(enemy1, this.pos.x-10, this.pos.y-10, 20, 20);
      }
      else {
        image(enemy, this.pos.x-10, this.pos.y-10, 20, 20);
        this.chase();
      }
    }

    chase() {
      if (dist(this.target.x, this.target.y, this.pos.x, this.pos.y) > 2) {
        this.step.set(this.target.x - this.pos.x, this.target.y - this.pos.y);
        this.step.normalize();
        this.pos.add(this.step); 
      }
      else {
        if (this.finalDest.x === this.target.x && this.finalDest.y === this.target.y) {
          game.end = 1;
        } 
        else {
          this.pathLen--;
          if (this.pathLen > 0) {
            this.target.x = this.path[this.pathLen].x;
            this.target.y = this.path[this.pathLen].y;
          }
          else {
            this.target.x = this.finalDest.x;
            this.target.y = this.finalDest.y;
          }
        }
      }
    
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

    findPath() {
      this.target.x = mainChar.pos.x;
      this.target.y = mainChar.pos.y;
      this.finalDest.x = this.target.x;
      this.finalDest.y = this.target.y;
      this.targetPos.x = floor(this.finalDest.y / 20);
      this.targetPos.y = floor(this.finalDest.x / 20);
      var i = floor(this.pos.y / 20);
      var j = floor(this.pos.x / 20);
      this.initGraph(i, j);
      this.pathFound = 0;
      this.pathLen = 0;
      this.findAStarPath(i, j);
      this.pathLen--;
      this.target.x = this.path[this.pathLen].x;
      this.target.y = this.path[this.pathLen].y; 
    }

    initGraph(x, y) {
      for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
          if (this.graph[i][j] > 0) {
            this.graph[i][j] = 0;
          }
          this.inq[i][j] = 0;
          this.cost[i][j] = 0;
        }
      }
      this.graph[x][y] = 1;
    }
  
    findAStarPath(x, y) {
      var i, j, a, b;
      this.qLen = 0;
      this.inq[x][y] = 1;
      this.q[this.qLen].set(x, y);
      this.q[this.qLen].fcost = 0;
      this.qLen++;
      this.pathLen = 0;
      this.qStart = 0;

      while (this.qStart < this.qLen && this.pathFound === 0) {
        this.findMinInQ();
        i = this.q[this.qStart].x;
        j = this.q[this.qStart].y;
        this.graph[i][j] = 1;
        this.qStart++;
        if (i === this.targetPos.x && j === this.targetPos.y) {
          this.pathFound = 1;
          this.path[this.pathLen].set(j*20+10, i*20+10);
          this.pathLen++;
        }
        a = i+1;
        b = j;
        if (a < 20 && this.pathFound === 0) {
          if (this.graph[a][b] === 0 && this.inq[a][b] === 0) {
            this.setComeFrom(a, b, i, j);
          }
        }
        a = i-1;
        b = j;
        if (a >= 0 && this.pathFound === 0) {
          if (this.graph[a][b] === 0 && this.inq[a][b] === 0) {
            this.setComeFrom(a, b, i, j);
          }
        }
        a = i;
        b = j+1;
        if (b < 20 && this.pathFound === 0) {
          if (this.graph[a][b] === 0 && this.inq[a][b] === 0) {
            this.setComeFrom(a, b, i, j);
          }
        }
        a = i;
        b = j-1;
        if (b >= 0 && this.pathFound === 0) {
          if (this.graph[a][b] === 0 && this.inq[a][b] === 0) {
            this.setComeFrom(a, b, i, j);
          }
        }
      }

      while (i !== x || j !== y) {
        a = this.comefrom[i][j].x;
        b = this.comefrom[i][j].y;
        this.path[this.pathLen].set(b*20+10, a*20+10);
        this.pathLen++;
        i = a;
        j = b;
      }
    }
  
    findMinInQ() {
      var min = this.q[this.qStart].fcost;
      var minIdx = this.qStart;
      for (var i = this.qStart+1; i < this.qLen; i++) {
        if (this.q[i].fcost < min) {
          min = this.q[i].fcost;
          minIdx = i;
        }
      }
      if (minIdx !== this.qStart) {
        // swap
        var t1 = this.q[minIdx].x;
        var t2 = this.q[minIdx].y;
        var t3 = this.q[minIdx].fcost;
        this.q[minIdx].x = this.q[this.qStart].x;
        this.q[minIdx].y = this.q[this.qStart].y;
        this.q[minIdx].fcost = this.q[this.qStart].fcost;
        this.q[this.qStart].x = t1;
        this.q[this.qStart].y = t2;
        this.q[this.qStart].fcost = t3;
      }
    }
    
    setComeFrom(a, b, i, j) {
      this.inq[a][b] = 1;
      this.comefrom[a][b].set(i, j);
      this.q[this.qLen].set(a, b);
      this.cost[a][b] = this.cost[i][j]+10;
      this.q[this.qLen].fcost = this.cost[a][b] + dist(b*20+10, a*20+10, this.finalDest.x+10, this.finalDest.y+10);
      this.qLen++;
    }
  
}
