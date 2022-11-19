import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
kaboom();

// load a sprite "bean" from an image
loadSprite("bean", "https://kaboomjs.com/sprites/apple.png")
// add something to screen
add([
    sprite("bean"),
    pos(80, 40),
])