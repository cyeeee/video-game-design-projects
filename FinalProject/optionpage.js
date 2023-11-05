/*
  This  page is to construct all the classes which we used in the option page and implement it in the option page.For our option page, we construct the option object, the intro object, and the level of mode obj.

*/


/*create a menu object with animation */
class menuObj{
  constructor(){
    this.x=145;
    this.y=200;
    this.i=0;
  }
  draw(){
    push();
    translate(this.x,this.y);
    textSize(20);
    textFont(titlefont);
    fill(255,255,173);
    if(option.currarrow===0){
      text('> Intro',0,0);
      text('  Mode:',0,30);
      if(option.gamemode===0){
      fill(152,251,152);
      text(' Easy',85,30);
    }
    else{
      fill(255,0,0);
      text('  Hard',85,30);        
    }
    fill(255,0,0);
    text('  Start',0,60);
    }
    else if(option.currarrow===1){
    text('  Intro',0,0);
    text('> Mode:',0,30);
    if(option.gamemode===0){
      fill(152,251,152);
      text('  Easy',85,30);
    }
    else{
      fill(255,0,0);
      text('  Hard',85,30);        
    }
    fill(255,0,0);
    text('  Start',0,60);
    }
    else {
    text('  Intro',0,0);
    text('  Mode:',0,30);
    if(option.gamemode===0){
      fill(152,251,152);
      text(' Easy',85,30);
    }
    else{
      fill(255,0,0);
      text('  Hard',85,30);        
    }
    fill(255,0,0);
    text('> Start',0,60);
    }
    /*make the text shining */
    if(this.x===145){
      if(this.i%10!=0){
      if(option.currstate===2){
      fill(0);
      textFont("Georgia", 12);
      textStyle(BOLD);
      text("Use [←，→] or [A,D] to change the mode", -10, 80);  
      text("Use [Enter] to unlock", 0, 100);             
      }
      else{
      fill(0);
      textFont("Georgia", 12);
      textStyle(BOLD);
      text("Use [↑，↓] or [W,S] to navigate", -10, 80);  
      text("Use [Space] to select", 0, 100);  
      }
      }
      this.i++;
    }    
    
    pop();    
  }
  update(){
    if(option.currstate!=0){
      this.x--;
    }
    if(option.currstate===0&&this.x>145){
      this.x--;
    }    
  }
  refresh(){
    this.x=400;
  }
}



/*create a option obj which could let it animate */
class optionObj{
  constructor(){
    this.currstate=0;
    this.state=[new basicstate(),new introstate(),new modestate()];
    this.currarrow=0;
    this.gamemode=0;
  }
  initial(){
    this.currarrow=0; 
    this.currstate=0;
  }
}

/*this is the option menu state  */
class basicstate{
  constructor(){
    
  }
  execute(me){
      background(135,206,235);
      for(var i=0;i<clouds.length;i++){
      clouds[i].draw();
      clouds[i].update();
      }
      for(i=0;i<trees.length;i++){
      trees[i].draw();
      }
      title.draw();
      startpage();
      optionmenu.draw();
      optionmenu.update();
  }
}

/*this is the introduction state */
class introstate{
  constructor(){

  }
  execute(me){
    background(135,206,235);
    for(var i=0;i<clouds.length;i++){
      clouds[i].draw();
      clouds[i].update();
    }
    for(i=0;i<trees.length;i++){
      trees[i].draw();
    }
  for( i=0;i<dirts.length;i++){
    dirts[i].draw();
  }
  for(i=0;i<grass.length;i++){
    grass[i].draw();
  } 
  intro.state[intro.currstate].execute();
  mainChar.draw();
  }
      
}
/*this is the mode state which can switch the level of the game */
class modestate{
  constructor(){
    
  }
  execute(me){
      background(135,206,235);
      for(var i=0;i<clouds.length;i++){
      clouds[i].draw();
      clouds[i].update();
      }
      for(i=0;i<trees.length;i++){
      trees[i].draw();
      }
      title.draw();
      startpage();
      optionmenu.draw();
    
  }
  
  
  
  
}

var option=new optionObj();
//var intromove=new introObj();
var optionmenu=new menuObj();

/*this method is to generate the option screen */
function optionbackground(){
    option.state[option.currstate].execute(option);
    
}