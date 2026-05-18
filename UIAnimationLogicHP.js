class HPUI
{
    constructor(withAnimation, switchTime)
    {
        if(withAnimation)
        {
            //for animation
            this.switchTime = switchTime;

            //for currentlocation of hp
            this.damage = 0; 
            this.currentHP = 0;

            //for pastlocation of hp
            this.pastHP = 0;
            this.pastHPlocation = 0;

            //for easing function
            this.totalTime = 0
            this.elapsed = 0;
            this.canMove = true

            //changelistener
            this.changeNumber = 0
        }
    }

    listenForChange()
    {
        if(this.changeNumber != this.pastHP)
        {
            console.log(`CHANGE_CC`)
            console.log(`pastHP_CC: ${this.pastHP}`)
            this.changeNumber = this.pastHP
            this.canMove = true
            this.elapsed = 0
            console.log(`changeNumber_CC: ${this.changeNumber}`)
            
        }
    }

    calculateDamage(charDefaultHP, charCurrentHP)
    {
        return charDefaultHP - charCurrentHP
    }
    
    ease_Out_Circular(elapsed, duration, lastPos, distancePassed)
    {
        let temp = distancePassed * Math.sqrt(1 - (elapsed = elapsed / duration - 1) * elapsed) + lastPos
        return temp
    }

    drawHP(color, posX, posY, width, height)
    {
        ctx.fillStyle = color
        
        ctx.fillRect(
            canvas.width * posX, 
            canvas.height * posY, 
    
            canvas.width  * width, 
            canvas.height * height);
    }

    drawHP_W_Animation(color, posX, posY, width, height, charDefaultHP, charCurrentHP, duration, DELTATIME)
    {
        this.damage = this.calculateDamage(charDefaultHP, charCurrentHP)
        this.pastHPlocation = this.calculateDamage(charDefaultHP, this.pastHP)

        //pastHPLOC
        let remainingHealth_PERCENT_past = (1 - (this.pastHPlocation / charDefaultHP))
        let pastValue = canvas.width  * width * remainingHealth_PERCENT_past

        //currentHPLOC
        let remainingHealth_PERCENT_current = (1 - (this.damage / charDefaultHP))
        let currentValue = canvas.width  * width * remainingHealth_PERCENT_current

        //what is based either one of the above
        let remainingHealth_PERCENT;

        ctx.fillStyle = color

        this.listenForChange()
        if(this.canMove)
        {
            remainingHealth_PERCENT = this.ease_Out_Circular(this.elapsed, duration, pastValue, currentValue - pastValue)
        }
        else
        {
            remainingHealth_PERCENT = currentValue
        }
                
        this.elapsed += DELTATIME
        if(this.elapsed >= duration)
        {
            this.canMove = false;
        }

        ctx.fillRect(
            canvas.width * posX, 
            canvas.height * posY, 
    
            remainingHealth_PERCENT, 
            canvas.height * height);
    }

    drawHP_W_Gradient_Animation(gradientColor1, gradientColor2, startGradeintX, startGradeintY, endGradientX, endGradientY, posX, posY, width, height, canMove, charDefaultHP, charCurrentHP, otherColor, otherColor_color2)
    {
        let lowhealth = false;
        let remainingHealth_PERCENT

        //start and end of gradient
        this.damage = this.calculateDamage(charDefaultHP, charCurrentHP)

        if(canMove)
        {
            remainingHealth_PERCENT = (1 - (this.damage / charDefaultHP))
        }
        else
        {
            remainingHealth_PERCENT = 1
        }

        if(otherColor)
        {
            if(remainingHealth_PERCENT <= 0.35)
            {
                lowhealth = true
            }
            
            if(remainingHealth_PERCENT > 0.35)
            {
                lowhealth = false
            }
        }

        if(!lowhealth)
        {
            let gradient = ctx.createLinearGradient(startGradeintX, startGradeintY, endGradientX, endGradientY) //gradient1POS = (x,y),  gradient2POS = (x,y)

            gradient.addColorStop(0, gradientColor1);//Start Color
            gradient.addColorStop(1, gradientColor2);//End Color

            ctx.fillStyle = gradient;
        }
        else
        {
            ctx.fillStyle = otherColor_color2;
        }

        ctx.fillRect(
            canvas.width * posX, 
            canvas.height * posY, 
            canvas.width  * width * remainingHealth_PERCENT,//mao ni goal
            canvas.height * height);
    }
}

