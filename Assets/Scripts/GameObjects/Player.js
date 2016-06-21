var g,s, cpt = 0;

function Player(_game,_x,_y){
	//_game.world.setBounds(0, 0, 2560, 1600);

	var _self = _game.add.sprite(_x, _y, "player");

	//_self.scale.set(1);

/*    _self.animations.add('move_down',  [0,1,2]);
    _self.animations.add('move_left',  [3,4,5]);
    _self.animations.add('move_right', [6,7,8]);
    _self.animations.add('move_up',    [9,10,11]);*/

    _self.frame_normalSpeed 	= 5;
    _self.frame_runSpeed 		= 10;
    _self.frame_currentSpeed 	= _self.frame_normalSpeed;
    _self.currentDirection		= null;


	//_game.camera.follow(_self);
	//_game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);

	_self.normalSpeed 	= 120;
	_self.runSpeed 		= 450;
	_self.currentSpeed = _self.normalSpeed;

	_self.controller = {
		upKey: 		_game.input.keyboard.addKey(Phaser.Keyboard.UP),
		downKey: 	_game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
		leftKey: 	_game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
		rightKey: 	_game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
		shiftKey: 	_game.input.keyboard.addKey(Phaser.Keyboard.SHIFT),
		digKey: 	_game.input.keyboard.addKey(Phaser.Keyboard.X),
		lootKey: 	_game.input.keyboard.addKey(Phaser.Keyboard.A)
	}

	_self.audios = {
		findGoodObject: 	_game.add.audio('happy'),
		findMissing : 		_game.add.audio('happy'), //to change
		findBadObject : 	_game.add.audio('happy'),
		looseGame : 		_game.add.audio('lose')
	}
	_self.audios.findGoodObject.loop 	= false;
	_self.audios.findMissing.loop 		= false;
	_self.audios.findBadObject.loop 	= false;


	_game.physics.p2.enable([_self],false);

    _self.name = "player";
    _self.body.fixedRotation = true;

    _self.body.debug = Application.debugMode;
    _self.body.collideWorldBounds = true;

    _self.body.setCollisionGroup(playerColGroup);
    //_self.body.collides(objectColGroup, checkCollideWithObject, this);
    //_self.body.collides(missingColGroup, checkCollideWithMissing, this);
    _self.body.collides(environmentColGroup, null, this);//just need to collide with environment

    g = _game;
    s = _self;

    _self.sensor = playerRing;
     addLayerstoPlayer(_game,_self);

	_self.update = function(){
    	_self.body.setZeroVelocity();


		if (_self.controller.shiftKey.isDown){
			_self.currentSpeed = _self.runSpeed;
			_self.audios.findGoodObject.volume = 0;
			playerRing[ playerRing.length-1 ].alpha -= .05;

			_self.frame_currentSpeed = _self.frame_runSpeed;

		}else{
			_self.currentSpeed = _self.normalSpeed;
			_self.audios.findGoodObject.volume = 1;
			playerRing[ playerRing.length-1 ].alpha = 1;

			_self.frame_currentSpeed = _self.frame_normalSpeed;
		}

		if (_self.controller.upKey.isDown)
		{
			_self.body.moveUp(_self.currentSpeed);
			//_self.animations.play('move_up', _self.frame_currentSpeed, true);
			//_self.currentDirection = "UP";
		}
		else if (_self.controller.downKey.isDown)
		{
			_self.body.moveDown(_self.currentSpeed);
			//_self.animations.play('move_down', _self.frame_currentSpeed, true);
			//_self.currentDirection = "DOWN";
		}
		else if (_self.controller.leftKey.isDown)
		{
			_self.body.moveLeft(_self.currentSpeed);
			//_self.animations.play('move_left', _self.frame_currentSpeed, true);
			//_self.currentDirection = "LEFT";
		}
		else if (_self.controller.rightKey.isDown)
		{
			_self.body.moveRight(_self.currentSpeed);
			//_self.animations.play('move_right', _self.frame_currentSpeed, true);
			//_self.currentDirection = "RIGHT";
		}
		else{

/*			if(_self.currentDirection == "UP")
            {
                _self.animations.frame = 10;
            }
            if(_self.currentDirection == "DOWN")
            {
                _self.animations.frame = 1;
            }
            if(_self.currentDirection == "LEFT")
            {
                _self.animations.frame = 5;
            }
            if(_self.currentDirection == "RIGHT")
            {
                _self.animations.frame = 7;
            }
            _self.currentDirection = null;


			_self.animations.stop();*/
		}
		moveUpdatePlayerSensor(_self);
    }
    return _self;
}

