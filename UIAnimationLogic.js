class UiMikeAnimation
{
    constructor(TextureLocation, locX, locY, sizeX, sizeY)
    {
        this.Texture = TextureLocation;
        this.locX = locX;
        this.locY = locY;
        this.sizeX = sizeX;
        this.sizeY = sizeY;

        this.posX = canvas.width * .05;
        this.posY = canvas.width * .05;
    }
}

//UI ELEMENTS
const UIElements = new Image();
UIElements.src = `SpriteSheet For Game (Updatedyawa)\\NEW IMAGES\\Packed Image 2.png`

yellowPusa_UI = new UiMikeAnimation (UIElements, 0, 0, 500, 500)
blackPusa_UI = new UiMikeAnimation (UIElements, 500, 0, 500, 500)
furina_UI = new UiMikeAnimation (UIElements, 1000, 0, 344, 363)
currentTurn_UI = new UiMikeAnimation (UIElements, 1344, 0, 200, 100)
notCurrentTurn_UI = new UiMikeAnimation (UIElements, 1544, 0, 200, 100)





let Y_FOR_UI = canvas.height * 0.02
let Y_FOR_UI2 = canvas.height * 0.08
window.addEventListener('wheel', function(event) {
    if(event.ctrlKey)
    {
        Y_FOR_UI = canvas.height * 0.02
        Y_FOR_UI2 = canvas.height * 0.08
    }
});





function mikeCurrentUI
    (UIEl1, UIEl2, //TEXTURE 1 AND 2
    tarX, tarY, //TARGETPOSX AND Y
    DW1, DH1,   //TEXTURE 1 DESTINATION WIDTH AND HEIGHT
    DW2, DH2,   //TEXTURE 2 DESTINATION WIDTH AND HEIGHT
    characters
    )
{
    UIEl1.posX = canvas.width*0.012;//0.012
    UIEl1.posY = canvas.height*0.035;//0.035

    ctx.drawImage(UIEl1.Texture, UIEl1.locX, UIEl1.locY, UIEl1.sizeX, UIEl1.sizeY,
            UIEl1.posX + tarX, 
            UIEl1.posY + tarY, 
            canvas.width * DW1,
            canvas.height * DH1);
    
    ctx.drawImage(UIEl2.Texture, UIEl2.locX, UIEl2.locY, UIEl2.sizeX, UIEl2.sizeY, 
            UIEl1.posX + UIEl1.posX * 2 + tarX,
            UIEl1.posY + UIEl1.posY * -0.98 + tarY,
            canvas.width * DW2, 
            canvas.height * DH2);
            
    ctx.fillStyle = `black` 
    ctx.fillRect(UIEl1.posX + UIEl1.posX * 5.7 + tarX,
            UIEl1.posY + UIEl1.posY * 1.74 + tarY,
            canvas.width * 0.025 ,canvas.height * 0.014)

    text = characters[0].currentActionValue
    // console.log(characters[0])
    // console.log(`CURRENTAV(CURRENT): ${text}`)
    fontSize = canvas.width * 0.0115;

    ctx.font = fontSize + `px Arial`; 
            
    ctx.fillStyle = 'white'; 

    ctx.fillText(text, 
            UIEl1.posX + UIEl1.posX * 5.9 + tarX, 
            UIEl1.posY + UIEl1.posY * 2.1 + tarY);
}

class UIAnimation_Current
{
    constructor(Texture1, Texture2)
    {
        this.Texture1 = Texture1;
        this.Texture2 = Texture2;

        //basehan kung mo hide ba ang ui (main animation loop)
        this.displayedBefore = false;

        //X
        this.distance = 0;
        this.distance2 = 0;
        this.tarPosX = canvas.width * this.distance;

        //Y
        this.tarPosY = Y_FOR_UI;

    }

    makeTexture(
        DW1, DH1,
        DW2, DH2, 
        characters)
    {
        mikeCurrentUI(this.Texture1, this.Texture2, this.tarPosX, this.tarPosY, 
            DW1, DH1,
            DW2, DH2, characters)
    }

    calculateTarPosX()
    {
        this.tarPosX = canvas.width * this.distance;
    }

    animateX()
    {
        if(this.distance != this.distance2)
        {
            console.log(`exec`)
            if(this.distance < this.distance2)
            {
                this.distance += .03
            }
            else if(this.distance > this.distance2)
            {
                this.distance -= .03
            }
            this.calculateTarPosX();
        }
    }
    
    showUI()
    {
        this.distance2 = 0;
        this.distance = 0;
        this.calculateTarPosX();
    }

    hideUI()
    {
        this.distance2 = -0.15;
        this.distance = -0.15;
        this.calculateTarPosX();
    }

    async checkIfFinishedAnimation()
    {
        while(this.distance != this.distance2)
        {
            await new Promise(resolve => setTimeout(resolve, 100));   
        }
        return true;
    }
}

