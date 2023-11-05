var redhpImg;
var blackhpImg;
var gamegrass=[];
var gamedirs=[];
var houseImg;
var arrowImg;
function drawhp(){
  if(game.totalhp===5){
  var dis=0;
  for(var i=0;i<game.totalhp-game.currhp;i++){
    image( blackhpImg,660+i*20, 20, 20, 20);  
    dis=i*20+20;
  }
  for(i=0;i<game.currhp;i++){
    image( redhpImg,660+dis+i*20, 20, 20, 20);    
  }    
  }
  else if(game.totalhp===3){
  var dis1=0;
  for(var j=0;j<game.totalhp-game.currhp;j++){
    image( blackhpImg,700+j*20, 20, 20, 20);  
    dis1=j*20+20;
  }
  for(j=0;j<game.currhp;j++){
    image( redhpImg,700+dis1+j*20, 20, 20, 20);     
  }    
    
  }
}
class collideObj{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
  
}


function drawarrow(){
  for(var i=mainChar.arrows;i>0;i--){
    image(arrowImg,750-i*20, 50, 20, 20);      
  }
}

class arrObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.collected = 0;
  }
  
  draw() {
    this.check();
    push();
    translate(this.x, this.y);
    rotate(-PI/4);
    fill(220);
    triangle(0, 0, 8, 3, 0, 6);
    triangle(-4, 1, 3, 3, -4, 5);
    fill(90, 0, 0);
    rect(-25, 2, 20, 2);
    pop();
  }
  
  check() {
    if (dist(this.x-10, this.y-10, mainChar.pos.x, mainChar.pos.y) < 30) {
      if (mainChar.arrows < 5) {
        this.collected = 1;
        mainChar.arrows++;
      }
    }
  }
}


function gamepreload(){
redhpImg=loadImage("hpred.png");
blackhpImg=loadImage("blackhp.png");
npc2preload();
houseImg = loadImage("house.png");
arrowImg=loadImage("arrow.png");
}




function gamesetup(){
  game.gamemapinitial();
  angleMode(RADIANS);
}

function gamedraw(){
  resizeCanvas(800, 400);
  
  background(135,206,235);
  push();
  translate(game.xcor,game.ycor);
  gamecontrol();
  for(var i=0;i<game.clouds.length;i++){
      game.clouds[i].draw();
      game.clouds[i].update();
  }
  game.drawMap();
  if(game.gameOver===0){
  checkFire();
  for(var i=0;i<arrow.length;i++){
  if (arrow[i].shoot === 1) {
    arrow[i].draw();
    arrow[i].out();
  }
  }
 for(var i=0;i<game.coalball.length;i++){
  if (game.coalball[i].death === 0) {
    game.coalball[i].move();
    game.coalball[i].draw();   
    game.coalball[i].checkcollision();
    game.coalball[i].avoidarrow();
  }
  }

  mainChar.draw();
  mainChar.updategame();
  }
  pop();
  drawhp();
  drawarrow();
  
}