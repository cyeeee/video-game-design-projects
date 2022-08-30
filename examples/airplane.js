class Airplane {
    constructor(x, y) {
        this.x = x; // position of the plane
        this.y = y;
    }

    draw() {
        fill(0, 255, 9);
        noStroke(); // no border

        ellipse(this.x, this.y, 10, 50); // body

        fill(255, 0, 0);
        ellipse(this.x - 15, this.y - 10, 3, 10); // engines
        ellipse(this.x + 15, this.y - 10, 3, 10);

        fill(0, 255, 9);
        ellipse(this.x, this.y - 5, 50, 10); // wings
        ellipse(this.x, this.y + 20, 25, 5); // tail
    }

    update() {
        this.y--;

        // using -25&425 instead of 0&400 to make the fly more smooth
        if (this.y < -25) {
            this.y = 425;
        }
    }
}

var planes = [];  // array (any types) (golobal)

function setup() {
    createCanvas(400, 400);

    /*
    planes[0] = new Airplane(50, 50);
    planes[1] = new Airplane(100, 100);
    planes[2] = new Airplane(300, 300);
    */

    planes.push(new Airplane(50, 50));
    planes.push(new Airplane(100, 100));
    planes.push(new Airplane(300, 300));

}

function draw() {
    background(255);

    for (var i = 0; i < planes.length; i++) {
        planes[i].draw();
        planes[i].update();
    }
}
