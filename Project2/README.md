# Project 2 - Simple Game with Tilemap

The learning objectives of this project is about tilemap, translate(), and creation of custom characters.

In this project, the canvas size is 400x400. You are asked to

- Create a tilemap of size 800 x 800. That is, only portion of the magic circle will be shown on the canvas at any given time.
- Place 1 main character, 20 prizes to collect, 10 rocks, and 6 enemies inside the tilemap. The size of each object is 20x20 pixels.
- The prize must be a custom character that you create and stored as an image with get(). The other characters do not need to be stored as images.
- The main character moves with the arrow keys.
- The canvas must scroll with the main character. That is, at any given time, the player can see the main character, and the main character must be at least 100 pixels away from any border inside the canvas.
- You may place visible borders around the game area; that is, at the outer edges of the tilemap. But this is entirely optional.
- The prizes are collected when the main character touches it.
- The enemies wander around, but when they see the main character, they will chase the main character.
- When the enemy catches the main character, the game is over.
- Neither the enemy nor the main character can walk over the rocks. - When bumping into a rock, the object must bounce back a little (not stuck on the rock forever).
- The player wins when all the prizes are collected.
