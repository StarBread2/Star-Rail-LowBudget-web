class Camera 
{
    constructor (  )
    {
        this.view = createVector2 ( null, null ); 
        this.resolution = createVector2 ( canvas.width, canvas.height );

        this.currentLocation = createVector2 ( 0, 0 );
        this.pastLocation = createVector2 ( 0, 0 );
        this.locationDifference = createVector2 ( 0, 0 );

        this.cameraAnimSpeed = 10;
        this.cameraSpeedMultiplier = createVector2 ( 0, 0 );
    }

    drawBackGround ( color )
    {
        ctx.clearRect( -this.view.x, -this.view.y, this.resolution.x, this.resolution.y );
        ctx.fillStyle = color;
        ctx.fillRect( -this.view.x, -this.view.y, this.resolution.x, this.resolution.y );
    }

    setupCamera ( location )
    {
        this.updateResolution (  )

        if ( this.view.x === null && this.view.y === null )
        {
            this.view.x = Math.ceil ( this.resolution.x / 2 ) - location.x;
            this.view.y = Math.ceil ( this.resolution.y / 2 ) - location.y;

            this.currentLocation.x = location.x;
            this.currentLocation.y = location.y;

            this.pastLocation.x = location.x;
            this.pastLocation.y = location.y;
        }
        
        ctx.save(  );
        
        ctx.translate( this.view.x, this.view.y );
    }

    updateResolution (  )
    {
        this.resolution.x = canvas.width;
        this.resolution.y = canvas.height;
    }

    setOrigin ( location, stillMoving )
    {
        if ( Math.abs ( stillMoving.y ) > 0.01 )
        {
            this.locationDifference.y = -( this.pastLocation.y - ( location.y ) );
        }  
        if ( Math.abs ( stillMoving.x ) > 0.01 )
        {
            this.locationDifference.x = -( this.pastLocation.x - ( location.x ) );
        }  

        this.calculateSpeedMultiplier (  );

        //X ( IDKTHISSHITIS )
        if ( this.currentLocation.y < this.locationDifference.y ) 
        {
            this.currentLocation.y += numberToFloat ( Math.ceil ( 1 * ( this.cameraAnimSpeed * this.cameraSpeedMultiplier.y ) ), 2 );
            
            if ( this.currentLocation.y > this.locationDifference.y )
            {
                this.currentLocation.y = this.locationDifference.y;
            } 
        }
        if ( this.currentLocation.y > this.locationDifference.y )
        {
            this.currentLocation.y -= numberToFloat ( Math.ceil ( 1 * ( this.cameraAnimSpeed * this.cameraSpeedMultiplier.y ) ), 2 );

            if ( this.currentLocation.y < this.locationDifference.y )
            {
                this.currentLocation.y = this.locationDifference.y;
            }
        } 

        //Y
        if ( this.currentLocation.x < this.locationDifference.x )
        {
            this.currentLocation.x += numberToFloat ( Math.ceil ( 1 * ( this.cameraAnimSpeed * this.cameraSpeedMultiplier.x ) ), 2 );
        
            if ( this.currentLocation.x > this.locationDifference.x )
            {
                this.currentLocation.x = this.locationDifference.x;
            }
            
        }
        if ( this.currentLocation.x > this.locationDifference.x )
        {
            this.currentLocation.x -= numberToFloat ( Math.ceil ( 1 * ( this.cameraAnimSpeed * this.cameraSpeedMultiplier.x ) ), 2 );
        
            if ( this.currentLocation.x < this.locationDifference.x )
            {
                this.currentLocation.x = this.locationDifference.x;
            }

        } 
        //console.log ( location )
        this.calculateView (  );

    }

    calculateSpeedMultiplier (  )
    {
        let calculatedDifference = createVector2 ( 0, 0 )
        calculatedDifference.y = Math.abs ( this.locationDifference.y - this.currentLocation.y );
        calculatedDifference.x = Math.abs ( this.locationDifference.x - this.currentLocation.x );

        if ( calculatedDifference.y > 150 )
        {
            if ( this.cameraSpeedMultiplier.y < 2 )
            {
                this.cameraSpeedMultiplier.y += 0.05;
                this.cameraSpeedMultiplier.y = numberToFloat ( Math.min ( this.cameraSpeedMultiplier.y, 2 ), 2 );
            }
        }
        else if ( calculatedDifference.y > 100 )
        {
            if ( this.cameraSpeedMultiplier.y < 1.7 )
            {
                this.cameraSpeedMultiplier.y += 0.05;
                this.cameraSpeedMultiplier.y = numberToFloat ( Math.min ( this.cameraSpeedMultiplier.y, 1.7 ), 2 );
            }
        }
        else
        {
            if ( this.cameraSpeedMultiplier.y > 1 )
            {
                this.cameraSpeedMultiplier.y -= 0.05;
                this.cameraSpeedMultiplier.y = numberToFloat ( Math.max ( this.cameraSpeedMultiplier.y, 1 ), 2 );
            }
        }

        if ( calculatedDifference.x > 150 )
        {
            if ( this.cameraSpeedMultiplier.x < 2 )
            {
                this.cameraSpeedMultiplier.x += 0.05;
                this.cameraSpeedMultiplier.x = numberToFloat ( Math.min ( this.cameraSpeedMultiplier.x, 2 ), 2 );
            }
        }
        else if ( calculatedDifference.x > 100 )
        {
            if ( this.cameraSpeedMultiplier.x < 1.7 )
            {
                this.cameraSpeedMultiplier.x += 0.05;
                this.cameraSpeedMultiplier.x = numberToFloat ( Math.min ( this.cameraSpeedMultiplier.x, 1.7 ), 2 );
            }
        }
        else
        {
            if ( this.cameraSpeedMultiplier.x > 1 )
            {
                this.cameraSpeedMultiplier.x -= 0.05;
                this.cameraSpeedMultiplier.x = numberToFloat ( Math.max ( this.cameraSpeedMultiplier.x, 1 ), 2 );
            }
        } 
    }

    calculateView (  )
    {
        this.view.y = Math.ceil ( this.resolution.y / 2 ) - this.currentLocation.y;
        this.view.x = Math.ceil ( this.resolution.x / 2 ) - this.currentLocation.x;
    } 

    restoreCamera (  )
    {
        ctx.restore(  ); 
    }
}

const Camera2D = new Camera (  );