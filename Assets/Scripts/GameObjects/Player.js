var g,s, cpt = 0;

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
    _self.body.collides(objectColGroup, checkCollideWithObject, this);
    _self.body.collides(missingColGroup, checkCollideWithMissing, this);

    g = _game;
    s = _self;

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
		moveUpdatePlayerScent(_self);
    }
    return _self;
}

function checkCollideWithObject(){
	
	cpt++;
	if(cpt == 2){
		cpt = 0;
		Application.gameData.layers++;
		layerScent(g,s);
	}
}


function checkCollideWithMissing(){
	//console.log(arguments);
}

/* ************************************************************ */
/* loop into all item  and check if an overlap is made with the player scent */
function scentCollisionWithObject(_game){
	var isCollide = false;
	var r = playerRing[0].circleData;
	Application.gameData.items.forEach(function(item) {
		var res = checkObjectOverlap(playerRing[0], item);
		if(res){
			//console.log('overlap 1');
			reduceCircle(_game,r,20);
			isCollide  = true;
		}
	});

	if(!isCollide){
		growCircle(_game,r,120);
	}
}
/* overlap between circle */
function checkObjectOverlap(spriteA, spriteB) {
	var a = spriteA.circleData;
	var b = spriteB.children[0].circleData;
	return Phaser.Circle.intersects(a, b);
}
/* circle grow or reduce */
function growCircle(_game,_circle,_radius){ _game.add.tween(_circle).to( { radius: _radius }, 1000, "Linear", true); }
function reduceCircle(_game,_circle,_radius){ _game.add.tween(_circle).to( { radius: _radius }, 1000, "Linear", true); }

/* ************************************************************ */




function iceCubeCollision(body1, body2){
	if (!body1.hasCollided) {
	// check to see if the 'hasCollided'
	//property is not 'truthy' (i.e. not set, or set to false or null or 0 or something)
	console.log("Ice cube collision")
	body1.hasCollided = true;
	// set it to true so if the collision happens again,
	//everything inside this if statement will be skipped   ...  
	}
}