/* ************************************************************ */
/* loop into all item  and check if an overlap is made with the player sensor */
function sensorCollisionWithObject(_game){
	var isCollide = false;
	var r = playerRing[ playerRing.length-1];

	//comme on modifie le circleData du feedback nous de vons recuperer la valeur du
	//precedent circleData pour faire correspondre avec celui du feedback
	var currentSensorSize = playerRing[ playerRing.length-2 ].circleData.radius;
	var minimumSensorSize = playerRing[ 0 ].circleData.radius;

	Application.gameData.items.forEach(function(item) {
		var res = checkObjectSensorOverlap(playerRing[ playerRing.length-1 ], item);
		if(res){
			//console.log('overlap 1');
			reduceCircle(_game,r,minimumSensorSize/2);
			isCollide  = true;
		}
	});
	if(!isCollide){
		growCircle(_game,r,currentSensorSize);
	}
}

/* overlap between circle */
function checkObjectSensorOverlap(spriteA, spriteB) {
	var a = spriteA.circleData;
	var b = spriteB.children[0].circleData;
	return Phaser.Circle.intersects(a, b);
}
/* ************************************************************ */
/* ************************************************************ */
/* ************************************************************ */

/* Player overlap an invisible object */
function playerOverlapObject(_player){
	Application.gameData.items.forEach(function(item) {

		var res = checkObjectOverlap(_player, item);
		if(res.s){
			//console.log('overlap 2');
			if(!malusActif){
				_player.audios.findGoodObject.play();
			}			

			if(_player.controller.digKey.isDown){
				item.alpha = 1;
			}
			if(item.alpha == 1 && _player.controller.lootKey.isDown){
				// Application.gameData.items.remove(item);
				item.destroy();


				//check if object is good or not
				if(item.isGood){
					if(Application.gameData.layers < playerSensorArray.length ){
						Application.gameData.layers++;
						addLayerstoPlayer(g,s);
					}
				}else{
					//console.log('sensor disapear');
					sensorTimer = 0;
					malusActif = true;
					Application.gameplay.timer = new Timer(Phaser.Timer.SECOND*25,false,malus,game);
					Application.gameplay.playerSensor.currentState = 0;
				}
			}
		}
	});
}







function checkObjectOverlap(p,o){
	var boundsA = p.getBounds();
	var boundsB = o.getBounds();
	return {s:Phaser.Rectangle.intersects(boundsA, boundsB),i: o.name};
}

/* ************************************************************ */
/* ************************************************************ */
/* ************************************************************ */
/*
circle grow or reduce

Explain:
the value of radius is changin in the tween, with the tween callback we clear and redraw each time the circle
drawcircle demands the circle diameter
*/
function reduceCircle(_game,_circle,_radius){
	var tw = _game.add.tween(_circle.circleData).to( { radius: _radius }, 1000, "Linear", true);
	tw.onUpdateCallback(
		function(twn,percent,twnData){
			_circle.clear();
			_circle.beginFill(Application.gameplay.playerFColor,Application.gameplay.playerSensor.currentState);
			_circle.drawCircle(0, 0, _circle.circleData.diameter);
			_circle.endFill();
		}, this
	);
}
function growCircle(_game,_circle,_radius){
	var tw = _game.add.tween(_circle.circleData).to( { radius: _radius }, 500, "Linear", true);
	tw.onUpdateCallback(
		function(twn,percent,twnData){
			_circle.clear();
			_circle.beginFill(Application.gameplay.playerFColor,Application.gameplay.playerSensor.currentState);
			_circle.drawCircle(0, 0, _circle.circleData.diameter);
			_circle.endFill();
		}, this
	);
}
/* ************************************************************ */