class HPUI_Text
{
    constructor(withAnimation, switchTime, ifYouHateJS, ifNew)//para sa ui dissapear shit
    {
        if(withAnimation)
        {
            //for easing function
            this.switchTime = switchTime
            this.totalTime = 0
            this.elapsed = 0;
        }
        if(ifYouHateJS)
        {
            this.variable = false
        }
        if(ifNew)
        {
            this.totalTime1 = 0
            this.elapsed1 = 0;
            this.variable1 = false;

            this.totalTime2 = 0
            this.elapsed2 = 0;
            this.variable2 = false;

            this.sizeMult

            this.opacity = 0

            this.totalTime3 = 0
            this.elapsed3 = 0;
            this.variable3 = false;
        }
    }

    ease_Out_Circular(elapsed, duration, lastPos, distancePassed)
    {
        let temp = distancePassed * Math.sqrt(1 - (elapsed = elapsed / duration - 1) * elapsed) + lastPos
        return temp
    }

    ease_In(elapsed, duration, lastPos, distancePassed)
    {
        let temp = (elapsed = elapsed /duration) * elapsed * elapsed
        return lastPos + distancePassed * temp
    }

    drawText(charCurrentHP, sizeMult, color, posX, posY)
    {
        text = charCurrentHP
        fontSize = canvas.width * (sizeMult);
        ctx.font = fontSize + `px Arial`; 
        ctx.fillStyle = color; 

        ctx.fillText(text, 
            canvas.width * (posX), 
            canvas.height * posY);
    }

    resetAnimParam()
    {
        this.totalTime = 0
        this.elapsed = 0;
    }

    drawText_Animated_Color(DELTATIME, ifTrueorFalse, charCurrentHP, sizeMult, posX, posY, r1, g1, b1, o1, r2, g2, b2, o2, duration, returnAVal)
    {
        let canMove = true

        text = charCurrentHP
        fontSize = canvas.width * (sizeMult);
        ctx.font = fontSize + `px Arial`; 

        if(!ifTrueorFalse)
        {
            this.elapsed += DELTATIME;
            if(this.elapsed >= duration)
            {
                canMove = false
                if(returnAVal)
                {
                    this.variable = true
                }
            }
            if(canMove)
            {
                if(this.elapsed <= duration)
                {
                    this.totalTime += DELTATIME
                    if(this.totalTime >= this.switchTime)
                    {
                        console.log(`oten`)
                        let rc = this.ease_Out_Circular(this.elapsed, duration, r2, r1 - r2)
                        let gc = this.ease_Out_Circular(this.elapsed, duration, g2, g1 - g2)
                        let bc = this.ease_Out_Circular(this.elapsed, duration, b2, b1 - b2)

                        console.log()
                        ctx.fillStyle = "rgba(" + rc + ", " + gc + ", " + bc + ", " + o1 + ")";

                        this.totalTime -= this.switchTime 
                    }
                }
            }
            else
            {
                ctx.fillStyle = "rgba(" + r1 + ", " + g1 + ", " + b1 + ", " + o1 + ")";
            }    
        }
        else
        {
            this.elapsed = 0
            ctx.fillStyle = "rgba(" + r2 + ", " + g2 + ", " + b2 + ", " + o2 + ")";
        }
        

        ctx.fillText(text, 
            canvas.width * (posX), 
            canvas.height * posY);
    }

    // drawText_Animated_Loc_And_Color(DELTATIME, charCurrentHP, sizeMult, posX, posY, duration)
    // {
    //     text = charCurrentHP

    //     this.elapsed += DELTATIME;
    //     if(this.elapsed >= duration)
    //     {
    //         canMove = false
    //     }

    //     if(canMove)
    //     {
    //         if(this.elapsed <= duration)
    //         {
    //             this.totalTime += DELTATIME
    //             if(this.totalTime >= this.switchTime)
    //             {
    //                 sizeMult = this.ease_Out_Circular()
    //                 fontSize = canvas.width * (sizeMult);
    //                 ctx.font = fontSize + `px Arial`; 
    //                 ctx.fillStyle = color; 

    //                 this.totalTime -= this.switchTime;
    //             }
    //         }
    //     }

        

    //     ctx.fillText(text, 
    //         canvas.width * (posX), 
    //         canvas.height * posY);
    // }





    forHPUIG_HIDDEN(DELTATIME, duration, lastPos, targetPos, )
    {
        this.elapsed += DELTATIME;

        if(this.elapsed <= duration)
        {
            this.totalTime += DELTATIME
            if(this.totalTime >= this.switchTime)
            {
                this.variable = this.ease_Out_Circular(this.elapsed, duration, lastPos, targetPos - lastPos)
                this.totalTime -= this.switchTime 
            }
        }
    }

