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

var setShapes = function () {
  shape1 = createCuboid(-140, -50, -70, 150, 150, 150);
  shape2 = createCuboid(10, 0, -70, 70, 100, 150);
  shape3 = createCuboid(80, 0, -30, 40, 100, 110);

  shape4 = createCuboid(-60, -90, -150, 180, 50, 230);
  shape5 = createCuboid(-20, -90, -150, 90, 50, 3);
  shape6 = createCuboid(117, -90, -70, 3, 50, 40);
  shape7 = createCuboid(-60, -40, -150, 180, 40, 120);
  shape8 = createCuboid(10, -40, -30, 140, 40, 140);
 
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

var drawEdge = function () {
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

// the mouse click toggles between wire-frame mode and colored mode.

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  setShapes();
}

function draw() {
  background(150);

  push();
  translate(200, 200);
  drawEdge();
  pop();
}
