/* 
  This file is to create our NPC1 which call coalball

*/

class enemy1Obj{
  constructor(x,y){
  this.position = new p5.Vector(x, y);
  this.acceleration = new p5.Vector(0, 0);
  this.velocity = new p5.Vector(0, 0);
  this.drag = new p5.Vector(0, 0);
  this.aAcc = 0;
  this.aVelocity = 0;
  this.angle = 0;
  this.mass = 20 / 5;
  this.death=0;
  this.mode=0;
  this.gravity = new p5.Vector(0, 0.3);
  this.delay=false;
  this.currframe=frameCount;
  this.jump=false;
  this.oripos=new p5.Vector(x,y);
  }
applyForce(force) {/*applied the force and change the acceleration */
this.acceleration.add(force);
}  
move() {/*make sure that the balls move and could catch by the steps */
//var gravityForce = p5.Vector.mult(gravity, this.mass);
//this.applyForce(gravity);
this.velocity.add(this.acceleration);
this.position.add(this.velocity);
var check=false;
/*rotate the ball */
if(this.mode===1){
this.aAcc = this.velocity.mag()/1000; // modify constant 10
if (this.velocity.x < 0) {
this.aAcc = -this.aAcc;
}
this.aVelocity += this.aAcc;
this.aVelocity *= 0.98; // drag
this.angle += this.aVelocity;
}
/*reset the acceleration */ 
this.acceleration.set(0, 0);
}
draw(){
  if(this.death===0){
  if(this.mode===0){
  push();
  translate(this.position.x,this.position.y);
  noStroke();
  fill(0);
  ellipse(-5,9,8,10);
  ellipse(5,9,8,10);
  fill(105,105,105);
  ellipse(0,0,25,25);
  fill(0);
  ellipse(0,-11,10,4.65);
  ellipse(-11,0,4.65,10);
  ellipse(11,0,4.65,10);
  stroke(0);
  fill(255);
  ellipse(0,6,6,8);
  fill(255);
  stroke(0);
  ellipse(-4,-3,8,8);
  ellipse(4,-3,8,8);
  fill(0);
  noStroke();
  ellipse(-4,-2.5,2.5,2.5);
  ellipse(4,-2.5,2.5,2.5);  
  pop();
  }
  else{
  push();
  translate(this.position.x,this.position.y);
  rotate(this.angle);
  noStroke();
  fill(105,105,105);
  ellipse(0,0,25,25);
  fill(0);
  ellipse(0,-11,10,4.65);
  ellipse(-11,0,4.65,10);
  ellipse(11,0,4.65,10);
  fill(0);
  textSize(10);
  text("x",-6,-1);
  text("x",1,-1);
  textSize(20);
  text("~",-7,12);
  pop();    
  }
  }
}

checkcollision(){
  /*detect whether need to chase */
  if(this.death===0){
  /*detect with the arrow collision */
    for(var i=0;i<arrow.length;i++){
      if(arrow[i].shoot===1){
      if(dist(this.position.x,this.position.y,arrow[i].pos.x,arrow[i].pos.y)<20){
      this.death=1;
      arrow[i].shoot=0;
      }
      }
    }
    /*detect whether hit the mainchar */
    if(!this.delay){
    if(dist(this.position.x,this.position.y,mainChar.pos.x+22,mainChar.pos.y+22)<25){
    mainChar.dead=1;
    this.currframe=frameCount;
    this.delay=true;
    this.mode=0;
    this.velocity.x=this.velocity.x/2;
    }
    }
    var checkon=false;
    if(game.currstate===2){
      if(this.velocity.y>=0){
      for (var i = 0; i < game.grass.length; i++) {
      if (
        this.position.x  >= game.grass[i].x-2 &&
        this.position.x <= game.grass[i].x + 22
      ) {
        if (
          this.position.y > game.grass[i].y-15 && 
          this.position.y <= game.grass[i].y-5 
        ) {
          this.position.y = game.grass[i].y - 5;
          this.velocity.y = 0;
          checkon=true;
          this.jump=false;
          if(this.velocity.x>0){
            this.velocity.x=1;
          }
          else{
            this.velocity.x=-1;
          }
        }
      }
      }
      }

    if(!checkon){
       this.applyForce( this.gravity);
    }
    
    for (var i = 0; i < game.blocks.length; i++) {
      if (dist(this.position.x, this.position.y, game.blocks[i].x+10, game.blocks[i].y+10) < 25) {
       // this.force.set(0, 0);
        if (this.velocity.x > 0) {
          this.position.x-=this.velocity.x*2;
        } else if (this.velocity.x < 0) {
          this.position.x-=this.velocity.x*2;
        }
        if(this.mode===0){
        this.velocity.x =-this.velocity.x*2;
        }
      }
    }
      
    if(option.gamemode===0){
    for (var i = 0; i < game.collidepoint.length; i++) {
      if (dist(this.position.x, this.position.y, game.collidepoint[i].x+10, game.collidepoint[i].y+15) < 25) {
        if (this.velocity.x > 0) {
          this.position.x-=this.velocity.x*2;
        } else if (this.velocity.x < 0) {
          this.position.x-=this.velocity.x*2;
        }
        this.velocity.x = -this.velocity.x*2;
      }
    }
    }
    else if(option.gamemode===1){
      var postx=this.velocity.x+this.position.x;
      var posty=this.velocity.y+this.position.y;
      if(checkon){
      for(var i=0;i<game.rightpoint.length;i++){
           if(dist(postx,posty,game.rightpoint[i].x+10,game.rightpoint[i].y+15)<25){
           if(this.velocity.x>0){
             this.applyForce(coaljumpForce);
             this.velocity.x=1.5;
             this.jump=true;
           }
        }
      }
      for(var i=0;i<game.leftpoint.length;i++){
           if(dist(postx,posty,game.leftpoint[i].x+10,game.leftpoint[i].y+15)<25){
             if(this.velocity.x<0){
             this.applyForce(coaljumpForce);
              this.velocity.x=-1.5;
              this.jump=true;
           }      
        }     
      }
       for(var i=0;i<game.strongright.length;i++){
           if(dist(postx,posty,game.strongright[i].x+10,game.strongright[i].y+15)<25){
           if(this.velocity.x>0){
             this.applyForce(coaljumpForce);
             this.velocity.x=2.5;
             this.jump=true;
           }
        }
      }
      for(var i=0;i<game.strongleft.length;i++){
           if(dist(postx,posty,game.strongleft[i].x+10,game.strongleft[i].y+15)<25){
             if(this.velocity.x<0){
             this.applyForce(coaljumpForce);
              this.velocity.x=-2.5;
               this.jump=true;
           }      
        }     
      }
      for(var i=0;i<game.stop.length;i++){
        if(dist(postx,posty,game.stop[i].x+10,game.stop[i].y+15)<25){
            this.velocity.x=-this.velocity.x;
        }
       }      
      }
    }      
    }
  if(this.delay){
  if(this.currframe===frameCount-150){
    this.delay=false;
  }
  }
  if(!this.delay){
  if(this.velocity.y===0){
   if(!this.jump){
   if(dist(mainChar.pos.x,mainChar.pos.y,this.position.x,this.position.y)<150){
   if(mainChar.pos.x<this.position.x){
    this.velocity.set(-2,0);
   }
   else{
    this.velocity.set(2,0);
   }
   this.mode=1;
   }
  else{
    this.mode=0;
    if(this.velocity.x<0){
      this.velocity.set(-1,0);
    }
    else{
      this.velocity.set(1,0);
    }
  }    
  }
  }
  }
  }
  }
  avoidarrow(){
  if(option.gamemode===1){
  for(var i=0;i<arrow.length;i++){
    if(arrow[i].shoot===1){
      var postx=this.velocity.x+this.position.x;
      var posty=this.velocity.y+this.position.y;
      if(this.velocity.y===0){
        if(dist(postx,posty,arrow[i].pos.x,arrow[i].pos.y)<30){
              this.applyForce(coaljumpForce);
              this.jump=true;
        }     
      }
      
    }
  }
  }
  }

   
}

var coalball;
