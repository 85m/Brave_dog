function Item(_item,_cpt){
	var _self = game.add.sprite(_item.x, _item.y, _item.name);
	game.physics.p2.enable([_self],false);
    _self.name      = "item_"+_cpt;
    _self.alpha     = Application.ItemsConf.alpha;
    _self.width     = _item.w;
    _self.height    = _item.h;

    _self.isGood = _item.type == 'good' ? true : false;
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
    var anItem,hole;

	_items.enableBody = true;
    _items.physicsBodyType = Phaser.Physics.P2JS;

    for (var i = 0; i < Application.gameplay.items; i++){
        if(Application.gameplay.level == 1){
            anItem = Item(ItemArr[i],i);
        }else{
            anItem = Item(ItemArr2[i],i);
        }

        addSensorToItem(anItem);
        _items.add(anItem);

        if(Application.gameplay.level == 1){
            hole = game.add.sprite(ItemArr[i].x,ItemArr[i].y,'dog_hole');
        }else{
            hole = game.add.sprite(ItemArr2[i].x,ItemArr2[i].y,'dog_hole');
        }
        hole.name = "item_"+i;
        hole.visible = false;
        hole.scale.x = .8;
        hole.scale.y = .8;
        Application.gameplay.holes.add(hole);
    }
    _items.visible = true;
    return _items;
}