Furina_0 = new UIAnimation_Current(notCurrentTurn_UI, furina_UI);
ChonkerCat_0 = new UIAnimation_Current(notCurrentTurn_UI, yellowPusa_UI);
NiggaCat_0 = new UIAnimation_Current(notCurrentTurn_UI, blackPusa_UI);  





function mikeNotCurrentUI
    (UIEl1, UIEl2, //TEXTURE 1 AND 2
    tarX, tarY, //TARGETPOSX AND Y
    Tex2LocYMultiplier, //Texture 2 locY multiplier (crop)
    Tex2PosYMultiplier,
    DW1, DH1,   //TEXTURE 1 DESTINATION WIDTH AND HEIGHT
    DW2, DH2,   //TEXTURE 2 DESTINATION WIDTH AND HEIGHT
    characters,
    actionValue
    )
{
    UIEl1.posX = canvas.width*0.012;//0.012
    UIEl1.posY = canvas.height*0.035;//0.035

    ctx.drawImage(UIEl2.Texture, UIEl2.locX,  //NAA DIRI TEXTURE 2 
        UIEl2.locY + Tex2LocYMultiplier, 
        UIEl2.sizeX, UIEl2.sizeY, 
        UIEl1.posX + UIEl1.posX * 2 + tarX,
        UIEl1.posY * Tex2PosYMultiplier + tarY,
        canvas.width * DW2, 
        canvas.height * DH2);

    ctx.fillStyle = `black` 
    ctx.fillRect(UIEl1.posX + UIEl1.posX * 4.9 + tarX,
            UIEl1.posY + UIEl1.posY * 1.3 + tarY,
            canvas.width * 0.025 ,canvas.height * 0.014)

    text = actionValue;

    fontSize = canvas.width * 0.0115;

    ctx.font = fontSize + `px Arial`; 
            
    ctx.fillStyle = 'white'; 

    ctx.fillText(text, 
            UIEl1.posX + UIEl1.posX * 5.18 + tarX, 
            UIEl1.posY + UIEl1.posY * 1.65 + tarY);

    ctx.drawImage(UIEl1.Texture, UIEl1.locX, UIEl1.locY, UIEl1.sizeX, UIEl1.sizeY, //NAA DIRI TEXTURE 1 DEFERRED RENDERING SHIT
        UIEl1.posX + tarX, 
        UIEl1.posY + tarY, 
        canvas.width * DW1,
        canvas.height * DH1);
}

class UIAnimation_NOT_Current
{
    constructor(Texture1, Texture2, characterName)
    {
        this.Texture1 = Texture1;
        this.Texture2 = Texture2;

        //basehan kung mo hide ba ang ui (main animation loop)
        this.hiddenUI = false;

        //X
        this.distance = 0;
        this.distance2 = 0;
        this.tarPosX = canvas.width * this.distance;

        //y
        this.tarPosYMult = 0;
        this.tarPosYMult2 = 0;
        this.tarPosY = Y_FOR_UI + Y_FOR_UI2 * this.tarPosYMult;

        //array part
        this.followedCharacterName = characterName;
        this.IDOfArrayFollowed;
        this.following = false;
        this.isDead = false;

        
        this.currentArrOfFollowedArr;
        this.actualActionValue = 0
    }

    makeTexture(
        Tex2LocYMultiplier,
        Tex2PosYMultiplier,
        DW1, DH1,
        DW2, DH2,
        characters)
    {
        this.calculateTarPosX();
        this.calculateTarPosY();
        mikeNotCurrentUI(this.Texture1, this.Texture2, this.tarPosX, this.tarPosY,
            Tex2LocYMultiplier, 
            Tex2PosYMultiplier, 
            DW1, DH1,
            DW2, DH2,
            characters, this.actualActionValue)
    }

    calculateTarPosX()//for hideui
    {
        this.tarPosX = canvas.width * this.distance;
    }

    calculateTarPosY()//for hideui
    {
        this.tarPosY = Y_FOR_UI + Y_FOR_UI2 * this.tarPosYMult;
    }

    hideUI()
    {
        this.distance2 = -0.15;
        this.distance = -0.15;
        this.calculateTarPosX();
    }

    goToLoc0()
    {
        this.tarPosYMult = 0.5;
        this.tarPosYMult2 = 0.5;
        this.calculateTarPosY()
    }

    goToLoc1()
    {
        this.tarPosYMult = 1;
        this.tarPosYMult2 = 1;
        this.calculateTarPosY()
    }

    goToLoc2()
    {
        this.tarPosYMult = 1.8;
        this.tarPosYMult2 = 1.8;
        this.calculateTarPosY()
    }

    goToLoc3()
    {
        this.tarPosYMult = 2.6;
        this.tarPosYMult2 = 2.6;
        this.calculateTarPosY()
    }   

    followArray(characters)//get the unique ID
    {
        for(let i = 1; i < characters.length; i++)
        {
            if(!this.following)
            {
                if(this.followedCharacterName == characters[i].name)
                {
                    this.IDOfArrayFollowed = characters[i].uniqueID;
                    this.following = true;
                }
            }
        }
    }

