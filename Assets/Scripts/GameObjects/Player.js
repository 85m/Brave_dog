function Player(_game,_x,_y){

	var _self = _game.add.sprite(_x, _y, "player");

	_self.speed = 200;

	_self.controller = {
		upKey: 		_game.input.keyboard.addKey(Phaser.Keyboard.UP),
		downKey: 	_game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
		leftKey: 	_game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
		rightKey: 	_game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
	}

	_game.physics.p2.enable([_self],false);

    _self.name = "player";
    _self.body.fixedRotation = true;

    _self.body.debug = Application.debugMode;
    _self.body.collideWorldBounds = true;

    _self.body.setCollisionGroup(playerColGroup);
    _self.body.collides(objectColGroup, checkOverlap, this);

    _self.scent = layerScent(_game,_self);


    _self.update = function(){
    	_self.body.setZeroVelocity();
		if (_self.controller.upKey.isDown){
			_self.body.moveUp(_self.speed);
		}
		else if (_self.controller.downKey.isDown){
			_self.body.moveDown(_self.speed);
		}
		if (_self.controller.leftKey.isDown){
			_self.body.moveLeft(_self.speed);

			_self.scent.x = _self.body.x;
			_self.scent.y = _self.body.y;
			console.log(_self/*.scent.body.x,_self.body.x*/);
		}
		else if (_self.controller.rightKey.isDown){
			_self.body.moveRight(_self.speed);
		}
    }

    return _self;
}

function checkOverlap(){
    console.log(arguments);
}