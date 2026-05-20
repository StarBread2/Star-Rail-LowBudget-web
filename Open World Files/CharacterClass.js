function drawImage( imageClass , { Texture, spriteLocX, spriteLocY, spriteWidth, spriteHeight, canvasLocX, canvasLocY, canvasSizeX, canvasSizeY, flippedImageX } )
{   
    // source of spritesheet
    //img, sourcex, sourcey, sourcewidth, sh,
    // where to put the image in the canvas
    //dx, dy, dwidth, dheight 

    ctx.save();
    ctx.translate( -spriteWidth / 2, -spriteHeight / 2 )

    if(flippedImageX)
    {
        ctx.scale(-1,1)
        canvasLocX += (-spriteWidth / 2 + (-spriteWidth / 2))
        //console.log(`Flipped: ${FURINA_2D.canvasLocX}`)
    }
    else //PARA RA CONSOLE.LOG
    {
        //console.log(`UnFlipped: ${FURINA_2D.canvasLocX}`)
    }

    ctx.drawImage( Texture, spriteLocX, spriteLocY, spriteWidth, spriteHeight, canvasLocX, canvasLocY, canvasSizeX, canvasSizeY )
    
    ctx.restore();
}

function makeCharacterDetails_TurnBased ( health, speed, attack, energyRecharge, energyStored, critRate, critDamage )
{
    return {
        HP: health,
        SPD: speed,
        ATK: attack,
        ERRATE: energyRecharge,
        EI: energyStored,
        CR: critRate,
        CDMG: critDamage
    }
}

function makeCharacterDetails_TurnBased_Enemy ( leftEnemyAlive, RightEnemyAlive, health1, speed1, attack1, health2, speed2, attack2 )
{
    if ( !leftEnemyAlive )
    {
        health1 = 0
    }

    if ( !RightEnemyAlive )
    {
        health2 = 0
    }
    
    return {
        enemy1Alive: leftEnemyAlive,
        enemy2Alive: RightEnemyAlive,
        HP1: health1,
        SPD1: speed1,
        ATK1: attack1,
        HP2: health2,
        SPD2: speed2,
        ATK2: attack2,
    }
}

class Character_2D
{
    constructor( imageArr, spriteWidth, spriteHeight, player, colliderX_Fix, colliderY_Fix, respawnX, respawnY, spriteLoc = createVector2 ( 0, 0 ), frustumAngle = 0.85, frustumDistance = 1400, details )
    {
        //FOR OPEN WORLD
        this.fullyDead = false;

        this.Texture = imageArr;

        this.spriteLocX = spriteLoc.y;
        this.spriteLocY = spriteLoc.x;

        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;

        this.canvasLocX = respawnX; // change 2 recordedvalue if lain
        this.canvasLocY = respawnY;

        this.canvasSizeX = spriteWidth
        this.canvasSizeY = spriteHeight

        this.flippedImageX = false

        this.recordedValue = respawnX; //(v)
        this.recordedValue2 = respawnX; //(v2) 
        this.dLimiter = false;
        this.aLimiter = false;
        this.speed = 3;

        //FOR PHYSICS
        this.acceleration = 0.5;
        this.velocityY = 0;
        this.velocityX = 0;
        this.friction = 0.95;

        this.totalTime = 0//I DELETE NI UNYA

        //FOR WAVE
        this.valueGoUp = 5 //Value how much to go up
        this.valueForNoise = 0 //Temp
        this.waveNoise = 0

        //FOR WAVE NOISE
        this.frequency = 5;

        //FOR MOUSECLICK
        this.attack = false;
        this.canMove = true;
        this.totalTime = 0;
        this.switchTime_FORCLICK = 30000; //manual nigga

        //FOR ENEMY
        this.player = player;

        //FOR COLLIDER
        this.collider = new Collider ( this.spriteWidth - ( this.spriteWidth * colliderX_Fix ), this.spriteHeight - ( this.spriteHeight * colliderY_Fix ), this.locRelative_Canvas_X, this.locRelative_Canvas_Y );
        
        //FOR TURNING LEFT DISSAPEARANCE
        this.dissapearNotFixed = false;

        //FOR AI
        this.AI = new AIFollow ( frustumAngle, frustumDistance );

        //FIXED LOC
        this.fixedCanvasLoc = createVector2 ( 0, 0 );

        //FOR TURNBASED
        this.ifSeenedByEnemy = false
        this.AttackedByEnemy = false
        this.canAttackEnemy_InRange = false
        this.details = details;
        this.detailsEnemy = makeCharacterDetails_TurnBased_Enemy ( 0, 0, 0, 0, 0, 0, 0, 0 );

        this.totalTime2 = 0;

        //FOR PET
        this.petNumber = 1;
    }
    
