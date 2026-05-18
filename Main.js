const ctx = canvas.getContext(`2d`);
document.addEventListener('keydown', handleKeyDown);

function UpdateGridSpriteSheet(MikeAnimation, difference) // SWITCHTIME = 83 (0.0833) 12FPS
{
    if(difference > 83)
    {
        if(MikeAnimation.positionX < MikeAnimation.FrameLimitX)
        {
            MikeAnimation.positionX++;
            MikeAnimation.CurrentImageX = MikeAnimation.imageWidth * MikeAnimation.positionX;
            then=now;

            if(MikeAnimation.positionX == MikeAnimation.FrameLimitX)
            {
                MikeAnimation.CurrentImageX = 0;

                if(MikeAnimation.positionY < MikeAnimation.FrameLimitY)
                {
                    MikeAnimation.positionY++;
                    MikeAnimation.CurrentImageY = MikeAnimation.imageHeight * MikeAnimation.positionY;
                }

                MikeAnimation.positionX = 0;
            }
        }   
    }
}

function UpdateHorizontalSpriteSheet(MikeAnimation, difference) // SWITCHTIME = 83 (0.0833) 12FPS
{
    if(difference > 83)
    {
        if(MikeAnimation.positionX < MikeAnimation.FrameLimitX)
        {
            MikeAnimation.positionX++;
            MikeAnimation.CurrentImageX = MikeAnimation.imageWidth * MikeAnimation.positionX;
            then = now;

            if(MikeAnimation.positionX == MikeAnimation.FrameLimitX)
            {
                MikeAnimation.CurrentImageX = 0;
                MikeAnimation.positionX = 0;
            }
        }
    }

    /*0 = Blank
    1 = First Idle Loop
    2 = Breathing Loop
    3 = Basic Attack
    4 = Skill
    5 = Black Pusa = Enemy 1
    6 = Yellow Pusa = Enemy 2*/

    //image,(SOURCE)X, SY, SWIDTH, SHEIGHT, DESTINATIONX, DY, DWIDTH, DHEIGHT

    // console.log(`X:${Furina_Breathing.CurrentImageX} XP:${Furina_Breathing.positionX} Y:${Furina_Breathing.CurrentImageY} YP:${Furina_Breathing.positionY}`)
}

function updateActionValue(characters)
{
    //remove character[0] and rearrange array and make the CURRENT character[0] in the low part of TurnOrder and make it blurry
    CONTINOUS_TurnOrderDisplay_CurrentCharacterPush(characters)

    //Do formula to get CurrentActionValue for all char 
    CONTINOUS_AssignAndGetCurrentActionValue(characters)

    //sort the array characters based on CURRENT_ACTION_VALUE (DLI PARIHA SA SORT SA FIRST)
    characters.sort(CurrentValueSorter);

    //Display in console
    console.log(``);
    TurnOrderDisplay_DisplayCurrentActionOrder(characters);
}

function characterAnimationTurnUpdater(characters)//2nd
{
    updateActionValue(characters)
    if(characters[0].player)
    {
        animationNumber = 2;
    }
    else
    {
        for(let character of characters)
        {
             if(character.name == "Nigga Cat")
            {
                animationNumber = 5;
            }
            else if (character.name == "Chonker Cat")
            {
                animationNumber = 6;
            }
        }
    }
}

function characterAnimationTurn_FOR_ULTIMATE(characters) //no UPDATE ACTION VALUE
{
    if(characters[0].player)
    {
        animationNumber = 2;
    }
    else
    {
        for(let character of characters)
        {
             if(character.name == "Nigga Cat")
            {
                animationNumber = 5;
            }
            else if (character.name == "Chonker Cat")
            {
                animationNumber = 6;
            }
        }
    }
}

function updateActionValue_Ultimate(characters) //1st
{
    let tempCharStor = [];

    for (let i = 1; i < characters.length; i++)
    {
        tempCharStor[i] = characters[i];
    }
    characters.splice(1,characters.length);

    currentCharacter_LASTPUSH_DEEPCOPY = Object.assign({}, Furina);
    currentCharacter_LASTPUSH_DEEPCOPY.ultimateAnimation = true
    characters.push(currentCharacter_LASTPUSH_DEEPCOPY);

    for(let i = 1; i < tempCharStor.length; i++)//lantawa nang tempcharstor[1]
    {
        characters.push(tempCharStor[i])
    }

    TurnOrderDisplay_DisplayCurrentActionOrder(characters)
}

function updateActionValue_Ultimate_Ending(characters)
{
    let tempCharStor = []

    for (let i = 1; i < characters.length; i++)
    {
        tempCharStor[i-1] = characters[i];
    }
    characters.splice(0,1);

    for(let i = 0; i < tempCharStor.length; i++)//lantawa nang tempcharstor[1]
    {
        characters[i] = tempCharStor[i]
    }

    TurnOrderDisplay_DisplayCurrentActionOrder(characters)
}

function handleKeyDown(event) //fix spamable q and ultimate
{
    if (event.key === 'p' || event.key === 'P') 
    {
        animationNumber = 0;
        console.log('STOP');
    }

    if(canPressKeys)
    {
        for(let character of based2ndCharacters)
        {
            if(character.name == "Chonker Cat")
            {
                if(character.isDead)
                {
                    attackRight = true;
                }
                else
                {
                    if(event.key === 'ArrowLeft')
                    {
                        console.log(`Left`);
                        attackRight = false;
                    }
                }
            }
            if(character.name == "Nigga Cat")
            {
                if(character.isDead)
                {
                    attackRight = false;
                }
                else
                {
                    if(event.key === 'ArrowRight')
                    {
                        console.log(`Right`);
                        attackRight = true;
                    }
                }
            }
        }
    
        if(event.key === 'q' || event.key === 'Q')
        {
            if(QPressed)
            {
                console.log(`Basic Attack`);
                if(attackRight == true)
                {
                    for(let character of based2ndCharacters)
                    {
                        if(character.name == "Nigga Cat")
                        {
                            if(!character.isDead)
                            {
                                canPressSpace = false;
                                animationNumber = 3
                                attackRightAnimation = true; 
                                attackRight = false;
                            }
                            else
                            {
                                console.log("Can't kill a dead being")
                            }
                        }
                    }
                }
                else
                {
                    canPressSpace = false;
                    animationNumber = 3
                }
            }
            else
            {
                
                QPressed = true;
                EPressed = false;
                console.log(`q`)
            }  
        }
        else if(event.key === 'e' || event.key === 'E')
        {
            if(EPressed)
            {
                if(skillPoint > 0)
                {
                    console.log('Skill Animation');
                    if(attackRight == true)
                    {
                        for(let character of based2ndCharacters)
                        {
                            if(character.name == "Nigga Cat")
                            {
                                if(!character.isDead)
                                {
                                    canPressSpace = false;
                                    animationNumber = 4
                                    attackRightAnimation = true; 
                                    attackRight = false;
                                }
                                else
                                {
                                    console.log("Can't kill a dead being")
                                }
                            }
                        }
                    }
                    else
                    {
                        canPressSpace = false;
                        animationNumber = 4;
                    }
                }
                else
                {
                    console.log('Not Enough SkillPoints!');
                }
            }
            else
            {
                QPressed = false
                EPressed = true 
                console.log(`e`)
            }
            
        }
        if(canPressSpace)
        {
            if(event.key === '4')
            {
                for(let characters of based2ndCharacters)
                {
                    if(characters.name == "Furina")
                    {
                        if(characters.energyInside >= 120)
                        {
                            console.log('Spacebar');
                            animationNumber = 7;
                        }
                        else
                        {
                            console.log('Not Enough Energy Points');
                        }
                    }
                }
            }
        }
    }
    if(insideUltimate)
    {
        if(event.key === 'ArrowLeft')
        {
            for(let yellowPusa of based2ndCharacters)
            {
                if(yellowPusa.name == "Chonker Cat")
                {
                    if(!yellowPusa.isDead)
                    {
                        console.log(`Left`);
                        attackRight = false;
                    }
                    else
                    {
                        attackRight = true;
                        console.log(`YELLOW PUSA IS ALREADY DED`)
                    }
                }
            }
        }

        if(event.key === 'ArrowRight')
        {
            for(let blackPusa of based2ndCharacters)
            {
                if(blackPusa.name == "Nigga Cat")
                {
                    if(!blackPusa.isDead)
                    {
                        console.log(`Right`);
                        attackRight = true;
                    }
                    else
                    {
                        attackRight = false;
                        console.log(`BLACK PUSA IS ALREADY DED`)
                    }
                }
            }
        }

        else if(event.key === ' ')
        {
            console.log('Spacebar');
            if(attackRight)
            {
                attackRightAnimation = true;
            }
            else
            {
                attackRightAnimation = false;
            }
            Furina_Before.animationReset();
            Ult_Banner_Bool1 = false
            Ult_Banner_Bool2 = false
            Ult_Banner_Bool3 = false
            drawBannerUI = false;
            insideUltimate = false;
            animationNumber = 8;
        }
    }
    if(animationNumber == 10 || animationNumber == 0)
    {
        if(event.key === 'Enter')
        {
            INOPENWORLD = true
            animate_OPWorld_Limiter = false

            //YELLOW PUSA
            for(let character_ENEMY of based2ndCharacters)
            {
                if(character_ENEMY.name == "Chonker Cat")
                {
                    if ( character_ENEMY.isDead )
                    {
                        FURINA_2D.detailsEnemy.enemy1Alive = false
                    }
                }   
            }

            //BLACK PUSA
            for(let character_ENEMY of based2ndCharacters)
            {
                if(character_ENEMY.name == "Nigga Cat")
                {
                    if ( character_ENEMY.isDead )
                    {
                        FURINA_2D.detailsEnemy.enemy2Alive = false
                    }
                }   
            }
            
        }
    }
}

