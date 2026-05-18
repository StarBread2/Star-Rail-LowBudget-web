//test
function drawCollider ( { body, location } )
{
    ctx.save();
    ctx.translate( -body.x / 2, -body.y / 2 )

    ctx.fillStyle = 'blue';

    ctx.fillRect( location.x, location.y, body.x, body.y )

    ctx.restore();
}

class Platform
{
    constructor ( sizeX, sizeY, positionX, positionY )
    {
        this.body = createVector2 ( sizeX, sizeY );
        this.location = createVector2 ( positionX, positionY );

        this.collider = new Collider ( this.body.x, this.body.y, this.location.x, this.location.y )
        
    }
    
    draw (  )
    {
        this.location = this.collider.location;
        drawCollider ( this );
    }

    drawArrow ( delta )
    {
        let arrowLocation = createVector2 ( 0, 0 )
        let arrowSize = createVector2 ( 50, 50 )
        
        arrowLocation.x = this.location.x + ( 500 * delta.x );
        arrowLocation.y = this.location.y + ( 500 * delta.y );

        
        drawArrow ( arrowLocation, arrowSize );
    }
}

const Box1_Down = new Platform ( 3000, 600, ( 3000 / 2 - 300 ), ( 600 ) ); //(x,y)
const Box1_Left = new Platform ( 600, 4000, ( -600 ),  ( ( -4000 / 2 ) + 900 ) ); //(x,y)
const Box1_Right = new Platform ( 600, 4000, ( 600 * 4 ),  ( ( -4000 / 2 ) + 900 ) ); //(x,y)

const Box2_Down_1 = new Platform ( 3000, 600, ( 3600 ),  ( -3000 ) ); //(x,y)
const Box2_Down_2 = new Platform ( 1000, 600, ( ( -600 - 100 ) - 100 ),  ( -3000 ) ); //(x,y)
const Box2_Left = new Platform ( 600, 3000, ( ( -700 - 200 ) - 100 ),  ( -3000 - 1800 ) ); //(x,y)
const Box2_Top = new Platform ( 2900 + 3000 + 3000, 600, ( ( 8900/2 ) - 750 ),  ( -3000 - 3000 ) ); //(x,y)
const Box2_Right = new Platform ( 600, 1400, ( 4800 ),  ( -3100 - 300 ) ); //(x,y)

const Box3_Down = new Platform ( 3680, 600, ( 5000 + 1250 + 90 ),  ( -4000 ) ); //(x,y)
const Box3_Right = new Platform ( 600, 2000, ( 7850 ),  ( -5000 ) ); //(x,y)