    //FOR CHAR
    updateCharacter_W_Physics(  )
    {
        this.assignCharacterState( `Stand` )
        
        this.calculateXAndY_W_Physics (  );

        this.canvasLocX = Math.ceil ( this.canvasLocX );

        if ( Math.abs( this.velocityX ) >= 1 )
        {
            this.addWaveNoiseAnimation (  );
            this.assignCharacterState( `Walk` )
            this.frequency = 50.5
        }

        if( this.canMove )
        {
            if(this.player)
            {
                if(isKeyPressed('w'))
                    {
                        this.checkIfRunning (  )
            
                        this.velocityY -= this.acceleration;
                }
                if(isKeyPressed('s'))
                {
                    this.checkIfRunning (  )
        
                    this.velocityY += this.acceleration;
                }
                if(isKeyPressed('a'))//UNFLIPPED
                {
                    this.checkIfRunning (  )
        
                    this.flippedImageX = false;
                    this.dLimiter = false;
        
                    if( !this.aLimiter )
                    {
                        this.valueFlipper ( this.recordedValue2 )
        
                        this.aLimiter = true
                        this.recordedValue2 = 0;
                    }
                    //console.log(`canvasLOCX: ${this.canvasLocX}`)
        
                    this.recordedValue = this.canvasLocX 
                    this.velocityX -= this.acceleration;
                }
                if(isKeyPressed('d') || !this.dissapearNotFixed ) //FLIPPED
                {
                    this.checkIfRunning (  )
        
                    this.flippedImageX = true;
                    this.aLimiter = false
        
                    //FOR PHYSICS PROBLEM
                    if ( !this.dLimiter )
                    {
                        this.valueFlipper ( this.recordedValue )
                        
                        this.dLimiter = true;
                        this.recordedValue = 0
                    }
        
                    if( this.flippedImageX )
                    {
                        this.velocityX -= this.acceleration;
                        this.recordedValue2 = this.canvasLocX;
                    }
                    else
                    {
                        this.velocityX += this.acceleration;
                        this.recordedValue2 = this.canvasLocX;
                    }   
                    this.dissapearNotFixed = true
                } 

            } 
        }
        else
        {
            this.totalTime += DELTATIME
            this.velocityX = 0;
            this.velocityY = 0;
            
            if ( this.totalTime >= this.switchTime_FORCLICK )
            {
                this.attack = false;
                this.totalTime -= this.switchTime_FORCLICK;
            }
        }

        if ( this.attack )
        {
            this.assignCharacterState( `Hit` );
            this.canMove = false;
        }
        else
        {
            this.canMove = true;
        }

        if( Math.abs( this.velocityX ) <= 0.009 )
        {
            this.velocityX = 0
        }
        this.getActualLocation_Canvas (  );
    }

    updateCharacter_W_Physics_P2()
    {

        this.assignCharacterState( `Stand` )
        
        this.calculateXAndY_W_Physics (  );

        this.canvasLocX = Math.ceil ( this.canvasLocX );

        if ( Math.abs( this.velocityX ) >= 1 )
        {
            this.addWaveNoiseAnimation (  );
            this.assignCharacterState( `Walk` )
            this.frequency = 50.5
        }

        if( this.canMove )
        {
            if(this.player)
            {
                if(isKeyPressed('ArrowUp'))
                    {
                        this.checkIfRunning_P2 (  )
            
                        this.velocityY -= this.acceleration;
                }
                if(isKeyPressed('ArrowDown'))
                {
                    this.checkIfRunning_P2 (  )
        
                    this.velocityY += this.acceleration;
                }
                if(isKeyPressed('ArrowLeft'))//UNFLIPPED
                {
                    this.checkIfRunning_P2 (  )
        
                    this.flippedImageX = false;
                    this.dLimiter = false;
        
                    if( !this.aLimiter )
                    {
                        this.valueFlipper ( this.recordedValue2 )
        
                        this.aLimiter = true
                        this.recordedValue2 = 0;
                    }
                    //console.log(`canvasLOCX: ${this.canvasLocX}`)
        
                    this.recordedValue = this.canvasLocX 
                    this.velocityX -= this.acceleration;
                }
                if(isKeyPressed('ArrowRight')) //FLIPPED
                {
                    this.checkIfRunning_P2 (  )
        
                    this.flippedImageX = true;
                    this.aLimiter = false
        
                    //FOR PHYSICS PROBLEM
                    if ( !this.dLimiter )
                    {
                        this.valueFlipper ( this.recordedValue )
                        
                        this.dLimiter = true;
                        this.recordedValue = 0
                    }
        
                    if( this.flippedImageX )
                    {
                        this.velocityX -= this.acceleration;
                        this.recordedValue2 = this.canvasLocX;
                    }
                    else
                    {
                        this.velocityX += this.acceleration;
                        this.recordedValue2 = this.canvasLocX;
                    }   
                } 
            } 
        }
        else
        {
            this.totalTime += DELTATIME
            this.velocityX = 0;
            this.velocityY = 0;
            if ( this.totalTime >= this.switchTime_FORCLICK )
            {
                this.attack = false;
                this.totalTime -= this.switchTime_FORCLICK;
            }
        }

        if ( this.attack )
        {
            this.assignCharacterState( `Hit` );
            this.canMove = false;
        }
        else
        {
            this.canMove = true;
        }

        if( Math.abs( this.velocityX ) <= 0.009 )
        {
            this.velocityX = 0
        }

        this.getActualLocation_Canvas (  );

        //console.log ( this.canvasLocY )
    }

