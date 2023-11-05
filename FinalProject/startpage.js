/*
  This file set up and construct all the object in the startpage.
  In our start page, we scroll up the curtain. When the curtain finish scrolling up, the title of game drop down from top and stay in a certain position.After that, we shows that our mainchar run and shoot the arrow to attack the enemy. The enemy shows here have two mode. The first mode is wander mode and the second mode is attack mode. When it is in the attack mode, it will transform to a ball which can rotate and speed up to attack the mainchar. When the arrow attack the enemy, it dies. After that, our mainchar will move left till it leave the map. The option screen display.
*/

/*create our startpage background */
var starttilemap = [
"                    ",
"                    ",
"                    ",
"                    ",
"                    ",
"                    ",
"                    ",
"                    ",
"                    ",
"                    ",
"                    ",
"                    ",
"   t              t ",
"                    ",
"                    ",
"                    ",
"gggggggggggggggggggg",
"dddddddddddddddddddd",
"dddddddddddddddddddd",
"dddddddddddddddddddd",];

class optionmoveObj{
  constructor(){
   this.x=500;
   this.y=200;
  }
  draw(){
    push();
    translate(this.x,this.y);
    textSize(20);
    textFont(titlefont);
    fill(255,255,173);
    text('> Intro',0,0);
    text('  Mode:',0,30);
    fill(152,251,152);
    text(' Easy',85,30);
    fill(255,0,0);
    text('  Start',0,60);
    pop();
    }
  update(){
  if(game.currstate===0){
  if(this.x===145){    
  optionbackground();
  game.currstate=1;
  mainChar.stand=1;
  mainChar.walk=0;
  }
  else{
    this.x--;
  }  
  }
  else{
    this.x--;    
  }
  }


}



/*create curtain object */
class curtainObj {
constructor(x, y) {
this.x = x;
this.y = y;
this.end=0;/*the flag when it finished scrolling up */
}
draw() {
push();
translate(this.x,this.y);
image( curtainImg, 0, 0, 400, 400);
pop();
}
  /*scroll up */
update(){
   this.y=this.y-2;
  if(this.y<-402){
    this.end=1;
  }
}
}

/*create the grass object which is the background */
class grassObj{
constructor(x, y) {
this.x = x;
this.y = y;
}
draw() {
push();
translate(this.x,this.y);
image(grassImg, 0, 0, 20, 30);
pop();
}
}

/*create the dirty object which is the background */
class dirObj{
constructor(x, y) {
this.x = x;
this.y = y;
}
draw() {
push();
translate(this.x,this.y);
image(dirImg, 0, 0, 20, 30);
pop();
}
}
class titleObj{
  constructor(){
   this.x=100;
   this.y=0;
   this.end=0;
  }
  draw(){
  fill(255,255,173);
  textSize(50);
  textFont(titlefont);
  text('Elf', this.x+50, this.y-50);
  text('Ranger',this.x,this.y);  
  fill(0);
  textStyle(BOLD);
  textFont("Courier New", 10);
  text("By Dennis Chiu & Chenyi Wang", this.x + 15, this.y + 20);
  }
  update(){
    this.y++;
    if(this.y>140){
      this.end=1;
    }
  }    
}

class cloudObj{
  constructor(x,y){
    this.x=x;
    this.y=y;
 //   this.mode=0;
  }
  draw(){
    push();
    translate(this.x,this.y);
    image(cloudImg,0,0,60,20);
    pop();
  }
  update(){
    if(game.currstate===0){
      if(this.x>400){
        this.x=-80;
      }
      this.x++;
    }
    else if(game.currstate===2){
      if(this.x>4400){
        this.x=-80;      
      }
      this.x++;
    }
  }
  
  
}
class treeObj{
  constructor(x,y){
  this.x=x;
  this.y=y;
  }
  draw(){
  push();
  translate(this.x,this.y);
  image(treeImg,0,0,80,100);
  pop();
  }
}
var movemenu;
var startpullo;
var startshoot;
var trees=[];
var treeImg;
var title;
var titlefont;
var curtainImg;
var curtain;
var dirts = [];
var grass = [];
var grassImg;
var dirImg;
var a; 
var cloudImg;
var clouds=[];
function initstartmap() {
for (var i = 0; i< starttilemap.length; i++) {
for (var j =0; j < starttilemap[i].length; j++) {
switch (starttilemap[i][j]) {
case 'd': dirts.push(new dirObj(j*20, i*20));
break;
case 'g': grass.push(new grassObj(j*20, i*20));
break;
case 't':trees.push(new treeObj(j*20,i*20));
}
}
}
}



function startpage(){
  for(var i=0;i<dirts.length;i++){
    dirts[i].draw();
  }
  for(i=0;i<grass.length;i++){
    grass[i].draw();
  } 
  mainChar.draw();
  curtain.draw();
  curtain.update();
}
function startpagepreload() {
curtainImg = loadImage("curtain.png");
grassImg=loadImage("GrassBlock.png");
dirImg=loadImage("DirtBlock.png");
titlefont= loadFont('titlefont.ttf');
cloudImg=loadImage("cloud.png");
treeImg=loadImage("tree.png");
}
function startpagesetup() {
  createCanvas(400, 400);
  curtain=new curtainObj(0,0);
  title=new titleObj();
  initstartmap() ;
  a=random(1500);
  clouds.push(new cloudObj(0,0));
  clouds.push(new cloudObj(100,50));
  clouds.push(new cloudObj(300,50));
  clouds.push(new cloudObj(50,100)); 
  clouds.push(new cloudObj(250,100));
  clouds.push(new cloudObj(80,150)); 
  coalball=new enemy1Obj(500,315);
  startshoot=false;
  startpullo=false;
  movemenu=new optionmoveObj();
}

function startpagedraw() {
  background(0);
  if(title.end===1){
  background(135,206,235);
  for(var i=0;i<clouds.length;i++){
  clouds[i].draw();
  clouds[i].update();
  }
  for(i=0;i<trees.length;i++){
    trees[i].draw();
  }
  checkFire();
  for(i=0;i<arrow.length;i++){
  if(arrow[i].shoot===1){
    arrow[i].draw();
  }
  }
  coalball.draw();
  coalball.checkcollision();
  coalball.move();
  //mainChar.draw();
  if(!startshoot&&!startpullo){/*if not start to shoot and not start to pull the option menu */
  if(coalball.position.x<400){ 
  if(mainChar.velocity.x<1){
     mainChar.walkForward = 1;
  }
  }
  }
  
  if(startpullo){/*let the mainchar move backward */
  if(mainChar.velocity.x>-1){
     mainChar.walkBackward = 1;
  }    
  }
  mainChar.update();
  if(!startshoot){
  if(mainChar.pos.x>140&&coalball.death===0){/*start shoot */
  arrow[game.currarrow].applyshoot=1;
  mainChar.velocity.set(0,0);
  mainChar.walkForward = 0;
  mainChar.walkBackward = 0;
  startshoot=true;
  }
  }
  if(mainChar.pos.x>420){
    startpullo=true;
  }
  if(coalball.death===1){
    startshoot=false;
  }
  if(startpullo&&mainChar.pos.x<400){
   movemenu.update(); 
  }
  }
  if(curtain.end===1){
  title.draw();
  if(title.end===0){
  title.update();
  coalball.velocity.set(-1,0);
  }    
  }
  mainChar.draw();
  movemenu.draw();
  startpage();
}