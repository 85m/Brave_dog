function update() {

    //game.physics.arcade.overlap(charRect, block, overlapHandler, null, this);

    //player.body.setZeroVelocity();
    flair.body.setZeroVelocity();


    if (upKey.isDown)
    {
        //player.body.moveUp(speed);
        flair.body.moveUp(speed);
    }
    else if (downKey.isDown)
    {
        //player.body.moveDown(speed);
        flair.body.moveDown(speed);
    }

    if (leftKey.isDown)
    {
       // player.body.moveLeft(speed);
        flair.body.moveLeft(speed);
    }
    else if (rightKey.isDown)
    {
        //player.body.moveRight(speed);
        flair.body.moveRight(speed);
    }


}