    updateCharacter_W_Flip()
    {
        this.assignCharacterState( `Stand` )
        
        console.log(`y: ${ this.canvasLocX }`)

        if ( this.canMove )
        {
            if(isKeyPressed('w'))
            {
                this.checkIfRunning (  )
    
                this.canvasLocY -= 5 * this.speed;
            }
            if(isKeyPressed('s'))
            {
                this.checkIfRunning (  )
    
                this.canvasLocY += 5 * this.speed; 
            }
            if(isKeyPressed('a'))//UNFLIPPED
            {
                this.checkIfRunning (  )
    
                this.flippedImageX = false
                this.dLimiter = false;
    
                this.addWaveNoiseAnimation (  );
    
                //CODE FOR A TRANSLATING TO NEGATIVE OR POSITIVE
                if( !this.aLimiter )
                {
                    this.valueFlipper ( this.recordedValue2 )
        
                    this.aLimiter = true
                    this.recordedValue2 = 0;
                }
    
                this.recordedValue = this.canvasLocX //COMES FROM D
                this.canvasLocX -= 5 * this.speed;
                
                //AYAW IBUTANG DIRI ANG WAVE FUNCTION NAAY .5 (MATH CEIL PLACEMENT PROBLEM)
            }
            if(isKeyPressed('d')) //FLIPPED
            {
                this.checkIfRunning (  )
    
                this.flippedImageX = true
                this.aLimiter = false
                
                this.addWaveNoiseAnimation (  );
                
                //CODE FOR D TRANSLATING TO NEGATIVE OR POSITIVE
                if( !this.dLimiter )
                {
                    this.valueFlipper ( this.recordedValue )
                
                    this.dLimiter = true
                    this.recordedValue = 0;                                  //RESETER
                } 
    
                if( this.flippedImageX )
                {
                    this.recordedValue2 = this.canvasLocX    //ASSIGNING VALUE FOR A
                    this.canvasLocX -= 5 * this.speed; 
                }
                else
                {
                    this.recordedValue2 = this.canvasLocX    //ASSIGNING VALUE FOR A
                    this.canvasLocX += 5 * this.speed;
                }   
            }
        }
        else
        {

            console.log( `Can't Move` )
        }
        
        if ( this.attack )
        {
            this.assignCharacterState( `Hit` );
            this.canMove = false;
        }

        this.canvasLocX = Math.ceil ( this.canvasLocX );
        this.canvasLocY = Math.ceil ( this.canvasLocY );

    }

    updateCharacter ()
    {
        if( isKeyPressed( 'w' ) )
        {
            this.canvasLocY -= 5 * this.speed;
            //console.log( `Y: ${ this.canvasLocY }` ); 
        }
        if( isKeyPressed( 's' ) )
        {
            this.canvasLocY += 5 * this.speed;
            //console.log( `Y: ${ this.canvasLocY }` ); 
        }
        if( isKeyPressed( 'a' ) )
        {
            let temp = 0;
            if( this.waveNoise < 0 )
            {
                this.canvasLocY -= this.valueForNoise;
            }
            else
            {
                this.canvasLocY += this.valueForNoise;
            }

            this.waveNoise = this.waveNoiseFunction( this.canvasLocX, 0.1, 10 )
            //console.log( `WAVENOISE: ${this.waveNoise}` )

            if( this.waveNoise < 0 )
            {
                this.valueForNoise = this.valueGoUp * ( this.waveNoise + 1 );//dungagan og 1 para mahimo real number
                this.valueForNoise = Math.max ( this.valueForNoise, this.valueGoUp )

                this.canvasLocY -= this.valueForNoise;
            }
            else
            {
                this.valueForNoise = this.valueGoUp * ( this.waveNoise + 1 )
                this.valueForNoise = Math.max ( this.valueForNoise, this.valueGoUp )

                this.canvasLocY += this.valueForNoise;
            }

            
            this.canvasLocX -= 5 * this.speed;
            //console.log(`canvasLOCX: ${this.canvasLocX}`)
            console.log(`Y: ${this.canvasLocY}`)
        }
        if( isKeyPressed( 'd' ) )
        {
            this.canvasLocX += 5 * this.speed;
            //console.log( `Y: ${ this.canvasLocY }` ); 
        }
    }

    firstUpdateCharacter ()
    {
        if ( this.collider === undefined )
        {
            this.GetCollider (  )
        }

        if( isKeyPressed( 'w' ) )
            {
                this.canvasLocY -= 5 * 1.5;
            }
            if( isKeyPressed( 's' ) )
            {
                this.canvasLocY += 5 * 1.5;
            }
            if( isKeyPressed( 'a' ) )
            {
                this.canvasLocX -= 5 * 1.5;
            }
            if( isKeyPressed( 'd' ) )
            {
                this.canvasLocX += 5 * 1.5;
            }
    }



    //collider
    renderCollider (  )
    {  
        if ( !this.fullyDead )
        {
            this.canvasLocY = this.collider.location.y;

            if ( this.collider.dx != undefined )
            {
                if ( this.flippedImageX )
                {
                    this.canvasLocX -= this.collider.dx;
                }
                else
                {
                    this.canvasLocX += this.collider.dx;
                }
            }
            
            this.collider.dx = undefined;
            //console.log ( this.collider.intersect );
        }
    }



    waveNoiseFunction( x, l, f )
    {
        let y = Math.sin( ( x * f ) ) * l 
        return y;
    }

    addWaveNoiseAnimation (  )
    {
        //WAVE NOISE STABILIZER
        if ( this.waveNoise < 0 )
        {
            this.canvasLocY += this.valueForNoise;
        }
        else
        {
            this.canvasLocY -= this.valueForNoise;
        }

        //ACTUAL WAVE NOISE
        this.waveNoise = this.waveNoiseFunction ( Math.abs( this.canvasLocX ), 0.1, this.frequency );
    
        //WAVE NOISE ASSIGNING
        if ( this.waveNoise < 0 )
        {
            this.valueForNoise = this.valueGoUp * ( this.waveNoise + 1 );
            this.valueForNoise = Math.max ( this.valueForNoise, this.valueGoUp );

            this.canvasLocY -= this.valueForNoise;
        }
        else
        {
            this.valueForNoise = this.valueGoUp * ( this.waveNoise + 1 );
            this.valueForNoise = Math.max ( this.valueForNoise, this.valueGoUp );

            this.canvasLocY += this.valueForNoise;
        }
    }

    valueFlipper ( recordedValue ) //if < -1 { return 1 } else { return 1 }
    {
        if( this.canvasLocX <= 0 )
        {
            recordedValue = Math.abs( recordedValue )//POSITIVE
        }
        else
        {
            recordedValue = -recordedValue //NEGATIVED
        }
        this.canvasLocX = recordedValue;
    }