    forHPUIG_HIDDEN_wRefresher(DELTATIME, duration, lastPos, targetPos)
    {
        this.elapsed += DELTATIME;

        if(this.elapsed > duration)
        {
            this.forHPUIG_HIDDEN_ClearAnimVar()
        }

        if(this.elapsed <= duration)
        {
            this.totalTime += DELTATIME
            if(this.totalTime >= this.switchTime)
            {
                this.variable = this.ease_Out_Circular(this.elapsed, duration, lastPos, targetPos - lastPos)
                this.totalTime -= this.switchTime 
            }
        }
    }

    forHPUIG_HIDDEN_ClearAnimVar()
    {
        this.totalTime = 0
        this.elapsed = 0;
    }


    //Reseter
    resetVar3()
    {
        this.totalTime3 = 0
        this.elapsed3 = 0;
        this.variable3 = false;
    }

    resetVar2()
    {
        this.totalTime2 = 0
        this.elapsed2 = 0;
        this.variable2 = false;
    }
    
    resetEverything()
    {
        this.totalTime = 0
        this.elapsed = 0;
        this.variable = false

        this.totalTime1 = 0
        this.elapsed1 = 0;
        this.variable1 = false;

        this.totalTime2 = 0
        this.elapsed2 = 0;
        this.variable2 = false;

        this.opacity = 0

        this.totalTime3 = 0
        this.elapsed3 = 0;
        this.variable3 = false;
    }


    //NAA DIRI MGA BAG-O NA SHIT

