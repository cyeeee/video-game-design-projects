# Final Project - Elf Ranger

This is the final project of my video game design course.

This project utilized a lot of topics covered in this course, including FSM, action and interaction, motion, background tilemap, NPC AI, etc.

The design of this game was inspired by Super Mario.

It is called elf ranger, and the entire program is implemented based on a finite state machine, which can efficiently switch pages.

All the instructions can be viewed on the options page by selecting the Intro tab. 

There are two modes of the game, easy and hard, and can be switched on the options page. 

- The easy mode is like basic training to help players get familiar with our game. 
- The hard mode is more sophisticated as the enemy has more AI implemented. 

The canvas will be resized to 800x400 during the game. 

The size of the game tilemap is ~4500x400.

The main character will be initialized at the left-most side when the game starts. It will be armed with a bow without arrows, and the player needs to collect along the way and can load up to 5 arrows. 

There are also 5 enemies wandering on the map. Players can kill them by shooting the arrow, but if get caught by any of them, the main character will die. 

The number of chances to die depends on the mode of the game. When the hit points reach 0, the game is over. If the main character arrives at the destination, the right-most of the map, the player wins. 