    drawCharacter()
    {
        drawImage( this,this );
    }

    checkIfRunning (  ) //IF PRESSING SHIFT
    {
        if(isKeyPressed( 'Shift' ))
        {
            this.assignCharacterState( `Run` )
        }
        else
        {
            this.assignCharacterState( `Walk` )
        }
    }

    checkIfRunning_P2 (  ) //IF PRESSING SHIFT
    {
        if(isKeyPressed( '/' ))
        {
            this.assignCharacterState( `Run` )
        }
        else
        {
            this.assignCharacterState( `Walk` )
        }
    }

    assignCharacterState( state )
    {
        switch( state )
        {
            case "Stand":
                this.spriteLocX = 1200;
                this.spriteLocY = 600;
                break;

            case "Walk":
                this.totalTime2 = 0
                this.spriteLocX = 0;
                this.spriteLocY = 1200;
                this.speed = 2;
                this.acceleration = 0.5;
                //this.frequency = 5 (FOR FLIP)
                this.frequency = 1.5;
                break;

            case "Run":
                this.totalTime2 = 0
                this.spriteLocX = 600;
                this.spriteLocY = 600;
                this.speed = 3.5;
                this.acceleration = 1;
                //this.frequency = 20 (FOR FLIP)
                this.frequency = 100.5;
                break;

            case "GetHit":
                this.totalTime2 = 0
                this.spriteLocX = 1200;
                this.spriteLocY = 0;
                break;

            case "Hit":
                if ( this.canAttackEnemy_InRange )
                {
                    this.totalTime2 = this.totalTime2 + DELTATIME;
                    console.log ( `DIE NIGGER` )
                    if ( this.totalTime2 > 1000 )
                    {
                        INOPENWORLD = false;
                        console.log ( ` FALSE: ${this.canAttackEnemy_InRange}` )
                        console.log ( `FALSE` )
                    }
                }
                this.spriteLocX = 0;
                this.spriteLocY = 600;
                break;
                
        }
    }

    calculateXAndY_W_Physics (  )
    {
        this.velocityY *= this.friction;
        this.velocityX *= this.friction;
        
        this.canvasLocY += this.velocityY;
        this.canvasLocX += this.velocityX;
    }

    getActualLocation_Canvas (  )
    {
        if ( this.flippedImageX )
        {
            this.fixedCanvasLoc.x = Math.abs( this.canvasLocX );
            this.collider.location.x = this.fixedCanvasLoc.x
        }
        else
        {
            this.fixedCanvasLoc.x = this.canvasLocX;
            this.collider.location.x = this.fixedCanvasLoc.x;
        }
        this.canvasLocY = numberToFloat ( this.canvasLocY, 0 )//" MATH GOD NIGGER "
        this.fixedCanvasLoc.y = Math.ceil ( this.canvasLocY );
        this.collider.location.y = this.fixedCanvasLoc.y
        //console.log ( this.fixedCanvasLoc );  
    }






    //FOR PET
    updateCharacter_W_Physics_PET(  )
    {
        this.assignCharacterState_PET( `Stand` )
        
        this.calculateXAndY_W_Physics (  );

        this.canvasLocX = Math.ceil ( this.canvasLocX );

        if ( Math.abs( this.velocityX ) >= 1 )
        {
            this.addWaveNoiseAnimation (  );
            this.assignCharacterState_PET( `Walk` )
            this.frequency = 50.5
        }

        if( this.canMove )
        {
            if(this.player)
            {
                if(this.AI.goUp)
                    {
                        this.checkIfRunning_PET (  )
            
                        this.velocityY -= this.acceleration;
                }
                if(this.AI.goDown)
                {
                    this.checkIfRunning_PET (  )
        
                    this.velocityY += this.acceleration;
                }
                if(this.AI.goLeft)//UNFLIPPED
                {
                    this.checkIfRunning_PET (  )
        
                    this.flippedImageX = false;
                    this.dLimiter = false;
        
                    if( !this.aLimiter )
                    {
                        this.valueFlipper ( this.recordedValue2 )
        
                        this.aLimiter = true
                        this.recordedValue2 = 0;
                    }
                    //console.log(`canvasLOCX: ${this.canvasLocX}`)
        
                    this.recordedValue = this.canvasLocX 
                    this.velocityX -= this.acceleration;
                }
                if(this.AI.goRight || !this.dissapearNotFixed ) //FLIPPED
                {
                    this.checkIfRunning_PET (  )
        
                    this.flippedImageX = true;
                    this.aLimiter = false
        
                    //FOR PHYSICS PROBLEM
                    if ( !this.dLimiter )
                    {
                        this.valueFlipper ( this.recordedValue )
                        
                        this.dLimiter = true;
                        this.recordedValue = 0
                    }
        
                    if( this.flippedImageX )
                    {
                        this.velocityX -= this.acceleration;
                        this.recordedValue2 = this.canvasLocX;
                    }
                    else
                    {
                        this.velocityX += this.acceleration;
                        this.recordedValue2 = this.canvasLocX;
                    }   
                    this.dissapearNotFixed = true
                } 

                if ( isKeyPressed('1') )
                {
                    this.petNumber = 1;
                }
                if ( isKeyPressed('2') )
                {
                    this.petNumber = 2;
                }
                if ( isKeyPressed('3') )
                {
                    this.petNumber = 3;
                }
                if ( isKeyPressed('4') )
                {
                    this.petNumber = 4;
                }
                this.updatePetCharacter (  );
            } 
        }

        if( Math.abs( this.velocityX ) <= 0.009 )
        {
            this.velocityX = 0
        }
        this.getActualLocation_Canvas (  );

    }