    //IF GRADIENT 
    new_CreateColorGradient(color1, color2, startX, endX, startY, endY)
    {
        let gradient = ctx.createLinearGradient(startX ,endX ,startY, endY)
        gradient.addColorStop(0, color1)
        gradient.addColorStop(1, color2)

        ctx.fillStyle = gradient;

    }
    //UPGRADE ABOVE (W/ ANIMATION)
    new_Anim_2State_CreateColorGradient(basecolor1_gr1, tarcolor1_gr1, basecolor2_gr2, tarcolor2_gr2, borderColor, startX, endX, startY, endY, duration, ifChangeOpacity)
    {
        if(this.elapsed2 >= duration)
        {
            this.variable2 = true;
        }

        let calculatedR_gr1, calculatedG_gr1, calculatedB_gr1, calculatedA_gr1,
                calculatedR_gr2, calculatedG_gr2, calculatedB_gr2, calculatedA_gr2,
                calculatedgradient1, calculatedgradient2, borderColorOpacity;

        if(!this.variable2)
        {
            this.elapsed2 += DELTATIME;
            
            if(this.elapsed2 <= duration)
            {
                this.totalTime2 += DELTATIME
                if(this.totalTime2 >= this.switchTime)
                {
                    calculatedR_gr1 = this.ease_Out_Circular(this.elapsed2, duration, basecolor1_gr1.r, tarcolor1_gr1.r - basecolor1_gr1.r)
                    calculatedG_gr1 = this.ease_Out_Circular(this.elapsed2, duration, basecolor1_gr1.g, tarcolor1_gr1.g - basecolor1_gr1.g)
                    calculatedB_gr1 = this.ease_Out_Circular(this.elapsed2, duration, basecolor1_gr1.b, tarcolor1_gr1.b - basecolor1_gr1.b)
                    calculatedA_gr1 = this.ease_Out_Circular(this.elapsed2, duration, basecolor1_gr1.a, tarcolor1_gr1.a - basecolor1_gr1.a)

                    calculatedR_gr2 = this.ease_Out_Circular(this.elapsed2, duration, basecolor2_gr2.r, tarcolor2_gr2.r - basecolor2_gr2.r)
                    calculatedG_gr2 = this.ease_Out_Circular(this.elapsed2, duration, basecolor2_gr2.g, tarcolor2_gr2.g - basecolor2_gr2.g)
                    calculatedB_gr2 = this.ease_Out_Circular(this.elapsed2, duration, basecolor2_gr2.b, tarcolor2_gr2.b - basecolor2_gr2.b)
                    calculatedA_gr2 = this.ease_Out_Circular(this.elapsed2, duration, basecolor2_gr2.a, tarcolor2_gr2.a - basecolor2_gr2.a)

                    if(ifChangeOpacity)
                    {
                        calculatedgradient1 = "rgba(" + calculatedR_gr1 + ", " + calculatedG_gr1 + ", " + calculatedB_gr1 + ", " + this.opacity + ")"
                        calculatedgradient2 = "rgba(" + calculatedR_gr2 + ", " + calculatedG_gr2 + ", " + calculatedB_gr2 + ", " + this.opacity + ")"
                        borderColorOpacity = "rgba(" + borderColor.r + ", " + borderColor.g + ", " + borderColor.b + ", " + this.opacity + ")" //borderColor
                    }
                    else
                    {
                        calculatedgradient1 = "rgba(" + calculatedR_gr1 + ", " + calculatedG_gr1 + ", " + calculatedB_gr1 + ", " + calculatedA_gr1 + ")"
                        calculatedgradient2 = "rgba(" + calculatedR_gr2 + ", " + calculatedG_gr2 + ", " + calculatedB_gr2 + ", " + calculatedA_gr2 + ")"
                        borderColorOpacity = "rgba(" + borderColor.r + ", " + borderColor.g + ", " + borderColor.b + ", " + calculatedA_gr1 + ")" //borderColor
                    }
                    
        

                    let gradient = ctx.createLinearGradient(startX ,endX ,startY, endY)
                    gradient.addColorStop(0, calculatedgradient1)
                    gradient.addColorStop(1, calculatedgradient2)
        
                    ctx.fillStyle = gradient;
                    ctx.strokeStyle = borderColorOpacity //borderColor

                    this.totalTime2 -= this.switchTime 
                }
                
                
            }

        }

        else
        {
            if(ifChangeOpacity)
            {
                calculatedgradient1 = "rgba(" + tarcolor1_gr1.r + ", " + tarcolor1_gr1.g + ", " + tarcolor1_gr1.b + ", " + this.opacity + ")"
                calculatedgradient2 = "rgba(" + tarcolor2_gr2.r + ", " + tarcolor2_gr2.g + ", " + tarcolor2_gr2.b + ", " + this.opacity + ")"
                borderColorOpacity = "rgba(" + borderColor.r + ", " + borderColor.g + ", " + borderColor.b + ", " + this.opacity + ")" //borderColor
            }
            else
            {
                calculatedgradient1 = "rgba(" + tarcolor1_gr1.r + ", " + tarcolor1_gr1.g + ", " + tarcolor1_gr1.b + ", " + tarcolor1_gr1.a + ")"
                calculatedgradient2 = "rgba(" + tarcolor2_gr2.r + ", " + tarcolor2_gr2.g + ", " + tarcolor2_gr2.b + ", " + tarcolor2_gr2.a + ")" //borderColor
                borderColorOpacity = "rgba(" + borderColor.r + ", " + borderColor.g + ", " + borderColor.b + ", " + borderColor.a + ")" //borderColor
            }
            console.log(`INSIDE FUNCTION ELSE`)

            let gradient = ctx.createLinearGradient(startX ,endX ,startY, endY)
            gradient.addColorStop(0, calculatedgradient1)
            gradient.addColorStop(1, calculatedgradient2)

            ctx.fillStyle = gradient;
            ctx.strokeStyle = borderColorOpacity
        }
        
    }//ELAPSED2

    //CHANGE OPACITY PARA SA TAAS
    new_Anim_2State_ChangeOpacity(baseOpacity, tarOpacity, duration)
    {
        if(this.elapsed3 >= duration)
        {
            this.variable3 = true;
        }

        if(!this.variable3)
        {
            this.elapsed3 += DELTATIME;
            if(this.elapsed3 <= duration)
            {
                this.totalTime3 += DELTATIME
                if(this.totalTime3 >= this.switchTime)
                {
                    this.opacity = this.ease_In(this.elapsed3, duration, baseOpacity, tarOpacity - baseOpacity)
                    console.log(`elapsed3: ${this.elapsed3}`)
                    console.log(`opacity: ${this.opacity}`)
    
                    this.totalTime3 -= this.switchTime 
                    console.log(`OPACITY TAAS`)
                }
            }
        }
        else
        {
            this.opacity = tarOpacity
            console.log(`OPACITY ILALOM`)
        }
    }