    getCurrentArray(characters)// get the currentArray for the array to follow NAA PUD DIRI GI 69 ANG currentArrOfFollowedArr
    {
        if(!this.isDead)
        {
            for(let i = 1; i < characters.length; i++)
            {
                if(this.followedCharacterName == characters[i].name)
                {
                    if(this.IDOfArrayFollowed == characters[i].uniqueID)
                    {
                        this.currentArrOfFollowedArr = i;
                    }
                }  
            } 
        }
        else
        {
            this.currentArrOfFollowedArr = 69
        }
        this.update_actualActionValue()
    }

    resetFollowArray()
    {
        this.IDOfArrayFollowed = null;
        this.following = false;
        this.currentArrOfFollowedArr = null;
    }

    assignLocationFirstTime() //Diritcho sa ila position
    {
        switch(this.currentArrOfFollowedArr)
        {
            case 1:
                this.goToLoc1()
                break;

            case 2:
                this.goToLoc2()
                break;

            case 3:
                this.goToLoc3()
                break;

            case 69:
                this.hideUI_PREP()
                break;

            default:
                break;
        }
    }

    goToLoc0_Anim(characters)
    {
        this.tarPosYMult2 = 0;
        // characters[1].cssBlurEffect = false;
        // characters[this.currentArrOfFollowedAr].currentActionValue = 0;
    }

    goToLoc1_Anim()
    {
        this.tarPosYMult2 = 1
    }

    goToLoc2_Anim()
    {
        this.tarPosYMult2 = 1.8
    }

    goToLoc3_Anim()
    {
        this.tarPosYMult2 = 2.6
    }  

    checkAndAssignForAnimation()
    {
        switch(this.currentArrOfFollowedArr)
        {
            case 1:
                this.goToLoc1_Anim();
                this.cssBlurEffect_GOTORIGHT(characters)
                this.calculateTarPosX();
                break;

            case 2:
                this.goToLoc2_Anim();
                this.cssBlurEffect_GOTORIGHT(characters)
                this.calculateTarPosX();
                break;

            case 3:
                this.goToLoc3_Anim();
                this.cssBlurEffect_GOTORIGHT(characters)
                this.calculateTarPosX();
                break;

            case 69:
                this.hideUI_PREP()
                break;

            default:
                
                break;
        }
    }

    animateY()
    {
        if(this.tarPosYMult != this.tarPosYMult2)
        {
            if(this.tarPosYMult < this.tarPosYMult2)
            {
                this.tarPosYMult += .05
            }
            
            if(this.tarPosYMult > this.tarPosYMult2)
            {
                this.tarPosYMult -= .05
            }
            this.calculateTarPosY();
        }
    }

    animateX()
    {
        if(this.distance != this.distance2)
        {
            if(this.distance < this.distance2)
            {
                this.distance += .03
            }
            else if(this.distance > this.distance2)
            {
                this.distance -= .03
            }
            this.calculateTarPosX();
        }
    }

    hideUI_PREP()
    {
        this.distance = -0.15;
        this.distance2 = -0.15;
        this.calculateTarPosX();

        this.goToLoc3();
        this.hiddenUI = true
    }

    showUi_ANIM()
    {
        this.distance2 = 0;
        if(this.distance >= this.distance2)
        {
            this.hiddenUI = false;
        } 
        this.animateX()
    }

    cssBlurEffect_GOTORIGHT(characters)
    {
        if(characters[this.currentArrOfFollowedArr].cssBlurEffect)
        {
            this.distance2 = 0.03;  
            // canvas.width*0.012
        }
        else
        {
            this.distance2 = 0;  
        }
    }

    update_actualActionValue()
    {
        if(!this.isDead)
        {
            this.actualActionValue = characters[this.currentArrOfFollowedArr].currentActionValue
        }
        else
        {
            this.actualActionValue = 69;
        }
    }

    // cssBlurEffect_Animation()
    // {
    //     let temp = 0;
    //     let targetTemp = 0.08;

    //     this.distance2 = temp
    //     this.distance = temp

    //     this.cssBlurEffect_Animation_called(temp, targetTemp)
    // }

    // cssBlurEffect_Animation_called(temp, targetTemp)
    // {
    //     if(temp < targetTemp)
    //     {
    //         temp += 0.003;
    //     }

    //     if(temp >= targetTemp)
    //     {
    //         temp -= 0.003;
    //     }
    //     this.calculateTarPosX();
    // }
}

Furina_N_C = new UIAnimation_NOT_Current(currentTurn_UI, furina_UI, "Furina");
ChonkerCat_N_C = new UIAnimation_NOT_Current(currentTurn_UI, yellowPusa_UI, "Chonker Cat");
NiggaCat_N_C = new UIAnimation_NOT_Current(currentTurn_UI, blackPusa_UI, "Nigga Cat");