    assignCharacterState_PET( state )
    {
        switch( state )
        {
            case "Walk":
                this.acceleration = 0.5;
                //this.frequency = 5 (FOR FLIP)
                this.frequency = 1.5;
                break;

            case "Run":
                this.acceleration = 1;
                //this.frequency = 20 (FOR FLIP)
                this.frequency = 100.5;
                break;
        }
    }

    checkIfRunning_PET (  ) //IF PRESSING SHIFT
    {
        if(isKeyPressed( 'Shift' ))
        {
            this.assignCharacterState_PET( `Run` )
        }
        else
        {
            this.assignCharacterState_PET( `Walk` )
        }
    }



    //TO TURN BASED
    checkIfAttackedOrAttacking ( char2 )
    {
        this.AttackedByEnemy = false
        if ( this.collider.collidingWithChar )
        {
            if ( this.ifSeenedByEnemy )
            {
                if ( !char2.details.enemy1Alive && !char2.details.enemy2Alive )
                {
                    this.AttackedByEnemy = false
                    char2.detailsEnemy = this.details;
                }
                else
                {
                    console.log ( `ATTACKEDBYENEMY` )
                    this.AttackedByEnemy = true
                    this.detailsEnemy = char2.details;
                }
            }
        }

        if ( this.AttackedByEnemy )
        {
            this.detailsEnemy.SPD1 = Math.min ( this.detailsEnemy.SPD1 + 10, 200 );
            this.detailsEnemy.SPD2 = Math.min ( this.detailsEnemy.SPD2 + 10, 200 );
            
            INOPENWORLD = false;
        }
    }

    //FOR PET UPDATE
    updatePetCharacter (  )
    {
        switch ( this.petNumber )
        {
            case 1:
                this.spriteLocX = 1200;
                this.spriteLocY = 1800;
                break;

            case 2:
                this.spriteLocX = 0;
                this.spriteLocY = 1800;
                break;

            case 3:
                this.spriteLocX = 600;
                this.spriteLocY = 1800;
                break;

            case 4:
                this.spriteLocX = 1200;
                this.spriteLocY = 1800;
                break;
        }
    }

}

class Character_2D_Enemy
{
    constructor(imageArr, spriteWidth, spriteHeight, player, colliderX_Fix, colliderY_Fix, respawnX, respawnY, details )
    {
        //FOR TURNBASED
        this.details = details;
        this.fullyDead = false;

        this.Texture = imageArr;

        this.spriteLocX = 0;
        this.spriteLocY = 0;

        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;

        this.canvasLocX = respawnX;
        this.canvasLocY = respawnY;

        this.canvasSizeX = spriteWidth
        this.canvasSizeY = spriteHeight

        this.flippedImageX = false;

        this.recordedValue = respawnX; //(v)
        this.recordedValue2 = respawnX; //(v2) 
        this.dLimiter = false;
        this.aLimiter = false;
        this.speed = 3;

        //FOR PHYSICS
        this.acceleration = 0.5;
        this.velocityY = 0;
        this.velocityX = 0;
        this.friction = 0.95;

        this.totalTime = 0//I DELETE NI UNYA

        //FOR WAVE
        this.valueGoUp = 5 //Value how much to go up
        this.valueForNoise = 0 //Temp
        this.waveNoise = 0

        //FOR WAVE NOISE
        this.frequency = 5;

        //FOR MOUSECLICK
        this.attack = false;
        this.canMove = true;
        this.totalTime = 0;
        this.switchTime_FORCLICK = 30000; //manual nigga

        //FOR ENEMY
        this.player = player;

        //FOR COLLIDER
        this.collider = new Collider ( this.spriteWidth - ( this.spriteWidth * colliderX_Fix ), this.spriteHeight - ( this.spriteHeight * colliderY_Fix ), this.locRelative_Canvas_X, this.locRelative_Canvas_Y, this.fullyDead );
    
        //FOR TURNING LEFT DISSAPEARANCE
        this.dissapearNotFixed = false;

        //FOR AI
        this.AI = new AIFollow ( -0.5, createVector2 ( 1400, 1000 ) ); 

        //FIXED LOC
        this.fixedCanvasLoc = createVector2 ( 0, 0 );
    }
    
    //FOR CHAR
    updateCharacter_W_Flip()
    {
        checkIfFullyDead (  )
        if ( !this.fullyDead )
        {
            this.assignCharacterState( `Stand` )
        
            console.log(`y: ${ this.canvasLocX }`)
    
            if ( this.canMove )
            {
                if(isKeyPressed('w'))
                {
                    this.checkIfRunning (  )
        
                    this.canvasLocY -= 5 * this.speed;
                }
                if(isKeyPressed('s'))
                {
                    this.checkIfRunning (  )
        
                    this.canvasLocY += 5 * this.speed; 
                }
                if(isKeyPressed('a'))//UNFLIPPED
                {
                    this.checkIfRunning (  )
        
                    this.flippedImageX = false
                    this.dLimiter = false;
        
                    this.addWaveNoiseAnimation (  );
        
                    //CODE FOR A TRANSLATING TO NEGATIVE OR POSITIVE
                    if( !this.aLimiter )
                    {
                        this.valueFlipper ( this.recordedValue2 )
            
                        this.aLimiter = true
                        this.recordedValue2 = 0;
                    }
        
                    this.recordedValue = this.canvasLocX //COMES FROM D
                    this.canvasLocX -= 5 * this.speed;
                    
                    //AYAW IBUTANG DIRI ANG WAVE FUNCTION NAAY .5 (MATH CEIL PLACEMENT PROBLEM)
                }
                if(isKeyPressed('d')) //FLIPPED
                {
                    this.checkIfRunning (  )
        
                    this.flippedImageX = true
                    this.aLimiter = false
                    
                    this.addWaveNoiseAnimation (  );
                    
                    //CODE FOR D TRANSLATING TO NEGATIVE OR POSITIVE
                    if( !this.dLimiter )
                    {
                        this.valueFlipper ( this.recordedValue )
                    
                        this.dLimiter = true
                        this.recordedValue = 0;                                  //RESETER
                    } 
        
                    if( this.flippedImageX )
                    {
                        this.recordedValue2 = this.canvasLocX    //ASSIGNING VALUE FOR A
                        this.canvasLocX -= 5 * this.speed; 
                    }
                    else
                    {
                        this.recordedValue2 = this.canvasLocX    //ASSIGNING VALUE FOR A
                        this.canvasLocX += 5 * this.speed;
                    }   
                }
            }
            else
            {
    
                console.log( `Can't Move` )
            }
            
            if ( this.attack )
            {
                this.assignCharacterState( `Hit` );
                this.canMove = false;
            }
    
            this.canvasLocX = Math.ceil ( this.canvasLocX );
            this.canvasLocY = Math.ceil ( this.canvasLocY );
        }

    }