canvas.addEventListener('click', function(event) {
    if( !INOPENWORLD )
    {
        if(displayUI)
        {
            displayUI = false;
        }
        else
        {
            displayUI = true;
        }
        console.log(`Clicked`)
    }
});


//NOT CURRENT UI FUNCTIONS (PAGAMAY CODE)
function N_CURRENTUI_GOTOLOC_0()//PAGAMAY CODE
{
    if(Furina_N_C.currentArrOfFollowedArr == 1)
    {
        Furina_N_C.goToLoc0_Anim(characters);
    }

    if(ChonkerCat_N_C.currentArrOfFollowedArr == 1)
    {
        ChonkerCat_N_C.goToLoc0_Anim(characters);
    }

    if(NiggaCat_N_C.currentArrOfFollowedArr == 1)
    {
        NiggaCat_N_C.goToLoc0_Anim(characters);
    }
}   

function N_CURRENTUI_HIDEUI_PREP()//PAGAMAY CODE
{
    if(Furina_N_C.currentArrOfFollowedArr == 1)
    {
        Furina_N_C.hideUI_PREP();
    }

    if(ChonkerCat_N_C.currentArrOfFollowedArr == 1)
    {
        ChonkerCat_N_C.hideUI_PREP();
    }

    if(NiggaCat_N_C.currentArrOfFollowedArr == 1)
    {
        NiggaCat_N_C.hideUI_PREP();
    }
}

function N_CURRENTUI_SHOWANIM_ANIM()//PAGAMAY CODE
{
    if(Furina_N_C.hiddenUI == true)
    {
        Furina_N_C.showUi_ANIM();
    }

    if(ChonkerCat_N_C.hiddenUI == true)
    {
        ChonkerCat_N_C.showUi_ANIM();
    }

    if(NiggaCat_N_C.hiddenUI == true)
    {
        NiggaCat_N_C.showUi_ANIM();
    }
}

function ifDead_ARRAY_Updater(characterToBeKilled)//If character is dead delete in to the MAIN ARRAY
{
    for(let i = 0; i < characters.length; i++)
    {
        if(characters[i].name == characterToBeKilled.name)
        {   
            characters.splice(i,1);
        }   
    }
}

function emptyDeadCharacters()//PUT VALUES TO THE 2ND ARRAY (DEADCHARACTERS) CALLED IF SOMEONE DIED
{
    for(let i = 0; i < characters.length; i++)
    {
        deadCharacters[i] = characters[i]
    }
}

function checkAndAssign_NOTCURRENUI()//if patay balhin sa lain array
{
    if(!Furina_N_C.isDead)
    {
        Furina_N_C.followArray(characters);//get the unique ID
        Furina_N_C.getCurrentArray(characters);//get the currentArrayNumber based on unique ID if character dead turn to 69 (currentArrOfFollowedArr)
        Furina_N_C.checkAndAssignForAnimation();//go to loc1, loc2 and so on
    }

    else
    {
        Furina_N_C.getCurrentArray(deadCharacters);
        Furina_N_C.checkAndAssignForAnimation();
    }

    if(!ChonkerCat_N_C.isDead)
    {
        ChonkerCat_N_C.followArray(characters);
        ChonkerCat_N_C.getCurrentArray(characters);
        ChonkerCat_N_C.checkAndAssignForAnimation();
    }
    else
    {
        ChonkerCat_N_C.getCurrentArray(deadCharacters);
        ChonkerCat_N_C.checkAndAssignForAnimation();
    }

    if(!NiggaCat_N_C.isDead)
    {
        NiggaCat_N_C.followArray(characters);
        NiggaCat_N_C.getCurrentArray(characters);
        NiggaCat_N_C.checkAndAssignForAnimation();
    }
    else
    {
        NiggaCat_N_C.getCurrentArray(deadCharacters);
        NiggaCat_N_C.checkAndAssignForAnimation();
    }
}


//FOR OPEN WORLD
function ifEnemyAreAlive (  )
{
    //IF ENEMY DEAD IN OPEN WORLD THEY DEAD NIGGER
        //ENEMY 1 = YELLOW
        if ( !FURINA_2D.detailsEnemy.enemy1Alive )
        {
            ChonkerCat_N_C.isDead = true

            for(let character_ENEMY of based2ndCharacters)
            {
                if(character_ENEMY.name == "Chonker Cat")
                {
                    character_ENEMY.isDead = true;
                    character_ENEMY.health = 0;
                    character_ENEMY.speed = 0
                    ifDead_ARRAY_Updater(character_ENEMY)
                }

            }
            
            TurnOrderDisplay_DisplayCurrentActionOrder(characters)
        
            checkAndAssign_NOTCURRENUI();
        }
        else
        {
            ChonkerCat_N_C.isDead = false;

            for(let character_ENEMY of based2ndCharacters)
            {
                if(character_ENEMY.name == "Chonker Cat")
                {
                    character_ENEMY.isDead = false; 
                }
            }
            TurnOrderDisplay_DisplayCurrentActionOrder(characters)
        
            checkAndAssign_NOTCURRENUI();
        }

        if ( !FURINA_2D.detailsEnemy.enemy2Alive )
        {            
            NiggaCat_N_C.isDead = true

            for(let character_ENEMY of based2ndCharacters)
            {
                if(character_ENEMY.name == "Nigga Cat")
                {
                    character_ENEMY.isDead = true;
                    character_ENEMY.health = 0;
                    character_ENEMY.speed = 0
                    ifDead_ARRAY_Updater(character_ENEMY)
                }
            }
            
            TurnOrderDisplay_DisplayCurrentActionOrder(characters)
        
            checkAndAssign_NOTCURRENUI();
        }
        else
        {
            NiggaCat_N_C.isDead = false;

            for(let character_ENEMY of based2ndCharacters)
            {
                if(character_ENEMY.name == "Nigga Cat")
                {
                    character_ENEMY.isDead = false;
                }
            }
            TurnOrderDisplay_DisplayCurrentActionOrder(characters)
        
            checkAndAssign_NOTCURRENUI();
        }
}

function checkBuffs ( currentNumberofPet )
{
    switch ( currentNumberofPet )
    {
        case 1:
            skillPoint = 5;
            break;

        case 2:
            FURINA_2D.details.EI = 100;
            break;

        case 3:
            FURINA_2D.details.ATK += 500;
            break;

        case 4:
            FURINA_2D.details.CR = Math.min ( FURINA_2D.details.CR + 30, 100 ); 
            break;

    }
}

//DELTA TIME RECREATION DAW
let then = Date.now();
let now;
let difference;


//FOR ANIMATION
let startingAnimationBase = false;
let attackRight = false;
let canPressKeys = false;
let insideUltimate = false
let canPressSpace = true;
let animationNumber = 0;

//FOR ULTIMATE ANIMATION BANNER
let drawBannerUI = false
let Ult_Banner_Bool1 = false;
let Ult_Banner_Bool2 = false;
let Ult_Banner_Bool3 = false;



//FOR CALCULATING DAMAGE AND OTHER BACKEND
let attackRightAnimation = false;
let skillPoint = 3;
let prevSkillPoint = skillPoint;
let characterDamage;
let isCritAttack = false;

let calculateDamage = true

let deadCharacters = []//DELETE NI



//FOR UI
let displayUI = true;
let QPressed = true;
let EPressed = false;

let HPUIG_Hidden = true//for HP AND ENERGY (TO HIDE)

let ultimate_DisplayHP_YellowPusa = false;
let ultimate_DisplayHP_BlackPusa = false;

let drawUI1_buttons_SP = false //for basic attack and skill

let anim_SP = 0 //FOR SKILLPOINT ANIMATION
let anim_SP_change = true

//FOR HIDE UI (BUTTON AND SP)
let hideButton = false; 
let hideSP_UI = false;

let drawYourTurn = false
let drawEnemyTurn = false
let drawUltimateButton = false
let drawUIAnim = false

let MCDamage
let BlackPusaDamage
let YellowPusaDamage

//DELTATIME RECREATION
let DELTATIME;
let DELTATIME_NOW;
let DELTATIME_THEN = Date.now();

//MGA MAIN CHARACTERS ASDDDDDDDDDDDDDDDDDDDDDDDDDDD
let Furina, BlackPusa, YellowPusa, characters;

function Update_DELTATIME() //RESET THE DELATIME
{
    DELTATIME_NOW = Date.now()
    DELTATIME_THEN = DELTATIME_NOW
}

setInterval(Update_DELTATIME, 1000)


//FOR ANIMATION LIMITER
let animate_OPWorld_Limiter = false;
let animate_Limiter = INOPENWORLD;
let animateUI_Limiter = false;

let animateRequestAnimationFrame;
let animateUIRequestAnimationFrame;

