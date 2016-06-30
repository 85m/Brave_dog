function Player(_x,_y){
	var _self = game.add.sprite(_x, _y, "player");

    _self.animations.add('move_down',  [0,1,2]);
    _self.animations.add('move_left',  [3,4,5]);
    _self.animations.add('move_right', [6,7,8]);
    _self.animations.add('move_up',    [9,10,11]);

    _self.frame_normalSpeed 	= 5;
    _self.frame_runSpeed 		= 10;
    _self.frame_currentSpeed 	= _self.frame_normalSpeed;
    _self.currentDirection		= null;

	if(Application.gameplay.level == 2){
		game.world.setBounds(0, 0, 1280, 1280);
		game.camera.follow(_self);
		game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);
	}

	_self.normalSpeed 	= Application.PlayerConf.normalSpeed;
	_self.runSpeed 		= Application.PlayerConf.runSpeed;
	_self.currentSpeed = _self.normalSpeed;

	_self.controller = {
		upKey: 		game.input.keyboard.addKey(Phaser.Keyboard.UP),
		downKey: 	game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
		leftKey: 	game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
		rightKey: 	game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
		shiftKey: 	game.input.keyboard.addKey(Phaser.Keyboard.SHIFT),
		digKey: 	game.input.keyboard.addKey(Phaser.Keyboard.Z),
		lootKey: 	game.input.keyboard.addKey(Phaser.Keyboard.A)
	}

	_self.isAlreadyDown = false;//for dig (only once)

	_self.audio = {
		findGoodObject: 	game.add.audio('happy'),
		findBadObject : 	game.add.audio('nohappy'),
		findMissing : 		game.add.audio('happy'), //to change	
	}
	Application.gameplay.audio.lose = game.add.audio('lose');


	_self.audio.findGoodObject.loop 	= false;
	_self.audio.findMissing.loop 		= false;
	_self.audio.findBadObject.loop 		= false;

	game.physics.p2.enable([_self],false);
    
    _self.body.fixedRotation = true;

    _self.body.debug = Application.debugMode;
    _self.body.collideWorldBounds = true;

    _self.body.setCollisionGroup(playerColGroup);
    _self.body.collides(environmentColGroup, null, this);//just need to collide with environment

    /* CUSTOM */
    _self.name 		 = "player";
    _self.sensor 	 = [];
    _self.malusActif = false;
    _self.malusTimer = null;
    _self.currentSA  = Application.SensorConf.player.feedBackAlpha;//current alpha of sensor
    _self.storedSA   = _self.currentSA;//stored alpha of sensor

    /* Add first layers */
    addLayerstoPlayer(_self);
	//put the player top of sensor layer
	_self.bringToTop();

	_self.update = function(){
    	_self.body.setZeroVelocity();
    	if(Application.gameplay.canPlay){ //for tuto

			if (_self.controller.shiftKey.isDown)//RUN
			{
				_self.currentSpeed 							= _self.runSpeed;
				_self.frame_currentSpeed 					= _self.frame_runSpeed;
				_self.audio.findGoodObject.volume 			= 0;
				_self.sensor[ _self.sensor.length-1 ].alpha -= .05;
			}
			else
			{
				_self.currentSpeed 							= _self.normalSpeed;
				_self.frame_currentSpeed 					= _self.frame_normalSpeed;
				_self.audio.findGoodObject.volume 			= 1;
				_self.sensor[ _self.sensor.length-1 ].alpha = 1;

			}

			if (_self.controller.upKey.isDown)
			{
				_self.body.moveUp(_self.currentSpeed);
				_self.animations.play('move_up', _self.frame_currentSpeed, true);
				_self.currentDirection = "UP";
			}
			else if (_self.controller.downKey.isDown)
			{
				_self.body.moveDown(_self.currentSpeed);
				_self.animations.play('move_down', _self.frame_currentSpeed, true);
				_self.currentDirection = "DOWN";
			}
			else if (_self.controller.leftKey.isDown)
			{
				_self.body.moveLeft(_self.currentSpeed);
				_self.animations.play('move_left', _self.frame_currentSpeed, true);
				_self.currentDirection = "LEFT";
			}
			else if (_self.controller.rightKey.isDown)
			{
				_self.body.moveRight(_self.currentSpeed);
				_self.animations.play('move_right', _self.frame_currentSpeed, true);
				_self.currentDirection = "RIGHT";
			}
			else{

				if(_self.currentDirection == "UP")
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
				_self.animations.stop();
			}
			_self.moveSensor();
		}
    }//update

    /* Sensor move with the player*/
    _self.moveSensor = function(){
	    if(_self.sensor.length > 0){
	        for (var i = 0; i < _self.sensor.length; i++) {
	            _self.sensor[i].body.x 			= _self.body.x;
	            _self.sensor[i].body.y 			= _self.body.y;
	            _self.sensor[i].circleData.x 	= _self.body.x;
	            _self.sensor[i].circleData.y 	= _self.body.y;
	        }
	    }
    }//end moveSensor

    /* loop into all item  and check if an overlap is made with the player sensor */
    _self.sensorColSensorItem = function(){
    	var isCollide = false;
    	var sensorCircle = _self.sensor[ _self.sensor.length-1 ];
    	//comme on modifie le circleData du feedback nous de vons recuperer la valeur du
    	//precedent circleData pour faire correspondre avec celui du feedback
    	var currentSensorSize = _self.sensor[ _self.sensor.length-2 ].circleData.radius;
    	var minimumSensorSize = _self.sensor[ 0 ].circleData.radius;

    	Application.gameplay.data.forEach(function(item) {
    		var res = checkObjectSensorOverlap(_self.sensor[ _self.sensor.length-1 ], item);
    		if(res){
				//console.log('overlap 1');
				_self.manageFeedBackCircle(sensorCircle,minimumSensorSize/2);
				isCollide  = true;
			}
		});
		if(!isCollide){
			_self.manageFeedBackCircle(sensorCircle,currentSensorSize);
		}
    }//end sensorColSensorItem

    /* Player overlap an invisible object */
    _self.overlapItem = function(){
    	Application.gameplay.data.forEach(function(item) {
    		var res = checkItemOverlap(_self, item);
    		if(res){

				if(!_self.malusActif){ _self.audio.findGoodObject.play(); }

				if(_self.controller.digKey.isDown){ item.alpha = 1; }

				if(item.alpha == 1 && _self.controller.lootKey.isDown){
					//if object is good then add sensor layer
					if(item.isGood){
						if(Application.SensorConf.player.layers < Application.SensorConf.player.sensors.length ){
							Application.SensorConf.player.layers++;
							addLayerstoPlayer(_self);
							_self.bringToTop();
						}
						//add a hole if find something
						Application.gameplay.holes.forEach(function(hole){
							if(hole.name == item.name){
								hole.visible = true;
							}
						});

					}else if(item.name == "missing"){
						_self.audio.findBadObject.stop();
						_self.audio.findBadObject.volume = 1;
						_self.audio.findGoodObject.play();
						gameFinished();

					}else{
						//else alpha = 0 for timer length
						_self.malusActif = true;
						_self.malusTimer = new Timer(Phaser.Timer.SECOND* 5 ,false, _self.manageMalus,game);
						_self.currentSA  = 0;
						_self.audio.findGoodObject.stop();
						_self.audio.findBadObject.volume = .5;
						_self.audio.findBadObject.play();
					}
					item.destroy();
				}	
    		}else{
				if(_self.controller.digKey.isDown){
					if(!_self.isAlreadyDown){
						var hole = game.add.sprite(_self.x,_self.y,'dog_filled');
						hole.anchor.set(.5);
						hole.scale.x = .7;
						hole.scale.y = .7;
						Application.gameplay.holes.add(hole);
						_self.isAlreadyDown = true;
					}
				}else{
					_self.isAlreadyDown = false;
				}
			}
    	});
    }//end overlapItem


    /* Manage malus of player */
    _self.manageMalus = function(){
		_self.malusActif = false;
		_self.currentSA = _self.storedSA;
    }

	/*
	feedback circle grow or reduce

	Explain:
	the value of radius is changing in the tween, with the tween callback we clear and redraw each time the circle
	drawcircle demands the circle diameter
	*/
    _self.manageFeedBackCircle = function(_circle,_radius){
		var tw = game.add.tween(_circle.circleData).to( { radius: _radius }, 1000, "Linear", true);
		tw.onUpdateCallback(
			function(twn,percent,twnData){
				_circle.clear();
				_circle.beginFill(Application.SensorConf.player.feedBackColor, _self.currentSA);
				_circle.drawCircle(0, 0, _circle.circleData.diameter);
				_circle.endFill();
			}, this
		);
    }//end manageFeedBackCircle
    return _self;
}

