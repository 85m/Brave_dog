function update() {
    player.body.setZeroVelocity();

    for (var i = 0; i < scentArray.length; i++) {
        playerRing[i].body.x = player.body.x;
        playerRing[i].body.y = player.body.y;

    }
        playerRing[0].circleData.x = player.body.x;
        playerRing[0].circleData.y = player.body.y;

    if (upKey.isDown){
        player.body.moveUp(speed);
        for (var i = 0; i < scentArray.length; i++) {
            playerRing[i].body.x = player.body.x;
            playerRing[i].body.y = player.body.y;
        }
        playerRing[0].circleData.x = player.body.x;
        playerRing[0].circleData.y = player.body.y;
    }
    else if (downKey.isDown){
        player.body.moveDown(speed);
        for (var i = 0; i < scentArray.length; i++) {
            playerRing[i].body.x = player.body.x;
            playerRing[i].body.y = player.body.y;

        }
            playerRing[0].circleData.x = player.body.x;
            playerRing[0].circleData.y = player.body.y;
    }

    if (leftKey.isDown){
        player.body.moveLeft(speed);
        for (var i = 0; i < scentArray.length; i++) {
            playerRing[i].body.x = player.body.x;
            playerRing[i].body.y = player.body.y;

        }
            playerRing[0].circleData.x = player.body.x;
            playerRing[0].circleData.y = player.body.y;
    }
    else if (rightKey.isDown){
        player.body.moveRight(speed);
        for (var i = 0; i < scentArray.length; i++) {
            playerRing[i].body.x = player.body.x;
            playerRing[i].body.y = player.body.y;

        }
            playerRing[0].circleData.x = player.body.x;
            playerRing[0].circleData.y = player.body.y;
    }

    items.forEach(function(item) {
        //console.log(item);
        var res = checkObjectOverlap(playerRing[0], item);
        var r = playerRing[0].circleData;

        if(res){
            console.log('overlap');
            
                game.add.tween(r).to( { radius: 80 }, 1000, Phaser.Easing.Linear.None, true);
        
        }else{
                game.add.tween(r).to( { radius: 120 }, 1000, Phaser.Easing.Linear.None, true);
        }
    });





}

/*function checkObjectOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}*/


function checkObjectOverlap(spriteA, spriteB) {
    var a = spriteA.circleData;
    var b = spriteB.children[0].circleData;
    //console.log(spriteA,spriteB);

    return Phaser.Circle.intersects(a, b);

}

