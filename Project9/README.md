# Project 9 - Chasing in a maze

The learning objectives of this project include graph search algorithms.

The canvas size is 400x400. Using the tilemap shown below, where each tile is 20x20 pixels, and where 'w' indicates a wall block, '+' indicates a pellet, '-' indicates blank space, 'M' indicates the main player character, 'p' indicates freeze-power, and 'E' indicates the enemy character.

- First, design each of these 5 characters (wall, pellet, player character, freeze power, and enemy character). Each character should be at most 20x20 pixels; some could be much smaller, such as the pellet. Position them in the tilemap when the game starts.
- The enemy characters will chase the player at all times at 1 pixel per frame.  You can use the A-Star search to compute the path for each NPC. However, each NPC should only compute its path once every 20 to 30 frames, at the most. Perhaps even less frequent than that.
- Each enemy character should compute the path in a different frame. For example, enemy 1 computes the path in frame 5, enemy 2 in frame 10, enemy 3 in frame 15, etc.
- The player character is controlled with WASD, and the speed of the player is 1.2 pixels per frame.
- When the player character touches a pellet, the pellet will disappear. And the player wins when all pellets are gone.
- When the player character touches the freeze-power, the freeze-power character will disappear and all the enemies will freeze for 5 seconds. That is, the enemies will not chase the player for 5 seconds.
- Neither the player nor the enemy characters can move through the walls.
- When there is no wall at the borders, the player character can wrap around and enter from the other side.
- When any enemy character catches the player, the game is over.
- When the game ends, click anywhere on the screen to play again. Note that the game will start over with all the characters intact at the original positions.

The tilemap is given below:

```sh
wwwwwwwwwww-w-wwwwww
w++++E++p+--w+++-++w
w-wwwww+www-wwwwww+w
w+++++w+++w-+++++w+w
w+wwwwwww+ww--ww-w+w
w+++++-+++wE--Ew+w-w
w-wwwww+w-wwwwww-w+w
--++++++w----p---+--
www-www-ww-wwwww-w-w
w-------ww+++++++w-w
w+w+www-ww+wwwww+w-w
w+w+++w-M--w---w+--w
w+w+w+wwwwww-w+++www
--w+++-+++w--w-w+w--
w-p-www+w-+-ww-w+w+w
wwwww+++wwwww--w+++w
-+++++w-w+++++wwwwE-
w-wwwww-w-wwwwwwww-w
wE++++++++++-++++++w
wwwwwwwwwww-w-wwwwww
```
 
