class Character
{
    constructor(name, speed, health, attack, player, eRRate, energyInside, critRate, critDamage)
    {
        this.name = name;
        this.speed = speed;
        this.health = health;
        this.attack = attack;
        this.player = player;
        this.isDead = false;
        this.cssBlurEffect = false;
        this.ultimateAnimation = false;

        //KARRAN SETTING 2 NA ADD
        this.eRRate = eRRate;
        this.energyInside = energyInside;
        this.critRate = critRate;
        this.critDamage = critDamage;


        this.uniqueID = 0
        this.defaultActionValue = 0;
        this.currentActionValue = 0;
    }
}
    function CalculateStartingActionValue(actionGauge, speed)
    {
        return Math.ceil(actionGauge/speed);
    }

    function AssignAndGetDefaultActionValue(characters)
    {
        for(let i = 0; i<characters.length; i++)
        {
            characters[i].defaultActionValue = CalculateStartingActionValue(initialActionGauge, characters[i].speed);
        }
    }

    function FIRST_AssignAndGetCurrentActionValue(characters)
    {
        baseActionValue = characters[0].defaultActionValue;
        for(let i = 0; i<characters.length; i++)
        {   
            characters[i].currentActionValue = characters[i].defaultActionValue - baseActionValue;
        }
    }

    function CONTINOUS_AssignAndGetCurrentActionValue(characters)
    {
        baseActionValue = characters[0].currentActionValue;
        for(let i = 0; i<characters.length; i++)
        {   
            characters[i].currentActionValue = characters[i].currentActionValue - baseActionValue;
        }
    }

    function ValueSorter(a,b)
    {
        return a.defaultActionValue - b.defaultActionValue;
    }

    function CurrentValueSorter(a,b)
    {
        return a.currentActionValue - b.currentActionValue;
    }

    function TurnOrderDisplay_DisplayCurrentActionOrder(characters) //DISPLAYS THE TURN ORDER DOING NOTHIGH
    {
        console.log(`**********CurrentActionOrder**********`);
        for(let i = 0; i<characters.length; i++)
        {
            if(characters[i].ultimateAnimation)
            {
                console.log(`${characters[i].name} AV:${characters[i].currentActionValue} (Blur:${characters[i].cssBlurEffect}) (UltiAnim)`);
            }
            else
            {
                console.log(`${characters[i].name} AV:${characters[i].currentActionValue} (Blur:${characters[i].cssBlurEffect}) (ID:${characters[i].uniqueID})`);
            }
        }
    }

    function FIRST_TurnOrderDisplay_CurrentCharacterPush(characters) //also turns cssblureffect = true
    {
        let currentCharacter_LASTPUSH = characters[0];
        let currentCharacter_LASTPUSH_DEEPCOPY = Object.assign({}, currentCharacter_LASTPUSH);

        currentCharacter_LASTPUSH_DEEPCOPY.currentActionValue = currentCharacter_LASTPUSH_DEEPCOPY.defaultActionValue;
        currentCharacter_LASTPUSH_DEEPCOPY.cssBlurEffect = true;

        characters.push(currentCharacter_LASTPUSH_DEEPCOPY);   
    }

    function CONTINOUS_TurnOrderDisplay_CurrentCharacterPush(characters) //also turns cssblureffect = false
    {
        characters.splice(0,1);
        // if(!characters[0].ultimateAnimation)
        // {
            // console.log(`exec`)
        let tempCharStor = characters[0];
        currentCharacter_LASTPUSH_DEEPCOPY = Object.assign({}, tempCharStor);
        currentCharacter_LASTPUSH_DEEPCOPY.currentActionValue = currentCharacter_LASTPUSH_DEEPCOPY.defaultActionValue;
        currentCharacter_LASTPUSH_DEEPCOPY.cssBlurEffect = true;
        characters.push(currentCharacter_LASTPUSH_DEEPCOPY);//turn into function

        characters[characters.length-2].cssBlurEffect = false;
        // }
        // else
        // {
        //     characters.splice(0,1)
        //     console.log(`ultianim`)
        // }

        // if(characters.length <= 3)
        // {
        //     let tempCharStor = characters[0];
        //     currentCharacter_LASTPUSH_DEEPCOPY = Object.assign({}, tempCharStor);
        //     currentCharacter_LASTPUSH_DEEPCOPY.currentActionValue = currentCharacter_LASTPUSH_DEEPCOPY.defaultActionValue;
        //     currentCharacter_LASTPUSH_DEEPCOPY.cssBlurEffect = true;
        //     characters.push(currentCharacter_LASTPUSH_DEEPCOPY);//turn into function
    
        //     characters[characters.length-2].cssBlurEffect = false;
        // }
    }

    function assignUniqueID_FOR_UI_ANIMATION_STARTING(characters)
    {
        characters[0].uniqueID = 0;
        characters[1].uniqueID = 1;
        characters[2].uniqueID = 2;
        characters[3].uniqueID = 3;
    }
    //add feature if attacking turn opacity 0 ang ilalom sa turnorder

    function assign2ndArrayBecauseFuckJS(characters, based2ndCharacters)//FOR 2ND ARRAY BECAUSE JS PASS BY REF YAWA
    {
        let temp;
        let temp2;
        for(let i = 0; i < characters.length; i++)
        {
            temp = characters[i]
            temp2 = Object.assign({}, temp);

            based2ndCharacters.push(temp2);
        }
    }

    function reuseSpecialID_For_default_HP(characters)
    {   
        for(let i = 0; i < characters.length; i++)
        {
            characters[i].uniqueID = characters[i].health
        }
    }