    updateCharacter()
    {
        if( isKeyPressed( 'w' ) )
        {
            this.canvasLocY -= 5 * this.speed;
            //console.log( `Y: ${ this.canvasLocY }` ); 
        }
        if( isKeyPressed( 's' ) )
        {
            this.canvasLocY += 5 * this.speed;
            //console.log( `Y: ${ this.canvasLocY }` ); 
        }
        if( isKeyPressed( 'a' ) )
        {
            let temp = 0;
            if( this.waveNoise < 0 )
            {
                this.canvasLocY -= this.valueForNoise;
            }
            else
            {
                this.canvasLocY += this.valueForNoise;
            }

            this.waveNoise = this.waveNoiseFunction( this.canvasLocX, 0.1, 10 )
            //console.log( `WAVENOISE: ${this.waveNoise}` )

            if( this.waveNoise < 0 )
            {
                this.valueForNoise = this.valueGoUp * ( this.waveNoise + 1 );//dungagan og 1 para mahimo real number
                this.valueForNoise = Math.max ( this.valueForNoise, this.valueGoUp )

                this.canvasLocY -= this.valueForNoise;
            }
            else
            {
                this.valueForNoise = this.valueGoUp * ( this.waveNoise + 1 )
                this.valueForNoise = Math.max ( this.valueForNoise, this.valueGoUp )

                this.canvasLocY += this.valueForNoise;
            }

            
            this.canvasLocX -= 5 * this.speed;
            //console.log(`canvasLOCX: ${this.canvasLocX}`)
            console.log(`Y: ${this.canvasLocY}`)
        }
        if( isKeyPressed( 'd' ) )
        {
            this.canvasLocX += 5 * this.speed;
            //console.log( `Y: ${ this.canvasLocY }` ); 
        }
    }

    //FOR ENEMY
    updateCharacter_W_Physics_Enemy_Black_Pusa()
    {
        this.checkIfFullyDead (  )
        if ( !this.fullyDead )
        {
            this.assignCharacterState_Enemy_Black_Pusa( `Stand` )
        
            this.calculateXAndY_W_Physics (  );
    
            this.canvasLocX = Math.ceil ( this.canvasLocX );
    
            if ( Math.abs( this.velocityX ) >= 1 )
            {
                this.addWaveNoiseAnimation (  );
                this.assignCharacterState_Enemy_Black_Pusa( `Walk` )
                this.frequency = 50.5
            }
    
            if( this.canMove )
            {
                if(isKeyPressed('ArrowUp') || this.AI.goUp )
                    {
                        this.checkIfRunning_Enemy_Black_Pusa (  )
            
                        this.velocityY -= this.acceleration;
                }
                if(isKeyPressed('ArrowDown') || this.AI.goDown )
                {
                    this.checkIfRunning_Enemy_Black_Pusa (  )
        
                    this.velocityY += this.acceleration;
                }
                if(isKeyPressed('ArrowLeft') || this.AI.goLeft )//UNFLIPPED
                {
                    this.checkIfRunning_Enemy_Black_Pusa (  )
        
                    this.flippedImageX = false;
                    this.dLimiter = false;
        
                    if( !this.aLimiter )
                    {
                        this.valueFlipper ( this.recordedValue2 )
        
                        this.aLimiter = true
                        this.recordedValue2 = 0;
                    }
                    //console.log(`canvasLOCX: ${this.canvasLocX}`)
        
                    this.recordedValue = this.canvasLocX 
                    this.velocityX -= this.acceleration;
                }
                if(isKeyPressed('ArrowRight') || !this.dissapearNotFixed || this.AI.goRight ) //FLIPPED
                {
                    this.checkIfRunning_Enemy_Black_Pusa (  )
        
                    this.flippedImageX = true;
                    this.aLimiter = false
        
                    //FOR PHYSICS PROBLEM
                    if ( !this.dLimiter )
                    {
                        this.valueFlipper ( this.recordedValue )
                        
                        this.dLimiter = true;
                        this.recordedValue = 0
                    }
        
                    if( this.flippedImageX )
                    {
                        this.velocityX -= this.acceleration;
                        this.recordedValue2 = this.canvasLocX;
                    }
                    else
                    {
                        this.velocityX += this.acceleration;
                        this.recordedValue2 = this.canvasLocX;
                    }   
                    this.dissapearNotFixed = true;
                } 
            }
            else
            {
                this.totalTime += DELTATIME
                this.velocityX = 0;
                this.velocityY = 0;
                if ( this.totalTime >= this.switchTime_FORCLICK )
                {
                    this.attack = false;
                    this.totalTime -= this.switchTime_FORCLICK;
                }
            }
    
            if ( this.attack )
            {
                this.assignCharacterState_Enemy_Black_Pusa( `Hit` );
                this.canMove = false;
            }
            else
            {
                this.canMove = true;
            }
    
            if( Math.abs( this.velocityX ) <= 0.009 )
            {
                this.velocityX = 0
            }
    
            this.getActualLocation_Canvas (  );
        }
    }

