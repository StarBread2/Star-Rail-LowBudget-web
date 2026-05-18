function drawImage_Vector ( { texture, canvasLoc, spriteLoc, imageSize, flippedImageX, spriteSize } )
{
    ctx.save (  );
    ctx.translate ( -imageSize.x / 2, -imageSize.y / 2 )

    if( flippedImageX )
    {
        ctx.scale ( -1,1 )
        canvasLocX += ( -imageSize.x / 2 + ( -imageSize.y / 2 ) )
    }

    ctx.drawImage( texture, spriteLoc.x, spriteLoc.y, spriteSize.x, spriteSize.y, canvasLoc.x, canvasLoc.y, imageSize.x, imageSize.y )
    
    ctx.restore (  );
}

class SingleImage 
{

    constructor ( imageArr, spriteSizeX, spriteSizeY, imageSizeX, imageSizeY, spriteLocX, spriteLocY, canvasLocX, canvasLocY  )
    {
        this.texture = imageArr;

        this.canvasLoc = createVector2 ( canvasLocX, canvasLocY );
        this.spriteLoc = createVector2 ( spriteLocX, spriteLocY );
        this.imageSize = createVector2 ( imageSizeX, imageSizeY );
        this.spriteSize = createVector2 ( spriteSizeX, spriteSizeY )

        this.flippedImageX = false;
    }

    updateLocation ( location )
    {
        this.canvasLoc = location
    }

    drawImage (  )
    {
        drawImage_Vector ( this );
    }

}

const insideFrustumIcon = new SingleImage ( images[33], 600, 600, 300, 300, 1800, 0, 500, 500);
const alertedIcon = new SingleImage ( images[33], 600, 600, 300, 300, 1800, 600, 500, 500);

class AIFollow
{
    constructor ( threshold, distance )
    {
        this.targetEnemyLoc = createVector2 ( 0, 0 )

        //Frustum View Sa AI
        this.threshold = threshold;
        this.distance = distance;

        //ASA PADULONG
        this.goUp = false;
        this.goDown = false;
        this.goLeft = false;
        this.goRight = false;

        //VECTOR VISUALIZATION
        this.displayVector = true;
        this.arrowSize = createVector2 ( 50, 50 );

        //ACTUAL LOCATION OF CHAR ( MC NIGgA )
        this.fixedLoc = createVector2 ( 0, 0 );
        this.fixedCurrenCharLoc = createVector2 ( 0, 0 );

        //Gauge
        this.gaugeTillAttack = 0;
        this.currentlyAdding = false;

        //deltaTime
        this.switchTime = 83;
        this.totalTime = 0;

        //For Animation
        this.displayGauge = false;
        this.displayExclamationMark = false;
        this.difference = createVector2 ( null, null );

        this.UI = new GaugeForAI ( 40, 300, true );

        //For goingBack AI
        this.respawnLoc;
        this.calculateDifference = false;

        //FOR TURN BASED
        this.checkIfInsideFrustum = false
        this.ifInsideFrustum = false
    }

    calculateArrow ( delta, charLoc2 )
    {
        let arrowLocation = createVector2 ( 0, 0 )

        arrowLocation.x = charLoc2.x + ( 500 * delta.x );
        arrowLocation.y = charLoc2.y + ( 500 * delta.y );

        return arrowLocation;
    } 

