let canvas = document.getElementById("Canvas")

canvas.width = window.innerWidth * 0.95;
canvas.height = window.innerHeight * 0.95;


let lastCanvasWidth;
let lastCanvasHeight;

let differenceCanvasWidth = 0;
let differenceCanvasHeight = 0;

window.addEventListener('resize', function(){
    // console.log ( `exec` );
    // Camera2D.updateResolution (  );
    lastCanvasWidth = canvas.width;
    lastCanvasHeight = canvas.height;

    canvas.width = window.innerWidth * 0.95;
    canvas.height = window.innerHeight * 0.95;

    differenceCanvasWidth = lastCanvasWidth - canvas.width;
    differenceCanvasHeight = lastCanvasHeight - canvas.height;

    if(differenceCanvasWidth < 0)
    {
        differenceCanvasWidth = 0
    }
    if(differenceCanvasHeight < 0)
    {
        differenceCanvasWidth = 0
    }
});

class MikeAnimation
{
    constructor(imageArr, row, column, imageWidth, imageHeight)
    {
        this.Texture = imageArr;

        this.FrameLimitX = row;
        this.FrameLimitY = column;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;


        this.destinationX = 0
        this.positionX = 0;
        this.positionY = 0;
        this.CurrentImageY = 0;
        this.CurrentImageX = 0;
    }
    
    animationReset()
    {
        this.destinationX = 0
        this.positionX = 0;
        this.positionY = 0;
        this.CurrentImageY = 0;
        this.CurrentImageX = 0;
    }
}



BackGround_FirstIdle = new MikeAnimation (images[0], 6, 6, 1600, 900);

YellowPusa_And_BlackPusa_FirstIdle = new MikeAnimation (images[1], 6, 6, 1600, 900);

Furina_FirstIdle = new MikeAnimation (images[2], 6, 6, 1600, 900);





//BREATHING LOOP ANIMATIONS 
Furina_Breathing = new MikeAnimation (images[3], 6, 6, 1600, 900);

const BackGround_Breathing = images[4];

const BlackPusa_Breathing = images[5];

const YellowPusa_Breathing = images[6];





//BASIC ATTACK ANIMATIONS
BackGround_BasicAttack = new MikeAnimation(images[7], 16, 1, 1600, 900);

Furina_BasicAttack = new MikeAnimation(images[8], 16, 1, 1600, 900);

YellowPusa_BasicAttack = new MikeAnimation(images[9], 16, 1, 1600, 900);

BlackPusa_BasicAttack = new MikeAnimation(images[10], 16, 1, 1600, 900);




//SKILL ANIMATIONS
BackGround_Skill = new MikeAnimation(images[11], 16, 1, 1600, 900);

Furina_Skill = new MikeAnimation(images[12], 16, 1, 1600, 900);

YellowPusa_Skill = new MikeAnimation(images[13], 16, 1, 1600, 900);

BlackPusa_Skill = new MikeAnimation(images[14], 16, 1, 1600, 900);




//BLACK PUSA ATTACKING ANIMATIONS
BackGround_BlackPusa = new MikeAnimation(images[15], 7, 1, 1602, 904);

Furina_BlackPusa = new MikeAnimation(images[16], 7, 1, 1602, 904);

YellowPusa_BlackPusa = new MikeAnimation(images[17], 7, 1, 1600, 900);

BlackPusa_BlackPusa = new MikeAnimation(images[18], 7, 1, 1600, 900);




//YELLOW PUSA ATTACKING ANIMATIONS
BackGround_YellowPusa = new MikeAnimation(images[19], 8, 1, 1602, 904);

Furina_YellowPusa = new MikeAnimation(images[20], 8, 1, 1602, 904);

YellowPusa_YellowPusa = new MikeAnimation(images[21], 8, 1, 1600, 900);

BlackPusa_YellowPusa = new MikeAnimation(images[22], 8, 1, 1600, 900);




//BEFORE ULTIMATE
const BackGround_Before = images[23];

const BlackPusa_Before = images[24];

const YellowPusa_Before = images[25];

Furina_Before = new MikeAnimation(images[26], 6, 6, 1600, 900);




//AFTER ULTIMATE
const BlackPusa_After = images[27];

const YellowPusa_After = images[28];

MainAnimation_Before = new MikeAnimation(images[29], 12, 12, 1600, 900);

Explosion_Before = new MikeAnimation(images[30], 6, 6, 1600, 900);

