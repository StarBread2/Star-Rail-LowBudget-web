class GaugeForAI 
{
    constructor ( sizeX, sizeY, shadow )
    {
        this.location = createVector2 ( 0, 0 );
        this.size = createVector2 ( sizeX, sizeY );
        this.shadowLoc = createVector2 ( 0, 0 );

        this.currentBarSize = 0;
        this.currentBarLocY = 0; //Kay bala ang gauge

        this.shadow = shadow;

        this.opacity = 1
        this.colorString;

        this.speed = 1.3
    }

    makeVerticalGauge ( color, location, ifFlipped, valueOfBar )
    {
        if ( ifFlipped )
        {
            this.location.x = location.x - 200;
            this.location.y = location.y - 290;

            this.shadowLoc.x = this.location.x;
            this.shadowLoc.y = this.location.y;
        }
        else
        {
            this.location.x = location.x + 200;
            this.location.y = location.y - 290;

            this.shadowLoc.x = this.location.x;
            this.shadowLoc.y = this.location.y;
        }

        if ( valueOfBar < 1 )
        {
            if ( valueOfBar <= 0.1 )
            {
                this.opacity = Math.max ( this.opacity - ( 0.1 * this.speed ), 0 );
    
            }
            else
            {
                this.opacity = Math.min ( this.opacity + ( 0.1 * this.speed ), 1 );
            }
        }
        
        if ( valueOfBar < 1 )
        {
            this.colorString = createColorString ( createRGBA ( color.r, color.g, color.b, this.opacity ) );   
        }
        else
        {
            this.colorString = createColorString ( createRGBA ( 225, 15, 79, this.opacity ) );
            this.opacity = Math.max ( this.opacity - ( 0.1 * this.speed ), 0 );
        }        

        this.updateGaugeBar ( valueOfBar );
    }

    updateGaugeBar ( value ) //dapat normalized and clamp ang value
    {
        this.currentBarSize = -this.size.y * value;
        this.currentBarLocY = this.location.y + (  ( this.size.y * value ) + ( this.size.y * ( 1 - value ) ) )
    }
   
    drawUI (  )
    {
        if ( this.shadow )
        {
            this.drawUIShadow (  );
        }

        ctx.save (  );
        ctx.translate ( -this.size.x / 2, -this.size.y / 2 )

        ctx.fillStyle = this.colorString;
        ctx.fillRect ( this.location.x, this.currentBarLocY, this.size.x, this.currentBarSize  );
        ctx.restore (  );

        
    }

    drawUIShadow (  )
    {
        ctx.save (  );
        ctx.translate ( -this.size.x / 2, -this.size.y / 2 )

        ctx.fillStyle = createColorString ( createRGBA ( 7, 8, 5, Math.max ( ( this.opacity - 0.6 ), 0 ) ) ); 
        ctx.fillRect ( this.shadowLoc.x - 8 , this.shadowLoc.y - 10, this.size.x + 16 , this.size.y + 20 );

        ctx.restore (  );
    }

}

const AIState = new GaugeForAI ( 40, 300, true ) 