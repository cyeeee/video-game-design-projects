/* This file contains the fish objects */

class fish1Obj {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.body = [new p5.Vector(this.x-50, this.y+10), new p5.Vector(this.x+100, this.y-50), new p5.Vector(this.x+150, this.y-10), new p5.Vector(this.x+155, this.y), new p5.Vector(this.x+150, this.y+10), new p5.Vector(this.x+80, this.y+30), new p5.Vector(this.x+30, this.y+10),];
        this.tail1 = [new p5.Vector(this.x+30, this.y-20), new p5.Vector(this.x-50, this.y-80), new p5.Vector(this.x-100, this.y-70), new p5.Vector(this.x-80, this.y-30), new p5.Vector(this.x-170, this.y), new p5.Vector(this.x-100, this.y+50), new p5.Vector(this.x-40, this.y+40), new p5.Vector(this.x+50, this.y+20),];
        this.itBody = 0;
        this.itTail1 = 0;
        this.currFrame = frameCount;
        this.i = 0;
        this.xDir = 0.5;
        this.yDir = random(-0.2, 0.2);
        this.scale = random(0.1, 0.2);
        this.angle = 0;
        this.out = 0;
    }

    move() {
        this.x += this.xDir;
        this.y += this.yDir;
        for (var i = 0; i < this.body.length; i++) {
            this.body[i].x += this.xDir;
            this.body[i].y += this.yDir;
        }
        for (var i = 0; i < this.tail1.length; i++) {
            this.tail1[i].x += this.xDir;
            this.tail1[i].y += this.yDir;
        }

        if (this.x > 1700/this.scale) {
            this.out = 1;
        } 

        if (this.y <= 15/this.scale || this.y >= 390/this.scale) {
            this.yDir = -this.yDir;
        }
    }

    draw() {
        //this.move();
        push();
        scale(this.scale);
        // tail
        stroke(0);
        fill(255, 90, 90);  // light red
        switch (this.i) {
            case 0:
                beginShape();
                for (var i = 0; i < this.tail1.length; i++) {
                    vertex(this.tail1[i].x, this.tail1[i].y);
                }
                vertex(this.tail1[0].x, this.tail1[0].y);
                endShape();
                if (this.itTail1 < 5) {
                    subdivide(this.tail1);
                    this.itTail1++;
                }
                break;
            case 1:
                beginShape();
                for (var i = 0; i < this.tail1.length; i++) {
                    vertex(this.tail1[i].x+20, this.tail1[i].y-10);
                }
                vertex(this.tail1[0].x+20, this.tail1[0].y-10);
                endShape();
                if (this.itTail1 < 5) {
                    subdivide(this.tail1);
                    this.itTail1++;
                }
                break;
        }
        
        if (this.currFrame < (frameCount - 50)) {
            this.currFrame = frameCount;
            this.i++;
            if (this.i > 1) {
            this.i = 0;
            }
        }
        curve(this.x+200, this.y-180, this.x+100, this.y+20, this.x+70, this.y+20, this.x+200, this.y-150);
        // body
        fill(100, 180, 230);  // light blue
        beginShape();
        for (var i = 0; i < this.body.length; i++) {
            vertex(this.body[i].x, this.body[i].y);
        }
        vertex(this.body[0].x, this.body[0].y);
        endShape();
        if (this.itBody < 5) {
            subdivide(this.body);
            this.itBody++;
        }
        fill(255, 90, 90);
        stroke(0);
        curve(this.x+200, this.y-190, this.x+110, this.y, this.x+100, this.y-10, this.x+190, this.y-50);
        // eye
        fill(255);
        circle(this.x+128, this.y-10, 10);
        fill(0);
        circle(this.x+129, this.y-10, 6);
        // mouth
        noFill();
        curve(this.x+155, this.y-15, this.x+153, this.y+2, this.x+140, this.y+2, this.x+145, this.y-20);
        pop();
    }

    swarm() {
        this.angle += random(-fiveDegrees, fiveDegrees);
        var dx = abs(cos(this.angle)/2);
        var dy = sin(this.angle)/3;
        if (this.y <= 15/this.scale || this.y >= 390/this.scale) {
            dy = -dy;
        }
        if (this.x > 1700/this.scale) {
            this.out = 1;
        } 
        this.x += dx;
        this.y += dy;
        for (var i = 0; i < this.body.length; i++) {
            this.body[i].x += dx;
            this.body[i].y += dy;
        }
        for (var i = 0; i < this.tail1.length; i++) {
            this.tail1[i].x += dx;
            this.tail1[i].y += dy;
        }  
    }
}