//start of game //YAWA JS DOESNT WORKT THAT WAY (VULNERABILITIES)
const initialActionGauge = 10000; //YAWA AYAW ILISI OG NGALAN MALUOY KA (VULNERABILITIES)


let based2ndCharacters = [];


//IBUTANG NI SA MAIN 
// assign2ndArrayBecauseFuckJS(characters, based2ndCharacters); //FOR 2ND ARRAY BECAUSE JS PASS BY REF YAWA //GIBALHIN NIMO SA BASED2NDARRAY ANG CHARACTER ARRAY
// reuseSpecialID_For_default_HP(based2ndCharacters)//UNIQUEID KAY HP NA KAY GIs NAKO FOR MCUI

// //get default action value
// AssignAndGetDefaultActionValue(characters)

// //sort the array characters based on DEFAULT_ACTION_VALUE (DLI PARIHA SA SORT SA CONTINOUS)
// characters.sort(ValueSorter);

// //Get the character[0](DAV) and subtract it to the entire array FORMULA: CurrentActionValue = DefaultActionValue - BaseActionValue
// FIRST_AssignAndGetCurrentActionValue(characters)

// //Push character[0] to the bottom TurnOrder and make it blurry
// FIRST_TurnOrderDisplay_CurrentCharacterPush(characters)

// //assign UNIQUE ID FOR UI ANIMATION
// assignUniqueID_FOR_UI_ANIMATION_STARTING(characters)

// //Display in console
// TurnOrderDisplay_DisplayCurrentActionOrder(characters);


let button = document.getElementById(`Gwapo`);
button.onclick = function()
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


    //Imported Function From Previous Game
    function CalculateBaseDamage (damagePercentage, scalingAttribute)
    {
        return damagePercentage * scalingAttribute;
    }

    function CritIdentifier (CritRate)
    {
        let random = Math.random() * 100;
        if(random <= CritRate)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function ApplyDamageAndLimiter (characterHealth, damage, name, ifCrit)//APIL ANG CONSOLE LOG SHIT
    {
        let TEMP_pastHP = characterHealth;

        characterHealth -= damage;
        if(characterHealth <= 0)
        {
            characterHealth = 0;
        }

        //CONSOLE LOG SHIT
        if(ifCrit)
        {
            console.log(`${characters[0].name} dealt CRITICAL!! damage: ${damage} to ${name} P_HP:(${TEMP_pastHP}) C_HP:(${characterHealth})`)
        }
        else
        {
            console.log(`${characters[0].name} dealt damage: ${damage} to ${name} P_HP:(${TEMP_pastHP}) C_HP:(${characterHealth})`)
        }

        return characterHealth;
    }

    function EnergyCalculator (energyRegenerationRate, baseEnergy)
    {
        let add = 1 + energyRegenerationRate;
        return add * baseEnergy;
    }

    function AddEnergyPointAndLimiter (mainCharacterEnergy, mainCharacterEnergyRate, energyRecharge) //NAA DIRI DISPLAY SA KARAAN
    {
        TEMP_PastEnergy = mainCharacterEnergy;
        mainCharacterEnergy += EnergyCalculator(mainCharacterEnergyRate, energyRecharge);

        if (mainCharacterEnergy >= 119.45)
        {
            mainCharacterEnergy = 120;
        }
        console.log(`Current Energy: ${mainCharacterEnergy}/120 PastEnergy: ${TEMP_PastEnergy}`)
        return mainCharacterEnergy;
    }

    function AddSkillPointAndLimiter(skillPoint) //NAA DIRI DISPLAY SA KARAAN
    {
        skillPoint += 1;
        if (skillPoint >= 5)
        {
            skillPoint = 5;
        }

        if (skillPoint <= 0)
        {
            skillPoint = 0;
        }
        console.log(`Remaining SkillPoint:${skillPoint}`)
        return skillPoint;
    }   

    function SubtractSkillPointAndLimiter(skillPoint) //NAA DIRI DISPLAY SA KARAAN
    {
        skillPoint -= 1;
        if (skillPoint >= 5)
        {
            skillPoint = 5;
        }

        if (skillPoint <= 0)
        {
            skillPoint = 0;
        }
        console.log(`Remaining SkillPoint:${skillPoint}`)
        return skillPoint;
    }

    function ifCharacterDead(characterHealth)
    {
        if (characterHealth == 0)
        {
            return true
        }
        else
        {
            return false
        }
    }

