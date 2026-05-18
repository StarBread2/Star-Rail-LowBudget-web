const spritesheetImgs = [
    /* 0 */     "SpriteSheet For Game (Updatedyawa)\\First Loop Animation\\BackGround\\3-35.png",                                                           
    /* 1 */     "SpriteSheet For Game (Updatedyawa)\\First Loop Animation\\Enemy Animation\\3-35.png",
    /* 2 */     `SpriteSheet For Game (Updatedyawa)\\First Loop Animation\\Character Animation\\3-35.png`,

    /* 3 */     `SpriteSheet For Game (Updatedyawa)\\Breathing Loop Animation\\Character Animation\\20-50.png`,
    /* 4 */     `SpriteSheet For Game (Updatedyawa)\\Breathing Loop Animation\\BackGround\\20-50 still.png`,
    /* 5 */     `SpriteSheet For Game (Updatedyawa)\\Breathing Loop Animation\\Enemy Animation\\20-50 Black.png`,
    /* 6 */     `SpriteSheet For Game (Updatedyawa)\\Breathing Loop Animation\\Enemy Animation\\20-50 Yellow.png`,

    /* 7 */     `SpriteSheet For Game (Updatedyawa)\\Basic Attack Animation\\BackGround\\55-70.png`,
    /* 8 */     `SpriteSheet For Game (Updatedyawa)\\Basic Attack Animation\\Character Animation\\55-70.png`,
    /* 9 */     `SpriteSheet For Game (Updatedyawa)\\Basic Attack Animation\\Enemy Animation\\55-70 Yellow Pusa.png`,
    /* 10 */    `SpriteSheet For Game (Updatedyawa)\\Basic Attack Animation\\Enemy Animation\\55-70 Black Pusa.png`,

    /* 11 */    `SpriteSheet For Game (Updatedyawa)\\Skill Animation\\BackGround\\55-70.png`,
    /* 12 */    `SpriteSheet For Game (Updatedyawa)\\Skill Animation\\Character Animation 55-70\\55-70.png`,
    /* 13 */    `SpriteSheet For Game (Updatedyawa)\\Skill Animation\\Enemy Animation\\55-70 Yellow.png`,
    /* 14 */    `SpriteSheet For Game (Updatedyawa)\\Skill Animation\\Enemy Animation\\55-70 Black.png`,

    /* 15 */    `SpriteSheet For Game (Updatedyawa)\\Pusa Attacking\\Black Pusa\\Background\\54-60.png`,
    /* 16 */    `SpriteSheet For Game (Updatedyawa)\\Pusa Attacking\\Black Pusa\\Character Animation 54-60\\54-60.png`,
    /* 17 */    `SpriteSheet For Game (Updatedyawa)\\Pusa Attacking\\Black Pusa\\Enemy Animation\\54-60 Yellow.png`,
    /* 18 */    `SpriteSheet For Game (Updatedyawa)\\Pusa Attacking\\Black Pusa\\Enemy Animation\\54-60 Black.png`,

    /* 19 */    `SpriteSheet For Game (Updatedyawa)\\Pusa Attacking\\Yellow Pusa\\Background\\40-47.png`,
    /* 20 */    `SpriteSheet For Game (Updatedyawa)\\Pusa Attacking\\Yellow Pusa\\Character Animation\\40-47.png`,
    /* 21 */    `SpriteSheet For Game (Updatedyawa)\\Pusa Attacking\\Yellow Pusa\\Enemy Animation\\40-47 Yellow.png`,
    /* 22 */    `SpriteSheet For Game (Updatedyawa)\\Pusa Attacking\\Yellow Pusa\\Enemy Animation\\40-47 Black.png`,

    /* 23 */    `SpriteSheet For Game (Updatedyawa)\\Ultimate Animations\\Before (Choosing Enemy)\\Background 20-50\\20-50.png`,
    /* 24 */    `SpriteSheet For Game (Updatedyawa)\\Ultimate Animations\\Before (Choosing Enemy)\\Enemy Animation 20-50\\Black Pusa Still.png`,
    /* 25 */    `SpriteSheet For Game (Updatedyawa)\\Ultimate Animations\\Before (Choosing Enemy)\\Enemy Animation 20-50\\Yellow Pusa Still.png`,
    /* 26 */    `SpriteSheet For Game (Updatedyawa)\\Ultimate Animations\\Before (Choosing Enemy)\\Character Animation\\20-50.png`,

    /* 27 */    `SpriteSheet For Game (Updatedyawa)\\Ultimate Animations\\After (Actual Ultimate Animation) 42-183\\Black Cat 153-183.png`,
    /* 28 */    `SpriteSheet For Game (Updatedyawa)\\Ultimate Animations\\After (Actual Ultimate Animation) 42-183\\Yellow Cat 153-183.png`,
    /* 29 */    `SpriteSheet For Game (Updatedyawa)\\Ultimate Animations\\After (Actual Ultimate Animation) 42-183\\Start Base\\Frame 42-183.png`,
    /* 30 */    `SpriteSheet For Game (Updatedyawa)\\Ultimate Animations\\After (Actual Ultimate Animation) 42-183\\Explosion\\153-183.png`,

    /* 31 */    `SpriteSheet For Game (Updatedyawa)\\NEW IMAGES\\Packed Image 3.png`,
    /* 32 */    `SpriteSheet For Game (Updatedyawa)\\NEW IMAGES\\Packed Image 2.png`,

    //Open World
    /* 33 */    `Open World Files\\Open World Sprites\\Open World Spritesheet.png`,
];

const images = [];

function preloadImages(localImages) {
    return new Promise((resolve, reject) => 
    {
        let loadedCount = 0;
        
        localImages.forEach(url => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                if (loadedCount === localImages.length) {
                    resolve(images);
                }
            };
            img.onerror = () => {
                reject(new Error(`Failed to load image ${url}`));
            };
            img.src = url;
            images.push(img);
        });
    });
}

let allImagePreloaded = false
preloadImages(spritesheetImgs)
    .then(images => {
        console.log("All images preloaded:", images);
        // drawAllImages(images)
    })
    .catch(error => {
        console.error("Error preloading images:", error);
    });


function drawAllImages(imgArray)
{
    for(let i=0; i<imgArray.length; i++)
    {
        ctx.drawImage(imgArray[i],0,0);
        console.log(`Image ${i}: Loaded`);
    }   
    console.log(`All Images Loaded!!`);
    allImagePreloaded = true
    // animate();
    // animateUI();
}