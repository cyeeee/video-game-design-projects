class gameObj {
  constructor() {
    this.state = [
      new startstate(),
      new optionstate(),
      new gamestate(),
      new endstate(),
    ];
    this.currstate = 0;
    this.currarrow = 0;
    this.prearrow = 0;
    this.arrowcount = 0;
    this.totalhp = 0;
    this.currhp = 0;
    this.xcor = 0;
    this.ycor = 0;
    this.gameOver = 0;
    this.collidepoint = [];
    this.coalball = [];
    this.arrows = [];
    this.clouds = [];
    this.leftpoint = [];
    this.rightpoint = [];
    this.strongleft = [];
    this.strongright = [];
    this.stop = [];
    this.tilemap = [
      "           w                  w                 w            w         w                   w         w             w                 w            w                      w        w                   w           w        w    ",
      " w                                  w                                        w                                           w                                     w                           w                                    ",
      "                   w                       w           w                         w             w         w                    w           w                            w                           w           w       w        ",
      "       w                    w                                     w                                                                             w                                  w                                            ",
      "                                                    w                                      w        w               w           w                         w           w                  w           w       w           w      ",
      "        w       w                w                        w             w                                                                                     t                                                                 ",
      "                                                                                                    t                                                                                                                           ",
      "                                                                                                                                                                        a                                                       ",
      "                                                                                                                                                          Qp     c                                                              ",
      "                                                                                               a   c  p                                 t                 gggggggggggggggggg                                                    ",
      "                                                                          t                       ggggg                              r          Q     Z    bdddddddddddddddbL                                                   ",
      "                                  t      t                              r                        Rbdddb                                         ggggggg          bddddddddddgggggg         t                                    ",
      "   t              t                               Q a Z                                      gggggddddb                         a   c      pZ    ddddd           bdddddddddddddddbL                                             ",
      "r           a                                     ggggg   Q   Z                             Rbddddddddb                            gggggggggg                    bddddddddddddddddgggggg                                        ",
      "S                                      c     pZ   ddddb   ggggg        gggggg           gggggddddddddddggggg             ggggg     bddddddddb                    bdddddddddddddddddddddbL                                       ",
      "p             c      p           gggggggggggggg           ddddb   Q  aRbddddbL     a   RbddddddddddddddddddbL           RbdddbL   Rbddddddddb                    bddddddddddddddddddddddgggggggg                       S        ",
      "ggggggggggggggggggggggg        a bddddddddddddb                   gggggddddddgggggggggggddddddddddddddddddddgggggggggggggdddddgggggdddddddddd                    bdddddddddddddddddddddddddddddb              gggggggggggggggggg",
      "ddddddddddddddddddddddbL        Rbddddddddddddb                   bdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd                    bdddddddddddddddddddddddddddddbL            Rbddddddddddddddddd",
      "ddddddddddddddddddddddbggggggggggdddddddddddddb                   bdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd                    bddddddddddddddddddddddddddddddggggggggggggggdddddddddddddddddd",
      "ddddddddddddddddddddddddddddddddddddddddddddddb                   bdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd                    bdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    ];
    this.trees = [];
    this.dirts = [];
    this.grass = [];
    this.blocks = [];
    this.archive = [];
  }
  gamemapinitial() {
    for (var i = 0; i < this.tilemap.length; i++) {
      for (var j = 0; j < this.tilemap[i].length; j++) {
        switch (this.tilemap[i][j]) {
          case "d":
            this.dirts.push(new dirObj(j * 20, i * 20));
            break;
          case "b":
            this.blocks.push(new dirObj(j * 20, i * 20));
            break;
          case "g":
            this.grass.push(new grassObj(j * 20, i * 20));
            break;
          case "t":
            this.trees.push(new treeObj(j * 20, i * 20));
            break;
          case "a":
            this.arrows.push(new arrObj(j * 20, i * 20));
            break;
          case "p":
            this.collidepoint.push(new collideObj(j * 20, i * 20));
            break;
          case "c":
            this.coalball.push(new enemy1Obj(j * 20 + 10, i * 20 + 10));
            break;
          case "w":
            this.clouds.push(new cloudObj(j * 20 + 10, i * 20 + 10));
            break;
          case "r":
            this.archive.push(new p5.Vector(j * 20, i * 20));
            break;
          case "R":
            this.rightpoint.push(new p5.Vector(j * 20, i * 20));
            break;
          case "L":
            this.leftpoint.push(new p5.Vector(j * 20, i * 20));
            break;
          case "Z":
            this.strongright.push(new p5.Vector(j * 20, i * 20));
            break;
          case "Q":
            this.strongleft.push(new p5.Vector(j * 20, i * 20));
            break;
          case "S":
            this.stop.push(new p5.Vector(j * 20, i * 20));
            break;
        }
      }
    }
    for (var i = 0; i < coalball.length; i++) {
      this.coalball[i].velocity.set(random(-1, 1));
    }
  }
  drawMap() {
    for (i = 0; i < this.trees.length; i++) {
      this.trees[i].draw();
    }
    for (var i = 0; i < this.dirts.length; i++) {
      this.dirts[i].draw();
    }
    for (i = 0; i < this.grass.length; i++) {
      this.grass[i].draw();
    }
    for (var i = 0; i < this.blocks.length; i++) {
      this.blocks[i].draw();
    }
    image(houseImg, 4340, 160, 120, 200);
    for (i = 0; i < this.arrows.length; i++) {
      if (this.arrows[i].collected === 0) {
        this.arrows[i].draw();
      }
    }
    if (this.currhp > 0 && mainChar.pos.x > 150 && mainChar.pos.x < 3820) {
      this.xcor -= mainChar.velocity.x;
    }
  }
  refresh(){
    for(var i=0;i<this.coalball.length;i++){
      this.coalball[i].position.x=this.coalball[i].oripos.x;
      this.coalball[i].position.y=this.coalball[i].oripos.y; 
      this.coalball[i].velocity.y=0;
      this.coalball[i].jump=false;
      this.coalball[i].delay=false;
      this.coalball[i].aAcc=0;
      this.coalball[i].aVelocityc=0;
      this.coalball[i].angle=0;
      this.coalball[i].death=0;    
      this.coalball[i].mode=0;
    }   
    this.state[3].refresh();
    for(var i=0;i<this.arrows.length;i++){
         this.arrows[i].collected = 0;
    }
    option.gamemode=0;
    this.gameOver=0;
    this.totalhp = 0;
    this.currhp = 0;
    this.xcor = 0;
    this.ycor = 0;
    this.arrowcount = 0;
    mainChar.initial();
    option.currarrow=0;
    option.currstate=0;
    for(var i=0;i<arrow.length;i++){
      arrow[i].shoot=0;
      arrow[i].angle = 0;
    }
    resizeCanvas(400, 400);
  }
}

class startstate {
  constructor() {}
  execute(me) {
    startpagedraw();
  }
}

class optionstate {
  constructor() {}
  execute(me) {
    optionbackground();
  }
}

class gamestate {
  constructor() {}
  execute(me) {
    gamedraw();
    if (game.gameOver === 1) {
      game.currstate++;
    } else if (game.gameOver === 0 && mainChar.pos.x >= 4370) {
      game.currstate++;
    }
  }
}

class endstate {
  constructor() {
    this.winAnim = 0;
    this.winFontSize = 40;
    this.winFontOpa = 0;
    this.winFontX = 300;
    this.loseAnim = 0;
    this.loseFontOpa = 0;
    this.loseDie = 0;
    this.loseStart = 0;
    this.currF = 0;
  }
  execute(me) {
    if (game.gameOver === 0) {
    //   background(0);
      fill(255, 255, 173, this.winFontOpa);
      textSize(this.winFontSize);
      textFont(titlefont);
      text("You Win !", this.winFontX, 200);
      if (this.winFontOpa < 255) {
        this.winFontOpa += 0.5;
      }
      if (this.winFontSize < 70) {
        this.winFontSize++;
        this.winFontX -= 3;
      } else {
        //image(mainCharStand, 340, 220, 100, 100);
        textSize(20);
        text("Press space to return option page !", this.winFontX, 300);
        this.winAnim = 1;
      }
    } else if (game.gameOver === 1) {
      if (this.loseStart === 0) {
        this.currF = frameCount;
        this.loseStart = 1;
      }
      background(0);

      if (frameCount < this.currF + 50) {
        image(mainCharDie0, 340, 220, 100, 100);
      } else if (frameCount < this.currF + 100) {
        image(mainCharDie1, 350, 220, 105, 105);
      } else {
        image(mainCharDie2, 360, 220, 110, 110);
        this.loseDie = 1;
      }

      if (this.loseDie === 1) {
        if (this.loseFontOpa < 255) {
          this.loseFontOpa += 2;
        }
        else if (this.loseFontOpa > 200) {
          this.loseAnim = 1;
        }
        fill(255, this.loseFontOpa);
        textFont(titlefont, 60);
        text("Game OVer", 200, 200);
        textSize(20);
        text("Press space to return option page !", 150, 350);
      }
    }
    walkForce.set(0.2, 0);
    backForce.set(-0.2, 0);
    ffrictionforce.set(-0.01, 0);
    bfrictionforce.set(0.01, 0);
  }
  refresh(){
    this.winAnim = 0;
    this.winFontSize = 40;
    this.winFontOpa = 0;
    this.winFontX = 300;
    this.loseAnim = 0;
    this.loseFontOpa = 0;
    this.loseDie = 0;
    this.loseStart = 0;
    this.currF = 0;
  }
}

var game = new gameObj();
