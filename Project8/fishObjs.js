/* This file contains the fish objects */

class fish1Obj {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.body = [new p5.Vector(this.x-50, this.y+10), new p5.Vector(this.x+100, this.y-50), new p5.Vector(this.x+150, this.y-10), new p5.Vector(this.x+155, this.y), new p5.Vector(this.x+150, this.y+10), new p5.Vector(this.x+80, this.y+30), new p5.Vector(this.x+30, this.y+10),];
        this.tail1 = [new p5.Vector(this.x+30, this.y-20), new p5.Vector(this.x-50, this.y-80), new p5.Vector(this.x-100, this.y-70), new p5.Vector(this.x-80, this.y-30), new p5.Vector(this.x-170, this.y), new p5.Vector(this.x-100, this.y+50), new p5.Vector(this.x-40, this.y+40), new p5.Vector(this.x+50, this.y+20),];
        this.tail2 = [new p5.Vector(this.x+30, this.y-20), new p5.Vector(this.x-30, this.y-90), new p5.Vector(this.x-80, this.y-70), new p5.Vector(this.y-50, this.y-30), new p5.Vector(this.x-120, this.y), new p5.Vector(this.x-100, this.y+30), new p5.Vector(this.x-40, this.y+40), new p5.Vector(this.x+50, this.y+20), ];
        this.itBody = 0;
        this.itTail1 = 0;
        this.itTail2 = 0;
        this.currFrame = frameCount;
        this.i = 0;
    }

    move() {
        this.x += 0.2;
        for (var i = 0; i < this.body.length; i++) {
            this.body[i].x += 0.2;
        }
        for (var i = 0; i < this.tail1.length; i++) {
            this.tail1[i].x += 0.2;
        }
        for (var i = 0; i < this.tail2.length; i++) {
            this.tail2[i].x += 0.2;
        }
    }

    draw() {
        this.move();
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
                for (var i = 0; i < this.tail2.length; i++) {
                    vertex(this.tail2[i].x, this.tail2[i].y);
                }
                vertex(this.tail2[0].x, this.tail2[0].y);
                endShape();
                if (this.itTail2 < 5) {
                    subdivide(this.tail2);
                    this.itTail2++;
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
        // tail
        /* stroke(0);
        fill(255, 90, 90);  // light red
        beginShape();
        for (var i = 0; i < this.tail1.length; i++) {
            vertex(this.tail1[i].x, this.tail1[i].y);
        }
        vertex(this.tail1[0].x, this.tail1[0].y);
        endShape();
        if (this.itTail1 < 5) {
            subdivide(this.tail1);
            this.itTail1++;
        } */
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

