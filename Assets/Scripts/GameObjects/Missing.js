function Missing(_x,_y){

    //var _x = _game.world.randomX;
    //var _y = _game.world.randomY;
    var _self = game.add.sprite(_x, _y, "missing");
    _self.name = "missing";
    _self.alpha = .4;
    game.physics.p2.enable([_self],false);
    _self.body.fixedRotation = true;
    _self.body.static = true;

    _self.body.debug = Application.debugMode;
    _self.body.collideWorldBounds = true;

    _self.body.setCollisionGroup(missingColGroup);
    _self.body.collides([playerColGroup,missingColGroup]);
    _self.visible = Application.gameplay.objectVisible;

    addSensorToItem(_self);

    return _self;
}

