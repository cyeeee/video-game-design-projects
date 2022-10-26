# Project 8 - Tropical Fish Aquarium

The learning objectives for this project include side-scrolling, splines, subdivision, particle systems, etc.

This project is on creating a beautiful tropical fish aquarium:

- The size of the canvas is 400x400. But the aquarium is 1500 pixels wide and 400 pixels long.
- The player uses the left and right arrow keys to scroll the screen.
- Use subdivision to draw at least 3 different types of tropical fish. Note that you can create the head, body, colorful patterns on the body, etc. separately with subdivision, and then combine them into a single object.
- The fish tails should be animated.
- You should have 3 schools of fish, each school containing 8 to 12 fish. Each school of fish should swim together, as in a swarming behavior. The swarming behavior is similar to flocking, with periodic cohesion, scatter, etc.
- The size of the each fish should be different (some larger, some smaller). When the fish are moving, some fish may block portions of other fish from view.
- You should have another 10 to 15 individual fish not belonging to any swarm. They can look the same or different from the 3 schools of fish. They just wander around individually.
- Use bezier() to animate seaweeds. The seaweeds should slowly sway. You can use fill() to bezier() as well.
- There should be randomly placed rocks in the aquarium. These rocks can be manually placed if you'd like.
- There should be bubbles blown out of a few rocks periodically, modeled with particle systems. For example, the rock can produce a burst of bubbles once every 2 seconds. 
- The bubbles should start out fast, and then slow down. The size of bubbles should also increase as they bubble up.