function animate() 
{
    now = Date.now()
    difference = now - then;

    DELTATIME_NOW = Date.now()
    DELTATIME = DELTATIME_NOW - DELTATIME_THEN

    if(INOPENWORLD)
    {
        if(!animate_OPWorld_Limiter)
        {
            window.cancelAnimationFrame(animateRequestAnimationFrame);
            window.cancelAnimationFrame(animateUIRequestAnimationFrame);
            animate_OPWorld();
            // console.log(`EXECUTED_animate_OPWorld`);
            animate_OPWorld_Limiter = true;
            startingAnimationBase = false;
            ifEnemyisDeadChecked = false;
            animateUI_Limiter = false;

            if ( !FURINA_2D.detailsEnemy.enemy1Alive && !FURINA_2D.detailsEnemy.enemy2Alive )
            {
                animationNumber = 10
            }
            checkBuffs ( PET.petNumber );
        }   
    }
    else
    {
        if ( animate_OPWorld_Limiter )
        {

            //name, speed, health, attack, player, EnergyRegenRate, EnergyInside (Ultimate cooldown), Crit Rate, Crit Dmg, IsDead , IsEnemy1 2 = Main 0 = False 1 = True
            Furina = new Character("Furina", FURINA_2D.details.SPD, FURINA_2D.details.HP, FURINA_2D.details.ATK, true, FURINA_2D.details.ERRATE, FURINA_2D.details.EI, FURINA_2D.details.CR, FURINA_2D.details.CDMG ); //100 speed; testing speed = 120 //health = 163
            BlackPusa = new Character("Nigga Cat", 83, FURINA_2D.detailsEnemy.HP2, 12, false, 0, 0, 50, 0.25); //83 speed; testing speed = 100 //("Nigga Cat", 83, 97, 12, false, 0, 0, 50, 0.25)
            YellowPusa = new Character("Chonker Cat", 83, FURINA_2D.detailsEnemy.HP1, 12, false, 0, 0, 50, 0.25); //83 speed; testing speed = 90

            characters = [Furina, BlackPusa, YellowPusa];

            animate_OPWorld_Limiter = false; 

        }
        
        // console.log(`animate_ANIMATED`)
        if(!startingAnimationBase)
        {
            assign2ndArrayBecauseFuckJS(characters, based2ndCharacters); //FOR 2ND ARRAY BECAUSE JS PASS BY REF YAWA //GIBALHIN NIMO SA BASED2NDARRAY ANG CHARACTER ARRAY
            reuseSpecialID_For_default_HP(based2ndCharacters)//UNIQUEID KAY HP NA KAY GIs NAKO FOR MCUI

            //get default action value
            AssignAndGetDefaultActionValue(characters)

            //sort the array characters based on DEFAULT_ACTION_VALUE (DLI PARIHA SA SORT SA CONTINOUS)
            characters.sort(ValueSorter);

            //Get the character[0](DAV) and subtract it to the entire array FORMULA: CurrentActionValue = DefaultActionValue - BaseActionValue
            FIRST_AssignAndGetCurrentActionValue(characters)

            //Push character[0] to the bottom TurnOrder and make it blurry
            FIRST_TurnOrderDisplay_CurrentCharacterPush(characters)

            //assign UNIQUE ID FOR UI ANIMATION
            assignUniqueID_FOR_UI_ANIMATION_STARTING(characters)

            //Display in console
            TurnOrderDisplay_DisplayCurrentActionOrder(characters);

            TurnOrderDisplay_DisplayCurrentActionOrder(characters)
        
            checkAndAssign_NOTCURRENUI();

            switch(characters[0].name)
            {
                case "Furina":
                    animationNumber = 1
                    startingAnimationBase = true
                    break;

                case "Nigga Cat":
                    animationNumber = 5
                    startingAnimationBase = true
                    break;

                case "Chonker Cat":
                    animationNumber = 6
                    startingAnimationBase = true
                    break;
            }
        }

        switch(animationNumber)
        {
            case 1: //First Idle
                    if(Furina_FirstIdle.positionY == 0)
                    {
                        if(Furina_FirstIdle.positionX == 3)
                        {
                            HPUIG_Hidden = false;
                            prevSkillPoint = skillPoint;
                        }
                    }
                    ctx.clearRect(0, 0, canvas.width, canvas.height); 
            
                    UpdateGridSpriteSheet(BackGround_FirstIdle, difference);
                    ctx.drawImage(BackGround_FirstIdle.Texture, BackGround_FirstIdle.CurrentImageX, BackGround_FirstIdle.CurrentImageY, BackGround_FirstIdle.imageWidth, BackGround_FirstIdle.imageHeight, 0, 0, canvas.width, canvas.height)
                
                    UpdateGridSpriteSheet(YellowPusa_And_BlackPusa_FirstIdle, difference);
                    ctx.drawImage(YellowPusa_And_BlackPusa_FirstIdle.Texture, YellowPusa_And_BlackPusa_FirstIdle.CurrentImageX, YellowPusa_And_BlackPusa_FirstIdle.CurrentImageY, YellowPusa_And_BlackPusa_FirstIdle.imageWidth, YellowPusa_And_BlackPusa_FirstIdle.imageHeight, 0, 0, canvas.width, canvas.height)
                
                    UpdateGridSpriteSheet(Furina_FirstIdle, difference);
                    ctx.drawImage(Furina_FirstIdle.Texture, Furina_FirstIdle.CurrentImageX, Furina_FirstIdle.CurrentImageY, Furina_FirstIdle.imageWidth, Furina_FirstIdle.imageHeight, 0, 0, canvas.width, canvas.height)
            
                    if(Furina_FirstIdle.positionY == 0)
                    {
                        if(Furina_FirstIdle.positionX == 1)
                        {
                            switch (characters[0].name) 
                            {
                                case "Furina":
                                    Furina_0.showUI();
                                    Furina_0.displayedBefore = true;
            
                                    ChonkerCat_0.hideUI();
            
                                    NiggaCat_0.hideUI();
                                    break;
                                
                                case "Chonker Cat":
                                    Furina_0.hideUI();
            
                                    ChonkerCat_0.showUI();
                                    ChonkerCat_0.displayedBefore = true;
            
                                    NiggaCat_0.hideUI();
                                    break;
            
                                case "Nigga Cat":
                                    Furina_0.hideUI();
            
                                    ChonkerCat_0.hideUI();
            
                                    NiggaCat_0.showUI();
                                    NiggaCat_0.displayedBefore = true;
                                    break;
            
                                default:
                                    console.log("Error in ANIMATIONNUMBER 1")
                                    break;
                            }
            
                            Furina_N_C.followArray(characters);
                            Furina_N_C.getCurrentArray(characters);
                            Furina_N_C.assignLocationFirstTime()
            
                            ChonkerCat_N_C.followArray(characters);
                            ChonkerCat_N_C.getCurrentArray(characters);
                            ChonkerCat_N_C.assignLocationFirstTime()
            
                            NiggaCat_N_C.followArray(characters);
                            NiggaCat_N_C.getCurrentArray(characters);
                            NiggaCat_N_C.assignLocationFirstTime()
            
                            Furina_N_C.checkAndAssignForAnimation();
                            ChonkerCat_N_C.checkAndAssignForAnimation();
                            NiggaCat_N_C.checkAndAssignForAnimation();

                            
            
                            console.log(`FCF_Fur: ${Furina_N_C.currentArrOfFollowedArr}`)
                            console.log(`FCF_Cho: ${ChonkerCat_N_C.currentArrOfFollowedArr}`)
                            console.log(`FCF_Nig: ${NiggaCat_N_C.currentArrOfFollowedArr}`)
            
                            UI_MC_BackColor_HP.pastHP = based2ndCharacters[0].health
                            console.log(`MC_BackColor_HP.pastHP${UI_MC_BackColor_HP.pastHP}`)
            
                            Furina_Banner_Before.goToImmediately(-canvas.width * 0.15, canvas.width * 1.9)
                        }
                    }
            
                    if(Furina_FirstIdle.positionY == 5)
                    {
                        
                        if(Furina_FirstIdle.positionX >= 2)
                        {
                            BackGround_FirstIdle.animationReset();
                            YellowPusa_And_BlackPusa_FirstIdle.animationReset();
                            Furina_FirstIdle.animationReset();
                            animationNumber = 2;   
                        }
                    }
                    break;

            case 2: //Breathing
                    hideButton = false;
                    drawUIAnim = true;
                    
                    drawYourTurn = false
                    drawEnemyTurn = false
                    drawUltimateButton = false
            
                    canPressKeys = true;
                    drawUI1_buttons_SP = true
                    ctx.clearRect(0, 0, canvas.width, canvas.height); 
            
                    UpdateGridSpriteSheet(Furina_Breathing, difference);  
                    ctx.drawImage(BackGround_Breathing, 0, 0, 1600, 900, 0, 0, canvas.width, canvas.height);
            
                    if(!NiggaCat_N_C.isDead)
                    {
                        ctx.drawImage(BlackPusa_Breathing, 0, 0, 1600, 900, 0, 0, canvas.width, canvas.height);
                    }
            
                    if(!ChonkerCat_N_C.isDead)
                    {
                        ctx.drawImage(YellowPusa_Breathing, 0, 0, 1600, 900, 0, 0, canvas.width, canvas.height);
                    }  
            
                    ctx.drawImage(Furina_Breathing.Texture, Furina_Breathing.CurrentImageX, Furina_Breathing.CurrentImageY, Furina_Breathing.imageWidth, Furina_Breathing.imageHeight, 0, 0, canvas.width, canvas.height);
            
            
                    if(Furina_Breathing.positionY == 5)
                    {
                        if(Furina_Breathing.positionX == 0)
                        {
                            Furina_Breathing.animationReset();
                        }
                    }
                    break;

            case 3: //Basic Attack
                    hideButton = true;
                    drawUIAnim = false;
            
                    drawYourTurn = true
                    drawEnemyTurn = false
                    drawUltimateButton = false
            
                    canPressKeys = false;
                    Furina_Breathing.animationReset(); //panigurado mamen
                    
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
            
                    UpdateHorizontalSpriteSheet(BackGround_BasicAttack, difference); 
                    ctx.drawImage(BackGround_BasicAttack.Texture, BackGround_BasicAttack.CurrentImageX, BackGround_BasicAttack.CurrentImageY, BackGround_BasicAttack.imageWidth, BackGround_BasicAttack.imageHeight, 0, 0, canvas.width, canvas.height);
            
                    if(attackRightAnimation)
                    {
                        YellowPusa_BasicAttack.destinationX = -(canvas.width * 18 / 100)
                        BlackPusa_BasicAttack.destinationX = -(canvas.width * 18 / 100)
                    }
            
                    if(!ChonkerCat_N_C.isDead)
                    {
                        UpdateHorizontalSpriteSheet(YellowPusa_BasicAttack, difference); 
                        ctx.drawImage(YellowPusa_BasicAttack.Texture, YellowPusa_BasicAttack.CurrentImageX, YellowPusa_BasicAttack.CurrentImageY, YellowPusa_BasicAttack.imageWidth, YellowPusa_BasicAttack.imageHeight, YellowPusa_BasicAttack.destinationX, 0, canvas.width, canvas.height);
                    }
            
                    if(!NiggaCat_N_C.isDead)
                    {
                        UpdateHorizontalSpriteSheet(BlackPusa_BasicAttack, difference); 
                        ctx.drawImage(BlackPusa_BasicAttack.Texture, BlackPusa_BasicAttack.CurrentImageX, BlackPusa_BasicAttack.CurrentImageY, BlackPusa_BasicAttack.imageWidth, BlackPusa_BasicAttack.imageHeight, BlackPusa_BasicAttack.destinationX, 0, canvas.width, canvas.height);
                    }
            
                    UpdateHorizontalSpriteSheet(Furina_BasicAttack, difference); 
                    ctx.drawImage(Furina_BasicAttack.Texture, Furina_BasicAttack.CurrentImageX, Furina_BasicAttack.CurrentImageY, Furina_BasicAttack.imageWidth, Furina_BasicAttack.imageHeight, 0, 0, canvas.width, canvas.height);
            
                    if(Furina_BasicAttack.positionX == 7+3)
                    {
                        if(Furina_0.displayedBefore)
                        {
                            Furina_0.distance2 = -0.15;
                            Furina_0.displayedBefore = false;
                        }
            
                        if(ChonkerCat_0.displayedBefore)
                        {
                            ChonkerCat_0.distance2 = -0.15
                            ChonkerCat_0.displayedBefore = false
                        }
            
                        if(NiggaCat_0.displayedBefore)
                        {
                            NiggaCat_0.distance2 = -0.15;
                            NiggaCat_0.displayedBefore = false;
                        }
            
                        //FOR NOT CURRENT UI go to Location0 (gotoloc0anim)
                        N_CURRENTUI_GOTOLOC_0();
                    }
            
                    //FOR NOT CURRENT UI hide the UI and go to Loc3(Y)
                    if(Furina_BasicAttack.positionX == 7+8)
                    {
                        N_CURRENTUI_HIDEUI_PREP();
                    }  
                    
                    //DIRI EXECUTE ANG CALCULATEDAMAGE
                    if(Furina_BasicAttack.positionX == 6)
                    {
                        if(calculateDamage)
                        {
                            UI_BlackPusa_BackColor_HP.pastHP = based2ndCharacters[1].health
                            UI_BlackPusa_BackColor_HP.changeNumber = true
            
                            console.log(`UI_BlackPusa_BackColor_HP.pastHP${UI_BlackPusa_BackColor_HP.pastHP}`)
                            characterDamage = Math.ceil(CalculateBaseDamage(0.50, characters[0].attack)) //50% ANG DAMAGE MULTIPLIER SA BASIC ATTACK
                            MCDamage = characterDamage
                            isCritAttack = CritIdentifier(characters[0].critRate)
                
                            if(isCritAttack)
                            {
                                characterDamage *= Math.ceil(1 + characters[0].critDamage);
                                MCDamage = characterDamage
                                ifMCDoCritDamage = true
                            }
                            else
                            {
                                ifMCDoNormalDamage = true
                            }
                
                            if(attackRightAnimation)
                            {
                                for(let character_ENEMY of based2ndCharacters)
                                {
                                    if(character_ENEMY.name == "Nigga Cat")
                                    {
                                        character_ENEMY.health = ApplyDamageAndLimiter(character_ENEMY.health, characterDamage, character_ENEMY.name, isCritAttack);
                                        character_ENEMY.isDead = ifCharacterDead(character_ENEMY.health)
                                        console.log(character_ENEMY.isDead)
                
                                        if(character_ENEMY.isDead)
                                        {
                                            NiggaCat_N_C.isDead = true
                                            ifDead_ARRAY_Updater(character_ENEMY)
                                            TurnOrderDisplay_DisplayCurrentActionOrder(characters)
                                        }
                
                                        for(let character_MC of based2ndCharacters)
                                        {
                                            if(character_MC.name == characters[0].name)
                                            {
                                                if(character_ENEMY.health <= 0)
                                                {
                                                    character_MC.energyInside = AddEnergyPointAndLimiter(character_MC.energyInside, character_MC.eRRate, 10)
                                                }
                                                character_MC.energyInside = AddEnergyPointAndLimiter(character_MC.energyInside, character_MC.eRRate, 20)
                                            }
                                        }
                                        prevSkillPoint = skillPoint;
                                        skillPoint = AddSkillPointAndLimiter(skillPoint)
                                        
                                    }
                                }
                            }
                
                            else
                            {
                                UI_YellowPusa_BackColor_HP.pastHP = based2ndCharacters[2].health
                                UI_YellowPusa_BackColor_HP.changeNumber = true
                                console.log(`UI_YellowPusa_BackColor_HP.pastHP${UI_YellowPusa_BackColor_HP.pastHP}`)
            
                                for(let character_ENEMY of based2ndCharacters)
                                {
                                    if(character_ENEMY.name == "Chonker Cat")
                                    {
                                        character_ENEMY.health = ApplyDamageAndLimiter(character_ENEMY.health, characterDamage, character_ENEMY.name, isCritAttack);
                                        character_ENEMY.isDead = ifCharacterDead(character_ENEMY.health)
                                        console.log(character_ENEMY.isDead)
                
                                        if(character_ENEMY.isDead)
                                        {
                                            ChonkerCat_N_C.isDead = true
                                            ifDead_ARRAY_Updater(character_ENEMY)
                                            TurnOrderDisplay_DisplayCurrentActionOrder(characters)
                                        }
                
                                        for(let character_MC of based2ndCharacters)
                                        {
                                            if(character_MC.name == characters[0].name)
                                            {
                                                if(character_ENEMY.health <= 0)
                                                {
                                                    character_MC.energyInside = AddEnergyPointAndLimiter(character_MC.energyInside, character_MC.eRRate, 10)
                                                }
                                                character_MC.energyInside = AddEnergyPointAndLimiter(character_MC.energyInside, character_MC.eRRate, 20)
                                            }
                                        }
                                        prevSkillPoint = skillPoint;
                                        skillPoint = AddSkillPointAndLimiter(skillPoint)
                                    }
                                }
                            }
                            calculateDamage = false;
                            console.log(`FUNCTIONCALLED`)
                        }       
                    }
            
                    if(Furina_BasicAttack.positionX == Furina_BasicAttack.FrameLimitX-1)
                    {
                        calculateDamage = true;//para dli mag loop ang calculate damage
            
                        characterAnimationTurnUpdater(characters);
                        attackRightAnimation = false;
                        BackGround_BasicAttack.animationReset();
                        YellowPusa_BasicAttack.animationReset();
                        BlackPusa_BasicAttack.animationReset();
                        Furina_BasicAttack.animationReset();
                        canPressSpace = true;
            
                        if(Furina_0.checkIfFinishedAnimation())
                        {
                            switch (characters[0].name) 
                            {
                                case `Furina`:
                                    Furina_0.showUI();
                                    Furina_0.displayedBefore = true;
            
                                    ChonkerCat_0.hideUI();
            
                                    NiggaCat_0.hideUI();
                                    break;
                                
                                case `Chonker Cat`:
                                    Furina_0.hideUI();
            
                                    ChonkerCat_0.showUI();
                                    ChonkerCat_0.displayedBefore = true;
            
                                    NiggaCat_0.hideUI();
                                    break;
            
                                case `Nigga Cat`:
                                    Furina_0.hideUI();
            
                                    ChonkerCat_0.hideUI();
            
                                    NiggaCat_0.showUI();
                                    NiggaCat_0.displayedBefore = true;
                                    console.log(`niggacat`)
                                    break;
            
                                default:
                                    break;
                            }
            
            
                            //FOR NOT CURRENT UI show UI if Not shown
                            N_CURRENTUI_SHOWANIM_ANIM()
            
            
                            checkAndAssign_NOTCURRENUI();
            
                            console.log(`FCF_Fur: ${Furina_N_C.currentArrOfFollowedArr}`)
                            console.log(`FCF_Cho: ${ChonkerCat_N_C.currentArrOfFollowedArr}`)
                            console.log(`FCF_Nig: ${NiggaCat_N_C.currentArrOfFollowedArr}`)
                        }
                    }
                    break;

            case 4: //Skill Attack
                    hideButton = true;
                    drawUIAnim = false;
            
                    drawYourTurn = true
                    drawEnemyTurn = false
                    drawUltimateButton = false
            
            
                    canPressKeys = false;
                    Furina_Breathing.animationReset();
            
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
            
                    UpdateHorizontalSpriteSheet(BackGround_Skill, difference); 
                    ctx.drawImage(BackGround_Skill.Texture, BackGround_Skill.CurrentImageX, BackGround_Skill.CurrentImageY, BackGround_Skill.imageWidth, BackGround_Skill.imageHeight, 0, 0, canvas.width, canvas.height);
                    
                    if(attackRightAnimation)
                    {
                        YellowPusa_Skill.destinationX = -(canvas.width * 18 / 100)
                        BlackPusa_Skill.destinationX = -(canvas.width * 18 / 100)
                    }
            
                    if(!ChonkerCat_N_C.isDead)
                    {
                        UpdateHorizontalSpriteSheet(YellowPusa_Skill, difference); 
                        ctx.drawImage(YellowPusa_Skill.Texture, YellowPusa_Skill.CurrentImageX, YellowPusa_Skill.CurrentImageY, YellowPusa_Skill.imageWidth, YellowPusa_Skill.imageHeight, YellowPusa_Skill.destinationX, 0, canvas.width, canvas.height);
                    }
            
                    if(!NiggaCat_N_C.isDead)
                    {
                        UpdateHorizontalSpriteSheet(BlackPusa_Skill, difference); 
                        ctx.drawImage(BlackPusa_Skill.Texture, BlackPusa_Skill.CurrentImageX, BlackPusa_Skill.CurrentImageY, BlackPusa_Skill.imageWidth, BlackPusa_Skill.imageHeight, YellowPusa_Skill.destinationX, 0, canvas.width, canvas.height);
                    }
            
                    UpdateHorizontalSpriteSheet(Furina_Skill, difference); 
                    ctx.drawImage(Furina_Skill.Texture, Furina_Skill.CurrentImageX, Furina_Skill.CurrentImageY, Furina_Skill.imageWidth, Furina_Skill.imageHeight, 0, 0, canvas.width, canvas.height);
            
                    if(Furina_Skill.positionX == 11+3)
                    {
                        if(Furina_0.displayedBefore)
                        {
                            Furina_0.distance2 = -0.15;
                            Furina_0.displayedBefore = false;
                        }
            
                        if(ChonkerCat_0.displayedBefore)
                        {
                            ChonkerCat_0.distance2 = -0.15
                            ChonkerCat_0.displayedBefore = false
                        }
            
                        if(NiggaCat_0.displayedBefore)
                        {
                            NiggaCat_0.distance2 = -0.15;
                            NiggaCat_0.displayedBefore = false;
                        }
            
                        N_CURRENTUI_GOTOLOC_0();
                    }
            
                    if(Furina_Skill.positionX == 11+4)
                    {
                        N_CURRENTUI_HIDEUI_PREP();
                    }
            
                    //DRI ANG CACULATE DAMAGE
                    if(Furina_Skill.positionX == 10)
                    {
                        if(calculateDamage)
                        {
                            characterDamage = Math.ceil(CalculateBaseDamage(0.625, characters[0].attack)) //62.5% ANG DAMAGE MULTIPLIER SA BASIC ATTACK
                            
                            isCritAttack = CritIdentifier(characters[0].critRate)
                            MCDamage = characterDamage
                
                            if(isCritAttack)
                            {
                                characterDamage *= Math.ceil(1 + characters[0].critDamage);
            
                                MCDamage = characterDamage
                                ifMCDoCritDamage = true
                            }
                            else
                            {
                                ifMCDoNormalDamage = true
                            }
                
                            if(attackRightAnimation)
                            {
                                UI_BlackPusa_BackColor_HP.pastHP = based2ndCharacters[1].health
                                UI_BlackPusa_BackColor_HP.changeNumber = true
                                console.log(`UI_BlackPusa_BackColor_HP.pastHP${UI_BlackPusa_BackColor_HP.pastHP}`)
                                for(let character_ENEMY of based2ndCharacters)
                                {
                                    if(character_ENEMY.name == "Nigga Cat")
                                    {
                                        character_ENEMY.health = ApplyDamageAndLimiter(character_ENEMY.health, characterDamage, character_ENEMY.name, isCritAttack);
                                        character_ENEMY.isDead = ifCharacterDead(character_ENEMY.health)
                                        console.log(character_ENEMY.isDead)
                
                                        if(character_ENEMY.isDead)
                                        {
                                            NiggaCat_N_C.isDead = true
                                            ifDead_ARRAY_Updater(character_ENEMY)
                                            TurnOrderDisplay_DisplayCurrentActionOrder(characters)
                                        }
                
                                        for(let character_MC of based2ndCharacters)
                                        {
                                            if(character_MC.name == characters[0].name)
                                            {
                                                if(character_ENEMY.health <= 0)
                                                {
                                                    character_MC.energyInside = AddEnergyPointAndLimiter(character_MC.energyInside, character_MC.eRRate, 10)
                                                }
                                                character_MC.energyInside = AddEnergyPointAndLimiter(character_MC.energyInside, character_MC.eRRate, 20)
                                            }
                                        }
                                        prevSkillPoint = skillPoint;
                                        skillPoint = SubtractSkillPointAndLimiter(skillPoint)
                                        
                                    }
                                }
                            }
                            else
                            {
                                UI_YellowPusa_BackColor_HP.pastHP = based2ndCharacters[2].health
                                UI_YellowPusa_BackColor_HP.changeNumber = true
                                console.log(`UI_YellowPusa_BackColor_HP.pastHP${UI_YellowPusa_BackColor_HP.pastHP}`)
                                
                                for(let character_ENEMY of based2ndCharacters)
                                {
                                    if(character_ENEMY.name == "Chonker Cat")
                                    {
                                        character_ENEMY.health = ApplyDamageAndLimiter(character_ENEMY.health, characterDamage, character_ENEMY.name, isCritAttack);
                                        character_ENEMY.isDead = ifCharacterDead(character_ENEMY.health)
                                        console.log(character_ENEMY.isDead)
                
                                        if(character_ENEMY.isDead)
                                        {
                                            ChonkerCat_N_C.isDead = true
                                            ifDead_ARRAY_Updater(character_ENEMY)
                                            TurnOrderDisplay_DisplayCurrentActionOrder(characters)
                                        }
                
                                        for(let character_MC of based2ndCharacters)
                                        {
                                            if(character_MC.name == characters[0].name)
                                            {
                                                if(character_ENEMY.health <= 0)
                                                {
                                                    character_MC.energyInside = AddEnergyPointAndLimiter(character_MC.energyInside, character_MC.eRRate, 10)
                                                }
                                                character_MC.energyInside = AddEnergyPointAndLimiter(character_MC.energyInside, character_MC.eRRate, 20)
                                            }
                                        }
                                        prevSkillPoint = skillPoint;
                                        skillPoint = SubtractSkillPointAndLimiter(skillPoint)
                                    }
                                }
                            }
                            calculateDamage = false;
                        }
                    }
            
                    if(Furina_Skill.positionX == Furina_Skill.FrameLimitX-1)
                    {
                        calculateDamage = true;
                        characterAnimationTurnUpdater(characters);
                        attackRightAnimation = false;
                        BackGround_Skill.animationReset();
                        YellowPusa_Skill.animationReset();
                        BlackPusa_Skill.animationReset();
                        Furina_Skill.animationReset();
                        canPressSpace = true;
            
                        if(Furina_0.checkIfFinishedAnimation())
                        {
                            switch (characters[0].name) 
                            {
                                case `Furina`:
                                    Furina_0.showUI();
                                    Furina_0.displayedBefore = true;
            
                                    ChonkerCat_0.hideUI();
            
                                    NiggaCat_0.hideUI();
                                    break;
                                
                                case `Chonker Cat`:
                                    Furina_0.hideUI();
            
                                    ChonkerCat_0.showUI();
                                    ChonkerCat_0.displayedBefore = true;
            
                                    NiggaCat_0.hideUI();
                                    break;
            
                                case `Nigga Cat`:
                                    Furina_0.hideUI();
            
                                    ChonkerCat_0.hideUI();
            
                                    NiggaCat_0.showUI();
                                    NiggaCat_0.displayedBefore = true;
                                    break;
            
                                default:
                                    console.log("Error in ANIMATIONNUMBER 1")
                                    break;
                            }
            
            
                            //FOR NOT CURRENT UI show UI if Not shown
                            N_CURRENTUI_SHOWANIM_ANIM()
            
            
                            checkAndAssign_NOTCURRENUI();
            
                            console.log(`FCF_Fur: ${Furina_N_C.currentArrOfFollowedArr}`)
                            console.log(`FCF_Cho: ${ChonkerCat_N_C.currentArrOfFollowedArr}`)
                            console.log(`FCF_Nig: ${NiggaCat_N_C.currentArrOfFollowedArr}`)
                        }
                    }
                    break;

            case 5: //Black Pusa Attack
                    hideButton = true
                    drawUIAnim = false;
            
                    drawYourTurn = false
                    drawEnemyTurn = true
                    drawUltimateButton = false
            
                    canPressKeys = false;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
            
                    UpdateHorizontalSpriteSheet(BackGround_BlackPusa, difference); 
                    ctx.drawImage(BackGround_BlackPusa.Texture, BackGround_BlackPusa.CurrentImageX, BackGround_BlackPusa.CurrentImageY, BackGround_BlackPusa.imageWidth, BackGround_BlackPusa.imageHeight, BackGround_BlackPusa.destinationX, 0, canvas.width, canvas.height);
                    
                    if(!ChonkerCat_N_C.isDead)
                    {
                        UpdateHorizontalSpriteSheet(YellowPusa_BlackPusa, difference); 
                        ctx.drawImage(YellowPusa_BlackPusa.Texture, YellowPusa_BlackPusa.CurrentImageX, YellowPusa_BlackPusa.CurrentImageY, YellowPusa_BlackPusa.imageWidth, YellowPusa_BlackPusa.imageHeight, YellowPusa_BlackPusa.destinationX, 0, canvas.width, canvas.height);
                    }
            
                    if(!NiggaCat_N_C.isDead)
                    {
                        UpdateHorizontalSpriteSheet(BlackPusa_BlackPusa, difference); 
                        ctx.drawImage(BlackPusa_BlackPusa.Texture, BlackPusa_BlackPusa.CurrentImageX, BlackPusa_BlackPusa.CurrentImageY, BlackPusa_BlackPusa.imageWidth, BlackPusa_BlackPusa.imageHeight, BlackPusa_BlackPusa.destinationX, 0, canvas.width, canvas.height);
                    }
                    
                    UpdateHorizontalSpriteSheet(Furina_BlackPusa, difference); 
                    ctx.drawImage(Furina_BlackPusa.Texture, Furina_BlackPusa.CurrentImageX, Furina_BlackPusa.CurrentImageY, Furina_BlackPusa.imageWidth, Furina_BlackPusa.imageHeight, Furina_BlackPusa.destinationX, 0, canvas.width, canvas.height);
            
                    if(Furina_BlackPusa.positionX == 3+2)
                    {
                        if(Furina_0.displayedBefore)
                        {
                            Furina_0.distance2 = -0.15;
                            Furina_0.displayedBefore = false;
                        }
            
                        if(ChonkerCat_0.displayedBefore)
                        {
                            ChonkerCat_0.distance2 = -0.15
                            ChonkerCat_0.displayedBefore = false
                        }
            
                        if(NiggaCat_0.displayedBefore)
                        {   
                            NiggaCat_0.distance2 = -0.15;
                            NiggaCat_0.displayedBefore = false;
                        }
            
                        //FOR NOT CURRENT UI go to Location0 (gotoloc0anim)
                        N_CURRENTUI_GOTOLOC_0();
                    }
            
                    //FOR NOT CURRENT UI hide the UI and go to Loc3(Y)
                    if(Furina_BlackPusa.positionX == 3+3)
                    {
                        N_CURRENTUI_HIDEUI_PREP();
                    } 
            
                    //DIRI CALCULATE DAMAGE
                    if(Furina_BlackPusa.positionX == 3)
                    {
                        if(calculateDamage)
                        {
                            UI_MC_BackColor_HP.pastHP = based2ndCharacters[0].health
                            UI_MC_BackColor_HP.changeNumber = true
                            console.log(`MC_BackColor_HP.pastHP${UI_MC_BackColor_HP.pastHP}`)
                
                            characterDamage = Math.ceil(CalculateBaseDamage(3, characters[0].attack)) //300% ANG DAMAGE MULTIPLIER SA PUSA
            
                            BlackPusaDamage = characterDamage
            
                            isCritAttack = CritIdentifier(characters[0].critRate)
                
                            if(isCritAttack)
                            {
                                characterDamage *= Math.ceil(1 + characters[0].critDamage);
                                BlackPusaDamage = characterDamage
                                //ifBlackPusaAttack = true
                            }
                            // else
                            // {
                            //     ifBlackPusaAttack = true
                            // }
                            
            
                            for(let character_MC of based2ndCharacters)
                            {
                                if(character_MC.name == "Furina")
                                {
                                    character_MC.health = ApplyDamageAndLimiter(character_MC.health, characterDamage, character_MC.name, isCritAttack);
                                    character_MC.isDead = ifCharacterDead(character_MC.health)
                                    console.log(character_MC.isDead)
                                    
                                    if(character_MC.isDead)
                                    {
                                        console.log(`GAME OVER`)
                                    }
                                    else
                                    {
                                        character_MC.energyInside = AddEnergyPointAndLimiter(character_MC.energyInside, character_MC.eRRate, 2)
                                    }
                                }
                            }
                            calculateDamage = false
                        }
                    }
            
                    if(Furina_BlackPusa.positionX == Furina_BlackPusa.FrameLimitX-1)
                    {
                        calculateDamage = true;
                        characterAnimationTurnUpdater(characters);
                        BackGround_BlackPusa.animationReset();
                        YellowPusa_BlackPusa.animationReset();
                        BlackPusa_BlackPusa.animationReset();
                        Furina_BlackPusa.animationReset();
            
                        if(Furina_0.checkIfFinishedAnimation())
                        {
                            switch (characters[0].name) 
                            {
                                case `Furina`:
                                    Furina_0.showUI();
                                    Furina_0.displayedBefore = true;
            
                                    ChonkerCat_0.hideUI();
            
                                    NiggaCat_0.hideUI();
                                    break;
                                
                                case `Chonker Cat`:
                                    Furina_0.hideUI();
            
                                    ChonkerCat_0.showUI();
                                    ChonkerCat_0.displayedBefore = true;
            
                                    NiggaCat_0.hideUI();
                                    break;
            
                                case `Nigga Cat`:
                                    Furina_0.hideUI();
            
                                    ChonkerCat_0.hideUI();
            
                                    NiggaCat_0.showUI();
                                    NiggaCat_0.displayedBefore = true;
                                    break;
            
                                default:
                                    console.log("Error in ANIMATIONNUMBER 1")
                                    break;
                            }
            
                            //FOR NOT CURRENT UI show UI if Not shown
                            N_CURRENTUI_SHOWANIM_ANIM()
            
                            checkAndAssign_NOTCURRENUI();
            
                            console.log(`FCF_Fur: ${Furina_N_C.currentArrOfFollowedArr}`)
                            console.log(`FCF_Cho: ${ChonkerCat_N_C.currentArrOfFollowedArr}`)
                            console.log(`FCF_Nig: ${NiggaCat_N_C.currentArrOfFollowedArr}`)
                        }
                    }
                    break;

            case 6: //Yellow Pusa Attack
                    hideButton = true
                    drawUIAnim = false;
            
                    drawYourTurn = false
                    drawEnemyTurn = true
                    drawUltimateButton = false
            
                    canPressKeys = false;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
            
                    UpdateHorizontalSpriteSheet(BackGround_YellowPusa, difference); 
                    ctx.drawImage(BackGround_YellowPusa.Texture, BackGround_YellowPusa.CurrentImageX, BackGround_YellowPusa.CurrentImageY, BackGround_YellowPusa.imageWidth, BackGround_YellowPusa.imageHeight, BackGround_YellowPusa.destinationX, 0, canvas.width, canvas.height);
                    
                    if(!ChonkerCat_N_C.isDead)
                    {
                        UpdateHorizontalSpriteSheet(YellowPusa_YellowPusa, difference); 
                        ctx.drawImage(YellowPusa_YellowPusa.Texture, YellowPusa_YellowPusa.CurrentImageX, YellowPusa_YellowPusa.CurrentImageY, YellowPusa_YellowPusa.imageWidth, YellowPusa_YellowPusa.imageHeight, YellowPusa_YellowPusa.destinationX, 0, canvas.width, canvas.height);
                    }
            
                    if(!NiggaCat_N_C.isDead)
                    {
                        UpdateHorizontalSpriteSheet(BlackPusa_YellowPusa, difference); 
                        ctx.drawImage(BlackPusa_YellowPusa.Texture, BlackPusa_YellowPusa.CurrentImageX, BlackPusa_YellowPusa.CurrentImageY, BlackPusa_YellowPusa.imageWidth, BlackPusa_YellowPusa.imageHeight, BlackPusa_YellowPusa.destinationX, 0, canvas.width, canvas.height);
                    }
                    
                    UpdateHorizontalSpriteSheet(Furina_YellowPusa, difference); 
                    ctx.drawImage(Furina_YellowPusa.Texture, Furina_YellowPusa.CurrentImageX, Furina_YellowPusa.CurrentImageY, Furina_YellowPusa.imageWidth, Furina_YellowPusa.imageHeight, Furina_YellowPusa.destinationX, 0, canvas.width, canvas.height);
            
                    if(YellowPusa_YellowPusa.positionX == 3+2)
                    {
                        if(Furina_0.displayedBefore)
                        {
                            Furina_0.distance2 = -0.15;
                            Furina_0.displayedBefore = false;
                        }
            
                        if(ChonkerCat_0.displayedBefore)
                        {
                            ChonkerCat_0.distance2 = -0.15
                            ChonkerCat_0.displayedBefore = false
                        }
            
                        if(NiggaCat_0.displayedBefore)
                        {   
                            NiggaCat_0.distance2 = -0.15;
                            NiggaCat_0.displayedBefore = false;
                        }
            
                        //FOR NOT CURRENT UI go to Location0 (gotoloc0anim)
                        N_CURRENTUI_GOTOLOC_0();
                    }
            
                    if(YellowPusa_YellowPusa.positionX == 3+4)
                    {
                        //FOR NOT CURRENT UI hide the UI and go to Loc3(Y)
                        N_CURRENTUI_HIDEUI_PREP();
                    }   
            
                    if(Furina_YellowPusa.positionX == 4)
                    {
                        if(calculateDamage)
                        {
                            UI_MC_BackColor_HP.pastHP = based2ndCharacters[0].health
                            UI_MC_BackColor_HP.changeNumber = true
                            console.log(`MC_BackColor_HP.pastHP${UI_MC_BackColor_HP.pastHP}`)
                
                            characterDamage = CalculateBaseDamage(3, characters[0].attack) //300% ANG DAMAGE MULTIPLIER SA PUSA
                            isCritAttack = CritIdentifier(characters[0].critRate)
                
                            if(isCritAttack)
                            {
                                characterDamage *= 1 + characters[0].critDamage;
                            }
                
                            for(let character_MC of based2ndCharacters)
                            {
                                if(character_MC.name == "Furina")
                                {
                                    character_MC.health = ApplyDamageAndLimiter(character_MC.health, characterDamage, character_MC.name, isCritAttack);
                                    character_MC.isDead = ifCharacterDead(character_MC.health)
                                    console.log(character_MC.isDead)
                                    
                                    if(character_MC.isDead)
                                    {
                                        console.log(`GAME OVER`)
                                    }
                                    else
                                    {
                                        character_MC.energyInside = AddEnergyPointAndLimiter(character_MC.energyInside, character_MC.eRRate, 2)
                                    }
                                }
                            }
                            calculateDamage = false
                        }
                    }
            
            
                    if(Furina_YellowPusa.positionX == Furina_YellowPusa.FrameLimitX-1)
                    {
                        calculateDamage = true;
                        characterAnimationTurnUpdater(characters);
                        BackGround_YellowPusa.animationReset();
                        YellowPusa_YellowPusa.animationReset();
                        BlackPusa_YellowPusa.animationReset();
                        Furina_YellowPusa.animationReset();
            
                        if(Furina_0.checkIfFinishedAnimation())
                        {
                            switch (characters[0].name) 
                            {
                                case `Furina`:
                                    Furina_0.showUI();
                                    Furina_0.displayedBefore = true;
            
                                    ChonkerCat_0.hideUI();
            
                                    NiggaCat_0.hideUI();
                                    break;
                                
                                case `Chonker Cat`:
                                    Furina_0.hideUI();
            
                                    ChonkerCat_0.showUI();
                                    ChonkerCat_0.displayedBefore = true;
            
                                    NiggaCat_0.hideUI();
                                    break;
            
                                case `Nigga Cat`:
                                    Furina_0.hideUI();
            
                                    ChonkerCat_0.hideUI();
            
                                    NiggaCat_0.showUI();
                                    NiggaCat_0.displayedBefore = true;
            
                                    break;
            
                                default:
                                    console.log("Error in ANIMATIONNUMBER 1")
                                    break;
                            }
                            Furina_N_C.followArray(characters);
                            Furina_N_C.getCurrentArray(characters);
            
                            //FOR NOT CURRENT UI show UI if Not shown
                            N_CURRENTUI_SHOWANIM_ANIM()
            
                            checkAndAssign_NOTCURRENUI();
            
                            console.log(`FCF_Fur: ${Furina_N_C.currentArrOfFollowedArr}`)
                            console.log(`FCF_Cho: ${ChonkerCat_N_C.currentArrOfFollowedArr}`)
                            console.log(`FCF_Nig: ${NiggaCat_N_C.currentArrOfFollowedArr}`)
                        }
                    }
                    break;

            case 7: //Before Ultimate
                    hideButton = true
                    drawUIAnim = false;
            
                    drawYourTurn = false
                    drawEnemyTurn = false
                    drawUltimateButton = true
            
                    canPressKeys = false
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    
                    ctx.drawImage(BackGround_Before, 0, 0, 1600, 900, 0, 0, canvas.width, canvas.height)
                    if(!NiggaCat_N_C.isDead)
                    {
                        ctx.drawImage(BlackPusa_Before, 0, 0, 1600, 900, 0, 0, canvas.width, canvas.height)   
                    }
            
                    if(!ChonkerCat_N_C.isDead)
                    {
                        ctx.drawImage(YellowPusa_Before, 0, 0, 1600, 900, 0, 0, canvas.width, canvas.height)   
                    }
            
                    UpdateGridSpriteSheet(Furina_Before, difference);
                    ctx.drawImage(Furina_Before.Texture, Furina_Before.CurrentImageX, Furina_Before.CurrentImageY, Furina_Before.imageWidth, Furina_Before.imageHeight, 0, 0, canvas.width, canvas.height)
            
                    //BANNER UI
                    Furina_Banner_Before.drawAnimation_oten(1, 1);
                    if(!Ult_Banner_Bool1)
                    {
                        Ult_Banner_Bool1 = Furina_Banner_Before.ANIMATE_EASING_FUNC(DELTATIME, 1, 10420, canvas.width*0.03, 0, true)
                        console.log(`1ST_T`)
                    }
            
                    if(!Ult_Banner_Bool2)
                    {
                        if(Ult_Banner_Bool1)
                        {
                            Ult_Banner_Bool2 = Furina_Banner_Before.ANIMATE_EASING_FUNC(DELTATIME, 1, 30420, -canvas.width*0.038, 0, true)
                            console.log(`2ND_T`)
                        }
                    }
            
                    if(!Ult_Banner_Bool3)
                    {
                        if(Ult_Banner_Bool2)
                        {   
                            Ult_Banner_Bool3 = Furina_Banner_Before.ANIMATE_EASING_FUNC(DELTATIME, 0, 50420, -canvas.width*10, 0, true, true, 20000, 0)
                            console.log(`3RD_T`)
                        }
                    }
                    else
                    {
                        Furina_Banner_Before.goToImmediately(0, canvas.width * 1.9)
                        insideUltimate = true
                    }
                    //based2ndCharacters[0].energyInside = 150
            
            
                    if(Furina_Before.positionY == Furina_Before.FrameLimitY-1)
                    {
                        
                        if(Furina_Before.positionX >= Furina_Before.FrameLimitX-6)
                        {
                            Furina_Before.animationReset();
                        }
                    }
                    break;

            case 8: //After Ultimate
                    hideButton = true
                    drawUIAnim = false;
                    
                    drawYourTurn = false
                    drawEnemyTurn = false
                    drawUltimateButton = false
            
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
            
                    UpdateGridSpriteSheet(MainAnimation_Before, difference);
                    ctx.drawImage(MainAnimation_Before.Texture, MainAnimation_Before.CurrentImageX, MainAnimation_Before.CurrentImageY, MainAnimation_Before.imageWidth, MainAnimation_Before.imageHeight, 0, 0, canvas.width, canvas.height)
            
                    if(MainAnimation_Before.positionY == 7)
                    {
                        if(MainAnimation_Before.positionX >= 8)
                        {   
                            if(attackRightAnimation)
                            {
                                ctx.drawImage(BlackPusa_After, 0, 0, 1600, 900, 0, 0, canvas.width, canvas.height)  
                            } 
                            else
                            {
                                ctx.drawImage(YellowPusa_After, 0, 0, 1600, 900, 0, 0, canvas.width, canvas.height)  
                            }
                        }
                    }
            
                    if(MainAnimation_Before.positionY >= 8)
                    {
                        if(MainAnimation_Before.positionX >= 0)
                        {   
                            if(attackRightAnimation)
                            {
                                ctx.drawImage(BlackPusa_After, 0, 0, 1600, 900, 0, 0, canvas.width, canvas.height) 
                                ultimate_DisplayHP_BlackPusa = true 
                            } 
                            else
                            {
                                ctx.drawImage(YellowPusa_After, 0, 0, 1600, 900, 0, 0, canvas.width, canvas.height)  
                                ultimate_DisplayHP_YellowPusa = true
                            }  
                        }
                    }
            
                    if(MainAnimation_Before.positionY == 8)
                    {
                        if(MainAnimation_Before.positionX >= 8)
                        {   
                            UpdateGridSpriteSheet(Explosion_Before, difference);
                            ctx.drawImage(Explosion_Before.Texture, Explosion_Before.CurrentImageX, Explosion_Before.CurrentImageY, Explosion_Before.imageWidth, Explosion_Before.imageHeight, 0, 0, canvas.width, canvas.height)
                        }
                    }
            
                    if(MainAnimation_Before.positionY >= 9)
                    {
                        if(MainAnimation_Before.positionX >= 0)
                        {   
                            UpdateGridSpriteSheet(Explosion_Before, difference);
                            ctx.drawImage(Explosion_Before.Texture, Explosion_Before.CurrentImageX, Explosion_Before.CurrentImageY, Explosion_Before.imageWidth, Explosion_Before.imageHeight, 0, 0, canvas.width, canvas.height)
                        }
                    }
            
                    if(MainAnimation_Before.positionY == MainAnimation_Before.FrameLimitY-1)
                    {
                        if(MainAnimation_Before.positionX >= MainAnimation_Before.FrameLimitX-10)
                        {
                            characterDamage = Math.ceil(CalculateBaseDamage(1.8, characters[0].attack)) //50% ANG DAMAGE MULTIPLIER SA BASIC ATTACK
                            MCDamage = characterDamage
                            isCritAttack = CritIdentifier(characters[0].critRate)
            
                            if(isCritAttack)
                            {
                                characterDamage *= (1 + characters[0].critDamage);
                                MCDamage = Math.ceil(characterDamage)
                                ifMCDoCritDamage = true
                            }
                            else
                            {
                                ifMCDoNormalDamage = true
                            }
            
                            if(attackRightAnimation)
                            {
                                for(let character_ENEMY of based2ndCharacters)
                                {
                                    if(character_ENEMY.name == "Nigga Cat")
                                    {
                                        character_ENEMY.health = ApplyDamageAndLimiter(character_ENEMY.health, characterDamage, character_ENEMY.name, isCritAttack);
                                        character_ENEMY.isDead = ifCharacterDead(character_ENEMY.health)
                                        console.log(character_ENEMY.isDead)
            
                                        if(character_ENEMY.isDead)
                                        {
                                            NiggaCat_N_C.isDead = true
                                            ifDead_ARRAY_Updater(character_ENEMY)
                                            TurnOrderDisplay_DisplayCurrentActionOrder(characters)
                                        }
            
                                        for(let character_MC of based2ndCharacters)
                                        {
                                            if(character_MC.name == characters[0].name)
                                            {
                                                character_MC.energyInside = 0;
            
                                                if(character_ENEMY.health <= 0)
                                                {
                                                    character_MC.energyInside = AddEnergyPointAndLimiter(character_MC.energyInside, character_MC.eRRate, 10)
                                                }
                                            }
                                        }           
                                    }
                                }
                            }
                            else
                            {
                                for(let character_ENEMY of based2ndCharacters)
                                {
                                    if(character_ENEMY.name == "Chonker Cat")
                                    {
                                        character_ENEMY.health = ApplyDamageAndLimiter(character_ENEMY.health, characterDamage, character_ENEMY.name, isCritAttack);
                                        character_ENEMY.isDead = ifCharacterDead(character_ENEMY.health)
                                        console.log(character_ENEMY.isDead)
            
                                        if(character_ENEMY.isDead)
                                        {
                                            ChonkerCat_N_C.isDead = true
                                            ifDead_ARRAY_Updater(character_ENEMY)
                                            TurnOrderDisplay_DisplayCurrentActionOrder(characters)
                                        }
            
                                        for(let character_MC of based2ndCharacters)
                                        {
                                            if(character_MC.name == characters[0].name)
                                            {
                                                character_MC.energyInside = 0;
            
                                                if(character_ENEMY.health <= 0)
                                                {
                                                    character_MC.energyInside = AddEnergyPointAndLimiter(character_MC.energyInside, character_MC.eRRate, 10)
                                                }
                                            }
                                        }           
                                    }
                                }
                            }
            
                            characterAnimationTurn_FOR_ULTIMATE(characters);
                            attackRightAnimation = false;
                            MainAnimation_Before.animationReset();
                            Explosion_Before.animationReset();
            
                            checkAndAssign_NOTCURRENUI();
                            ultimate_DisplayHP_BlackPusa = false;
                            ultimate_DisplayHP_YellowPusa = false;
                        }
                    }   
                    break;

            case 10: //IF MADAOG
                ctx.clearRect(0,0,0,0)
                break;

        }
        
    }

    animateRequestAnimationFrame = requestAnimationFrame(animate)

    if(!INOPENWORLD)
    {
        if(!animateUI_Limiter)
        {
            animateUI();
            // console.log(`EXECUTED_animate_OPWorld`);
            animateUI_Limiter = true
        }
    }
    
}

