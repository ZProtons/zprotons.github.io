import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
kaboom();

// load a sprite "bean" from an image
loadSprite("bean", "https://kaboomjs.com/sprites/apple.png")
// add something to screen
add([
    sprite("bean"),
    pos(80, 40),
    scale(3),
    rotate(30),
    color(0, 0, 255),
    
])
// putting together our player character
const bean = add([
    sprite("bean"),
    pos(80, 40),
    area(),
    body(),
])

// .jump() when "space" key is pressed
onKeyPress("space", () => {
    bean.jump()
})
// add platform
add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    solid(),
    color(127, 200, 255),
])
// add tree
add([
    rect(48, 64),
    area(),
    outline(4),
    pos(width(), height() - 48),
    origin("botleft"),
    color(255, 180, 255),
    move(LEFT, 240),
]);
bean.onCollide("tree", () => {
    addKaboom(bean.pos);
    shake();
});