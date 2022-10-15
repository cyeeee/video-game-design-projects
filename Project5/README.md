# Project 5 - NPC Hopper

The learning objectives for this project include linear physics, jumping, and intelligent NPC behavior, which extends the previous project.

With a 400x400 canvas, you would use the same tilemap that resembles a staircase from the previous project. 

- The player only controls the dropping of the balls with the space-bar. The ball drops on the highest step in the stair-case.
- Initially place 3 NPC hoppers at different locations on the staircase.
- Each ball dropped will behave the same as the previous project. That is, it will gradually bounce down the stairs.
- However, you should add polka dots and/or patterns to the ball, and the ball should spin while in air or rolling, but not when it is momentarily touching the step ready to bounce back up.
- There is a slight wind that blows east. That is, the ball will gradually move to the right, as it bounces down the staircase. 
- The bounce of the ball will reduce on the same step, but its bounce may increase when it falls to the next lower step.
- When the ball hits the right border of the canvas, it will disappear. So the NPCs will only encounter the balls on the top-half of the staircase.
- The height of the jump should be just enough to climb the stairs and also to jump over the ball. That is, the NPCs should not jump too high, making the game overly easy.
- Every jump must be of the same height, and no-one can double jump. That is, the NPC can only jump again after having landed.
- The player wins when the all NPC characters have been killed.
- The player loses when any NPC reaches the second highest step in the stair-case.
- Each NPC has knowledge of the staircase (ie., the tilemap), as well as the positions of all the balls
- Each NPC can move left, right, wait, and jump. It can also fall off the stairs and die / disappear. When a ball hits the NPC, the NPC dies and disappears.
- In order to jump over a ball, the ball should be on the same step as the NPC. That is, the NPC should not try to jump over the ball on the next higher step -- as it cannot jump high enough.
- When the user either wins or loses, the game should ask the user if they wish to play again. If yes, must re-start the game from the beginning.
