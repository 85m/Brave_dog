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