class fish2Obj {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.body = [new p5.Vector(this.x-130, this.y), new p5.Vector(this.x+30, this.y-70), new p5.Vector(this.x+150, this.y-10), new p5.Vector(this.x+105, this.y+30), new p5.Vector(this.x+40, this.y+50), new p5.Vector(this.x-30, this.y+20),];
        this.tail1 = [new p5.Vector(this.x-50, this.y), new p5.Vector(this.x-90, this.y-30), new p5.Vector(this.x-130, this.y-50), new p5.Vector(this.x-150, this.y-30), new p5.Vector(this.x-140, this.y+30), new p5.Vector(this.x-110, this.y+30),];
        this.itBody = 0;
        this.itTail1 = 0;
        this.currFrame = frameCount;
        this.i = 0;
        this.xDir = 0.4;
        this.yDir = random(-0.3, 0.3);
        this.scale = random(0.1, 0.2);
        this.out = 0;
    }

    move() {
        this.x += this.xDir;
        this.y += this.yDir;
        for (var i = 0; i < this.body.length; i++) {
            this.body[i].x += this.xDir;
            this.body[i].y += this.yDir;
        }
        for (var i = 0; i < this.tail1.length; i++) {
            this.tail1[i].x += this.xDir;
            this.tail1[i].y += this.yDir;
        }

        if (this.x > 1700/this.scale) {
            this.out = 1;
        } 

        if (this.y <= 15/this.scale || this.y >= 385/this.scale) {
            this.yDir = -this.yDir;
        }
    }

    draw() {
        //this.move();
        push();
        scale(this.scale); 
        // tail
        stroke(0);
        fill(255, 120, 0);  // orange
        switch (this.i) {
            case 0:
                beginShape();
                for (var i = 0; i < this.tail1.length; i++) {
                    vertex(this.tail1[i].x, this.tail1[i].y);
                }
                vertex(this.tail1[0].x, this.tail1[0].y);
                endShape();
                if (this.itTail1 < 5) {
                    subdivide(this.tail1);
                    this.itTail1++;
                }
                break;
            case 1:
                beginShape();
                for (var i = 0; i < this.tail1.length; i++) {
                    vertex(this.tail1[i].x+10, this.tail1[i].y-5);
                }
                vertex(this.tail1[0].x+10, this.tail1[0].y-5);
                endShape();
                if (this.itTail1 < 5) {
                    subdivide(this.tail1);
                    this.itTail1++;
                }
                break;
        } 
        
        if (this.currFrame < (frameCount - 50)) {
            this.currFrame = frameCount;
            this.i++;
            if (this.i > 1) {
            this.i = 0;
            }
        } 

        curve(this.x+100, this.y-180, this.x+40, this.y+45, this.x, this.y+32, this.x+150, this.y-120);
        
        // body
        fill(255, 200, 150);  // light orange
        beginShape();
        for (var i = 0; i < this.body.length; i++) {
            vertex(this.body[i].x, this.body[i].y);
        }
        vertex(this.body[0].x, this.body[0].y);
        endShape();
        if (this.itBody < 5) {
            subdivide(this.body);
            this.itBody++;
        }
        fill(255, 120, 0);
        stroke(0);
        curve(this.x+190, this.y-105, this.x+65, this.y+30, this.x+55, this.y+5, this.x+190, this.y+45);
        curve(this.x+200, this.y-40, this.x+90, this.y-40, this.x+100, this.y+28, this.x+190, this.y+40);
        curve(this.x+150, this.y-60, this.x, this.y-50, this.x+10, this.y+36, this.x+150, this.y+40);
        // eye
        fill(255);
        circle(this.x+108, this.y-10, 10);
        fill(0);
        circle(this.x+109, this.y-10, 6);
        // mouth
        noFill();
        curve(this.x+135, this.y-15, this.x+133, this.y+2, this.x+120, this.y+2, this.x+125, this.y-20);
        pop();
    }
} 

