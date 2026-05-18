const keysPressed = {};

document.addEventListener('keydown', function(event) {
    keysPressed[event.key.toLowerCase()] = true;
});

document.addEventListener('keyup', function(event) {
    keysPressed[event.key.toLowerCase()] = false;
});

canvas.addEventListener('click', function(event)
{
    FURINA_2D.attack = true;
})

function isKeyPressed(key) {
    return keysPressed[key.toLowerCase()] || false;
}
