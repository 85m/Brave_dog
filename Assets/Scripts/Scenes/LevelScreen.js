Application.LevelScreen = function(){
	console.log("Starting My Game");
}

var ply;
var _self;
var bg;
Application.LevelScreen.prototype = {
	preload:function(){
		_self = null;
		this.player = null;
		this.itemGroups = null;
		this.missing = null;
	},
	create:function(){

		_self = this;
		console.log("Create LevelScreen");
	    this.game.physics.startSystem(Phaser.Physics.P2JS);
	    this.game.physics.p2.setImpactEvents(true);
	    this.game.physics.p2.updateBoundsCollisionGroup();

		environmentColGroup  	= game.physics.p2.createCollisionGroup();
		playerColGroup        	= game.physics.p2.createCollisionGroup();
		missingColGroup        	= game.physics.p2.createCollisionGroup();
		objectColGroup        	= game.physics.p2.createCollisionGroup();

		/*  BACKGROUND */
/*		b = this.bg = this.game.add.tileSprite(1024/2, 768/2, 1024,768, 'bg');
		this.game.physics.p2.enable([ this.bg ], true);
		this.bg.body.static = true;
		this.bg.body.clearShapes();
		this.bg.body.loadPolygon('bgPhysicsData', 'bg');
		this.bg.body.setCollisionGroup(environmentColGroup);
		this.bg.body.collides([environmentColGroup,playerColGroup]);*/


		/*   ITEMS */
		this.itemGroups = new itemGroups(this.game);

		/* THE MISSING IS A PART OF ITEMS GROUP */
		this.missing 	= new Missing(this.game,500,600);
		this.itemGroups.add(this.missing);

		Application.gameData.items 	= this.itemGroups;

		/* THE PLAYER */
		ply = this.player = new Player(this.game,300,600);
		console.log(this.player);

		/* THE TIMER */
		//Application.gameplay.timer = new Timer(Phaser.Timer.MINUTE*3,false,gameOverScreen,this.game);
		//Application.gameplay.timer = new Timer(Phaser.Timer.SECOND*15,false,this.gameOverScreen,this.game);

		Application.Audio.heart_beat = this.game.add.audio('heartbeat');
		Application.Audio.heart_stop = this.game.add.audio('heartstop');
		Application.Audio.heart_beat.loop = true;
		Application.Audio.heart_stop.loop = false;

		//INFO
		var style = { font: "20px Verdana", fill: "#ffffff",boundsAlignH: "center", boundsAlignV: "middle" };
		game.add.text(Application.config.width - 200, Application.config.height - 100 , "X : Creuser", style);
		game.add.text(Application.config.width - 200, Application.config.height - 125 , "A : Loot", style);
		
	},
	gameOverScreen:function(){
		_self.state.start('GameOver');
	},
	update:function(){
		//var upd = Application.gameplay.timer.Update();
		//launchSound(upd);

		if(Application.gameplay.timer != null){
			Application.gameplay.timer.Update();
		}
		

		sensorCollisionWithObject(this.game);
		playerOverlapObject(this.player);
	},
	render:function(){

		//this.game.debug.text('Time : ' + Application.gameplay.timer.Display() , 100, 32);
		
		/* inutile d'affiché l'item - */
		//this.game.debug.text('Item : ' + Application.gameData.items.length , 480, 32);
		
		/*
		* Afficher timer
		* Afficher nombre d'objet a rammasser
		* afficher le disparu
		*
		*
		* */

		//game.debug.geom(playerRing[0].circleData,'rgba(255,0,0,.2)');
		//game.debug.geom(playerRing[ playerRing.length-1 ].circleData,'rgba(255,0,0,.2)');
	}
}

var c = 0, a = 0;
function launchSound(tm){
	if(tm < 21){
		if(c == 0){
			//console.log('test');
			Application.Audio.heart_beat.play();
			c++;
		}
	}
}



function malus(){
	if(sensorTimer == 0){
		malusActif = false;
		Application.gameplay.playerSensor.currentState = Application.gameplay.playerSensor.default;
		sensorTimer++;
	}
}