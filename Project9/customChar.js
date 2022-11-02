/* This file contians the drawings of custom characters */

var main;
var enemy;

function customChar() {
    // main character
    fill(0, 0);
    rect(0, 0, 400, 400);
    noStroke();
    fill(0);
    triangle(200, 200, 300, 380, 100, 380);
    circle(200, 130, 220);
    fill(255);
    ellipse(150, 130, 20, 50);
    ellipse(250, 130, 20, 50);
    //objects.push(get(0, 0, width, height));
    main = get(0, 0, width, height);

    // enemy (normal)
    fill(0, 0);
    rect(0, 0, 400, 400);
    noStroke();
    fill(230, 0, 0);
    triangle(200, 200, 300, 380, 100, 380);
    circle(200, 130, 220);
    rect(250, 300, 30, 5);
    fill(0);
    arc(150, 130, 70, 70, 0, PI + QUARTER_PI, CHORD);
    arc(250, 130, 70, 70, 0 - QUARTER_PI, PI, CHORD);
    triangle(280, 230, 290, 290, 270, 290);
    rect(278, 290, 5, 80);
    //objects.push(get(0, 0, width, height));
    enemy = get(0, 0, width, height);

    // enemy (freeze)
    /*
    fill(0, 0);
    rect(0, 0, 400, 400);
    noStroke();
    fill(0, 0, 255);
    triangle(200, 200, 300, 380, 100, 380);
    circle(200, 130, 220);
    rect(250, 300, 30, 5);
    fill(0);
    arc(150, 130, 70, 70, 0, PI + QUARTER_PI, CHORD);
    arc(250, 130, 70, 70, 0 - QUARTER_PI, PI, CHORD);
    triangle(280, 230, 290, 290, 270, 290);
    rect(278, 290, 5, 80);
    */
}