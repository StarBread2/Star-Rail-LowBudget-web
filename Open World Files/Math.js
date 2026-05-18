function calculateLength ( vector ) //Single Arrow Of Vector (Pythagorean Theorem)
{
    return Math.sqrt ( ( vector.x * vector.x ) + ( vector.y * vector.y ) );
}

function valueFlipperForFlippedImage ( ifFlipped, value )
{
    if ( ifFlipped )
    {
        return Math.abs ( value )
    }
    else
    {
        return value;
    }
}

function getDirectionFacing ( ifFlipped )
{ 
    if ( ifFlipped )
    {
        let delta = createVector2 ( 0.5, 0 );
        return delta;
    }
    else
    {
        let delta = createVector2 ( -0.5, 0 );
        return delta;
    }
} 

function dotProduct ( vector1, vector2 )
{
    return ( vector1.x * vector2.x ) + ( vector1.y * vector2.y );
}

function normalizeVector ( vector )
{
    let length = calculateLength ( vector )
    vector.x /= length;
    vector.y /= length;

    return vector2Float ( vector )
}

function normalize ( value, min, max ) 
{
    return (value - min) / (max - min);
}

function createColorString ( color )
{
    return "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + color.a + ")";
}

//VECTOR FUNCTIONS
function vector2Float ( vector )
{
    vector.x = parseFloat ( vector.x.toFixed ( 2 ) );
    vector.y = parseFloat ( vector.y.toFixed ( 2 ) );

    return vector;
}

function vector2Divide ( vector, valueToDivide )
{
    vector.x /= valueToDivide;
    vector.y /= valueToDivide;

    return vector;
}

function vector2ceil ( vector )
{
    vector.x = Math.ceil ( vector.x );
    vector.y = Math.ceil ( vector.y );

    return vector;
}

//Single Number Functions 
function numberToFloat ( number, numberToParse )
{
    return parseFloat ( number.toFixed ( numberToParse ) );
}

function valueFlipper ( number )
{
    if ( number > 0 )
    {
        return number = -number;
    }
    else
    {
        return number = Math.abs ( number );
    }
}

//Creating Vectors
function createRGBA(r, g, b, a)
{
    return {
        r: r,
        g: g,
        b: b,
        a: a
    };
}

function createVector2( x,y )
{
    return {
        x: x,
        y: y
    };
}


//Main
function getDotProduct ( char1X, char1Y, flippedImage1, char2X, char2Y, flippedImage2 ) //vector to PLAYER2 -> PLAYER1
{
    let vector1 = createVector2 ( char1X, char1Y ); //vector origin from enemy to player
    let vector2 = createVector2 ( char2X, char2Y );

    vector1.x = valueFlipperForFlippedImage ( flippedImage1, char1X );
    vector2.x = valueFlipperForFlippedImage ( flippedImage2, char2X );

    vector1 = vector2ceil ( vector1 );
    vector2 = vector2ceil ( vector2 );
    
    //FIXED VALUE OF CHAR1 AND 2 (FLIPPING SOLVED)
    let loc1 = vector1;
    let loc2 = vector2;
    
    //Direction
    let delta = createVector2 ( 0, 0 )
    let delta2 = createVector2 ( 0, 0 )

    delta.x = vector1.x - vector2.x;
    delta.y = vector1.y - vector2.y;

    if ( flippedImage2 )
    {
        delta2.x = vector2.x - ( vector2.x - 500 )
        delta2.y = 0
    }
    else
    {
        delta2.x = vector2.x - ( vector2.x + 500 )
        delta2.y = 0
    }

    vector1 = normalizeVector ( delta );
    vector2 = normalizeVector ( delta2 );

    //Get DotProduct
    let dotProductValue = dotProduct ( vector1, vector2 )

    return {
        calculatedDotProduct: dotProductValue,
        vector1: vector1,
        vector2: vector2,
        char1Loc: loc1,
        char2Loc: loc2
    }
}  
