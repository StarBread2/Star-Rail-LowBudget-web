let INOPENWORLD = true;

/* IMPORTANT NOTES
    CAMERA DAPAT DLI ADTO NEGATIVE ( NEGATIVE NUMBER TURN TO POSITIVE ( IF COMES FROM NEGATIVE X ) ) 
    ( FIX: DON'T GO OR CHANGE THE LOCATION IN SETORIGIN ( CAMERACLASS ) )
*/
let intersect_YELLOWPUSA_2D;
// let intersect_YELLOWPUSA_2D_2;

//MAP1, empty string
let GAME_STAGE = ""; 

function animate_OPWorld()
{
    
    FURINA_2D_P2.updateCharacter_W_Physics_P2();

    /*
    //FURINA_2D_P2.updateCharacter_W_Physics_P2();
    //BLACKPUSA_2D.updateCharacter_W_Physics_Enemy_Black_Pusa( );
    */ 
    //FOR TURNBASED ( CHECK IF COLLIDING WITH ENEMY )
    FURINA_2D.collider.checkIfColliding ( YELLOWPUSA_2D );
    FURINA_2D.AI.checkIfInsideFrustumOfEnemy ( FURINA_2D, YELLOWPUSA_2D );
    FURINA_2D.checkIfAttackedOrAttacking ( YELLOWPUSA_2D );
    FURINA_2D.AI.checkIfEnemyInsideFrustum ( YELLOWPUSA_2D, FURINA_2D, FURINA_2D.collider.delta );


    FURINA_2D.collider.checkIfColliding ( YELLOWPUSA_2D_2 );
    FURINA_2D.AI.checkIfInsideFrustumOfEnemy ( FURINA_2D, YELLOWPUSA_2D_2 );
    FURINA_2D.checkIfAttackedOrAttacking ( YELLOWPUSA_2D_2 );
    FURINA_2D.AI.checkIfEnemyInsideFrustum ( YELLOWPUSA_2D_2, FURINA_2D, FURINA_2D.collider.delta );


    // FURINA_2D.collider.checkIfColliding ( YELLOWPUSA_2D_2 );

    // // if ( intersect_YELLOWPUSA_2D.y < intersect_YELLOWPUSA_2D_2.y )
    // {
    //     FURINA_2D.AI.checkIfInsideFrustumOfEnemy ( FURINA_2D, YELLOWPUSA_2D );
    //     FURINA_2D.checkIfAttackedOrAttacking ( YELLOWPUSA_2D );
    //     FURINA_2D.AI.checkIfEnemyInsideFrustum ( YELLOWPUSA_2D, FURINA_2D, FURINA_2D.collider.delta );
    //     // console.log  ( `TRUE`) 
    // }
    // else
    // {
    //     FURINA_2D.AI.checkIfInsideFrustumOfEnemy ( FURINA_2D, YELLOWPUSA_2D_2 );
    //     FURINA_2D.checkIfAttackedOrAttacking ( YELLOWPUSA_2D_2 );
    //     FURINA_2D.AI.checkIfEnemyInsideFrustum ( YELLOWPUSA_2D_2, FURINA_2D, FURINA_2D.collider.delta );
    //     // console.log  ( `FALSE`) 
    // }
    // console.log ( `YELOWPUSA: ${YELLOWPUSA_2D_2.intersect.y}` )
    // console.log ( `YELOWPUSA_2D: ${YELLOWPUSA_2D.intersect.y}` )

    
    
    // console.log ( FURINA_2D.collider.collidingWithChar )



    
    //CONTROLS
        FURINA_2D.updateCharacter_W_Physics(  );
        YELLOWPUSA_2D.updateCharacter_W_Physics_Enemy_Yellow_Pusa( );
        YELLOWPUSA_2D_2.updateCharacter_W_Physics_Enemy_Yellow_Pusa( );
        PET.updateCharacter_W_Physics_PET(  );

    


    
    //CHECKCOLISIONS
    //FOR WALL
        if (GAME_STAGE == "MAP1") 
        {
            //FURINA PLAYER 1
                Box1_Down.collider.CheckCollison ( FURINA_2D.collider, 1, PET.fullyDead );
                Box1_Left.collider.CheckCollison ( FURINA_2D.collider, 1, PET.fullyDead );
                Box1_Right.collider.CheckCollison ( FURINA_2D.collider, 1, PET.fullyDead );

                Box2_Down_1.collider.CheckCollison ( FURINA_2D.collider, 1, PET.fullyDead );
                Box2_Down_2.collider.CheckCollison ( FURINA_2D.collider, 1, PET.fullyDead );
                Box2_Left.collider.CheckCollison ( FURINA_2D.collider, 1, PET.fullyDead );
                Box2_Top.collider.CheckCollison ( FURINA_2D.collider, 1, PET.fullyDead );
                Box2_Right.collider.CheckCollison ( FURINA_2D.collider, 1, PET.fullyDead );

                Box3_Down.collider.CheckCollison ( FURINA_2D.collider, 1, PET.fullyDead );
                Box3_Right.collider.CheckCollison ( FURINA_2D.collider, 1, PET.fullyDead );

            //FURINA PLAYER 2
                Box1_Down.collider.CheckCollison ( FURINA_2D_P2.collider, 1, PET.fullyDead );
                Box1_Left.collider.CheckCollison ( FURINA_2D_P2.collider, 1, PET.fullyDead );
                Box1_Right.collider.CheckCollison ( FURINA_2D_P2.collider, 1, PET.fullyDead );

                Box2_Down_1.collider.CheckCollison ( FURINA_2D_P2.collider, 1, PET.fullyDead );
                Box2_Down_2.collider.CheckCollison ( FURINA_2D_P2.collider, 1, PET.fullyDead );
                Box2_Left.collider.CheckCollison ( FURINA_2D_P2.collider, 1, PET.fullyDead );
                Box2_Top.collider.CheckCollison ( FURINA_2D_P2.collider, 1, PET.fullyDead );
                Box2_Right.collider.CheckCollison ( FURINA_2D_P2.collider, 1, PET.fullyDead );

                Box3_Down.collider.CheckCollison ( FURINA_2D_P2.collider, 1, PET.fullyDead );
                Box3_Right.collider.CheckCollison ( FURINA_2D_P2.collider, 1, PET.fullyDead );

            //YELLOWPUSA
                Box1_Down.collider.CheckCollison ( YELLOWPUSA_2D.collider, 1, PET.fullyDead );
                Box1_Left.collider.CheckCollison ( YELLOWPUSA_2D.collider, 1, PET.fullyDead );
                Box1_Right.collider.CheckCollison ( YELLOWPUSA_2D.collider, 1, PET.fullyDead );

                Box2_Down_1.collider.CheckCollison ( YELLOWPUSA_2D.collider, 1, PET.fullyDead );
                Box2_Down_2.collider.CheckCollison ( YELLOWPUSA_2D.collider, 1, PET.fullyDead );
                Box2_Left.collider.CheckCollison ( YELLOWPUSA_2D.collider, 1, PET.fullyDead );
                Box2_Top.collider.CheckCollison ( YELLOWPUSA_2D.collider, 1, PET.fullyDead );
                Box2_Right.collider.CheckCollison ( YELLOWPUSA_2D.collider, 1, PET.fullyDead );

                Box3_Down.collider.CheckCollison ( YELLOWPUSA_2D.collider, 1, PET.fullyDead );
                Box3_Right.collider.CheckCollison ( YELLOWPUSA_2D.collider, 1, PET.fullyDead );

            //YELLOWPUSA2
                Box1_Down.collider.CheckCollison ( YELLOWPUSA_2D_2.collider, 1, YELLOWPUSA_2D_2.fullyDead );
                Box1_Left.collider.CheckCollison ( YELLOWPUSA_2D_2.collider, 1, YELLOWPUSA_2D_2.fullyDead );
                Box1_Right.collider.CheckCollison ( YELLOWPUSA_2D_2.collider, 1, YELLOWPUSA_2D_2.fullyDead );

                Box2_Down_1.collider.CheckCollison ( YELLOWPUSA_2D_2.collider, 1, YELLOWPUSA_2D_2.fullyDead );
                Box2_Down_2.collider.CheckCollison ( YELLOWPUSA_2D_2.collider, 1, YELLOWPUSA_2D_2.fullyDead );
                Box2_Left.collider.CheckCollison ( YELLOWPUSA_2D_2.collider, 1, YELLOWPUSA_2D_2.fullyDead );
                Box2_Top.collider.CheckCollison ( YELLOWPUSA_2D_2.collider, 1, YELLOWPUSA_2D_2.fullyDead );
                Box2_Right.collider.CheckCollison ( YELLOWPUSA_2D_2.collider, 1, YELLOWPUSA_2D_2.fullyDead );

                Box3_Down.collider.CheckCollison ( YELLOWPUSA_2D_2.collider, 1, YELLOWPUSA_2D_2.fullyDead );
                Box3_Right.collider.CheckCollison ( YELLOWPUSA_2D_2.collider, 1, YELLOWPUSA_2D_2.fullyDead );
        
        //PET
            Box1_Down.collider.CheckCollison ( PET.collider, 1, PET.fullyDead );
            Box1_Left.collider.CheckCollison ( PET.collider, 1, PET.fullyDead );
            Box1_Right.collider.CheckCollison ( PET.collider, 1, PET.fullyDead );

            Box2_Down_1.collider.CheckCollison ( PET.collider, 1, PET.fullyDead );
            Box2_Down_2.collider.CheckCollison ( PET.collider, 1, PET.fullyDead );
            Box2_Left.collider.CheckCollison ( PET.collider, 1, PET.fullyDead );
            Box2_Top.collider.CheckCollison ( PET.collider, 1, PET.fullyDead );
            Box2_Right.collider.CheckCollison ( PET.collider, 1, PET.fullyDead );

            Box3_Down.collider.CheckCollison ( PET.collider, 1, PET.fullyDead );
            Box3_Right.collider.CheckCollison ( PET.collider, 1, PET.fullyDead );
        }
    //FOR FURINA


    //FOR ENEMIES
        YELLOWPUSA_2D.collider.CheckCollison ( YELLOWPUSA_2D_2.collider, 0.8, YELLOWPUSA_2D.fullyDead  );
        YELLOWPUSA_2D.collider.CheckCollison ( FURINA_2D.collider, 0.8, FURINA_2D.fullyDead  );
        YELLOWPUSA_2D_2.collider.CheckCollison ( FURINA_2D.collider, 0.8, YELLOWPUSA_2D_2.fullyDead  );
    
    //FOR PET
        PET.collider.CheckCollison ( YELLOWPUSA_2D.collider, 0.5, YELLOWPUSA_2D.fullyDead );
        PET.collider.CheckCollison ( FURINA_2D.collider, 0.3, FURINA_2D.fullyDead );
        PET.collider.CheckCollison ( YELLOWPUSA_2D_2.collider, 0.5, YELLOWPUSA_2D_2.fullyDead );
    /*
    platform2.collider.CheckCollison ( FURINA_2D.collider, 0.1 );
    platform2.collider.CheckCollison ( YELLOWPUSA_2D.collider, 0.1 );
    FURINA_2D.collider.CheckCollison ( YELLOWPUSA_2D.collider, 0.1 );
    BLACKPUSA_2D.collider.CheckCollison ( YELLOWPUSA_2D.collider, 0.1 );
    BLACKPUSA_2D.collider.CheckCollison ( FURINA_2D.collider, 0.1 );
    platform2.collider.CheckCollison ( FURINA_2D_P2.collider, 0.5 );
    FURINA_2D.collider.CheckCollison ( FURINA_2D_P2.collider, 0.5 );
    */
    
    //2ND PLAYER
        FURINA_2D.collider.CheckCollison ( FURINA_2D_P2.collider, 0.5 );
        PET.collider.CheckCollison ( FURINA_2D_P2.collider, 0.3, FURINA_2D_P2.fullyDead );


    //CAMERA SETUP
        Camera2D.setupCamera ( createVector2 ( FURINA_2D.fixedCanvasLoc.x, FURINA_2D.fixedCanvasLoc.y) );
        Camera2D.drawBackGround ( `gray` );
        Camera2D.setOrigin ( createVector2 ( FURINA_2D.fixedCanvasLoc.x , FURINA_2D.fixedCanvasLoc.y ), createVector2 ( FURINA_2D.velocityX, FURINA_2D.velocityY ) )





    //CHECK IF INSIDE FRUSTUM AND DISTANCE
        YELLOWPUSA_2D.AI.checkIfInsideFrustum_AI ( FURINA_2D, YELLOWPUSA_2D, YELLOWPUSA_2D.collider.delta )// IBUTANG SA LAST KAY ANG GA CHECKCOLISION (ANG VALUE DIKAN CHECKCOLISION DAPAT ILALOM NI SIYA)
        YELLOWPUSA_2D_2.AI.checkIfInsideFrustum_AI ( FURINA_2D, YELLOWPUSA_2D_2, YELLOWPUSA_2D_2.collider.delta )
        PET.AI.checkIfInsideFrustum_AI_PET ( FURINA_2D, PET, PET.collider.delta );

    

    


    //RENDERINGCOLLIDER ( FOR CHARACTERS ) //MO PUSH SA CHARACTER OPPOSITE
        FURINA_2D.renderCollider (  );
        PET.renderCollider (  );
    //BLACKPUSA_2D.renderCollider (  );
        YELLOWPUSA_2D.renderCollider (  );
        YELLOWPUSA_2D_2.renderCollider (  );

    //2ND PLAYER
        FURINA_2D_P2.renderCollider (  );

    
    //Calculating Gauge
        YELLOWPUSA_2D.AI.UI.makeVerticalGauge ( createRGBA ( 220, 210, 185, 1 ), YELLOWPUSA_2D.fixedCanvasLoc, YELLOWPUSA_2D.flippedImageX, YELLOWPUSA_2D.AI.gaugeTillAttack );
        YELLOWPUSA_2D_2.AI.UI.makeVerticalGauge ( createRGBA ( 220, 210, 185, 1 ), YELLOWPUSA_2D_2.fixedCanvasLoc, YELLOWPUSA_2D_2.flippedImageX, YELLOWPUSA_2D_2.AI.gaugeTillAttack );




    //DRAW CALLS
    //WALLS
    if (GAME_STAGE == "MAP1") 
    {
        Box1_Down.draw (  );
        Box1_Left.draw (  );
        Box1_Right.draw (  );

        Box2_Down_1.draw (  );
        Box2_Down_2.draw (  );
        Box2_Left.draw (  );
        Box2_Top.draw (  );
        Box2_Right.draw (  );
        
        Box3_Down.draw (  );    
        Box3_Right.draw (  );
    }

    //CHARS
    YELLOWPUSA_2D.AI.UI.drawUI (  );
    YELLOWPUSA_2D.drawCharacter();
    YELLOWPUSA_2D_2.AI.UI.drawUI (  );
    YELLOWPUSA_2D_2.drawCharacter();
    PET.drawCharacter (  );
    FURINA_2D.drawCharacter();
    YELLOWPUSA_2D.AI.drawAIState ( YELLOWPUSA_2D.fixedCanvasLoc );
    YELLOWPUSA_2D_2.AI.drawAIState ( YELLOWPUSA_2D_2.fixedCanvasLoc );

    //2ND PLAYER
    FURINA_2D_P2.drawCharacter();



    //RESTORECAMERA
    Camera2D.restoreCamera (  );

    //FOR DEBUGGING
    //console.log ( FURINA_2D.fixedCanvasLoc )
    // console.log ( `X: ${ FURINA_2D.canvasLocX } Y: ${ FURINA_2D.canvasLocY }` )



    // console.log(`animate_OPWorld_ANIMATED`)
    let animation = requestAnimationFrame(animate_OPWorld)

    if(!INOPENWORLD)
    {
        console.log(`ANIMATE_OPWORLD_CANCELED`)
        window.cancelAnimationFrame(animation)
    }   
    else
    {
        //requestAnimationFrame(animation)
    }
    
}