    checkIfInsideFrustum_AI ( char1, char2, delta )
    {
        if ( !char2.fullyDead )
        {
            //FOR TURN BASED
            this.ifInsideFrustum = false;

            this.resetDirectionsBooleans (  );
            this.currentlyAdding = false;

            let dotProductValue = getDotProduct ( char1.canvasLocX, char1.canvasLocY, char1.flippedImageX, char2.canvasLocX, char2.canvasLocY, char2.flippedImageX );
            
            this.fixedLoc = dotProductValue.char1Loc;
            this.fixedCurrenCharLoc = dotProductValue.char2Loc;

            this.assignRespawnPoint (  )

            let insideRequiredDistance = this.checkDistance ( delta )

            //Visual Display of Vector
            if ( this.displayVector )
            {
                let arrowLocation1 = this.calculateArrow ( dotProductValue.vector1, dotProductValue.char2Loc )
                let arrowLocation2 = this.calculateArrow ( dotProductValue.vector2, dotProductValue.char2Loc )

                drawArrow ( arrowLocation1, this.arrowSize );
                drawArrow ( arrowLocation2, this.arrowSize );
            }

            //IF INSIDE FRUSTUM
            if ( insideRequiredDistance )
            {
                if ( dotProductValue.calculatedDotProduct >= this.threshold )
                {
                    if ( this.checkIfInsideFrustum )
                    {
                        this.ifInsideFrustum = true;
                    }

                    this.totalTime += DELTATIME;

                    if ( this.totalTime >= this.switchTime )
                    {
                        this.totalTime -= this.switchTime

                        this.currentlyAdding = true;

                        let valueMultplier = createVector2 ( 0, 0 );
                        valueMultplier.x = normalize ( Math.abs ( delta.x ), this.distance.x, 400 );
                        valueMultplier.y = normalize ( Math.abs ( delta.y ), this.distance.y, 400 );

                        let valueToMultiply = 0;
                        if ( valueMultplier.x < valueMultplier.y )
                        {
                            valueToMultiply = valueMultplier.x;
                        }
                        else
                        {
                            valueToMultiply = valueMultplier.y;
                        }

                        this.gaugeTillAttack += ( 0.1 * valueToMultiply );
                        this.gaugeTillAttack = Math.min ( this.gaugeTillAttack, 1 );
                        this.gaugeTillAttack = numberToFloat ( this.gaugeTillAttack, 3 );

                        if ( this.gaugeTillAttack === 1 )
                        {
                            this.startFollowing ( dotProductValue.char1Loc, dotProductValue.char2Loc, dotProductValue.vector1 )
                            this.displayExclamationMark = true;
                            this.calculateDifference = true
                        }
                        else
                        {
                            this.displayExclamationMark = false;
                        }
                    }
                    
                    //console.log ( this.gaugeTillAttack );
                }   
            }

            //IF NOT INSIDE FRUSTUM
            if ( !this.currentlyAdding && this.gaugeTillAttack >= 0.01 )
            {
                this.totalTime += DELTATIME;

                if ( this.totalTime >= this.switchTime )
                {
                    this.totalTime -= this.switchTime

                    this.gaugeTillAttack = Math.max ( this.gaugeTillAttack - 0.001, 0.00 );
                    this.gaugeTillAttack = numberToFloat ( this.gaugeTillAttack, 3 );
                }
                
            }

            //DisplayGauge ( FOR ANIMATION )
            if ( this.gaugeTillAttack > 0.01 && this.gaugeTillAttack != 1)
            {
                this.displayGauge = true;
                this.displayExclamationMark = false;
            }
            else
            {
                this.displayGauge = false;
            }

            //GOING BACK TO RESPAWN AI
            if ( this.gaugeTillAttack <= 0.01 )
            {
                this.goBackToRespawn (  );
            }
        }
        
    }

    checkDistance ( delta )
    {
        if ( Math.abs ( delta.x ) <= this.distance.x && Math.abs ( delta.y ) <= this.distance.y )
        {
            return true;
        }
    }

    startFollowing ( charLoc1, charLoc2, char1Vector )//CHAR1 MOY LANTON HAHAHAHAH
    {
        let delta = createVector2 ( 0, 0 );

        delta.x = charLoc1.x - charLoc2.x;
        delta.y = charLoc1.y - charLoc2.y;
        
        if ( Math.abs ( delta.x ) > 400 )//400 == distance niya sa char1 to 2
        {
            if ( char1Vector.x > 0.00 )
            {
                this.goRight = true;  
                // console.log (`right`)
            }
            else
            {
                this.goLeft = true;  
                // console.log (`left`)
            }
        }

        if ( Math.abs ( delta.y ) > 400 )
        {
            if ( char1Vector.y > 0.00 )
                {
                    this.goDown = true;  
                    // console.log (`down`)
                }
                else
                {
                    this.goUp = true;  
                    // console.log (`up`)
                }
        }
    }

    resetDirectionsBooleans (  )
    {
        this.goUp = false;
        this.goDown = false;
        this.goLeft = false;
        this.goRight = false;
    }

    drawAIState ( location )
    {
        location.y -= 300;

        if ( this.displayGauge )
        {
            insideFrustumIcon.updateLocation ( location );
            insideFrustumIcon.drawImage (  );
        }
        
        if ( this.displayExclamationMark )
        {
            alertedIcon.updateLocation ( location );
            alertedIcon.drawImage (  );
        }

    }

