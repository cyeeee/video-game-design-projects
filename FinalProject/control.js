/*
    This file is to create and implement all the gaming control.
*/


function keyPressed() {
  if(game.currstate===1){
  if ((keyCode === UP_ARROW || keyCode === 87)) {
    if(option.currstate===0){
    option.currarrow--;
    if(option.currarrow<0){
      option.currarrow=2;
    }
    }
    else if(option.currstate===1){
    intro.arrow--;  
    if(intro.arrow<0){
      intro.arrow=4;
    }
    }
  }
  if (keyCode === DOWN_ARROW||keyCode===83) {
    if(option.currstate===0){
    option.currarrow++; 
    if(option.currarrow>2){
      option.currarrow=0;
    }
    }
    else if(option.currstate===1){
      intro.arrow++;
      if(intro.arrow>4){
        intro.arrow=0;
      }      
    }
  }
  if (keyCode === 32) {
    if(option.currstate===0){
    option.currstate=option.currarrow+1;
    if(option.currstate===3){
      game.currstate=2;
      option.currstate=0;
      mainChar.initial();
      mainChar.arrows=0;
      walkForce.set(2, 0);
      backForce.set(-2, 0);
      ffrictionforce.set(-0.1, 0);
      bfrictionforce.set(0.1, 0);
      if(option.gamemode===0){
        game.totalhp=5;
        game.currhp=5;
      }
      else{
        game.totalhp=3;
        game.currhp=3;
      }
    }
    if(option.currstate===1){
  //  intromove.refresh();
    }      
    }
    else if(option.currstate===1&&intro.currstate===0){
    intro.currstate=intro.arrow+1;
    introinitMainChar();
    intro.state[intro.currstate].i=0;
    intro.jumpflag=false;
    intro.startshoot=false;
    }
    else if(option.currstate===1&&intro.currstate>0&&intro.stopflag){
    introinitMainChar();
    intro.state[intro.currstate].i=0;
    intro.jumpflag=false;
    intro.stopflag=false;
    intro.startshoot=false;
    }
  }
  if(keyCode===13){
    if(option.currstate===1){
    if(intro.currstate>0&&intro.stopflag){
    intro.currstate=0;
    intro.state[intro.currstate].i=0;
    intro.jumpflag=false;
    intro.stopflag=false;
    intro.startshoot=false;
    mainChar.pos.x=20;
    }
    else if(intro.currstate===0){
      option.currstate=0;
      intro.arrow=0;
      mainChar.pos.x=20;
      intro.state[intro.currstate].i=0;
    }
    }
    else if(option.currstate===2){
      option.currstate=0;
    }
  }
  if (keyCode === RIGHT_ARROW || keyCode === 68) {
      if(option.currstate===2){
      option.gamemode--;
      if(option.gamemode<0){
      option.gamemode=1;
      }
      }
  }
  if (keyCode === LEFT_ARROW || keyCode === 65) {
      if(option.currstate===2){
      option.gamemode++;
      if(option.gamemode>1){
      option.gamemode=0;
      }
      }
  }
  }
  else if(game.currstate===2){
  if (keyCode === 32&& mainChar.jump === 0&&mainChar.arrows>0&&mainChar.shoot===0)   {
    arrow[game.currarrow].applyshoot = 1; 
  //  mainChar.arrows--;
  }
  
  }
  else{
    if(keyCode===32){
      if(game.state[3].winAnim===1||game.state[3].loseAnim===1){     
        game.refresh();
        game.currstate=1;
      }
    }
  }
} 

function gamecontrol(){
  if(game.currstate===2){
    if (keyIsDown(RIGHT_ARROW )||keyIsDown(68)) {
    if(mainChar.velocity.x<3){
    mainChar.force.add(walkForce);
    if (mainChar.jump === 0) {
      mainChar.walk = 1;
      mainChar.stand = 0;
    }
    }
  }
  if (keyIsDown(LEFT_ARROW )||keyIsDown(65)) {
    if(mainChar.velocity.x>-3){
    mainChar.force.add(backForce);
    if (mainChar.jump === 0) {
      mainChar.walk = 1;
      mainChar.stand = 0;
    }
    }
  }
  if ((keyIsDown(UP_ARROW )||keyIsDown(87)) && mainChar.jump === 0) {
    mainChar.force.add(jumpForce);
    mainChar.jump = 1;
    mainChar.walk = 0;
    mainChar.stand = 0;
  }
  }
  
}

function keyReleased() {
    if (keyCode === 32) {
    arrow[game.currarrow].applyshoot = 0; 
    }
    
}