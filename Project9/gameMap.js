/* This file contains the settings of game map */

class wallObj {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y);
    }
    
    draw() {
        noStroke();
        fill(78); 
        square(this.pos.x, this.pos.y, 20);

    }
}

class pelletObj {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y);
    }
    
    draw() {
        noStroke();
        fill(0, 140, 140);
        circle(this.pos.x+10, this.pos.y+10, 7);
    }
}

class freezePowerObj {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y);
    }
    
    draw() {
        noStroke();
        fill(0, 50, 150);  //blue
        push();
        translate(this.pos.x+10, this.pos.y+3);
        rotate(PI/4);
        square(0, 0, 10);
        pop();

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
    }

    initialize() {
        for (var i = 0; i < this.tilemap.length; i++) {
            for (var j = 0; j < this.tilemap[i].length; j++) {
                switch (this.tilemap[i][j]) {
                    case 'w': 
                        this.wall.push(new wallObj(j*20, i*20));
                        break;
                    case '+': 
                        this.pellets.push(new pelletObj(j*20, i*20));
                        break;
                    case 'p': 
                        this.freezePowers.push(new freezePowerObj(j*20, i*20));
                        break;
                    case 'E': 
                        enemys.push(new enemyObj(j*20, i*20));
                        break;
                    case 'M': 
                        mainChar = new mainCharObj(j*20, i*20);
                        break;
                }
            }
        }
    }

    drawBackground() {
        for (var i = 0; i < this.wall.length; i++) {
            this.wall[i].draw();
        }
        for (var i = 0; i < this.pellets.length; i++) {
            this.pellets[i].draw();
        }
        for (var i = 0; i < this.freezePowers.length; i++) {
            this.freezePowers[i].draw();
        }
        for (var i = 0; i < enemys.length; i++) {
            enemys[i].draw();
        }
        mainChar.draw();
    }

}