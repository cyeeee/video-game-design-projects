/* This file contains the settings of enemy characters */

/*var cost = [];
var inq = [];
var comefrom = [];
var path = [];
var q = [];
var pathLen = 0;
var pathFound = 0;
var qLen = 0;
var qStart = 0;
var target, targetPos, finalDest; */

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
      /* this.graph = [];
      this.cost = [];
      this.inq = [];
      this.comefrom = [];
      this.path = [];
      this.q = [];
      this.pathLen = 0;
      this.pathFound = 0;
      this.qLen = 0;
      this.qStart = 0;
      this.target;
      this.targetPos;
      this.finalDest; */
      //this.graph = new Array(20);
      this.cost = new Array(20);
      this.inq = new Array(20);
      this.comefrom = new Array(20);
      for (var i = 0; i < 20; i++) {
        //this.graph[i] = new Array(20);
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

    /* setup() {
      this.graph = new Array(20);
      this.cost = new Array(20);
      this.inq = new Array(20);
      this.comefrom = new Array(20);
      for (var i = 0; i < 20; i++) {
        this.graph[i] = new Array(20);
        this.cost[i] = new Array(20);
        this.inq[i] = new Array(20);
        this.comefrom[i] = new Array(20);
      }
      for (i = 0; i < 400; i++) {
        this.path.push(new p5.Vector(0, 0));
        this.q.push(new qObj(0, 0));
      }
      for (i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
          this.comefrom[i][j] = new p5.Vector(0, 0);
        }
      }
      this.target = new targetObj(0, 0);
      this.targetPos = new targetObj(0, 0);
      this.finalDest = new targetObj(0, 0);
    } */
  
    draw() {
      if (game.freeze === 1) {
        image(enemy1, this.pos.x, this.pos.y, 20, 20);
      }
      else {
        image(enemy, this.pos.x, this.pos.y, 20, 20);
        if (frameCount % 30 === 0) {
          this.findPath();
        }
        this.chase();
      }
    }

    collide() {
      var c = 0;
      this.step.set(target.x - this.pos.x, target.y - this.pos.y);
      this.step.normalize();
      var ahead = p5.Vector.add(this.pos, this.step);
      for (var i = 0; i < game.wall.length; i++) {
        if (dist(ahead.x+10, ahead.y+10, game.wall[i].pos.x+10, game.wall[i].pos.y+10) < 19) {
          c = 1;
        }
      }
      return c;
    }

    chase() {
      if (dist(this.target.x, this.target.y, this.pos.x, this.pos.y) > 5) {
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
      initGraph(i, j, this.inq, this.cost);
      this.pathFound = 0;
      this.pathLen = 0;
      findAStarPath(i, j, this.qLen, this.inq, this.q, this.pathLen, this.qStart, 
                          this.comefrom, this.cost, this.pathFound, this.path);
      /* this.pathLen--;
      this.target.x = this.path[this.pathLen].x;
      this.target.y = this.path[this.pathLen].y; */
    }
}

var findAStarPath = function (x, y, qLen, inq, q, pathLen, qStart, comefrom, cost, pathFound, path) {
  var i, j, a, b;
  qLen = 0;
  graph[x][y] = 1;
  inq[x][y] = 1;
  q[qLen].set(x, y);
  q[qLen].fcost = 0;
  qLen++;
  pathLen = 0;
  qStart = 0;
  
  var findMinInQ = function () {
    var min = q[qStart].fcost;
    var minIdx = qStart;
    for (var i = qStart+1; i < qLen; i++) {
      if (q[i].fcost < min) {
        min = q[i].qStart;
        minIdx = i;
      }
    }
    if (minIdx !== qStart) {
      // swap
      var t1 = q[minIdx].x;
      var t2 = q[minIdx].y;
      var t3 = q[minIdx].fcost;
      q[minIdx].x = q[qStart].x;
      q[minIdx].y = q[qStart].y;
      q[minIdx].fcost = q[qStart].fcost;
      q[qStart].x = t1;
      q[qStart].y = t2;
      q[qStart].fcost = t3;
    }
  };

  var setComeFrom = function (a, b, i, j) {
    inq[a][b] = 1;
    comefrom[a][b].set(i, j);
    q[qLen].set(a, b);
    cost[a][b] = cost[i][j]+10;
    q[qLen].fcost = cost[a][b] + dist(b*20+10, a*20+10, finalDest.x+10, finalDest.y+10);
    qLen++;
  };

  while (qStart < qLen && pathFound === 0) {
    findMinInQ();
    i = q[qStart].x;
    j = q[qStart].y;
    graph[i][j] = 1;
    qStart++;
    if (i === targetPos.x && j === targetPos.y) {
      pathFound = 1;
      path[pathLen].set(j*20+10, i*20+10);
      pathLen++;
    }
    a = i+1;
    b = j;
    if (a < 20 && pathFound === 0) {
      if (graph[a][b] === 0 && inq[a][b] === 0) {
        setComeFrom(a, b, i, j);
      }
    }
    a = i-1;
    b = j;
    if (a >= 0 && pathFound === 0) {
      if (graph[a][b] === 0 && inq[a][b] === 0) {
        setComeFrom(a, b, i, j);
      }
    }
    a = i;
    b = j+1;
    if (b < 20 && pathFound === 0) {
      if (graph[a][b] === 0 && inq[a][b] === 0) {
        setComeFrom(a, b, i, j);
      }
    }
    a = i;
    b = j-1;
    if (b >= 0 && pathFound === 0) {
      if (graph[a][b] === 0 && inq[a][b] === 0) {
        setComeFrom(a, b, i, j);
      }
    }
  }

  while (i !== x || j !== y) {
    a = comefrom[i][j].x;
    b = comefrom[i][j].y;
    path[pathLen].set(b * 20 + 10, a * 20 + 10);
    pathLen++;
    i = a;
    j = b;
  }
};

var initGraph = function (x, y, inq, cost) {
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      if (graph[i][j] > 0) {
        graph[i][j] = 0;
      }
      inq[i][j] = 0;
      cost[i][j] = 0;
    }
  }
  graph[x][y] = 1;
};