    assignCharacterState_Enemy_Black_Pusa( state )
    {
        switch( state )
        {
            case "Stand":
                this.spriteLocX = 600;
                this.spriteLocY = 0;
                break;

            case "Walk":
                this.spriteLocX = 0;
                this.spriteLocY = 0;
                this.speed = 2;
                this.acceleration = 0.5;
                //this.frequency = 5 (FOR FLIP)
                this.frequency = 1.5;
                break;

            case "Run":
                this.spriteLocX = 0;
                this.spriteLocY = 0;
                this.speed = 3.5;
                this.acceleration = 1;
                //this.frequency = 20 (FOR FLIP)
                this.frequency = 100.5;
                break;

            case "GetHit":
                this.spriteLocX = 0;
                this.spriteLocY = 0;
                break;

            case "Hit":
                this.spriteLocX = 0;
                this.spriteLocY = 0;
                break;
        }
    }

    checkIfRunning_Enemy_Black_Pusa (  ) //IF PRESSING SHIFT
    {
        if(isKeyPressed( 'Shift' ))
        {
            this.assignCharacterState_Enemy_Black_Pusa( `Run` )
        }
        else
        {
            this.assignCharacterState_Enemy_Black_Pusa( `Walk` )
        }
    }



    updateCharacter_W_Physics_Enemy_Yellow_Pusa()
    {
        this.checkIfFullyDead (  )
        if ( !this.fullyDead )
        {
            this.assignCharacterState_Enemy_Yellow_Pusa( `Stand` )
        
            this.calculateXAndY_W_Physics (  );
    
            this.canvasLocX = Math.ceil ( this.canvasLocX );
    
            if ( Math.abs( this.velocityX ) >= 1 )
            {
                this.addWaveNoiseAnimation (  );
                this.assignCharacterState_Enemy_Yellow_Pusa( `Walk` )
                this.frequency = 50.5
            }
    
            if( this.canMove )
            {
                if(isKeyPressed('i') || this.AI.goUp )
                    {
                        this.checkIfRunning_Enemy_Yellow_Pusa (  )
            
                        this.velocityY -= this.acceleration;
                }
                if(isKeyPressed('k') || this.AI.goDown )
                {
                    this.checkIfRunning_Enemy_Yellow_Pusa (  )
        
                    this.velocityY += this.acceleration;
                }
                if(isKeyPressed('j') || this.AI.goLeft )//UNFLIPPED
                {
                    this.checkIfRunning_Enemy_Yellow_Pusa (  )
        
                    this.flippedImageX = false;
                    this.dLimiter = false;
        
                    if( !this.aLimiter )
                    {
                        this.valueFlipper ( this.recordedValue2 )
        
                        this.aLimiter = true
                        this.recordedValue2 = 0;
                    }
                    //console.log(`canvasLOCX: ${this.canvasLocX}`)
        
                    this.recordedValue = this.canvasLocX 
                    this.velocityX -= this.acceleration;
                }
                if(isKeyPressed('l')  || !this.dissapearNotFixed  || this.AI.goRight ) //FLIPPED
                {
                    this.checkIfRunning_Enemy_Yellow_Pusa (  )
        
                    this.flippedImageX = true;
                    this.aLimiter = false
        
                    //FOR PHYSICS PROBLEM
                    if ( !this.dLimiter )
                    {
                        this.valueFlipper ( this.recordedValue )
                        
                        this.dLimiter = true;
                        this.recordedValue = 0
                    }
        
                    if( this.flippedImageX )
                    {
                        this.velocityX -= this.acceleration;
                        this.recordedValue2 = this.canvasLocX;
                    }
                    else
                    {
                        this.velocityX += this.acceleration;
                        this.recordedValue2 = this.canvasLocX;
                    }   
                    this.dissapearNotFixed = true;
                } 
            }
            else
            {
                this.totalTime += DELTATIME
                this.velocityX = 0;
                this.velocityY = 0;
                if ( this.totalTime >= this.switchTime_FORCLICK )
                {
                    this.attack = false;
                    this.totalTime -= this.switchTime_FORCLICK;
                }
            }
    
            if ( this.attack )
            {
                this.assignCharacterState_Enemy_Yellow_Pusa( `Hit` );
                this.canMove = false;
            }
            else
            {
                this.canMove = true;
            }
    
            if( Math.abs( this.velocityX ) <= 0.009 )
            {
                this.velocityX = 0
            }
    
            this.getActualLocation_Canvas (  );
        }
    }

    assignCharacterState_Enemy_Yellow_Pusa( state )
    {
        switch( state )
        {
            case "Stand":
                this.spriteLocX = 1200;
                this.spriteLocY = 1200;
                break;

            case "Walk":
                this.spriteLocX = 600;
                this.spriteLocY = 1200;
                this.speed = 2;
                this.acceleration = 0.5;
                //this.frequency = 5 (FOR FLIP)
                this.frequency = 1.5;
                break;

            case "Run":
                this.spriteLocX = 600;
                this.spriteLocY = 1200;
                this.speed = 3.5;
                this.acceleration = 1;
                //this.frequency = 20 (FOR FLIP)
                this.frequency = 100.5;
                break;

            case "GetHit":
                this.spriteLocX = 600;
                this.spriteLocY = 1200;
                break;

            case "Hit":
                this.spriteLocX = 600;
                this.spriteLocY = 1200;
                break;
        }
    }

