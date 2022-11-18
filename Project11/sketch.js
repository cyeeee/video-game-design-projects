/*
Project 11 - 3D
Author: Chenyi Wang
Date: 11/17/2022


*/

// Rotate shape around the z-axis
var rotateZ3D = function (theta, nodes) {
  var sinTheta = sin(theta);
  var cosTheta = cos(theta);
  for (var n = 0; n < nodes.length; n++) {
    var node = nodes[n];
    var x = node[0];
    var y = node[1];
    node[0] = x * cosTheta - y * sinTheta;
    node[1] = y * cosTheta + x * sinTheta;
  }
};
// Rotate shape around the y-axis
var rotateY3D = function (theta, nodes) {
  var sinTheta = sin(theta);
  var cosTheta = cos(theta);
  for (var n = 0; n < nodes.length; n++) {
    var node = nodes[n];
    var x = node[0];
    var z = node[2];
    node[0] = x * cosTheta - z * sinTheta;
    node[2] = z * cosTheta + x * sinTheta;
  }
};
// Rotate shape around the x-axis
var rotateX3D = function (theta, nodes) {
  var sinTheta = sin(theta);
  var cosTheta = cos(theta);
  for (var n = 0; n < nodes.length; n++) {
    var node = nodes[n];
    var y = node[1];
    var z = node[2];
    node[1] = y * cosTheta - z * sinTheta;
    node[2] = z * cosTheta + y * sinTheta;
  }
};

mouseDragged = function () {
  var dx = mouseX - pmouseX;
  var dy = mouseY - pmouseY;
  for (var shapeNum = 0; shapeNum < shapes.length; shapeNum++) {
    var nodes = shapes[shapeNum].nodes;
    rotateY3D(dx, nodes);
    rotateX3D(dy, nodes);
  }
};

var createCuboid = function (x, y, z, w, h, d) {
  var nodes = [
    [x, y, z], [x, y, z + d], [x, y + h, z],
    [x, y + h, z + d], [x + w, y, z], [x + w, y, z + d],
    [x + w, y + h, z], [x + w, y + h, z + d],
  ];
  var edges = [
    [0, 1], [1, 3], [3, 2], [2, 0], [4, 5], [5, 7], 
    [7, 6], [6, 4], [0, 4], [1, 5], [2, 6], [3, 7],
  ];
  var faces = [
    [0, 1, 3, 2], [4, 6, 7, 5], [0, 2, 6, 4],
    [1, 5, 7, 3], [2, 3, 7, 6], [0, 4, 5, 1],
  ];
  return { nodes: nodes, edges: edges, faces: faces };
};

var shape1, shape2, shape3;
var shapes = [];
var color1, color2, color3, color4;

var setShapes = function () {
  // main
  shape1 = createCuboid(-140, -50, -70, 150, 150, 150);
  shape2 = createCuboid(10, 0, -70, 70, 100, 150);
  shape3 = createCuboid(80, 0, -30, 40, 100, 110);
  // loft
  shape4 = createCuboid(-60, -90, -150, 180, 50, 230);
  shape5 = createCuboid(-20, -90, -150, 90, 50, 3);
  shape6 = createCuboid(117, -90, -70, 3, 50, 40);
  shape7 = createCuboid(-60, -40, -150, 180, 40, 120);
  shape8 = createCuboid(10, -40, -30, 140, 40, 140);
  // roof
  shape9 = createCuboid(-80, -100, -170, 220, 10, 100);
  shape10 = createCuboid(-80, -100, -70, 240, 10, 190);
  shape11 = createCuboid(-70, -105, -160, 200, 5, 90);
  shape12 = createCuboid(-70, -105, -70, 220, 5, 180);
  shape13 = createCuboid(-160, -60, -90, 100, 10, 190);
  shape14 = createCuboid(-150, -65, -80, 90, 5, 170);

  shapes = [shape1, shape2, shape3, shape4, shape5, shape6,
          shape7, shape8, shape9, shape10, shape11, shape12, 
          shape13, shape14];
};

var drawEdges = function () {
  var nodes, edges;
  stroke(0);
  for (var shapeNum = 0; shapeNum < shapes.length; shapeNum++) {
    nodes = shapes[shapeNum].nodes;
    edges = shapes[shapeNum].edges;
    for (var e = 0; e < edges.length; e++) {
      var n0 = edges[e][0];
      var n1 = edges[e][1];
      var node0 = nodes[n0];
      var node1 = nodes[n1];
      line(node0[0], node0[1], node1[0], node1[1]);
    }
  }
};

