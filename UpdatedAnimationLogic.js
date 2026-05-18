function UpdatedAnimation_smol(TEX1, multiplier1, multiplier2, changeImageSize, imageWidth, imageHeight) //FOR OPACITY
{
    if(!changeImageSize)
    {
        imageWidth = 0;
        imageHeight = 0;
    }

    let previousAlpha = ctx.globalAlpha
    ctx.globalAlpha = TEX1.CURRENTOPACITY

    ctx.drawImage(TEX1.Texture, 
        TEX1.textureLocX,
        TEX1.textureLocY,
        TEX1.imageWidth - (canvas.width * imageWidth),
        TEX1.imageHeight - (canvas.height * imageHeight),
        TEX1.LOCATIONX,
        TEX1.LOCATIONY,
        canvas.width * multiplier1, canvas.height * multiplier2);

    ctx.globalAlpha = previousAlpha
}

class Updated_MikeAnimation_1Frame
{
    constructor(TextureLocation, textureLocX, textureLocY, imageWidth, imageHeight, switchTime, loop2State, loopForeverInside)
    {
        this.Texture = new Image();
        this.Texture.src = TextureLocation;

        this.textureLocX = textureLocX;
        this.textureLocY = textureLocY;

        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;

        //location on canvas
        this.LOCATIONX = 0;
        this.LOCATIONY = 0; // canvas.width * 1.9 for hide position

        this.totalTime = 0;
        this.switchTime = switchTime

        //for easeIN
        this.currentX = this.LOCATIONX;
        this.currentY = this.LOCATIONY;
        this.elapsed = 0;

        if(loop2State)
        {
            this.elapsed2 = 0;
        }

        if(loopForeverInside)
        {
            this.gotoLoop1 = true;
            this.gotoLoop2 = false;
        }

        //for opacity
        this.CURRENTOPACITY = 1
        this.currentOpactity = this.CURRENTOPACITY;
    }

    drawAnimation_oten(sizeMultiplierX, sizeMultiplierY) //FOR OPACITY ambot ngano ina-ana ang ngalan
    {
        UpdatedAnimation_smol(this, sizeMultiplierX, sizeMultiplierY)
    }

    changeLocationX_and_Y(X, Y)//APIL OPACITY
    {
        this.LOCATIONX = canvas.width * X;
        this.LOCATIONY = canvas.height * Y;
    }

    goToImmediately(LocX, LocY)
    {
        this.LOCATIONX = LocX;
        this.LOCATIONY = LocY;

        this.currentX = this.LOCATIONX;
        this.currentY = this.LOCATIONY;

        this.resetValueAnim()
    }

    //elapsed, duration (sa animation), lastPosition where ni start ang animation , wheretogo(location) - currentlocation
    ease_In(elapsed, duration, lastPos, distancePassed) //dapat gamay ra na location
    {
        let temp = (elapsed = elapsed /duration) * elapsed * elapsed
        return lastPos + distancePassed * temp
    }

    ease_Out_Circular(elapsed, duration, lastPos, distancePassed)
    {
        let temp = distancePassed * Math.sqrt(1 - (elapsed = elapsed / duration - 1) * elapsed) + lastPos
        return temp
    }

    resetValueAnim()
    {
        this.CURRENTOPACITY = 1
        this.currentOpactity = this.CURRENTOPACITY;

        this.currentX = this.LOCATIONX;
        this.currentY = this.LOCATIONY;

        this.elapsed = 0;
        this.elapsed2 = 0;

        this.totalTime = 0

    }


    ANIMATE_EASING_FUNC(DELTATIME, easingFunction, duration, endLocY, endLocX, returnABool, changeOpacity, duration2, targetOpacity)
    {
        if(this.elapsed <= duration)
        {
            this.totalTime += DELTATIME
            if(this.totalTime >= this.switchTime)
            {
                //LOCATION
                switch(easingFunction)
                {
                    case 0:
                        this.LOCATIONY = this.ease_In(this.elapsed, duration, this.currentY, endLocY - this.currentY)
                        this.LOCATIONX = this.ease_In(this.elapsed, duration, this.currentX, endLocX - this.currentX)
                        break;

                    case 1:
                        this.LOCATIONY = this.ease_Out_Circular(this.elapsed, duration, this.currentY, endLocY - this.currentY)
                        this.LOCATIONX = this.ease_Out_Circular(this.elapsed, duration, this.currentX, endLocX - this.currentX)
                        break;

                    default:
                        console.log(`ONLY INPUT NUMBERS ON WHAT EASINGFUNCTION ANIMATE FUNCTION`)
                        break;
                }
                console.log(`LOCATIONX:${this.LOCATIONX}`);

                if(this.elapsed <= duration2)
                {
                    //OPACITY
                    if(changeOpacity)
                    {
                        this.CURRENTOPACITY = this.ease_In(this.elapsed, duration2, this.currentOpactity, targetOpacity - this.currentOpactity)
                        //console.log(`CURRENTOPACITY:${this.CURRENTOPACITY}`);
                    }
                }
            }

            this.totalTime -= this.switchTime
            this.elapsed += DELTATIME
            
            if(returnABool == true)
            {
                if(this.elapsed >= duration)
                {
                    this.resetValueAnim()
                    return true
                }
                else
                {
                    return false
                }
            }
        }
    }

