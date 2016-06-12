function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);

    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    //BLOCK
    wall = game.add.sprite(300,300,"wall");
    /* ******************************************************* */
    player = game.add.sprite(100,300,"player");
    /* ******************************************************* */
    flair = game.add.sprite(600,300);


    //charRect = game.add.sprite(100,300,null);

    game.physics.p2.enable([ flair, wall ], true);

    wall.body.name     = "wall";

    flair.body.name    = "flair";
    flair.body.setCircle(circleRay/2);




    //charRect.body.setCircle(circObj._radius, 0, 0);

    ring = game.add.graphics();
    //ring.lineStyle(1, 0xFFFFFF, 1);
    ring.beginFill(0xFFFF0B, 0.5);
    ring.drawCircle(0,0,50);
    ring.endFill();
    flair.addChild(ring);

    game.physics.p2.setPostBroadphaseCallback(checkOverlap, this);
}


function donotcollide(body1, body2) {

    //si body est rectangle ou cercle false sinon on continu 


    return false;
}


function checkOverlap(body1,body2){
    var body1Info = {
        name:body1.name,
        x:body1.sprite.x,
        y:body1.sprite.y,
        w:body1.sprite.width,
        h:body1.sprite.height
    };
    var body2Info = {
        name:body2.name,
        x:body2.sprite.x,
        y:body2.sprite.y,
        w:body2.sprite.width,
        h:body2.sprite.height
    };

    console.log(body1Info,body2Info);

    //wall.loadTexture('wall');

    //wall.loadTexture('flair_touch_wall');
}


/* **************************************************************************** */
/* **************************************************************************** */
/* **************************************************************************** */
function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);

    mummy = game.add.sprite(200, 360, 'mummy', 5);
    mummy.scale.x = scaleFactor;
    mummy.scale.y = scaleFactor;

    mummy.anchor.x = mummy.anchor.y = 0.5 ;
    mummy.smoothed = false;
    //anchor position

    //mummy.offsetX
    circle = new Phaser.Circle(
        mummy.x,
        mummy.y,
        circleRay
    );
    //rect = new Phaser.Rectangle(600,300,200,200);

    game.physics.p2.enable(mummy);

    rect = game.add.sprite(600, 300, null);

    //game.physics.arcade.enable([mummy,rect]);
    //rect.body.setSize(50,50,0,0);

    mummy.animations.add('left', FrameArray, 10, true);
    mummy.animations.add('right', FrameArray, 10, true);






    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);


}





/* CHARACTER WITH CIRCLE */

// First, add your sprite and enable physics on it
charRect = game.add.sprite(100,300,null);




game.physics.p2.enable([charRect,block]);

// Create a shape
var circObj = new Phaser.Circle(0, 0, circleRay);
// Set the body size of your sprite
charRect.body.setCircle(circObj._radius, 0, 0);
// Draw the graphics
var ring = game.add.graphics();
ring.lineStyle(2, 0xFF0000, 1);
ring.drawShape(circObj);
// Add the graphics as a child to your sprite
charRect.addChild(ring);



function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);

    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    //BLOCK
    wall = game.add.sprite(300,300,"wall");
    /* ******************************************************* */
    player = game.add.sprite(100,300,"player");
    /* ******************************************************* */
    /*    var graphicsFlair = game.add.graphics(100, 100);
     // draw a circle
     graphicsFlair.lineStyle(0);
     graphicsFlair.beginFill(0xFFFF0B, 0.5);
     graphicsFlair.drawCircle(470, 200, 200);
     graphicsFlair.endFill();*/


    flair = game.add.sprite(player.x,player.y,'flair');
    flair.scale.set(2);


    game.physics.p2.enable([player,wall,flair],false);

    var circleShape = new Phaser.Circle(game.world.centerX, 100,64);
    //flair.body.addShape(circleShape);

    //flair.body.setCircle(65);

    player.body.name  = "player";
    flair.body.name    = "flair";
    wall.body.name     = "wall";


    game.physics.p2.setPostBroadphaseCallback(checkOverlap, this);

}

function checkOverlap(body1,body2){

    /*    var body1Info = {
     name:body1.name,
     x:body1.sprite.x,
     y:body1.sprite.y,
     w:body1.sprite.width,
     h:body1.sprite.height
     };
     var body2Info = {
     name:body2.name,
     x:body2.sprite._bounds.x,
     y:body2.sprite._bounds.y,
     w:body2.sprite._bounds.width,
     h:body2.sprite._bounds.height
     };*/



    //console.log(body1);
    wall.loadTexture('wall');

    if( (body1.name == 'player' && body2.name == 'flair') || (body2.name == 'player' && body1.name == 'flair') ){
        //console.log('inside')
        return false;
    }

    if( (body1.name == 'wall' || body2.name == 'wall') ){

        if( (body1.name == 'flair' || body2.name == 'flair') ){

            console.log('flair touche wall');
            wall.loadTexture('flair_touch_wall');

        }
        if( (body1.name == 'player' || body2.name == 'player') ){

            console.log('player touche wall');
            wall.loadTexture('player_touch_wall');

        }
    }



    /*    if( (body1.name == 'flair' && body2.name == 'wall') || (body2.name == 'flair' && body1.name == 'wall') ){
     console.log('flair touche wall');
     wall.loadTexture('flair_touch_wall');


     }else if( (body1.name == 'player' && body2.name == 'wall') || (body2.name == 'player' && body1.name == 'wall') ){
     console.log('player touche wall');
     wall.loadTexture('player_touch_wall');
     }*/


    /*    if( (body1.name == 'charRect' && body2.name == 'block') || (body2.name == 'block' && body1.name == 'charRect') ){
     console.log('charRect touche block');
     }*/

    //var r = checkCollision(body1Info,body2Info);
    //console.log(r);

}









function BoxBoxCollision(body1,body2){

    if (body2.x >= body1.x + body1.w
        || body2.x + body2.w <= body1.x
        || body2.y >= body1.y + body1.h
        || body2.y + body2.h <= body1.y )
    {
        return false;
    }
    return true;
}