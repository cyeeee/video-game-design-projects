/* This file contains the settings for schools of fish*/

class swarm1Obj {
    constructor() {
        this.fishs = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 3; j++) {
                this.fishs.push(new fish3Obj(100+i*200, 500+j*100));
            }
        }
    }

    display() {
        for (var i = 0; i < this.fishs.length; i++) {
            this.fishs[i].draw();
            this.fishs[i].swarm();
        }
    }

    swarm() {
        align(this.fishs);
        cohesion(this.fishs);
    }
}

class swarm2Obj {
    constructor() {
        this.fishs = [];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                this.fishs.push(new fish3Obj(4000, 1500));
            }
        }
    }

    display() {
        for (var i = 0; i < this.fishs.length; i++) {
            this.fishs[i].draw();
            this.fishs[i].swarm();
        }
    }

    swarm() {
        align(this.fishs);
        cohesion(this.fishs);
    }
}

class swarm3Obj {
    constructor() {
        this.fishs = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 2; j++) {
                this.fishs.push(new fish1Obj(1000+i*50, 800+j*100));
            }
        }
    }

    display() {
        for (var i = 0; i < this.fishs.length; i++) {
            this.fishs[i].draw();
            this.fishs[i].swarm();
        }
    }

    swarm() {
        align(this.fishs);
        cohesion(this.fishs);
    }
}

var align = function (list) {
    var s = 0;
        for (var i = 0; i < list.length; i++) {
            s += list[i].angle;
        }
        s = s / list.length;
        for (var i = 0; i < list.length; i++) {
            list[i].angle = s;
        }
};

var cohesion = function (list) {
    var x = 0, y = 0;
        var v = new p5.Vector(0, 0);
        for (var i = 0; i < list.length; i++) {
            x += list[i].x;
            y += list[i].y;
        }
        x = x / list.length;
        y = y / list.length;
        for (var i = 0; i < list.length; i++) {
            if (dist(x, y, list[i].x, list[i].y) > cohesionDist) {
                v.set(x - list[i].x, y - list[i].y);
                list[i].angle = v.heading();
            }
        }
}