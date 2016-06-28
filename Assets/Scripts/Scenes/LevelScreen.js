Application.LevelScreen = function(){
	console.log("Starting My Game");
}

var ply;
var layerwood;
var test;
var tiles;

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
		this.map = game.add.tilemap('map');
		this.map.addTilesetImage('000');
		this.map.addTilesetImage('001');
		this.map.addTilesetImage('002');
		this.map.addTilesetImage('003');
		this.map.addTilesetImage('004');
		this.map.addTilesetImage('005');
		this.map.addTilesetImage('007');
		this.map.addTilesetImage('008');


		this.layer = this.map.createLayer('grass');
		this.layer = this.map.createLayer('base');
		this.layer = this.map.createLayer('tile');
		this.layer = this.map.createLayer('uptile');
		this.layer = this.map.createLayer('hole');
		this.layer = this.map.createLayer('garbage1');
		this.layer = this.map.createLayer('garbage2');
		this.layer = this.map.createLayer('garbage3');
		this.layer = this.map.createLayer('garbage4');
		this.layer = this.map.createLayer('wood');
		this.layer = this.map.createLayer('downthree');

		/* THE PLAYER */
		this.player = new Player(750,400);

		this.layer = this.map.createLayer('upthree');

		this.map.setCollisionBetween(0,5000);
		game.physics.p2.convertTilemap(this.map, this.layerwood);

		/*   ITEMS */
		this.itemGroups = new itemGroups();

		/* THE MISSING IS A PART OF ITEMS GROUP */
		this.missing 	= new Missing(23,520);
		this.itemGroups.add(this.missing);

		Application.gameplay.data = this.itemGroups;

		this.tiles = game.add.group();
		this.tiles.enableBody = true;
		this.tiles.physicsBodyType = Phaser.Physics.P2JS;

		for(var i=0 ; i < collideTile.length ; i++){
			var t = this.tiles.create(collideTile[i].x, collideTile[i].y, null);
			t.anchor.set(0);
			t.body.setRectangle(collideTile[i].w, collideTile[i].h, 0, 0, 0);
			t.body.static = true;
			t.body.setCollisionGroup(environmentColGroup);
			t.body.collides([environmentColGroup,playerColGroup]);
			t.body.debug = false;
		}

		// Application.gameplay.audio.heartbeat = game.add.audio('heartbeat');
		// Application.gameplay.audio.heartbeat.volume = 1;
		// Application.gameplay.audio.heartbeat.isPlaying = true;
		// Application.gameplay.audio.heartbeat.loop = true;
		// Application.gameplay.audio.heartbeat.play();
		//console.log(this.heartbeat);

		//this.heart = game.add.sprite(50,10,'heart');
		//var beat = this.heart.animations.add('beat');
		//this.heart.animations.play('beat',2,true);

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
		//console.log(Application.gameplay.audio.heartbeat)
		//Application.gameplay.audio.heartbeat.isPlaying = true;
		//Application.gameplay.audio.heartbeat.stop();
		//console.log(this);
		//this.heartbeat.isPlaying = true;
		//this.heartbeat.stop();
		game.state.start('GameOver');
	},
}