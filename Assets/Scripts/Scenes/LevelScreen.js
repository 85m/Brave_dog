Application.LevelScreen = function(){
	console.log("Starting My Game");
}

var ply;
var _self;

Application.LevelScreen.prototype = {
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

		this.itemGroups = itemGroups(this.game);

		// this.missing 	= Missing(this.game,900,100);
		//this.itemGroups.add(this.missing);

		Application.gameData.items 	= this.itemGroups;

	    ply = this.player = Player(this.game,300,600);

		//Application.gameplay.timer = new Timer(Phaser.Timer.MINUTE*3,false,gameOverScreen,this.game);
		//Application.gameplay.timer = new Timer(Phaser.Timer.SECOND*15,false,this.gameOverScreen,this.game);

		Application.Audio.heart_beat = this.game.add.audio('heartbeat');
		Application.Audio.heart_stop = this.game.add.audio('heartstop');
		Application.Audio.heart_beat.loop = true;
		Application.Audio.heart_stop.loop = false;
		
	},
	gameOverScreen:function(){
		_self.state.start('GameOver');
	},
	update:function(){
		//var upd = Application.gameplay.timer.Update();
		//launchSound(upd);

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