    ANIMATE_2STATE_FUNC(DELTATIME ,ifTrueorFalse, locX_s1, locY_s1, sizeX_s1, sizeY_s1, imageWidth_s1, imageHeight_s1,
                        locX_s2, locY_s2, sizeX_s2, sizeY_s2, imageWidth_s2, imageHeight_s2, duration)
    {
        if(ifTrueorFalse)
        {
            let canMove = true

            this.elapsed += DELTATIME;
            if(this.elapsed >= duration)
            {
                canMove = false;
            }

            if(canMove)
            {
                if(this.elapsed <= duration)
                {
                    this.totalTime += DELTATIME
                    if(this.totalTime >= this.switchTime)
                    {
                        let locXCalculations = this.ease_Out_Circular(this.elapsed, duration, locX_s2, locX_s1 - locX_s2)
                        let locYCalculations = this.ease_Out_Circular(this.elapsed, duration, locY_s2, locY_s1 - locY_s2)
                        let imgHeightCalc = this.ease_Out_Circular(this.elapsed, duration, imageWidth_s2, imageWidth_s1 - imageWidth_s2)
                        let sizeXCalculations = this.ease_Out_Circular(this.elapsed, duration, sizeX_s2, sizeX_s1 - sizeX_s2)
                        let sizeYCalculations = this.ease_Out_Circular(this.elapsed, duration, sizeY_s2, sizeY_s1 - sizeY_s2)
                        //let imgWidthCalc = this.ease_Out_Circular(this.elapsed, duration, imageWidth_s2, imageWidth_s1 - imageWidth_s2)

                        this.LOCATIONX = canvas.width * locXCalculations;
                        this.LOCATIONY = canvas.height * locYCalculations;

                        UpdatedAnimation_smol(this, sizeXCalculations, sizeYCalculations, true, imageWidth_s1, imgHeightCalc)
                        this.totalTime -= this.switchTime 
                    }
                } 
            }
            else
            {
                this.LOCATIONX = canvas.width * locX_s1;
                this.LOCATIONY = canvas.height * locY_s1;

                UpdatedAnimation_smol(this, sizeX_s1, sizeY_s1, true, imageWidth_s1, imageHeight_s1)
            }
        }
        else
        {
            this.elapsed = 0;
            this.LOCATIONX = canvas.width * locX_s2;
            this.LOCATIONY = canvas.height * locY_s2;

            UpdatedAnimation_smol(this, sizeX_s2, sizeY_s2, true, imageWidth_s2, imageHeight_s2)
        }
        


    }  

    ANIMATE_2STATE_FUNC_LOOP(DELTATIME ,ifTrueorFalse, locX_s1, locY_s1, sizeX_s1, sizeY_s1, imageWidth_s1, imageHeight_s1,
        locX_s2, locY_s2, sizeX_s2, sizeY_s2, imageWidth_s2, imageHeight_s2, duration)
    {
        if(ifTrueorFalse)
        {
            this.elapsed2 = 0;

            let canMove = true

            this.elapsed += DELTATIME;

            if(this.elapsed >= duration)
            {
                canMove = false;
            }

            if(canMove)
            {
                if(this.elapsed <= duration)
                {
                    this.totalTime += DELTATIME
                    if(this.totalTime >= this.switchTime)
                    {
                        let locXCalculations = this.ease_Out_Circular(this.elapsed, duration, locX_s2, locX_s1 - locX_s2)
                        let locYCalculations = this.ease_Out_Circular(this.elapsed, duration, locY_s2, locY_s1 - locY_s2)
                        let imgHeightCalc = this.ease_Out_Circular(this.elapsed, duration, imageWidth_s2, imageWidth_s1 - imageWidth_s2)
                        let sizeXCalculations = this.ease_Out_Circular(this.elapsed, duration, sizeX_s2, sizeX_s1 - sizeX_s2)
                        let sizeYCalculations = this.ease_Out_Circular(this.elapsed, duration, sizeY_s2, sizeY_s1 - sizeY_s2)
                        //let imgWidthCalc = this.ease_Out_Circular(this.elapsed, duration, imageWidth_s2, imageWidth_s1 - imageWidth_s2)

                        this.LOCATIONX = canvas.width * locXCalculations;
                        this.LOCATIONY = canvas.height * locYCalculations;

                        UpdatedAnimation_smol(this, sizeXCalculations, sizeYCalculations, true, imageWidth_s1, imgHeightCalc)
                        this.totalTime -= this.switchTime 
                    }
                } 
            }
            else
            {
                this.LOCATIONX = canvas.width * locX_s1;
                this.LOCATIONY = canvas.height * locY_s1;

                UpdatedAnimation_smol(this, sizeX_s1, sizeY_s1, true, imageWidth_s1, imageHeight_s1)
            }
        }
        else
        {
            this.elapsed = 0;

            let canMove = true

            this.elapsed2 += DELTATIME;
            if(this.elapsed2 >= duration)
            {
                canMove = false;
            }
            if(canMove)
            {
                if(this.elapsed2 <= duration)
                {
                    this.totalTime += DELTATIME
                    if(this.totalTime >= this.switchTime)
                    {
                        let locXCalculations = this.ease_Out_Circular(this.elapsed2, duration, locX_s1, locX_s2 - locX_s1)
                        let locYCalculations = this.ease_Out_Circular(this.elapsed2, duration, locY_s1, locY_s2 - locY_s1)
                        let imgHeightCalc = this.ease_Out_Circular(this.elapsed2, duration, imageWidth_s1, imageWidth_s2 - imageWidth_s1)
                        let sizeXCalculations = this.ease_Out_Circular(this.elapsed2, duration, sizeX_s1, sizeX_s2 - sizeX_s1)
                        let sizeYCalculations = this.ease_Out_Circular(this.elapsed2, duration, sizeY_s1, sizeY_s2 - sizeY_s1)
                        //let imgWidthCalc = this.ease_Out_Circular(this.elapsed2, duration, imageWidth_s2, imageWidth_s1 - imageWidth_s2)

                        this.LOCATIONX = canvas.width * locXCalculations;
                        this.LOCATIONY = canvas.height * locYCalculations;

                        UpdatedAnimation_smol(this, sizeXCalculations, sizeYCalculations, true, imageWidth_s1, imgHeightCalc)
                        this.totalTime -= this.switchTime 
                    }
                } 
            }
            else
            {
                this.LOCATIONX = canvas.width * locX_s2;
                this.LOCATIONY = canvas.height * locY_s2;

                UpdatedAnimation_smol(this, sizeX_s2, sizeY_s2, true, imageWidth_s2, imageHeight_s2)
            }

        }
    }