    assignRespawnPoint (  )
    {
        if ( this.respawnLoc === undefined )
        {
            this.respawnLoc = createVector2 ( this.fixedCurrenCharLoc.x, this.fixedCurrenCharLoc.y );
        }
    }

    goBackToRespawn (  )
    {
        if ( this.calculateDifference )
        {
            this.difference.x = this.fixedCurrenCharLoc.x - this.respawnLoc.x
            this.difference.y = this.fixedCurrenCharLoc.y - this.respawnLoc.y
            this.calculateDifference = false;
        }
        
        if ( this.difference.x > 0 && this.fixedCurrenCharLoc.x > this.respawnLoc.x )
        {
            this.goLeft = true;
        }

        if ( this.difference.x < 0 && this.fixedCurrenCharLoc.x < this.respawnLoc.x )
        {
            this.goRight = true;
        }

        if ( this.difference.y < 0 && this.fixedCurrenCharLoc.y < this.respawnLoc.y )
        {
            this.goDown = true;
        }

        if ( this.difference.y > 0 && this.fixedCurrenCharLoc.y > this.respawnLoc.y )
        {
            this.goUp = true;
        }

    }

    //FOR TURNBASED SHIT
        checkIfInsideFrustumOfEnemy ( char1, char2 ) //recall ang char1 kay bobo ka
    {
        char2.AI.checkIfInsideFrustum = true;
        char1.ifSeenedByEnemy = char2.AI.ifInsideFrustum;
    }

    checkIfEnemyInsideFrustum ( char1, char2, delta )
    {
        char2.canAttackEnemy_InRange = false;
        let dotProductValue = getDotProduct ( char1.canvasLocX, char1.canvasLocY, char1.flippedImageX, char2.canvasLocX, char2.canvasLocY, char2.flippedImageX );
        
        this.fixedLoc = dotProductValue.char1Loc;
        this.fixedCurrenCharLoc = dotProductValue.char2Loc;

        let insideRequiredDistance = this.checkDistance ( delta )


        if ( insideRequiredDistance )
        {
            if ( !char1.details.enemy1Alive && !char1.details.enemy2Alive )
            {
                char2.canAttackEnemy_InRange = false;
                char2.detailsEnemy = char1.details;
                //dayon butang ari patyon na siya
            }
            else
            {
                if ( dotProductValue.calculatedDotProduct >= this.threshold )
                {
                    char2.canAttackEnemy_InRange = true;
                    char2.detailsEnemy = char1.details;
                }
            }
            
        }
    }


    //PET AI
    checkIfInsideFrustum_AI_PET ( char1, char2, delta )
    {
        this.resetDirectionsBooleans (  );
        this.currentlyAdding = false;

        let dotProductValue = getDotProduct ( char1.canvasLocX, char1.canvasLocY, char1.flippedImageX, char2.canvasLocX, char2.canvasLocY, char2.flippedImageX );

        this.fixedLoc = dotProductValue.char1Loc;
        this.fixedCurrenCharLoc = dotProductValue.char2Loc;

        let insideRequiredDistance = this.checkDistance ( delta )

        //Visual Display of Vector
        if ( this.displayVector )
        {
            let arrowLocation1 = this.calculateArrow ( dotProductValue.vector1, dotProductValue.char2Loc )
            let arrowLocation2 = this.calculateArrow ( dotProductValue.vector2, dotProductValue.char2Loc )

            drawArrow ( arrowLocation1, this.arrowSize );
            drawArrow ( arrowLocation2, this.arrowSize );
        }

        //IF INSIDE FRUSTUM
        if ( insideRequiredDistance )
        {
            if ( dotProductValue.calculatedDotProduct >= this.threshold )
            {
                this.totalTime += DELTATIME;

                if ( this.totalTime >= this.switchTime )
                {
                    this.totalTime -= this.switchTime

                    this.currentlyAdding = true;
                }

                
            }   
        }

        //IF NOT INSIDE FRUSTUM
        if ( !this.currentlyAdding )
        {
            this.totalTime += DELTATIME;

            if ( this.totalTime >= this.switchTime )
            {
                this.totalTime -= this.switchTime
                this.startFollowing ( dotProductValue.char1Loc, dotProductValue.char2Loc, dotProductValue.vector1 )
            }
            
        }

    }

}