let ifMC = false
let circEase_Butt_and_SP;

let first_effect_done = false //buttons kato mu appear


//FOR HPUI ENEMY
let YellowPusaIsDead_HP = false
let BlackPusaIsDead_HP = false

//FOR IF YOU WIN
let WinText = new HPUI_Text(true, 83)
YOUWINNIGGA = new HPUI_Text(true, 83, true)
YOUWINNIGGA_VAR = 0

let ifEnemyisDeadChecked = false;

let canGoBackToOpenWorld = false

function animateUI()
{
    // console.log(`animateUI_ANIMATED`)
    if(based2ndCharacters[2].isDead)
    {
        attackRight = true;
    }

    if(displayUI)
    {
        //vignette
        if(!HPUIG_Hidden)
        {
            vignette.changeLocationX_and_Y(0, 0)//X AND Y LOC
            vignette.drawAnimation_oten(1, 1)//X AND Y SIZE
        }
        // console.log(characters);
        Furina_0.makeTexture
        (2 * 0.05,      1 * 0.08,
         3.44 * 0.02,   3.63 * 0.03,
         characters);
        Furina_0.animateX()

        ChonkerCat_0.makeTexture
            (2 * 0.05,      1 * 0.08,
             3.44 * 0.02,   3.63 * 0.03,
             characters);
        ChonkerCat_0.animateX();

        NiggaCat_0.makeTexture
        (2 * 0.05,      1 * 0.08,
            2 * 0.05,   3.63 * 0.03,
            characters);
        NiggaCat_0.animateX();


        //NOT CURRENT UI
        Furina_N_C.makeTexture
            (180,          1.29,
            2 * 0.05,      1 * 0.08, 
            3.44 * 0.019,  3.63 * 0.028,
            characters);
        Furina_N_C.animateY();
        Furina_N_C.animateX();  
        
        ChonkerCat_N_C.makeTexture
            (-145,          -0.2,
            2 * 0.05,      1 * 0.08, 
            3.44 * 0.019,  3.63 * 0.028,
            characters)
        ChonkerCat_N_C.animateY();
        ChonkerCat_N_C.animateX();
        
        NiggaCat_N_C.makeTexture
        (-170,          -0.2,
        2 * 0.05,      1 * 0.08, 
        3.44 * 0.019,  3.63 * 0.028,
        characters)
        NiggaCat_N_C.animateY();
        NiggaCat_N_C.animateX();
        
        //diri mutago tong button
        if(!first_effect_done)
        {
            if(drawUI1_buttons_SP)
            {
                circEase_Butt_and_SP = true
            }
            else
            {
                circEase_Butt_and_SP = false
            }
    
            if(circEase_Butt_and_SP)
            {
                SP_Hidden.forHPUIG_HIDDEN(DELTATIME, 19000, SP_Hidden_var, 0, true) 
                SP_Hidden_var = SP_Hidden.variable;
    
                Buttons_Hidden.forHPUIG_HIDDEN(DELTATIME, 15000, Buttons_Hidden_var, 0) 
                Buttons_Hidden_var = Buttons_Hidden.variable;

                if(SP_Hidden.elapsed > 19000)
                {
                    first_effect_done = true;
                }
            }
        }
        else
        {
            if(hideButton)
            {
                Buttons_Hidden.forHPUIG_HIDDEN_wRefresher(DELTATIME, 15000, Buttons_Hidden_var, 1) 
                Buttons_Hidden_var = Buttons_Hidden.variable;
            }
            else
            {
                Buttons_Hidden.forHPUIG_HIDDEN_wRefresher(DELTATIME, 15000, Buttons_Hidden_var, 0) 
                Buttons_Hidden_var = Buttons_Hidden.variable;
            }
        }

        MakeHpUI_CHAR(based2ndCharacters[0].uniqueID, based2ndCharacters[0].health, DELTATIME);  //O = FURINA


        if(!YellowPusaIsDead_HP)
        {
            if(animationNumber != 6 && animationNumber != 8)
            {
                MakeHPUI_Enemy_YellowPusa(based2ndCharacters[2].uniqueID, based2ndCharacters[2].health, DELTATIME)
            }

            if(ultimate_DisplayHP_YellowPusa)
            {
                MakeHPUI_Enemy_YellowPusa(based2ndCharacters[2].uniqueID, based2ndCharacters[2].health, DELTATIME)
            }
        }

        

        if(!BlackPusaIsDead_HP)
        {
            if(animationNumber != 5 && animationNumber != 8)
            {
                MakeHPUI_Enemy_BlackPusa(based2ndCharacters[1].uniqueID, based2ndCharacters[1].health, DELTATIME)
            }

            if(ultimate_DisplayHP_BlackPusa)
            {
                console.log(`TRUEBLACK`)
                MakeHPUI_Enemy_BlackPusa(based2ndCharacters[1].uniqueID, based2ndCharacters[1].health, DELTATIME)
            }
        }
        
        
        
        SkillPoint()
        Buttons()
        displayDamage()
        MakeCrossHair() 
        
    }
    
    if(based2ndCharacters[0].health <= 0)
    {
        animationNumber = 0
        canPressKeys = false;
    }

    switch(animationNumber)//if mamatay og madaog
    {
        case 0:     //IF DEFEAT
                DefeatScreen.drawAnimation_oten(1,1)
                displayUI = false;
                break;

        case 10:
                displayUI = false
                YOUWINNIGGA.forHPUIG_HIDDEN(DELTATIME, 15000, YOUWINNIGGA_VAR, 1)
                YOUWINNIGGA_VAR = YOUWINNIGGA.variable;
        
        
                WinText.drawText(`YOU WIN`, 0.23, `rgba(226, 255, 255, 1)`, 0, 1.3 - YOUWINNIGGA_VAR)
                break;
    }

    if(based2ndCharacters[1].isDead && based2ndCharacters[2].isDead)
    {
        animationNumber = 10
    }

    let animateUIRequestAnimationFrame = requestAnimationFrame(animateUI)

    if(INOPENWORLD)
    {
        // console.log(`ANIMATEUI_CANCELED`)
        window.cancelAnimationFrame(animateUIRequestAnimationFrame)
    }   
    else
    {

        if ( !ifEnemyisDeadChecked )
        {
            // console.log ( `ifEnemyisDeadChecked`)
            ifEnemyAreAlive (  );
            ifEnemyisDeadChecked = true;    
        }
        
    }

}


