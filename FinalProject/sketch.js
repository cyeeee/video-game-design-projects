/* 
  Right now our game is still working. We just have finished the instruction page and game page. In our game page, you need to control the mainchar to avoid or attack the enemy. The enemy will chase and speed up when it is close to the mainchar. The mainchar need to pick up the arrow on the map. When the mainchar have the arrow, they could shoot the arrow to attack the enemy. In easy mode, the mainchar have 5 lifes. When it lose 1 lifes, it will be in the Invincible mode for 3s which means it will not attack by the enemy.When the mainchar lose 5 lifes, the game lose. When the mainchar arrive the final point, the game win. 
  This page is our main file to run.
  Control of Mainchar: [A,←] to move left, [W,↑] to jump, [D,→] to move right and [space] to shoot the arrow
  
  Contribution:
  Npc1.js Dennis Chiu
  control.js Dennis Chiu and Chenyi Wang
  game.js Dennis Chiu
  mainChar.js Chenyi Wang
  startpage.js Dennis Chiu and Chenyi Wang
  optionpage.js Dennis Chiu and Chenyi Wang
  sketch.js Dennis Chiu
  gamestate.js Dennis Chiu and Chenyi Wang
  Npc2.js Dennis Chiu
*/


function preload(){
  maincharpreload();
  startpagepreload();
  gamepreload();
}


function setup() {
  startpagesetup();
  maincharsetup(); 
  gamesetup();
}

function draw() {
  game.state[game.currstate].execute(game);
}