    //IF ONE COLOR
    new_Create_SizeMult_and_BorderSize(sizeMult, borderWidth)
    {
        fontSize = canvas.width * (sizeMult);
        ctx.font = fontSize + `px Arial`; 
        ctx.lineWidth = canvas.width * (sizeMult) * borderWidth;
    }
    //UPGRADE ABOVE (W/ ANIMATION)
    new_Anim_2State_Create_SizeMult_and_BorderSize(baseSizeMult, targetSizeMult, duration, borderWidth)
    {
        if(this.elapsed >= duration)
        {
            this.variable = true
        }

        let sizeMult

        if(!this.variable)
        {
            this.elapsed += DELTATIME;
            
            if(this.elapsed <= duration)
            {
                this.totalTime += DELTATIME
                if(this.totalTime >= this.switchTime)
                {
                    sizeMult = this.ease_In(this.elapsed, duration, baseSizeMult, targetSizeMult - baseSizeMult)
                    console.log(`SIZE: ${sizeMult}`)
                    fontSize = canvas.width * (sizeMult);
                    ctx.font = fontSize + `px Arial`; 
                    ctx.lineWidth = canvas.width * (sizeMult) * borderWidth;

                    this.totalTime -= this.switchTime 
                }
            }
        }
        else
        {
            fontSize = canvas.width * (targetSizeMult);
            ctx.font = fontSize + `px Arial`; 
            ctx.lineWidth = canvas.width * (targetSizeMult) * borderWidth;
        }
    }//ELAPSED




    new_TextDesign(color, borderColor)
    {
        ctx.fillStyle = color;
        ctx.strokeStyle = borderColor
    }



    new_Anim_TextDesign(color, borderColor)
    {
        ctx.fillStyle = color;
        ctx.strokeStyle = borderColor
    }
    //UPGRADE ABOVE (W/ ANIMATION)
    new_Anim_2State_TextDesign_Opacity(baseColor1, tarColor2, borderColor, targetBorderColor, duration)//NORM DAMAGE
    {

        if(this.elapsed2 >= duration)
        {
            this.variable2 = true;
        }

        if(!this.variable2)
        {
            let calculatedBaseColorR, calculatedBaseColorG, calculatedBaseColorB, calculatedBaseColorA;

            this.elapsed2 += DELTATIME;
            if(this.elapsed2 <= duration)
            {
                this.totalTime2 += DELTATIME
                if(this.totalTime2 >= this.switchTime)
                {
                    calculatedBaseColorR = this.ease_Out_Circular(this.elapsed2, duration, baseColor1.r, tarColor2.r - baseColor1.r)
                    calculatedBaseColorG = this.ease_Out_Circular(this.elapsed2, duration, baseColor1.g, tarColor2.g - baseColor1.g)
                    calculatedBaseColorB = this.ease_Out_Circular(this.elapsed2, duration, baseColor1.b, tarColor2.b - baseColor1.b)
                    calculatedBaseColorA = this.ease_Out_Circular(this.elapsed2, duration, baseColor1.a, tarColor2.a - baseColor1.a)
                    
                    let calculatedColor = "rgba(" + calculatedBaseColorR + ", " + calculatedBaseColorG + ", " + calculatedBaseColorB + ", " + calculatedBaseColorA + ")"
                    let calculatedBorder = "rgba(" + borderColor.r + ", " + borderColor.g + ", " + borderColor.b + ", " + calculatedBaseColorA + ")"

                    ctx.fillStyle = calculatedColor;
                    ctx.strokeStyle = calculatedBorder;

                    this.totalTime2 -= this.switchTime 
                }
            }
        }
        else
        {
            let calculatedColor = "rgba(" + tarColor2.r + ", " + tarColor2.g + ", " + tarColor2.b + ", " + tarColor2.a + ")"
            let calculatedBorderColor = "rgba(" + targetBorderColor.r + ", " + targetBorderColor.g + ", " + targetBorderColor.b + ", " + targetBorderColor.a + ")"
            
            ctx.fillStyle = calculatedColor;
            ctx.strokeStyle = calculatedBorderColor
        }





        
    }//VARIABLE 2
    
    

    


    new_renderImage_PosXY(text, posX, posY)
    {
        ctx.strokeText(text, 
            canvas.width * (posX), 
            canvas.height * posY)
        ctx.fillText(text, 
            canvas.width * (posX), 
            canvas.height * posY);
        
    }