class fish3Obj {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.body = [new p5.Vector(this.x-80, this.y), new p5.Vector(this.x+30, this.y-40), new p5.Vector(this.x+130, this.y), new p5.Vector(this.x+50, this.y+40), new p5.Vector(this.x-50, this.y+10),];
        this.itBody = 0;
        this.currFrame = frameCount;
        this.i = 0;
        this.xDir = 0.5;
        this.yDir = random(-0.2, 0.2);
        this.scale = random(0.1, 0.2);
        this.angle = 0;
        this.out = 0;
    }

    move() {
        this.x += this.xDir;
        this.y += this.yDir;
        for (var i = 0; i < this.body.length; i++) {
            this.body[i].x += this.xDir;
            this.body[i].y += this.yDir;
        }

        if (this.x > 1700/this.scale) {
            this.out = 1;
        } 

        if (this.y <= 15/this.scale || this.y >= 390/this.scale) {
            this.yDir = -this.yDir;
        }
    }

    draw() {
        //this.move();
        push();
        scale(this.scale);
        // tail
        stroke(0);
        strokeWeight(2);
        noFill();
        switch (this.i) {
            case 0:
                curve(this.x-900, this.y-50, this.x-130, this.y-45, this.x-130, this.y+55, this.x-900, this.y+70);
                curve(this.x-500, this.y-50, this.x-130, this.y-45, this.x-130, this.y+55, this.x-500, this.y+70);
                break;
            case 1:
                curve(this.x-700, this.y-50, this.x-120, this.y-50, this.x-110, this.y+35, this.x-750, this.y+70);
                curve(this.x-400, this.y-50, this.x-120, this.y-50, this.x-110, this.y+35, this.x-400, this.y+70);
                break;
        } 
        
        if (this.currFrame < (frameCount - 50)) {
            this.currFrame = frameCount;
            this.i++;
            if (this.i > 1) {
            this.i = 0;
            }
        } 

        noFill();
        curve(this.x+100, this.y, this.x+50, this.y+30, this.x+10, this.y+28, this.x+150, this.y-100);
        
        // body
        fill(250, 250, 130);  // light yellow
        beginShape();
        for (var i = 0; i < this.body.length; i++) {
            vertex(this.body[i].x, this.body[i].y);
        }
        vertex(this.body[0].x, this.body[0].y);
        endShape();
        if (this.itBody < 5) {
            subdivide(this.body);
            this.itBody++;
        }

        fill(90, 240, 240);
        curve(this.x+250, this.y-50, this.x+65, this.y+15, this.x+55, this.y, this.x+250, this.y);
        
        // eye
        strokeWeight(1);
        fill(255);
        circle(this.x+88, this.y, 10);
        fill(0);
        circle(this.x+89, this.y, 6);
        // mouth
        noFill();
        curve(this.x+105, this.y-5, this.x+103, this.y+12, this.x+90, this.y+12, this.x+95, this.y-10);
        pop();
    }

    swarm() {
        this.angle += random(-fiveDegrees, fiveDegrees);
        var dx = cos(this.angle);
        var dy = sin(this.angle)/3;
        if (this.y <= 15/this.scale || this.y >= 390/this.scale) {
            dy = -dy;
        }
        this.x += dx;
        this.y += dy;
        for (var i = 0; i < this.body.length; i++) {
            this.body[i].x += dx;
            this.body[i].y += dy;
        }      
    }
} 


var p2 = [];
var splitPoints = function (points) {
    p2.splice(0, p2.length);
    for (var i = 0; i < points.length - 1; i++) {
      p2.push(new p5.Vector(points[i].x, points[i].y));
      p2.push(new p5.Vector((points[i].x + points[i + 1].x) / 2,
                            (points[i].y + points[i + 1].y) / 2));
    }
    p2.push(new p5.Vector(points[i].x, points[i].y));
    p2.push(new p5.Vector((points[0].x + points[i].x) / 2,
                        (points[0].y + points[i].y) / 2));
};
  
var average = function (points) {
    for (var i = 0; i < p2.length - 1; i++) {
      var x = (p2[i].x + p2[i + 1].x) / 2;
      var y = (p2[i].y + p2[i + 1].y) / 2;
      p2[i].set(x, y);
    }
    points.splice(0, points.length);
    for (i = 0; i < p2.length; i++) {
      points.push(new p5.Vector(p2[i].x, p2[i].y));
    }
};
  
var subdivide = function (points) {
    splitPoints(points);
    average(points);
};