animate();



DefeatScreen_src = `SpriteSheet For Game (Updatedyawa)\\NEW IMAGES\\DEFEAT SCREEN.png`
DefeatScreen = new Updated_MikeAnimation_1Frame (DefeatScreen_src, 0, 0, 2048, 1024, 83)



// ARCHIVE
//image,(SOURCE)X, SY, SWIDTH, SHEIGHT, DESTINATIONX, DY, DWIDTH, DHEIGHT

// 3RD spritesheet array
//                                 LOCATION(x,y)           SIZE(x,y)
// Basic Attack                            (0,0)               (487,500)
// Skill Attack                            (1461, 0)           (487,500)
// Skill Attack (NOT ENOUGH SKILL POINTS)  (974, 0)            (487,500)
// Ultimate Attack (ICON)                  (2048, 1000)        (487,500)

// Ultimate Regen (NOT FULL)               (2048, 500)         (487,500)
// Ultimate Regen (FULL)                   (1948, 0)           (487,500)

// Enemy Turn                              (487, 0)            (487,500)
// Your Turn                               (2048, 1500)        (487,500)

// ULTIMATE BANNER                         (0, 500)            (2048, 1024) 


// 1ST SPRITESHEET (ADDITION)
// SkillPoint                              (2844, 0)           (100,100)
// NoSkillPoint                            (1744, 0)           (100,100)
// SkillPoint_DESIGN                       (2344, 0)           (500,150)

// Total Damage                            (1844, 0)           (500,150)



// Crop Furina w/ BLUR                     (2535, 0)           (300, 351)

// Minus SP                                (0, 500)            (170, 250)
// Add SP                                  (170, 500)          (170, 250)

// Vignette                                (0, 0)              (2048, 1024)

