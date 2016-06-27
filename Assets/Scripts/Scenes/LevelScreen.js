Application.LevelScreen = function(){
	console.log("Starting My Game");
}

var ply;


Application.LevelScreen.prototype = {
	preload:function(){
		this.player = null;
		this.itemGroups = null;
		this.missing = null;
	},
	create:function(){

		console.log("Create LevelScreen");
	    this.game.physics.startSystem(Phaser.Physics.P2JS);
	    this.game.physics.p2.setImpactEvents(true);
	    this.game.physics.p2.updateBoundsCollisionGroup();

		environmentColGroup = game.physics.p2.createCollisionGroup();
		playerColGroup = game.physics.p2.createCollisionGroup();
		missingColGroup = game.physics.p2.createCollisionGroup();
		objectColGroup = game.physics.p2.createCollisionGroup();

		/*  BACKGROUND */
/*		b = this.bg = this.game.add.tileSprite(1024/2, 768/2, 1024,768, 'bg');
		this.game.physics.p2.enable([ this.bg ], true);
		this.bg.body.static = true;
		this.bg.body.clearShapes();
		this.bg.body.loadPolygon('bgPhysicsData', 'bg');
		this.bg.body.setCollisionGroup(environmentColGroup);
		this.bg.body.collides([environmentColGroup,playerColGroup]);*/

		this.bg1 = this.game.add.tileSprite(0, 0, 1024,768, 'bg1');


		/*   ITEMS */
		this.itemGroups = new itemGroups();

		/* THE MISSING IS A PART OF ITEMS GROUP */
		this.missing 	= new Missing(500,600);
		this.itemGroups.add(this.missing);

		Application.gameplay.data = this.itemGroups;

		/* THE PLAYER */
		ply = this.player = new Player(300,600);

		Application.gameplay.audio.heartbeat = game.add.audio('heartbeat');
		Application.gameplay.audio.heartbeat.volume = 1;
		Application.gameplay.audio.heartbeat.isPlaying = true;
		Application.gameplay.audio.heartbeat.loop = true;
		Application.gameplay.audio.heartbeat.play();
		//console.log(this.heartbeat);

		this.heart = game.add.sprite(50,10,'heart');
		var beat = this.heart.animations.add('beat');
		this.heart.animations.play('beat',2,true);

		/* THE TIMER */
		//this.gameTimer = new Timer(Phaser.Timer.MINUTE*Application.gameplay.gameTimer,false,this.gameOverScreen,this.game);
		//this.gameTimer = new Timer(Phaser.Timer.SECOND*Application.gameplay.gameTimer,false,this.gameOverScreen,this.game);


		//INFO
		var style = { font: "20px Verdana", fill: "#ffffff",boundsAlignH: "center", boundsAlignV: "middle" };
		game.add.text(Application.config.width - 200, Application.config.height - 100 , "X : Creuser", style);
		game.add.text(Application.config.width - 200, Application.config.height - 125 , "A : Loot", style);
		
	},
	update:function(){
		this.player.sensorColSensorItem();
		this.player.overlapItem();

		if(this.player.malusTimer != null){
			this.player.malusTimer.Update();
		}
		//this.gameTimer.Update();
		
	},
	render:function(){

		//this.game.debug.text('Time : ' + this.gameTimer.Display() , 100, 32);
		
		/* inutile d'affiché l'item - */
		//this.game.debug.text('Item : ' + Application.gameData.items.length , 480, 32);
		
		/*
		* Afficher timer
		* Afficher nombre d'objet a rammasser
		* afficher le disparu
		*
		*
		* */

		//game.debug.soundInfo(Application.gameplay.audio.heartbeat, 20, 32);

		//game.debug.geom(playerRing[0].circleData,'rgba(255,0,0,.2)');
		//game.debug.geom(playerRing[ playerRing.length-1 ].circleData,'rgba(255,0,0,.2)');
	},
	gameOverScreen:function(){
		console.log(Application.gameplay.audio.heartbeat)
		Application.gameplay.audio.heartbeat.isPlaying = true;
		Application.gameplay.audio.heartbeat.stop();
		//console.log(this);
		//this.heartbeat.isPlaying = true;
		//this.heartbeat.stop();
		game.state.start('GameOver');
	},
}