import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
kaboom();

// load a sprite "bean" from an image
loadSprite("dino", "sprites/dino.jpeg")

// add something to screen
add([
    sprite("dino"),
    pos(80, 40),
])