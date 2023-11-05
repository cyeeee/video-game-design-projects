/* 
  This page create and implement all introduction animation and state in it.

*/


class introObj{
  constructor(){
    this.state=[new intromenustate(),new leftstate(),new rightstate(),new jumpstate(),new shootstate(),new conditionstate()];
    this.currstate=0;
    this.arrow=0;
    this.jumpflag=false;
    this.stopflag=false;
    this.startshoot=false;
  }    
  
}

class intromenustate{
  constructor(){
    this.x=145;
    this.y=200;
    this.i=0;
  }
  execute(){
   title.draw();
    push();
    translate(this.x,this.y);
    textSize(15);
    textFont("Georgia");
    fill(255);
    if(intro.arrow===0){
      text('> Moveright(Demo)',0,0);
      text('  Moveleft(Demo)',0,30);
      text('  Jump(Demo)',0,60);
      text('  Shoot(Demo)',0,90);
      text('  Rule(Text)',0,120);
    }
    else if(intro.arrow===1){
      text('  Moveright(Demo)',0,0);
      text('> Moveleft(Demo)',0,30);
      text('  Jump(Demo)',0,60);
      text('  Shoot(Demo)',0,90);
      text('  Rule(Text)',0,120);         
    }
    else if(intro.arrow===2){
      text('  Moveright(Demo)',0,0);
      text('  Moveleft(Demo)',0,30);
      text('> Jump(Demo)',0,60);
      text('  Shoot(Demo)',0,90);
      text('  Rule(Text)',0,120);         
    }
    else if(intro.arrow===3){
      text('  Moveright(Demo)',0,0);
      text('  Moveleft(Demo)',0,30);
      text('  Jump(Demo)',0,60);
      text('> Shoot(Demo)',0,90);
      text('  Rule(Text)',0,120);         
    }
    else if(intro.arrow===4){
      text('  Moveright(Demo)',0,0);
      text('  Moveleft(Demo)',0,30);
      text('  Jump(Demo)',0,60);
      text('  Shoot(Demo)',0,90);
      text('> Rule(Text)',0,120);         
    }
      if(this.i%10!=0){
      fill(0);
      textStyle(BOLD);   
      text("Use [↑，↓] or [W,S] to navigate", -40, 140);  
      text("Use [Space] to select", -15, 160); 
      text("Use [Enter] to return", -15, 180);        
      }
      this.i++;
    pop(); 
  }
}

class leftstate{
  constructor(){
    this.i=0;
  }
  execute(){
    if(this.i>30){
      moveForwardAnim();   
    }
    else{
    textSize(15);
    textFont("Georgia");
    textStyle(BOLD); 
    fill(255,0,0);
    text('Press [D] or [→] to move right', 90,150);
    }
    this.i++;
    
  }
  
}

class rightstate{
  constructor(){
    this.i=0;
  }
  execute(){
    if(this.i>30){
     moveBackwardAnim();
    }
    else{
    textSize(15);
    textFont("Georgia");
    textStyle(BOLD); 
    fill(255,0,0);
    text('Press [A] or [←] to move left', 90,150);
    }
    this.i++;
  }
}



class jumpstate{
  constructor(){
  this.i=0;
  
  }
  execute(){
    if(this.i>30){
      jumpAnim();
    }
    else{
    textSize(15);
    textFont("Georgia");
    textStyle(BOLD); 
    fill(255,0,0);
    text('Press [W] or [↑] to move jump', 90,150);
    }
    this.i++;  
  }
}


class shootstate{
  constructor(){
    this.i=0;
  }
  execute(){
    if(this.i>30){
      shootanimate();
    }
    else{
    textSize(15);
    textFont("Georgia");
    textStyle(BOLD); 
    fill(255,0,0);
    text('Press [Space] to shoot the arrow', 90,150);
    }
    this.i++;  
  }
}

class conditionstate{
  constructor(){
      this.x=30;
      this.y=50;
      this.i=0; 
  }
  execute(){
    push();
    translate(this.x,this.y);
    fill(255,255,173);
    textFont("Georgia", 15);
    textStyle(BOLD);
    text("Elf (Main Char):", 0, 0);
    textStyle(NORMAL);
    text("Win:  Reach the end of the map", 25, 15);
    text("Lose: HP = 0", 25, 30);
    text("HP-1: Caught by a CoalBall or fall off the cliff", 25, 45)
    text("*Collect arrows in the map (Max 5 to load)", 25, 60);
    textStyle(BOLD);
    text("CoalBall (Enemy NPC):", 0, 85);
    textStyle(NORMAL);
    text("Normal: Wander on the map", 25, 100);
    text("Attack:   Transform and chase when near it", 25, 115);
    text("Death:    Disappears after being hit by arrow", 25,130);
    /*make the text shining */
    if(this.i%10!=0){
      fill(0);
      textStyle(BOLD);   
      text("Use [Enter] to return", 35, 300);     
    }
      this.i++;
    pop(); 
    intro.stopflag=true;
  }
}

var intro=new introObj();