    checkIfRunning_Enemy_Yellow_Pusa (  ) //IF PRESSING SHIFT
    {
        if(isKeyPressed( 'Shift' ))
        {
            this.assignCharacterState_Enemy_Yellow_Pusa( `Run` )
        }
        else
        {
            this.assignCharacterState_Enemy_Yellow_Pusa( `Walk` )
        }
    }


    //collider
    renderCollider (  )
    {  
        if ( !this.fullyDead )
        {
            this.canvasLocY = this.collider.location.y;

            if ( this.collider.dx != undefined )
            {
                if ( this.flippedImageX )
                {
                    this.canvasLocX -= this.collider.dx;
                }
                else
                {
                    this.canvasLocX += this.collider.dx;
                }
            }
            
            this.collider.dx = undefined;
            //console.log ( `X: ${ this.canvasLocX }` )
        }
        
    }


    waveNoiseFunction( x, l, f )
    {
        let y = Math.sin( ( x * f ) ) * l 
        return y;
    }

    addWaveNoiseAnimation (  )
    {
        //WAVE NOISE STABILIZER
        if ( this.waveNoise < 0 )
        {
            this.canvasLocY += this.valueForNoise;
        }
        else
        {
            this.canvasLocY -= this.valueForNoise;
        }

        //ACTUAL WAVE NOISE
        this.waveNoise = this.waveNoiseFunction ( Math.abs( this.canvasLocX ), 0.1, this.frequency );
    
        //WAVE NOISE ASSIGNING
        if ( this.waveNoise < 0 )
        {
            this.valueForNoise = this.valueGoUp * ( this.waveNoise + 1 );
            this.valueForNoise = Math.max ( this.valueForNoise, this.valueGoUp );

            this.canvasLocY -= this.valueForNoise;
        }
        else
        {
            this.valueForNoise = this.valueGoUp * ( this.waveNoise + 1 );
            this.valueForNoise = Math.max ( this.valueForNoise, this.valueGoUp );

            this.canvasLocY += this.valueForNoise;
        }
    }

    valueFlipper ( recordedValue ) //if < -1 { return 1 } else { return 1 }
    {
        if( this.canvasLocX <= 0 )
        {
            recordedValue = Math.abs( recordedValue )//POSITIVE
        }
        else
        {
            recordedValue = -recordedValue //NEGATIVED
        }
        this.canvasLocX = recordedValue;
    }

    drawCharacter()
    {
        if ( !this.fullyDead )
        {
            drawImage( this,this );
        }
        
    }

    calculateXAndY_W_Physics (  )
    {
        this.velocityY *= this.friction;
        this.velocityX *= this.friction;
        
        this.canvasLocY += this.velocityY;
        this.canvasLocX += this.velocityX;
    }

    getActualLocation_Canvas (  )
    {
        if ( this.flippedImageX )
        {
            this.fixedCanvasLoc.x = Math.abs( this.canvasLocX );
            this.collider.location.x = this.fixedCanvasLoc.x
        }
        else
        {
            this.fixedCanvasLoc.x = this.canvasLocX;
            this.collider.location.x = this.fixedCanvasLoc.x;
        }
        this.canvasLocY = numberToFloat ( this.canvasLocY, 0 )//" MATH GOD NIGGER "
        this.fixedCanvasLoc.y = Math.ceil ( this.canvasLocY );
        this.collider.location.y = this.fixedCanvasLoc.y

        // console.log ( this.fixedCanvasLoc );
    }


    //FOR TURN BASED
    checkIfFullyDead (  )
    {        
        if ( !this.details.enemy1Alive && !this.details.enemy2Alive )
        {
            this.fullyDead = true;
        }
    } 

}





let Furina_Details_TurnBased = makeCharacterDetails_TurnBased ( 1000, 100, 84, 0.194, 40, 50, 1.5 )
let YellowPusa1_Details_TurnBased = makeCharacterDetails_TurnBased_Enemy ( true, true, 1000, 83, 12, 200, 83, 12 );
let YellowPusa2_Details_TurnBased = makeCharacterDetails_TurnBased_Enemy ( true, true, 500, 83, 12, 970, 83, 12 );

const FURINA_2D = new Character_2D( images[33], 600, 600, true, 0.52, 0.20, 0, 0, createVector2 ( 0, 0 ), 0.85, createVector2 ( 1000, 1000 ), Furina_Details_TurnBased )
const FURINA_2D_P2 = new Character_2D( images[33], 600, 600, true, 0.52, 0.20, 2000, 2000 )
const BLACKPUSA_2D = new Character_2D_Enemy( images[33], 600, 600, false, 0.25, 0.4, 2000, 2000 )
const YELLOWPUSA_2D = new Character_2D_Enemy( images[33], 600, 600, false, 0.05, 0.4, 900, -3000, YellowPusa1_Details_TurnBased )
const YELLOWPUSA_2D_2 = new Character_2D_Enemy( images[33], 600, 600, false, 0.05, 0.4, 800, -5300, YellowPusa2_Details_TurnBased )

let petImageLoc = createVector2 ( 1800, 1200 )
const PET = new Character_2D( images[33], 600, 600, true, 0.52, 0.20, 600, 600, petImageLoc, -1, createVector2 ( 500, 500 ) )