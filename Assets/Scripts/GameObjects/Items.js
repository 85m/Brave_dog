function Item(_x,_y,_type,_cpt){
	var _self = game.add.sprite(_x, _y, _type);
	game.physics.p2.enable([_self],false);
    _self.name = "item_"+_cpt;
    _self.alpha = 0;
    _self.isGood = _type == 'book' ? true : false;
    _self.body.fixedRotation = true;
    _self.body.static = true;

    _self.body.debug = Application.debugMode;
    _self.body.collideWorldBounds = true;

    _self.body.setCollisionGroup(objectColGroup);
    _self.body.collides([playerColGroup,objectColGroup]);
    return _self;
}
function itemGroups(){
	var _items = game.add.group();
	_items.enableBody = true;
    _items.physicsBodyType = Phaser.Physics.P2JS;
    var type;

    for (var i = 0; i < Application.gameplay.items; i++){
        var posX = game.world.randomX;
        var posY = game.world.randomY;


        //FOR TEST I GIVE POSITION
        //var posX = objectPosTest[i].x;
        //var posY = objectPosTest[i].y;

        /*define wich object to show */
        var nbr = game.rnd.integerInRange(0, 100);
        if(nbr < 50){
            type = 'bBook';//bad
        }else{
            type = 'book';//good
        }

        //x,y of item , type of item(good/bad), cpt of item
        var anItem = Item(posX,posY,type,i);
        addSensorToItem(anItem);
        _items.add(anItem);
    }
    _items.visible = true;
    return _items;
}