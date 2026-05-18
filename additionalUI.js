SP_Design = new Updated_MikeAnimation_1Frame(UIElements.src, 2344, 0, 500, 150, 83)

number_SP = new HPUI_Text(true, 83, true)

empty_SP_1 = new Updated_MikeAnimation_1Frame(UIElements.src, 1744, 0, 100, 100, 83)
SP_1 = new Updated_MikeAnimation_1Frame(UIElements.src, 2844, 0, 100, 100, 83, true, true)

SP_2 = new Updated_MikeAnimation_1Frame(UIElements.src, 2844, 0, 100, 100, 83, true, true)

SP_3 = new Updated_MikeAnimation_1Frame(UIElements.src, 2844, 0, 100, 100, 83, true, true)

SP_4 = new Updated_MikeAnimation_1Frame(UIElements.src, 2844, 0, 100, 100, 83, true, true)

SP_5 = new Updated_MikeAnimation_1Frame(UIElements.src, 2844, 0, 100, 100, 83, true, true)

SP_RED = new Updated_MikeAnimation_1Frame(UIElements.src, 0, 500, 150, 250, 83, true, true)
SP_BLUE = new Updated_MikeAnimation_1Frame(UIElements.src, 150, 500, 150, 250, 83, true, true)

SP_Hidden = new HPUI_Text(true, 83, true)
SP_Hidden_var = 1

Buttons_Hidden = new HPUI_Text(true, 83, true)
Buttons_Hidden_var = 1

let animateRed_SP = false
let animateBlue_SP = false

//FOR RESIZE OF SKILLPOINT NUMBER
SP_Number_Size_Mult = new HPUI_Text(true, 83, true)
SP_Number_Size_Mult_var = 0

SP_Number_Size_LocX = new HPUI_Text(true, 83, true)
SP_Number_Size_LocX_var = 0

SP_Number_Size_LocY = new HPUI_Text(true, 83, true)
SP_Number_Size_LocY_var = 0




