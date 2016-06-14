function create() {
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    /* ******************************************************* */
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.updateBoundsCollisionGroup();

    /* ******************************************************* */
    var environmentCollision        = game.physics.p2.createCollisionGroup();
    var playerCollisionGroup        = game.physics.p2.createCollisionGroup();
    var objectCollisionGroup        = game.physics.p2.createCollisionGroup();
    /* ******************************************************* */
    contra = game.add.sprite(100, 200, 'contra2');
    bunny = game.add.sprite(550, 200, 'bunny');
    //contra.visible = false;
    //bunny.visible = false;

    game.physics.p2.enable([ contra, bunny ], false);
    //  Convex polys
    contra.body.clearShapes();
    contra.body.loadPolygon('physicsData', 'contra2');

    bunny.body.clearShapes();
    bunny.body.loadPolygon('physicsData', 'bunny');
    contra.body.static = true;
    bunny.body.static = true;
    /* ******************************************************* */
    bunny.body.setCollisionGroup(environmentCollision);
    contra.body.setCollisionGroup(environmentCollision);
    bunny.body.collides([environmentCollision,playerCollisionGroup]);
    contra.body.collides([environmentCollision,playerCollisionGroup]);
    /* ******************************************************* */
    //ADD ITEM
    items = game.add.group();
    items.enableBody = true;
    items.physicsBodyType = Phaser.Physics.P2JS;

    for (var i = 0; i < itemsNbr; i++){
        var posX = game.world.randomX;
        var posY = game.world.randomY;
        //var posX = posY = 240;
        var s = items.create(posX, posY, 'book');
        s.name = "item_"+i;

        for (var y = 0; y < scentArray.length; y++) {
            itemRing[y] = game.add.graphics(0, 0);
            itemRing[y].name = s.name+'_'+scentArray[y].name;
            itemRing[y].circleData = new Phaser.Circle(posX,posY,scentArray[y].diameter);
            itemRing[y].beginFill(scentArray[y].color, .1);
            itemRing[y].drawCircle(-posX,-posY,scentArray[y].diameter);
            itemRing[y].endFill();
            game.physics.p2.enable([ itemRing[y] ],false);
            itemRing[y].body.x = posX;
            itemRing[y].body.y = posY;
            itemRing[y].body.static = true;
            itemRing[y].body.immovable = true;
            s.addChild(itemRing[y]);
        }


        s.body.static = true;
        s.body.setCollisionGroup(objectCollisionGroup);
        s.body.collides([objectCollisionGroup,playerCollisionGroup]);
    }
/*    console.log("B")
    console.log(items.children[0].x + " " + items.children[0].y);
    console.log("circle")
    console.log(items.children[0].children[0].x + " " + items.children[0].children[0].y);
    console.log("body")
    console.log(items.children[0].children[0].body.x + " " + items.children[0].children[0].body.y);*/



    /* ******************************************************* */ 
    //PLAYER
    player = game.add.sprite(playerPos.x,playerPos.y,"player");
    game.physics.p2.enable([player],false);
    player.body.name = "player";
    player.body.fixedRotation = true;
    for (var i = 0; i < scentArray.length; i++) {
        playerRing[i] = game.add.graphics(playerPos.x,playerPos.y);
        playerRing[i].name = player.body.name+'_'+scentArray[i].name;
        playerRing[i].circleData = new Phaser.Circle(playerPos.x,playerPos.y,scentArray[i].diameter);
        playerRing[i].beginFill(scentArray[i].color, 0);
        playerRing[i].drawCircle(0,0,scentArray[i].diameter);
        playerRing[i].endFill();
        game.physics.p2.enable([ playerRing[i] ],false);
        playerRing[i].body.static = true;
    }
    player.body.setCollisionGroup(playerCollisionGroup);

    player.body.collides(environmentCollision, hitEnvironment, this);
    player.body.collides(objectCollisionGroup, checkOverlap, this);

}

function hitEnvironment(){
    console.log(arguments);
}

function hitScent(){
    console.log(arguments);
}

function checkOverlap(){
    console.log(arguments);
}

/* **************************************************************************** */
/* **************************************************************************** */
/* **************************************************************************** */