    ANIMATE_2STATE_FUNC_LOOP_OPACITY(DELTATIME, duration, targetOpacityStart, targetOpacityEnd)//forever loop kapoy
    {
        if(this.gotoLoop1)
        {
            this.elapsed2 = 0;

            this.elapsed += DELTATIME;

            if(this.elapsed <= duration)
            {
                this.totalTime += DELTATIME
                if(this.totalTime >= this.switchTime)
                {
                    this.CURRENTOPACITY = this.ease_Out_Circular(this.elapsed, duration, targetOpacityEnd, targetOpacityStart - targetOpacityEnd)

                    UpdatedAnimation_smol(this)
                    this.totalTime -= this.switchTime 
                }
            }
        }
        else
        {
            if(this.elapsed2 >= duration)
            {
                this.gotoLoop1 = true
                this.gotoLoop2 = false
            }
        }

        if(this.gotoLoop2)
        {
            this.elapsed = 0;

            this.elapsed2 += DELTATIME;

            if(this.elapsed2 <= duration)
            {
                this.totalTime += DELTATIME
                if(this.totalTime >= this.switchTime)
                {
                    this.CURRENTOPACITY = this.ease_Out_Circular(this.elapsed2, duration, targetOpacityStart, targetOpacityEnd - targetOpacityStart)

                    UpdatedAnimation_smol(this)
                    this.totalTime -= this.switchTime 
                }
            }
        }
        else
        {
            if(this.elapsed >= duration)
            {
                this.gotoLoop1 = false
                this.gotoLoop2 = true
            }
            
        }


        // let canMove = true
        // let canMove2 = false

        // if(this.elapsed >= duration)
        // {
        //     canMove = false;
        //     canMove2 = true;
        // }

        // if(this.elapsed2 >= duration)
        // {
        //     canMove = true;
        //     canMove2 = false;
        // }

        // if(canMove)
        // {
        //     this.elapsed2 = 0;

        //     this.elapsed += DELTATIME;

        //     if(this.elapsed <= duration)
        //     {
        //         console.log(`exec1`)
        //         this.totalTime += DELTATIME
        //         if(this.totalTime >= this.switchTime)
        //         {
        //             this.CURRENTOPACITY = this.ease_Out_Circular(this.elapsed, duration, targetOpacityEnd, targetOpacityStart - targetOpacityEnd)

        //             UpdatedAnimation_smol(this)
        //             this.totalTime -= this.switchTime 
        //         }
        //     } 
        // }

        // if(canMove2)
        // {
        //     this.elapsed = 0;

        //     this.elapsed2 += DELTATIME;

        //     if(this.elapsed2 <= duration)
        //     {
        //         console.log(`exec2`)
        //         this.totalTime += DELTATIME
        //         if(this.totalTime >= this.switchTime)
        //         {
        //             this.CURRENTOPACITY = this.ease_Out_Circular(this.elapsed2, duration, targetOpacityStart, targetOpacityEnd - targetOpacityStart)

        //             UpdatedAnimation_smol(this)
        //             this.totalTime -= this.switchTime 
        //         }
        //     }
        // }  
    }
}

Packed_Image_3_src = `SpriteSheet For Game (Updatedyawa)\\NEW IMAGES\\Packed Image 3.png`
Furina_Banner_Before = new Updated_MikeAnimation_1Frame (Packed_Image_3_src, 0, 500, 2048, 1024, 83);