/* ************************************************************ */
/* overlap between circle */
function checkObjectSensorOverlap(_player, _item) {
	var a = _player.circleData;
	var b = _item.children[0].circleData;
	return Phaser.Circle.intersects(a, b);
}
/* ************************************************************ */
/* ************************************************************ */
/* ************************************************************ */
function checkItemOverlap(_player,_item){
	var boundsA = _player.getBounds();
	var boundsB = _item.getBounds();
	return Phaser.Rectangle.intersects(boundsA, boundsB);
}

/* ************************************************************ */
/* ************************************************************ */
/* ************************************************************ */

function gameFinished()
{
	Application.gameplay.canPlay = false;

	var graphics = game.add.graphics(0, 0);


	var width = 750;
	var height = 250;
	var x = Application.config.width/2 - width/2;
	var y = Application.config.height/2 - height/2;

	// draw a rectangle
	graphics.beginFill(0x000000, 1);
    graphics.lineStyle(2, 0xFFFFFF, 1);
    graphics.drawRect(x, y, width, height);
    graphics.endFill();

    var style = { font: "25px Verdana", fill: "#ffffff",boundsAlignH: "center", boundsAlignV: "middle" };

    var congratsTxt = "Tu as sauvé le disparu";
    var infosTime = "Cela t'a pris : ";
    var menuBtn = "";


    /*  CALCUL */
    var tempsEcouler = Application.gameplay.showTimer.getCurrentTime();

    var feliTitle = game.add.text(x + 50, y + 50 , "Félicitations :)", style);
    var feliTxt = game.add.text(x + 50, y + 90 , congratsTxt, style);
    var feliTime = game.add.text(x + 50, y + 130 , infosTime + tempsEcouler, style);

	var lvl = "";
	if(Application.gameplay.level == 1){
		lvl = "niv 2";
	}else{
		lvl = "niv 3";
	}

    var retourAccueil = this.game.add.text(x+width-130, y+height-50 , lvl , style);
    retourAccueil.inputEnabled = true;
    retourAccueil.events.onInputOver.add(nextLevel, this);

	if(Application.gameplay.level == 2){
		graphics.fixedToCamera = true;
		retourAccueil.fixedToCamera = true;
		feliTitle.fixedToCamera = true;
		feliTxt.fixedToCamera = true;
		feliTime.fixedToCamera = true;
	}
}

function nextLevel(){
	if(Application.gameplay.level == 1){
		game.state.start('Level2');
	}else{
		game.state.start('Level');
	}

}