    new_Anim_2State__renderImage_PosXY(text, posX1, posX2, posY1, posY2, duration, resetAfter)
    {
        if(this.elapsed1 >= duration)
        {
            this.variable1 = true
            if(resetAfter)
            {
                this.elapsed1 = 0
                this.totalTime1 = 0
                this.variable1 = false
            }
        }

        if(!this.variable1)
        {
            this.elapsed1 += DELTATIME;
            let posX, posY
            
            if(this.elapsed1 <= duration)
            {
                this.totalTime1 += DELTATIME
                if(this.totalTime1 >= this.switchTime)
                {
                    posX = this.ease_Out_Circular(this.elapsed1, duration, posX1, posX2 - posX1)
                    posY = this.ease_Out_Circular(this.elapsed1, duration, posY1, posY2 - posY1)

                    ctx.strokeText(text, 
                        canvas.width * (posX), 
                        canvas.height * posY)
                    ctx.fillText(text, 
                        canvas.width * (posX), 
                        canvas.height * posY);
    
                    this.totalTime1 -= this.switchTime 
                }
            }
        }
        else
        {   
            ctx.strokeText(text, 
                canvas.width * (posX2), 
                canvas.height * posY2)
            ctx.fillText(text, 
                canvas.width * (posX2), 
                canvas.height * posY2);
        }
        

    }//ELAPSED1
}

