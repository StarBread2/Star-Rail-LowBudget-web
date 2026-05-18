function drawArrow ( location, size )
{
    ctx.save();
    ctx.translate( -size.x / 2, -size.y / 2 )

    ctx.fillStyle = 'red';

    ctx.fillRect( location.x, location.y, size.x , size.y )
    //console.log (location)
    ctx.restore();
}

class Collider
{
    constructor( sizeX, sizeY, canvasLocX, canvasLocY, ifDead = false )
    {
        this.body = createVector2 ( sizeX, sizeY ); 
        this.location = createVector2 ( canvasLocX, canvasLocY )

        this.dx;

        this.delta = createVector2 ( 0, 0 );
        this.intersect = createVector2 ( 0, 0 );

        this.collidingWithChar = false;
        this.ifDead = ifDead;
    }

    drawImage (  )
    {
        drawCollider ( this )
    }

    Move ( dx, dy )//ULOSBON 
    {
        this.location.x += dx;
        this.location.y += dy;

        this.dx = dx;
    }

    CheckCollison ( other, push, ifDead1 )
    {
        other.ifDead = ifDead1
        if ( !other.ifDead )
        {
            let otherPosition = other.GetPosition();
            let otherHalfSize = other.GetHalfSize();
            let thisPosition = this.GetPosition();
            let thisHalfSize = this.GetHalfSize();
    
            this.delta.x = otherPosition.x - thisPosition.x;
            this.delta.y = otherPosition.y - thisPosition.y;
            this.intersect.x = Math.abs( this.delta.x ) - ( otherHalfSize.x + thisHalfSize.x );
            this.intersect.y = Math.abs( this.delta.y ) - ( otherHalfSize.y + thisHalfSize.y );
    
            //console.log ( this.delta )
            
            if ( this.intersect.x < 0.0 && this.intersect.y < 0.0 )
            {
                push = Math.min ( Math.max ( push, 0 ), 1); 
    
                if ( this.intersect.x > this.intersect.y )
                {
                    if ( this.delta.x > 0 )
                    {
                        this.Move ( this.intersect.x * ( 1 - push ), 0 );
                        other.Move ( -this.intersect.x * push, 0 );
                    }
                    else
                    {
                        this.Move ( -this.intersect.x * ( 1 - push ), 0 );
                        other.Move ( this.intersect.x * push, 0 );
                    }
                }   
                else
                {
                    if ( this.delta.y > 0 )
                    {
                        this.Move ( 0, this.intersect.y * ( 1 - push ) );
                        other.Move ( 0, -this.intersect.y * push );
                    }
                    else
                    {
                        this.Move ( 0, -this.intersect.y * ( 1 - push ) );
                        other.Move ( 0, this.intersect.y * push );
                    }
                }
                //console.log(`deltaX: ${intersectX}`)
                return true;
            }
            
            return false;
        }
        else
        {
            other.location.x = -5000
            other.location.y = -5000
        }
        
    }

    GetPosition (  )
    {
        return this.location;
    }

    GetHalfSize (  )
    {
        return {
            x: (this.body.x / 2),
            y: (this.body.y / 2)
        };
    }

    giveKeyboardControls (  )
    {
        if( isKeyPressed( 'ArrowUp' ) )
        {
            this.location.y -= 5 * 1.5;
        }
        if( isKeyPressed( 'ArrowDown' ) )
        {
            this.location.y += 5 * 1.5;
        }
        if( isKeyPressed( 'ArrowLeft' ) )
        {
            this.location.x -= 5 * 1.5;
        }
        if( isKeyPressed( 'ArrowRight' ) )
        {
            this.location.x += 5 * 1.5;
        }
    }

    //FOR TURN BASED
    checkIfColliding ( other )
    {        
        if ( !other.ifDead )
        {
            let otherPosition = other.collider.GetPosition();
            let otherHalfSize = other.collider.GetHalfSize();
            let thisPosition = this.GetPosition();
            let thisHalfSize = this.GetHalfSize();
    
            this.delta.x = otherPosition.x - thisPosition.x;
            this.delta.y = otherPosition.y - thisPosition.y;
            this.intersect.x = Math.abs( this.delta.x ) - ( otherHalfSize.x + thisHalfSize.x );
            this.intersect.y = Math.abs( this.delta.y ) - ( otherHalfSize.y + thisHalfSize.y );
            
            other.intersect = this.intersect.y
    
            if ( this.intersect.x < 0.0 && this.intersect.y < 0.0 )
            {
                this.collidingWithChar = true;
            }
            else
            {
                this.collidingWithChar = false;
            }
        }
        
    }


    //FOR PIKAS CONSTRUCTOR
    updateLocCollider ( locX, locY )
    {
        this.location.x = locX;
        this.location.y = locY;
    }

}

const border = new Collider ( 600, 600, 500, 500 )
const border1 = new Collider ( 600, 600, 1500, 1000 )