# Project 4 - Hopper

The learning objectives for this project include linear physics and jumping.

With a 400x400 canvas, first create a tilemap that would resemble a staircase, where the player climbs the stairs in two directions (first climbing to the right in the bottom half of the staircase, and climbing to the left in the upper half of the staircase).

- The main player starts at the bottom-left and is controlled with WAD, where W means to jump, while AD is to move left/right.
- Every 2 seconds, a ball will automatically be dropped from the top-left of the canvas.
- Each ball will bounce on the stair as it hits the step on the stair. Physics must apply to the ball.
- There is a slight and constant wind that blows east. That is, the ball will gradually move to the right, as it bounces down the staircase.
- The bounce of the ball will reduce on the same step, but its bounce may increase when it falls to the next lower step.
- When the ball hits the right border of the canvas, it will disappear. So the player will only encounter the balls on the top-half of the staircase.
- The height of the jump should be just enough to climb the stairs and also to jump over the ball. That is, the player should not jump too high, making the game overly easy.
- Every jump must be of the same height, and the player cannot double jump. That is, the player can only jump again after having landed.
- The player wins when the player character reaches the top of the stairs.
- The player loses when a ball hits the player or if the player falls of the stair hitting the bottom border.
- The player character must jump to climb to the next step, but can walk or jump down to the previous step.
- The player character should have different look while jumping. You may also animate walking, if you wish, but not required.
- When the user either wins or loses, the game should ask the user if they wish to play again. If yes, must re-start the game from the beginning.

