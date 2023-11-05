/* 
  This file is to create our NPC2 which call coalball

*/

class enemy2Obj{
  constructor(x,y){
  this.position = new p5.Vector(x, y);
  this.velocity = new p5.Vector(random(-1,1), 0);
  this.death=0;
  } 
move() {
  this.position+=this.velocity;
}
draw(){
  push();
  translate(this.position.x,this.position.y);
  if(this.death===0){
    image(zombieImg,0,0, 20, 40);  
  }
  pop();
}

checkcollision(){
  /*detect whether need to chase */
  if(this.death===0){
  /*detect with the arrow collision */
  for(var i=0;i<arrow.length;i++){
  if(dist(this.position.x+10,this.position.y+20,arrow[i].pos.x,arrow[i].pos.y)<20){
    this.death=1;
    arrow[i].shoot=0;
  }
  }
  }
  }
   
}


var zombieImg;
var gamezombies=[];
function npc2preload(){
zombieImg=loadImage("zombie.png");

}