var colorShape = function(c, nodes, faces) {
  fill(c);
  for (let i = 0; i < faces.length; i++) {
    let n0 = nodes[faces[i][0]];
    let n1 = nodes[faces[i][1]];
    let n2 = nodes[faces[i][2]];
    let n3 = nodes[faces[i][3]];
    if ((n0[2] + n2[2]) / 2 <= 0) {
      // check z component of the face midpoint;
      // shading percentage in terms of x component
      let sp = ((n0[0] + n2[0]) / 2 + 100) / 200;
      sp = (sp + 1) / 2; // rescale from [0, 1] to [0.5, 1]
      let r = red(c) * sp;
      let g = green(c) * sp;
      let b = blue(c) * sp;
      fill(r, g, b);
      quad(n0[0], n0[1], n1[0], n1[1], n2[0], n2[1], n3[0], n3[1]);
    }
  }
};

var colorFaces = function () {
  var nodes, edges, faces, aVec, bVec, cVec, dir;
  let shapesCopy = [...shapes];
  let orderedShapes = [];
  noStroke();
  let zs = [];
  for (let i = 0; i < shapes.length; i++) {
    nodes = shapes[i].nodes;
    zs[i] = (nodes[0][2] + nodes[7][2]) / 2;
  }
  let index, maxVal;
  while (zs.length) {
    index = 0;
    maxVal = zs[0];
    for (let i = 1; i < zs.length; i++) {
      if (zs[i] > maxVal) {
        index = i;
        maxVal = zs[i];
      }
    }
    orderedShapes.push(shapesCopy[index]);
    shapesCopy.splice(index, 1);
    zs.splice(index, 1);
  }
  for (var shapeNum = 0; shapeNum < orderedShapes.length; shapeNum++) {
    nodes = orderedShapes[shapeNum].nodes;
    //edges = orderedShapes[shapeNum].edges;
    faces = orderedShapes[shapeNum].faces;

    switch (orderedShapes[shapeNum]) {
      case shape1:
        colorShape(color1, nodes, faces);
        break;
      case shape2:
        colorShape(color4, nodes, faces);
        break;
      case shape3:
        colorShape(color1, nodes, faces);
        break;
      case shape4:
        colorShape(color4, nodes, faces);
        break;
      case shape5:
        colorShape(color1, nodes, faces);
        break;
      case shape6:
        colorShape(color1, nodes, faces);
        break;
      case shape7:
        colorShape(color3, nodes, faces);
        break;
      case shape8:
        colorShape(color3, nodes, faces);
        break;
      case shape9:
        colorShape(color2, nodes, faces);
        break;
      case shape10:
        colorShape(color2, nodes, faces);
        break;
      case shape11:
        colorShape(color2, nodes, faces);
        break;
      case shape12:
        colorShape(color2, nodes, faces);
        break;
      case shape13:
        colorShape(color2, nodes, faces);
        break;
      case shape14:
        colorShape(color2, nodes, faces);
        break;
    }


    /* for (var f = 0; f < faces.length; f++) {
      aVec = createVector(
        nodes[faces[f][0]][0],
        nodes[faces[f][0]][1],
        nodes[faces[f][0]][2]
      );
      bVec = createVector(
        nodes[faces[f][1]][0],
        nodes[faces[f][1]][1],
        nodes[faces[f][1]][2]
      );
      cVec = createVector(
        nodes[faces[f][2]][0],
        nodes[faces[f][2]][1],
        nodes[faces[f][2]][2]
      );
      dir = p5.Vector.cross(
        p5.Vector.sub(cVec, aVec),
        p5.Vector.sub(bVec, aVec)
      );
      if (dir.z > 0 && (shapeNum != 1 || f > 1)) {
        fill([
          (f % 2) * 255,
          (round(f / 2) % 2) * 255,
          (round(f / 4) % 2) * 255,
        ]);
        beginShape();
        for (let i = 0; i < faces[f].length; i++) {
          let point = nodes[faces[f][i]];
          vertex(point[0], point[1]);
        }
        endShape();
      }
    } */

  }
}

// the mouse click toggles between wire-frame mode and face-colored mode.
var mode = 0;
mouseClicked = function () {
  if (mode === 0) {
    mode = 1;
  }
  else{
    mode = 0;
  }
};

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  setShapes();
  color1 = color(130, 40, 0); // brown (main)
  color2 = color(100, 0, 0);  // dark red (roof)
  color3 = color(245, 245, 220); // beige (loft)
  color4 = color(220, 245, 245); // light blue (windows)
}

function draw() {
  background(150);

  push();
  translate(200, 200);
  if (mode === 0) {
    drawEdges();
  }
  else {
    colorFaces();
  }
  pop();
}
