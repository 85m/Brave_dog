var idx = 0;

function Item(_game,_x,_y){

	var _self = _game.add.sprite(_x, _y, "book");
	_game.physics.p2.enable([_self],false);
	_self.name = "item_"+idx;
    _self.body.fixedRotation = true;
    _self.body.static = true;

    _self.body.debug = Application.debugMode;
    _self.body.collideWorldBounds = true;

    _self.body.setCollisionGroup(objectColGroup);
    _self.body.collides([playerColGroup,objectColGroup]);
    _self.visible = Application.gameplay.objectVisible;


    idx++;
    return _self;
}


function itemGroups(_game){
	var _items = _game.add.group();
	_items.enableBody = true;
    _items.physicsBodyType = Phaser.Physics.P2JS;

    for (var i = 0; i < Application.gameplay.itemNbr; i++){
        //var posX = _game.world.randomX;
        //var posY = _game.world.randomY;

        var posX = objectPosTest[i].x;
        var posY = objectPosTest[i].y;

        var anItem = Item(_game,posX,posY);

        layerScent(_game,anItem);
        _items.add(anItem);
    }

    return _items;
}



