# Project 3 - Rotations, Automated Avoidance, and FSM-based NPC Behavior

This project extends the previous project, and the learning objectives are (1) rotations, (2) automatic NPC avoidance of obstacles, and (3) FSM-based NPC behavior.

The tilemap is still 800x800 pixels (and the canvas is still 400x400 pixels), but with the following additional instructions:

- Increase the number of rocks to 50, still scattered across the map. The numbers of enemies and prizes are still the same.
- The control for the main character: LEFT and RIGHT-arrows to rotate the main character a small angle. UP and DOWN-arrows to move forward / backward. (You may choose WASD instead of the arrow keys, if you wish). The speed of the player and the enemies should be between 1 and 2 pixels per frame.
- Space bar to fire a missile. The initial angle of the missile will be the same as the main character when it is fired. The speed of the missile should be 5 pixels per frame. The missile will then move in a straight line after it is fired.
- Note that the enemies must face the direction it is moving, like the main player. In other words, the angle of the enemies will rotate accordingly as it moves in the game.
- The enemies should also try to avoid being hit by a missile, but may get hit due to the higher speed of the missile.
- When a missile hits an enemy, the enemy will incur some damage (look different) and the missile will disappear. When a second missile hits a damaged enemy, the enemy will disappear.
- The behavior of the NPC should be modeled as a FSM, with the following 4 states: wander, avoid rock, avoid missile, chase player.
- When a missile hits a rock, both the missile and the rock will disappear.
- The winning and gameover conditions are the same as the previous project.
- The main player should always be visible on the canvas, similar to the previous project.
- You do not need to worry about enemies colliding with one another while chasing the player.
