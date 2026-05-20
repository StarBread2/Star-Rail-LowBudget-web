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

document.addEventListener('keydown', function(event)
{
    if(event.code === 'Numpad0')
    {
        FURINA_2D_P2.attack = true;
    }
})

function isKeyPressed(key) {
    return keysPressed[key.toLowerCase()] || false;
}