class circle
{
    constructor(switchTime, loop2State, loopForeverInside)
    {
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

    makeCircle(color, posX, posY, radius, scaleX, scaleY, currentEnergy, defaultEnergy)
    {
        ctx.save()
        ctx.scale(scaleX, scaleY)
            

        let percent = currentEnergy / defaultEnergy
        
        let percentage = percent * 2

        ctx.beginPath();
        ctx.arc(canvas.width * posX, canvas.height * posY, canvas.width * radius, 0, percentage * Math.PI);
        ctx.fillStyle = color;   
        ctx.fill(); 

        ctx.restore();
    }


}

UI_MC_Background_HP = new HPUI(false)
UI_MC_MainColor_HP = new HPUI(true)
UI_MC_BackColor_HP = new HPUI(true, 83)

UI_YellowPusa_Background_HP = new HPUI(false)
UI_YellowPusa_BackColor_HP = new HPUI(true, 83)

UI_BlackPusa_Background_HP = new HPUI(false)
UI_BlackPusa_BackColor_HP = new HPUI(true, 83)

UI_MC_Portrait = new Updated_MikeAnimation_1Frame (Packed_Image_3_src, 2535, 0, 300, 351, 83)
UI_MC_Energy_icon = new Updated_MikeAnimation_1Frame (Packed_Image_3_src, 2048, 500, 487, 500, 83)
UI_MC_EnergyFull_icon = new Updated_MikeAnimation_1Frame (Packed_Image_3_src, 1948, 0, 487, 500, 83)
UI_MC_EnergyBar_icon = new circle(83)

UI_MC_Text = new HPUI_Text(true, 83)
UI_MC_Text_Shadow = new HPUI_Text(false)

HPUIG_HIDDEN_Y = new HPUI_Text(true, 83, true)
HPUIG_HIIDEN_Y_var = 1

function MakeHpUI_CHAR (characterDefaultHP, charCurrentHP, DELTATIME)
{
    if(characters[0].player == true)
    {
        ifMC = true
    }   
    else
    {
        ifMC = false
    }

    if(!HPUIG_Hidden)
    {
        HPUIG_HIDDEN_Y.forHPUIG_HIDDEN(DELTATIME, 15000, HPUIG_HIIDEN_Y_var, 0)
        HPUIG_HIIDEN_Y_var = HPUIG_HIDDEN_Y.variable;
    }

    //ENERGY ANIM

    
    if(based2ndCharacters[0].energyInside != 120)
    {
        //ENERGY (NOT FULL)                                     //locx, locY, sizeX, sizeY, imageX, imageY
        UI_MC_Energy_icon.ANIMATE_2STATE_FUNC(DELTATIME, ifMC,  0.162 - (0.01), 0.746 - 0.01 + HPUIG_HIIDEN_Y_var, 4.87 * (0.019 - 0.003), 5 * (0.0255 + 0.0001) ,0 ,0,
                                                                0.162 + (0.002), 0.746 + (0.01), 4.87 * (0.0174 - 0.004), 5 * (0.022) ,0 ,0, 2900); 

        if(ifMC)
        {
            //DAKO
            UI_MC_EnergyBar_icon.makeCircle('rgba(79, 194, 244, 0.35)', 
                                            0.162 + 0.013, 0.746 + 0.055 + HPUIG_HIIDEN_Y_var,                  //xy
                                            4.87 * (0.007), 1.09, 1, based2ndCharacters[0].energyInside, 120)   //size, scaleX, scaleY
        }                                                        
        else
        {
            //GAMAY
            UI_MC_EnergyBar_icon.makeCircle('rgba(79, 194, 244, 0.35)', 
                                            0.162 + 0.019, 0.746 + 0.065 + HPUIG_HIIDEN_Y_var,                  //xy
                                            4.87 * (0.0058), 1.09,1, based2ndCharacters[0].energyInside, 120)   //size, scaleX, scaleY
        }

        //PROFILE PIC //CURRENT TURN
        UI_MC_Portrait.ANIMATE_2STATE_FUNC(DELTATIME, ifMC,     0.092 - 0.008 , 0.876 - 0.192 + HPUIG_HIIDEN_Y_var, 2.87 * (0.04 - 0.008), 3.63 * 0.053 ,0 ,0,
                                                                0.092 + 0.01, 0.876 - (0.1437), 2.87 * (0.04 - 0.015), 3.63 * (0.05-0.01) ,0 ,0.01, 2900)
    }
    else
    {
        //PROFILE PIC //CURRENT TURN
        UI_MC_Portrait.ANIMATE_2STATE_FUNC(DELTATIME, ifMC,     0.092 - 0.008 , 0.876 - 0.192 + HPUIG_HIIDEN_Y_var, 2.87 * (0.04 - 0.008), 3.63 * 0.053 ,0 ,0,
                                                                0.092 + 0.01, 0.876 - (0.1437), 2.87 * (0.04 - 0.015), 3.63 * (0.05-0.01) ,0 ,0.01, 2900)

        //ENERGY (NOT FULL)                                     //locx, locY, sizeX, sizeY, imageX, imageY
        UI_MC_EnergyFull_icon.ANIMATE_2STATE_FUNC(DELTATIME, ifMC,  0.162 - (0.01), 0.746 - 0.01 + HPUIG_HIIDEN_Y_var, 4.87 * (0.019 - 0.003), 5 * (0.0255 + 0.0001) ,0 ,0,
                                                                    0.162 + (0.002), 0.746 + (0.01), 4.87 * (0.0174 - 0.004), 5 * (0.022) ,0 ,0, 2900); 

        if(ifMC)
        {
            //DAKO
            UI_MC_EnergyBar_icon.makeCircle('rgba(83, 201, 249, 0.4)', 
                                            0.162 + 0.013, 0.746 + 0.055 + HPUIG_HIIDEN_Y_var,                  //xy
                                            4.87 * (0.007), 1.09, 1, based2ndCharacters[0].energyInside, 120)   //size, scaleX, scaleY
        }                                                        
        else
        {
            //GAMAY
            UI_MC_EnergyBar_icon.makeCircle('rgba(83, 201, 249, 0.4)', 
                                            0.162 + 0.019, 0.746 + 0.065 + HPUIG_HIIDEN_Y_var,                  //xy
                                            4.87 * (0.0058), 1.09,1, based2ndCharacters[0].energyInside, 120)   //size, scaleX, scaleY
        }
    }

    

    

    //HP
    UI_MC_Background_HP.drawHP(`rgba(0, 0, 0, 0.75)`, 
    0.097 - 0.0005, 0.876 - (0.001) + HPUIG_HIIDEN_Y_var, 0.1492 - (0.0089 + 0.014), 0.0181 - 0.002)

    UI_MC_BackColor_HP.drawHP_W_Animation(`rgba(241, 169, 16, 1)`, 
    0.0987, 0.8787 + HPUIG_HIIDEN_Y_var, 0.146 - (0.01 + 0.014), 0.0131 - 0.0042, characterDefaultHP, charCurrentHP, 10000, DELTATIME)

    //console.log(`UI_MC_BackColor_HP: ${UI_MC_BackColor_HP.canMove}`)
    
    UI_MC_MainColor_HP.drawHP_W_Gradient_Animation(`rgba(226, 255, 255, 1)`, `rgba(134, 255, 255, 1)`, 
    0, 0, (canvas.width  * 0.1 + canvas.width * 0.146), 0,
    0.0987, 0.8787 + HPUIG_HIIDEN_Y_var, 0.146 - (0.01 + 0.014), 0.0131 - 0.0042, true,
    characterDefaultHP, charCurrentHP,
    true, `rgba(212, 66, 6, 1)`)

    //shadow text
    UI_MC_Text_Shadow.drawText(charCurrentHP, 0.023 - 0.005,
        'rgba(22, 27, 33, 1)', 0.2082 - 0.023, 0.877 + HPUIG_HIIDEN_Y_var)
        
    //original text
    UI_MC_Text.drawText_Animated_Color(DELTATIME, UI_MC_BackColor_HP.canMove, charCurrentHP, 0.02 - 0.005, 0.2102 - 0.0215,  0.8735 + HPUIG_HIIDEN_Y_var,
        228, 221, 221, 1, 
        186, 94, 101, 1, 
        10000);
}

function MakeHPUI_Enemy_YellowPusa(enemyDefaultHP, enemyCurrentHP, DELTATIME)
{
    let additionX = 0
    let additionY = 0
    
    if(attackRightAnimation)
    {
        additionX = 0.17
    }
    else if(animationNumber == 7)
    {
        additionX = 0
        additionY = 0.04
    }
    else if(animationNumber == 8)
    {
        console.log(`TRUEBLACKVALUE`)
        additionX = 0.09
        additionY = -0.17
    }

    if(!UI_YellowPusa_BackColor_HP.canMove)
    {
        if(enemyCurrentHP == 0)
        {
            YellowPusaIsDead_HP = true
        }
    }

    UI_YellowPusa_Background_HP.drawHP(`rgba(0, 0, 0, 0.75)`, 
    (0.5 + 0.0239) - additionX - (0.0001), (0.45 - (0.0033)) + additionY, 0.08 + (0.0015 - 0.0143), 0.0181 - 0.002)//x,y,width,height

    UI_YellowPusa_BackColor_HP.drawHP_W_Animation(`rgba(255, 199, 203, 1)`, 
    ((0.5 + 0.025) + 0.0002) - additionX, 0.45 + additionY, 0.08 - 0.015, 0.0089, enemyDefaultHP, enemyCurrentHP, 10000, DELTATIME)

    UI_YellowPusa_Background_HP.drawHP(`rgba(194, 72, 57, 1)`, 
    ((0.5 + 0.025) + 0.0002) - additionX, 0.45 + additionY,                               //x,y,
     0.065 * (1 - ((enemyDefaultHP - enemyCurrentHP) / enemyDefaultHP)), 0.0089)  //width,height

}

function MakeHPUI_Enemy_BlackPusa(enemyDefaultHP, enemyCurrentHP, DELTATIME)
{
    let additionX = 0
    let additionY = 0

    if(animationNumber != 8)
    {
        if(attackRightAnimation)
        {
            additionX = 0.175
        }
    }
    
    if(animationNumber == 7)
    {
        additionX = 0.027
        additionY = 0.04
    }
    else if(animationNumber == 8)
    {
        console.log(`TRUEBLACKVALUE`)
        additionX = 0.2
        additionY = -0.09
    }


    if(!UI_BlackPusa_BackColor_HP.canMove)
    {
        if(enemyCurrentHP == 0)
        {
            BlackPusaIsDead_HP = true
        }
    }

    UI_BlackPusa_Background_HP.drawHP(`rgba(0, 0, 0, 0.75)`, 
    (0.5239 + 0.153) - additionX - (0.0001), (0.45 - (0.0033)) + additionY, 0.08 + (0.0015 - 0.0143), 0.0181 - 0.002)//x,y,width,height

    UI_BlackPusa_BackColor_HP.drawHP_W_Animation(`rgba(255, 199, 203, 1)`, 
    (0.5252 + 0.153) - additionX, 0.45 + additionY, 0.08 - 0.015, 0.0089, enemyDefaultHP, enemyCurrentHP, 10000, DELTATIME)

    UI_BlackPusa_Background_HP.drawHP(`rgba(194, 72, 57, 1)`, 
    (0.5252 + 0.153) - additionX, 0.45 + additionY,                               //x,y,
     0.065 * (1 - ((enemyDefaultHP - enemyCurrentHP) / enemyDefaultHP)), 0.0089)  //width,height

}
crosshair_src = `SpriteSheet For Game (Updatedyawa)\\NEW IMAGES\\Crosshair.png`
crossHair = new Updated_MikeAnimation_1Frame (crosshair_src, 0, 0, 1000, 1000, 83)

function MakeCrossHair()
{
    let dugangX = 0
    let dugangY = 0
    if(animationNumber == 2)
    {
        if(!attackRight)
        {
            dugangX = 0
            dugangY = 0
        }
        else
        {
            dugangX = 0.16
            dugangY = 0
        }
    }

    else if(animationNumber == 7)
    {
        if(!attackRight)
            {
                dugangX = 0
                dugangY = 0.029
            }
            else
            {
                dugangX = 0.138
                dugangY = 0.029
            }  
    }
    

    if(animationNumber == 2 || animationNumber == 7)
    {
        crossHair.changeLocationX_and_Y(0.518 + dugangX, 0.455 + dugangY)
        crossHair.drawAnimation_oten(10 * (0.01 - 0.003), 10 * (0.012))
    }
    
    
}