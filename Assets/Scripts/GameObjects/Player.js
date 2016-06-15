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

     layerScent(_game,_self);
    _self.scent = playerRing;

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
		}
		else if (_self.controller.rightKey.isDown){
			_self.body.moveRight(_self.speed);
		}
		updatePlayerScent(_self);


		//console.log(Application.gameData.items);
		Application.gameData.items.forEach(function(item) {
			//console.log(item.name)
			var res = checkObjectOverlap(playerRing[0], item);
			var r = playerRing[0].circleData;

			if(res){
				console.log('overlap');
				_game.add.tween(r).to( { radius: 80 }, 1000, Phaser.Easing.Linear.None, true);
			}else{
				_game.add.tween(r).to( { radius: 120 }, 1000, Phaser.Easing.Linear.None, true);
			}
		});
    }
    return _self;
}

function checkOverlap(){
	//console.log(arguments);
}


function checkObjectOverlap(spriteA, spriteB) {
	var a = spriteA.circleData;
	var b = spriteB.children[0].circleData;
	//console.log(spriteA,spriteB);

	return Phaser.Circle.intersects(a, b);

}