function SkillPoint()
{
    SP_Design.changeLocationX_and_Y(0.8 - 0.125 + SP_Hidden_var, 0.858 + 0.014)//X AND Y LOC
    SP_Design.drawAnimation_oten(5 * 0.02, 1.5 * 0.04)//X AND Y SIZE

    if(prevSkillPoint > skillPoint)
    {
        SP_Number_Size_Mult.forHPUIG_HIDDEN_ClearAnimVar();
        SP_Number_Size_LocX.forHPUIG_HIDDEN_ClearAnimVar();
        SP_Number_Size_LocY.forHPUIG_HIDDEN_ClearAnimVar();
        animateRed_SP = true
    }

    if(prevSkillPoint < skillPoint)
    {
        SP_Number_Size_Mult.forHPUIG_HIDDEN_ClearAnimVar();
        SP_Number_Size_LocX.forHPUIG_HIDDEN_ClearAnimVar();
        SP_Number_Size_LocY.forHPUIG_HIDDEN_ClearAnimVar();
        animateBlue_SP = true
    }

    if(prevSkillPoint == skillPoint)
    {
        animateRed_SP = false
        animateBlue_SP = false
        number_SP.resetAnimParam();
        number_SP.variable = false

        SP_Number_Size_Mult.forHPUIG_HIDDEN_ClearAnimVar();
        SP_Number_Size_LocX.forHPUIG_HIDDEN_ClearAnimVar();
        SP_Number_Size_LocY.forHPUIG_HIDDEN_ClearAnimVar();
    }


    if(!animateRed_SP && !animateBlue_SP)
    {
        
        if(SP_Number_Size_Mult_var != 0)
        {
            SP_Number_Size_Mult.forHPUIG_HIDDEN(DELTATIME, 10000, SP_Number_Size_Mult_var, 0)//TARGET MULT
            SP_Number_Size_Mult_var = SP_Number_Size_Mult.variable;

            SP_Number_Size_LocX.forHPUIG_HIDDEN(DELTATIME, 10000, SP_Number_Size_LocX_var, 0)//TARGET X
            SP_Number_Size_LocX_var = SP_Number_Size_LocX.variable;

            SP_Number_Size_LocY.forHPUIG_HIDDEN(DELTATIME, 10000, SP_Number_Size_LocY_var, 0)//TARGET Y
            SP_Number_Size_LocY_var = SP_Number_Size_LocY.variable;
        }

        number_SP.drawText (skillPoint, 
                            0.025 + SP_Number_Size_Mult_var,
                            'rgba(248, 255, 255, 1)',
                            0.675 - (0.007 + SP_Number_Size_LocX_var) + SP_Hidden_var,//PARA PANG HIDDEN (SP_Hidden_var)
                            0.872 + (0.027 + SP_Number_Size_LocY_var))
    }
    
    if(animateRed_SP)
    {
        console.log(`RED_SP`)
        SP_Number_Size_Mult.forHPUIG_HIDDEN(DELTATIME, 17000, SP_Number_Size_Mult_var, 0.018)//TARGET MULT
        SP_Number_Size_Mult_var = SP_Number_Size_Mult.variable;

        SP_Number_Size_LocX.forHPUIG_HIDDEN(DELTATIME, 17000, SP_Number_Size_LocX_var, 0.005)//TARGET X
        SP_Number_Size_LocX_var = SP_Number_Size_LocX.variable;

        SP_Number_Size_LocY.forHPUIG_HIDDEN(DELTATIME, 17000, SP_Number_Size_LocY_var, 0.008)//TARGET Y
        SP_Number_Size_LocY_var = SP_Number_Size_LocY.variable;

        number_SP.drawText_Animated_Color  (DELTATIME, false, skillPoint, 
                                            0.025 + SP_Number_Size_Mult_var,
                                            0.675 - (0.007 + SP_Number_Size_LocX_var), 
                                            0.872 + (0.027 + SP_Number_Size_LocY_var), //false dapat kay bali kog utok
                                            248, 255, 255, 1,   //base color
                                            244, 4, 9, 1,       //tar color
                                            17000, true)              //duration
        if(number_SP.variable)
        {
            prevSkillPoint = skillPoint
        }
    }

    if(animateBlue_SP)
    {
        console.log(`BLUE_SP`)
        SP_Number_Size_Mult.forHPUIG_HIDDEN(DELTATIME, 17000, SP_Number_Size_Mult_var, 0.018)//TARGET MULT
        SP_Number_Size_Mult_var = SP_Number_Size_Mult.variable;

        SP_Number_Size_LocX.forHPUIG_HIDDEN(DELTATIME, 17000, SP_Number_Size_LocX_var, 0.005)//TARGET X
        SP_Number_Size_LocX_var = SP_Number_Size_LocX.variable;

        SP_Number_Size_LocY.forHPUIG_HIDDEN(DELTATIME, 17000, SP_Number_Size_LocY_var, 0.008)//TARGET Y
        SP_Number_Size_LocY_var = SP_Number_Size_LocY.variable;

        number_SP.drawText_Animated_Color  (DELTATIME, false, skillPoint,
                                            0.025 + SP_Number_Size_Mult_var, 
                                            0.675 - (0.007 + SP_Number_Size_LocX_var), 
                                            0.872 + (0.027 + SP_Number_Size_LocY_var), //false dapat kay bali kog utok
                                            248, 255, 255, 1,   //base color
                                            116, 207, 242, 1,       //tar color
                                            17000, true)              //duration
        if(number_SP.variable)
        {
            prevSkillPoint = skillPoint
        }
    }
    

    empty_SP_1.changeLocationX_and_Y(0.8 - (0.125 - 0.0128) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
    empty_SP_1.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE

    empty_SP_1.changeLocationX_and_Y(0.8 - (0.125 - 0.024) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
    empty_SP_1.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE

    empty_SP_1.changeLocationX_and_Y(0.8 - (0.125 - (0.024 + 0.0112)) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
    empty_SP_1.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE

    empty_SP_1.changeLocationX_and_Y(0.8 - (0.125 - (0.0352 + 0.0112)) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
    empty_SP_1.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE

    empty_SP_1.changeLocationX_and_Y(0.8 - (0.125 - (0.0464 + 0.0112)) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
    empty_SP_1.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
    //console.log(`anim_SP ${anim_SP}`)

    //PARA ANIM SP
    if(QPressed)
    {
        anim_SP = skillPoint + 1;
    }
    else
    {
        anim_SP = skillPoint;
    }
    if(drawUIAnim)
    {
        switch(anim_SP)
        {
            case 0:
                break;
    
            case 1:
                SP_2.resetValueAnim()
                SP_3.resetValueAnim()
                SP_4.resetValueAnim()
                SP_5.resetValueAnim()
    
                if(anim_SP > skillPoint)
                {
                    SP_BLUE.changeLocationX_and_Y(0.7194 - (0.011*3) + SP_Hidden_var, 0.808)//X AND Y LOC
                    SP_BLUE.drawAnimation_oten(1.5 * (0.02), 2.5 * (0.04))//X AND Y SIZE
    
                    SP_BLUE.CURRENTOPACITY = SP_1.CURRENTOPACITY;
                }
                if(anim_SP == skillPoint)
                {
                    SP_RED.changeLocationX_and_Y((0.7214 - (0.011*3)) - (0.00315) + SP_Hidden_var, 0.808)//X AND Y LOC + 0.00115 ANG RED KAY SAYOP SA BLENDER
                    SP_RED.drawAnimation_oten(1.5 * (0.02), 2.5 * (0.04))//X AND Y SIZE
    
                    SP_RED.CURRENTOPACITY = SP_1.CURRENTOPACITY;
                }
    
                SP_1.changeLocationX_and_Y(0.8 - (0.125 - 0.0128) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_1.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
                SP_1.ANIMATE_2STATE_FUNC_LOOP_OPACITY(DELTATIME, 15000, 1, 0)
                break;
    
            case 2:
                SP_1.resetValueAnim()
                SP_3.resetValueAnim()
                SP_4.resetValueAnim()
                SP_5.resetValueAnim()
    
                if(anim_SP > skillPoint)
                {
                    SP_BLUE.changeLocationX_and_Y(0.7194 - (0.011*2) + SP_Hidden_var, 0.808)//X AND Y LOC
                    SP_BLUE.drawAnimation_oten(1.5 * (0.02), 2.5 * (0.04))//X AND Y SIZE
    
                    SP_BLUE.CURRENTOPACITY = SP_2.CURRENTOPACITY;
                }
                if(anim_SP == skillPoint)
                {
                    SP_RED.changeLocationX_and_Y((0.7214 - (0.011*2)) - (0.00315) + SP_Hidden_var, 0.808)//X AND Y LOC + 0.00115 ANG RED KAY SAYOP SA BLENDER
                    SP_RED.drawAnimation_oten(1.5 * (0.02), 2.5 * (0.04))//X AND Y SIZE
    
                    SP_RED.CURRENTOPACITY = SP_2.CURRENTOPACITY;
                }
    
                SP_1.changeLocationX_and_Y(0.8 - (0.125 - 0.0128) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_1.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
    
                SP_2.changeLocationX_and_Y(0.8 - (0.125 - 0.024) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_2.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
                SP_2.ANIMATE_2STATE_FUNC_LOOP_OPACITY(DELTATIME, 15000, 1, 0)
                break;
    
            case 3:
                SP_1.resetValueAnim()
                SP_2.resetValueAnim()
                SP_4.resetValueAnim()
                SP_5.resetValueAnim()
    
                if(anim_SP > skillPoint)
                {
                    SP_BLUE.changeLocationX_and_Y(0.7194 - (0.011) + SP_Hidden_var, 0.808)//X AND Y LOC
                    SP_BLUE.drawAnimation_oten(1.5 * (0.02), 2.5 * (0.04))//X AND Y SIZE
    
                    SP_BLUE.CURRENTOPACITY = SP_3.CURRENTOPACITY;
                }
                if(anim_SP == skillPoint)
                {
                    SP_RED.changeLocationX_and_Y((0.7214 - (0.011)) - (0.00315) + SP_Hidden_var, 0.808)//X AND Y LOC + 0.00115 ANG RED KAY SAYOP SA BLENDER
                    SP_RED.drawAnimation_oten(1.5 * (0.02), 2.5 * (0.04))//X AND Y SIZE
    
                    SP_RED.CURRENTOPACITY = SP_3.CURRENTOPACITY;
                }
    
                SP_1.changeLocationX_and_Y(0.8 - (0.125 - 0.0128) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_1.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_2.changeLocationX_and_Y(0.8 - (0.125 - 0.024) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_2.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_3.changeLocationX_and_Y(0.8 - (0.125 - (0.024 + 0.0112)) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_3.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
                SP_3.ANIMATE_2STATE_FUNC_LOOP_OPACITY(DELTATIME, 15000, 1, 0)
                break;
    
            case 4:
                SP_1.resetValueAnim()
                SP_2.resetValueAnim()
                SP_3.resetValueAnim()
                SP_5.resetValueAnim()
    
                if(anim_SP > skillPoint)
                {
                    SP_BLUE.changeLocationX_and_Y(0.7194 + SP_Hidden_var, 0.808)//X AND Y LOC
                    SP_BLUE.drawAnimation_oten(1.5 * (0.02), 2.5 * (0.04))//X AND Y SIZE
    
                    SP_BLUE.CURRENTOPACITY = SP_4.CURRENTOPACITY;
                }
                if(anim_SP == skillPoint)
                {
                    SP_RED.changeLocationX_and_Y((0.7214) - (0.00315) + SP_Hidden_var, 0.808)//X AND Y LOC + 0.00115 ANG RED KAY SAYOP SA BLENDER
                    SP_RED.drawAnimation_oten(1.5 * (0.02), 2.5 * (0.04))//X AND Y SIZE
    
                    SP_RED.CURRENTOPACITY = SP_4.CURRENTOPACITY;
                }
            
                SP_1.changeLocationX_and_Y(0.8 - (0.125 - 0.0128) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_1.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_2.changeLocationX_and_Y(0.8 - (0.125 - 0.024) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_2.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_3.changeLocationX_and_Y(0.8 - (0.125 - (0.024 + 0.0112)) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_3.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_4.changeLocationX_and_Y(0.8 - (0.125 - (0.0352 + 0.0112)) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_4.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
                SP_4.ANIMATE_2STATE_FUNC_LOOP_OPACITY(DELTATIME, 15000, 1, 0)
                
                break;
    
            case 5:
                SP_1.resetValueAnim()
                SP_2.resetValueAnim()
                SP_3.resetValueAnim()
                SP_4.resetValueAnim()
    
                if(anim_SP > skillPoint)
                {
                    SP_BLUE.changeLocationX_and_Y(0.7194 + 0.011 + SP_Hidden_var, 0.808)//X AND Y LOC
                    SP_BLUE.drawAnimation_oten(1.5 * (0.02), 2.5 * (0.04))//X AND Y SIZE
    
                    SP_BLUE.CURRENTOPACITY = SP_5.CURRENTOPACITY;
                }
                if(anim_SP == skillPoint)
                {
                    SP_RED.changeLocationX_and_Y((0.7214 + 0.011) - (0.00315) + SP_Hidden_var, 0.808)//X AND Y LOC + 0.00115 ANG RED KAY SAYOP SA BLENDER
                    SP_RED.drawAnimation_oten(1.5 * (0.02), 2.5 * (0.04))//X AND Y SIZE
    
                    SP_RED.CURRENTOPACITY = SP_5.CURRENTOPACITY;
                }
    
    
                SP_1.changeLocationX_and_Y(0.8 - (0.125 - 0.0128) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_1.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_2.changeLocationX_and_Y(0.8 - (0.125 - 0.024) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_2.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_3.changeLocationX_and_Y(0.8 - (0.125 - (0.024 + 0.0112)) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_3.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_4.changeLocationX_and_Y(0.8 - (0.125 - (0.0352 + 0.0112)) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_4.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_5.changeLocationX_and_Y(0.8 - (0.125 - (0.0464 + 0.0112)) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_5.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
                SP_5.ANIMATE_2STATE_FUNC_LOOP_OPACITY(DELTATIME, 15000, 1, 0)
                break;
            
            case 6:
                SP_1.resetValueAnim()
                SP_2.resetValueAnim()
                SP_3.resetValueAnim()
                SP_4.resetValueAnim()
                SP_5.resetValueAnim()
    
                SP_1.changeLocationX_and_Y(0.8 - (0.125 - 0.0128) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_1.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_2.changeLocationX_and_Y(0.8 - (0.125 - 0.024) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_2.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_3.changeLocationX_and_Y(0.8 - (0.125 - (0.024 + 0.0112)) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_3.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_4.changeLocationX_and_Y(0.8 - (0.125 - (0.0352 + 0.0112)) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_4.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_5.changeLocationX_and_Y(0.8 - (0.125 - (0.0464 + 0.0112)) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_5.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
                break;
    
            default:
                console.log(`SKILL ISSUE (SP EDITION)`)
                break;
        }
    }
    else
    {
        switch(skillPoint)
        {
            case 1:

    
                SP_1.changeLocationX_and_Y(0.8 - (0.125 - 0.0128) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_1.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
                break;
    
            case 2:
                SP_1.changeLocationX_and_Y(0.8 - (0.125 - 0.0128) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_1.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
    
                SP_2.changeLocationX_and_Y(0.8 - (0.125 - 0.024) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_2.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
                break;
    
            case 3:
                SP_1.changeLocationX_and_Y(0.8 - (0.125 - 0.0128) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_1.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_2.changeLocationX_and_Y(0.8 - (0.125 - 0.024) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_2.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_3.changeLocationX_and_Y(0.8 - (0.125 - (0.024 + 0.0112)) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_3.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
                break;
    
            case 4:
                SP_1.changeLocationX_and_Y(0.8 - (0.125 - 0.0128) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_1.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_2.changeLocationX_and_Y(0.8 - (0.125 - 0.024) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_2.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_3.changeLocationX_and_Y(0.8 - (0.125 - (0.024 + 0.0112)) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_3.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_4.changeLocationX_and_Y(0.8 - (0.125 - (0.0352 + 0.0112)) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_4.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE       
                break;
    
            case 5:
                SP_1.changeLocationX_and_Y(0.8 - (0.125 - 0.0128) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_1.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_2.changeLocationX_and_Y(0.8 - (0.125 - 0.024) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_2.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_3.changeLocationX_and_Y(0.8 - (0.125 - (0.024 + 0.0112)) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_3.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_4.changeLocationX_and_Y(0.8 - (0.125 - (0.0352 + 0.0112)) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_4.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
            
                SP_5.changeLocationX_and_Y(0.8 - (0.125 - (0.0464 + 0.0112)) + SP_Hidden_var, 0.858 + (0.014 - 0.009))//X AND Y LOC
                SP_5.drawAnimation_oten(1 * 0.02, 1 * 0.04)//X AND Y SIZE
                break;
    
            default:
                console.log(`SKILL ISSUE (SP EDITION)`)
                break;
        }
    }
    
    
}
                

basicAttack = new Updated_MikeAnimation_1Frame(Packed_Image_3_src, 0, 0, 487, 500, 83, true)
skillAttack = new Updated_MikeAnimation_1Frame(Packed_Image_3_src, 1461, 0, 487, 500, 83, true)

enemyTurn_UI = new Updated_MikeAnimation_1Frame(Packed_Image_3_src, 487, 0, 487, 500, 83, true)
yourTurn_UI = new Updated_MikeAnimation_1Frame(Packed_Image_3_src, 2048, 1500, 487, 500, 83, true)
ultimateAttack_Button = new Updated_MikeAnimation_1Frame(Packed_Image_3_src, 2048, 1000, 487, 500, 83, true)
function Buttons()
{

                                                                //locx, locY, sizeX, sizeY, imageX, imageY
    basicAttack.ANIMATE_2STATE_FUNC_LOOP(DELTATIME, QPressed,   0.8 - 0.04  + Buttons_Hidden_var, 0.684 + 0.045, 4.87 * (0.037 - 0.0135 ), 5 * (0.037 + 0.002 ) ,0 ,0,
                                                                0.7 + 0.09  + Buttons_Hidden_var, 0.684 + 0.103, 4.87 * (0.0285 - 0.0127), 5 * (0.0255 + 0.001) ,0 ,0, 1000)

    skillAttack.ANIMATE_2STATE_FUNC_LOOP(DELTATIME, EPressed,   0.76 + 0.105  + Buttons_Hidden_var, 0.729 - 0.13, 4.87 * (0.037 - 0.0135 ), 5 * (0.037 + 0.002) ,0 ,0,
                                                                (0.76 + 0.03) + 0.105  + Buttons_Hidden_var, (0.729 + 0.058)  - 0.13, 4.87 * (0.0285 - 0.0127), 5 * (0.0255 + 0.001) ,0 ,0, 1000) 
                                             

    if(drawYourTurn)
    {
        yourTurn_UI.changeLocationX_and_Y(0.8 + 0.035, 0.684 + 0.027)//X AND Y LOC
        yourTurn_UI.drawAnimation_oten(4.87 * 0.03, 5 * (0.03 + 0.02))//X AND Y SIZE
    }

    if(drawEnemyTurn)
    {
        enemyTurn_UI.changeLocationX_and_Y(0.8 + 0.035, 0.684 + 0.027)//X AND Y LOC
        enemyTurn_UI.drawAnimation_oten(4.87 * 0.03, 5 * (0.03 + 0.02))//X AND Y SIZE
    }

    if(drawUltimateButton)
    {
        ultimateAttack_Button.changeLocationX_and_Y(0.8 + 0.035, 0.684 + 0.035)//X AND Y LOC
        ultimateAttack_Button.drawAnimation_oten(4.87 * (0.0375 - 0.0135 ), 5 * (0.0375 + 0.002 ))//X AND Y SIZE
    }
}

vignette_src = `SpriteSheet For Game (Updatedyawa)\\NEW IMAGES\\Vignette.png`
vignette = new Updated_MikeAnimation_1Frame(vignette_src, 0, 0, 2048, 1024, 83, true)

characterDamage_Display = new HPUI_Text(true, 83, true, true) 
characterDamage_Crit_Display = new HPUI_Text(true, 83, true, true) 

blackPusaDamage_Display = new HPUI_Text(true, 83, true, true) 
yellowPusaDamage_Display = new HPUI_Text(true, 83, true, true) 

function characterDamageChecker(characterDamage)
{
    if(characterDamage <= 9)
    {
        return 0.06
    }
    else if(characterDamage <= 99)
    {
        return 0.035
    }
    else if(characterDamage <= 999)
    {
        return 0.015
    }
    else if(characterDamage <= 9999)
    {
        return -0.005
    }
    else if(characterDamage <= 99999)
    {
        return -0.02
    }
    else if(characterDamage <= 999999)
    {
        return -0.04
    }
    else if(characterDamage <= 9999999)
    {
        characterDamage = `NIGGER`
        return -0.06
    }
}   

let firstOpacityDone = false

let ifMCDoNormalDamage = false
let ifMCDoCritDamage = false

let ifBlackPusaAttack = false
let ifYellowPusaAttack = false

function displayDamage()
{
    //IFCRIT
    let base_crit_bluegradient1 = createRGBA(121, 206, 247, 0); //0 opacity
    let tar_crit_bluegradient1 = createRGBA(121, 206, 247, 1); //1 opacity

    let base_crit_bluegradient2 = createRGBA(247, 252, 255, 0); //0 opacity
    let tar_crit_bluegradient2 = createRGBA(247, 252, 255, 1); //1 opacity

    let borderColor = createRGBA(3, 7, 29, 1) //1 Opacity
    let borderColorInvis = createRGBA(3, 7, 29, 0) //0 Opacity

    //IFNOTCRIT
    let base_bluecolor1 = createRGBA(93, 204, 253, 0); //0 opacity
    let tar_bluecolor1 = createRGBA(93, 204, 253, 1); //1 opacity

    //IFENEMY
    let base_graycolor1 = createRGBA(150, 159, 162, 0); //0 opacity
    let tar_graycolor1 = createRGBA(150, 159, 162, 1); //1 opacity
    

    //IF YELLOW PUSA
    if(ifYellowPusaAttack)
    {
        //TEXT SIZE ANIMATION
        if(!yellowPusaDamage_Display.variable)
        {
            //VARIABLE
            yellowPusaDamage_Display.new_Anim_2State_Create_SizeMult_and_BorderSize(0.08, 0.03, 3000, 0.03); //BaseMult, TarMult, Durantion, BorderSize
        }

        //OPACITY AND COLOR ANIMATION
        if(!yellowPusaDamage_Display.variable2)
        {
            //VARIABLE2
            if(firstOpacityDone)
            {
                yellowPusaDamage_Display.new_Anim_2State_TextDesign_Opacity(tar_graycolor1, base_graycolor1, borderColor, borderColorInvis, 12000)
            }
            else
            {
                yellowPusaDamage_Display.new_Anim_2State_TextDesign_Opacity(base_graycolor1, tar_graycolor1, borderColor, borderColor, 10000)
            }
        } 
        else
        {
            //NONE VAR
            yellowPusaDamage_Display.new_TextDesign(`rgba(150, 159, 162, 1)`, `rgba(3, 7, 29, 1)`); //FontCol., BorderCol., 
        }

        let position 
        position = characterDamageChecker(BlackPusaDamage)
        
        //POSITION ANIMATION
        if(yellowPusaDamage_Display.variable)
        {
            if(!yellowPusaDamage_Display.variable1)
            {
                //VARIABLE1
                yellowPusaDamage_Display.new_Anim_2State__renderImage_PosXY  (1000, //TEXT
                    0.18,   0.18, //X
                    0.5,            0.5 - (0.01), //Y
                    30000)                        //Duration
            }
            else
            {
                //NONE VAR
                yellowPusaDamage_Display.new_renderImage_PosXY(1000, 0.18, 0.5 - (0.01))
            }
        }
        else
        {
            yellowPusaDamage_Display.new_renderImage_PosXY(1000, 0.18, 0.5) //Text, X, Y
        }   

        //SHIT BRANCHING
        if(yellowPusaDamage_Display.variable)
        {
            if(yellowPusaDamage_Display.variable1)
            {
                if(yellowPusaDamage_Display.variable2)
                {
                    firstOpacityDone = true
                    yellowPusaDamage_Display.variable2 = false
                }
            }
        }
    }

    //IF BLACK PUSA
    if(ifBlackPusaAttack)
    {
        //TEXT SIZE ANIMATION
        if(!blackPusaDamage_Display.variable)
        {
            //VARIABLE
            blackPusaDamage_Display.new_Anim_2State_Create_SizeMult_and_BorderSize(0.08, 0.03, 3000, 0.03); //BaseMult, TarMult, Durantion, BorderSize
        }

        //OPACITY AND COLOR ANIMATION
        if(!blackPusaDamage_Display.variable2)
        {
            //VARIABLE2
            if(firstOpacityDone)
            {
                blackPusaDamage_Display.new_Anim_2State_TextDesign_Opacity(tar_graycolor1, base_graycolor1, borderColor, borderColorInvis, 12000)
            }
            else
            {
                blackPusaDamage_Display.new_Anim_2State_TextDesign_Opacity(base_graycolor1, tar_graycolor1, borderColor, borderColor, 10000)
            }
        } 
        else
        {
            //NONE VAR
            blackPusaDamage_Display.new_TextDesign(`rgba(150, 159, 162, 1)`, `rgba(3, 7, 29, 1)`); //FontCol., BorderCol., 
        }
        
        let position 
        position = characterDamageChecker(BlackPusaDamage)

        //POSITION ANIMATION
        if(blackPusaDamage_Display.variable)
        {
            if(!blackPusaDamage_Display.variable1)
            {
                //VARIABLE1
                blackPusaDamage_Display.new_Anim_2State__renderImage_PosXY  (BlackPusaDamage, //TEXT
                    0.18,   0.18, //X
                    0.5,            0.5 - (0.01), //Y
                    30000)                        //Duration
            }
            else
            {
                //NONE VAR
                blackPusaDamage_Display.new_renderImage_PosXY(BlackPusaDamage, 0.18, 0.5 - (0.01))
            }
        }
        else
        {
            blackPusaDamage_Display.new_renderImage_PosXY(BlackPusaDamage, 0.18, 0.5) //Text, X, Y
        }   

        //SHIT BRANCHING
        if(blackPusaDamage_Display.variable)
        {
            if(blackPusaDamage_Display.variable1)
            {
                if(blackPusaDamage_Display.variable2)
                {
                    firstOpacityDone = true
                    blackPusaDamage_Display.variable2 = false
                }
            }
        }

        if(blackPusaDamage_Display.elapsed1 >= 30000)
        {
            blackPusaDamage_Display.resetEverything()
            firstOpacityDone = false
            ifBlackPusaAttack = false;
        }
    }

    //MC
    //IF CRIT
    if(ifMCDoCritDamage)
    {
        //CRIT HIT WORD
        if(!characterDamage_Crit_Display.variable)
        {
            //variable
            characterDamage_Crit_Display.new_Anim_2State_Create_SizeMult_and_BorderSize(0.08, 0.027, 3000, 0.03);
        }
        
        if(!characterDamage_Crit_Display.variable2)
        {
            //variable2
            characterDamage_Crit_Display.new_Anim_2State_CreateColorGradient   (tar_crit_bluegradient1 ,tar_crit_bluegradient1,    //BASECOLOR AND TARCOLOR (GRADIENT1)
                                                                                tar_crit_bluegradient2, tar_crit_bluegradient2,    //BASECOLOR AND TARCOLOR (GRADIENT2)
                                                                                borderColor,  0, 0, 0, canvas.height * 0.70,        //BORDERCOLOR AND GRADIENT COLOR
                                                                                10000, true); 
        }
        
        if(!characterDamage_Crit_Display.variable1)
        {
            //variable1                                                               
            characterDamage_Crit_Display.new_Anim_2State__renderImage_PosXY    (`CRIT HIT`, //TEXT
                                                                                0.5,   0.5, //BASEX AND TARX
                                                                                0.5 + (0.017),  0.5 - (0.029),    //BASEY AND TARY  //0.5 + (0.01)
                                                                                40000)  
        }





        //NUMBER DAMAGE
        if(!characterDamage_Display.variable)
        {
            //variable
            characterDamage_Display.new_Anim_2State_Create_SizeMult_and_BorderSize(0.2, 0.07, 3000, 0.03) //BaseMult, TarMult, Durantion, BorderSize
        }
        else
        {
            //draw static after size
            characterDamage_Display.new_Create_SizeMult_and_BorderSize(0.07, 0.03)
        }

        if(!characterDamage_Display.variable3)
        {
            if(!firstOpacityDone)
            {
                //variable3
                characterDamage_Display.new_Anim_2State_ChangeOpacity(0, 1, 2000)
                characterDamage_Crit_Display.opacity = characterDamage_Display.opacity
            } 
            else
            {
                if(characterDamage_Display.variable1)
                {
                    //variable3
                    characterDamage_Display.new_Anim_2State_ChangeOpacity(1, 0, 10000)
                    characterDamage_Crit_Display.opacity = characterDamage_Display.opacity
                    console.log(`OPACITY EXEC`)
                }
                
            }
        }
        
        
        if(!characterDamage_Display.variable2)
        {
            if(!firstOpacityDone)
            {
                //variable2
                characterDamage_Display.new_Anim_2State_CreateColorGradient(base_crit_bluegradient1 ,tar_crit_bluegradient1,    //BASECOLOR AND TARCOLOR (GRADIENT1)
                                                                            base_crit_bluegradient2, tar_crit_bluegradient2,    //BASECOLOR AND TARCOLOR (GRADIENT2)
                                                                            borderColor,  0, 0, 0, canvas.height * 0.70,        //BORDERCOLOR AND GRADIENT COLOR
                                                                            10000, true);                                       //DURAT`ION and if change opacity                                                  
            }
            else
            {
                //variable2
                characterDamage_Display.new_Anim_2State_CreateColorGradient(base_crit_bluegradient1 ,tar_crit_bluegradient1,    //BASECOLOR AND TARCOLOR (GRADIENT1)
                                                                            base_crit_bluegradient2, tar_crit_bluegradient2,    //BASECOLOR AND TARCOLOR (GRADIENT2)
                                                                            borderColor,  0, 0, 0, canvas.height * 0.70,        //BORDERCOLOR AND GRADIENT COLOR
                                                                            80000, true);                                       //DURATION and if change opacity
            }
            
        }
        else
        {
            if(!firstOpacityDone)
            {
                firstOpacityDone = true
                characterDamage_Display.resetVar3()
                characterDamage_Display.resetVar2()
                console.log(`RESETER EXECUTED`)
            }  
        }
        
        let position 
        position = characterDamageChecker(MCDamage)

        if(!characterDamage_Display.variable1)
        {
            //variable1
            characterDamage_Display.new_Anim_2State__renderImage_PosXY(MCDamage, //TEXT
                0.5 - (0.024) + position,   0.5 - (0.024) + position, //BASEX AND TARX
                0.5 + (0.15),   0.5 + 0.076,    //BASEY AND TARY 
                40000)                          //Duration
        }                
        
        if(characterDamage_Display.elapsed1 >= 40000)
        {
            characterDamage_Display.resetEverything()
            characterDamage_Crit_Display.resetEverything()
            firstOpacityDone = false
            ifMCDoCritDamage = false;
        }
        
    }
    //IF NOT CRIT
    if(ifMCDoNormalDamage)
    {
        //TEXT SIZE ANIMATION
        if(!characterDamage_Display.variable)
        {
            //VARIABLE
            characterDamage_Display.new_Anim_2State_Create_SizeMult_and_BorderSize(0.08, 0.03, 3000, 0.03); //BaseMult, TarMult, Durantion, BorderSize
        }

        //OPACITY AND COLOR ANIMATION
        if(!characterDamage_Display.variable2)
        {
            //VARIABLE2
            if(firstOpacityDone)
            {
                characterDamage_Display.new_Anim_2State_TextDesign_Opacity(tar_bluecolor1, base_bluecolor1, borderColor, borderColorInvis, 12000)
            }
            else
            {
                characterDamage_Display.new_Anim_2State_TextDesign_Opacity(base_bluecolor1, tar_bluecolor1, borderColor, borderColor, 10000)
            }
        } 
        else
        {
            //NONE VAR
            characterDamage_Display.new_TextDesign(`rgba(93, 204, 253, 1)`, `rgba(3, 7, 29, 1)`); //FontCol., BorderCol., 
        }
        let position 
        position = characterDamageChecker(MCDamage)

        
        //POSITION ANIMATION
        if(characterDamage_Display.variable)
        {
            if(!characterDamage_Display.variable1)
            {
                //VARIABLE1
                characterDamage_Display.new_Anim_2State__renderImage_PosXY  (MCDamage, //TEXT
                    0.5 + (0.03) + position,   0.5 + (0.03) + position, //X
                    0.5,            0.5 - (0.01), //Y
                    30000)                        //Duration
            }
            else
            {
                //NONE VAR
                characterDamage_Display.new_renderImage_PosXY(MCDamage, 0.5 + (0.03) + position, 0.5 - (0.01))
            }
        }
        else
        {
            characterDamage_Display.new_renderImage_PosXY(MCDamage, 0.5 + (0.03) + position, 0.5) //Text, X, Y
        }   

        //SHIT BRANCHING
        if(characterDamage_Display.variable)
        {
            if(characterDamage_Display.variable1)
            {
                if(characterDamage_Display.variable2)
                {
                    firstOpacityDone = true
                    characterDamage_Display.variable2 = false
                }
            }
        }

        //RESETTER
        if(characterDamage_Display.elapsed1 >= 30000)
        {
            characterDamage_Display.resetEverything()
            firstOpacityDone = false
            ifMCDoNormalDamage = false;
        }
    }
}