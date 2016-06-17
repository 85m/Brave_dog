Application.LevelScreen = function(){
	console.log("Starting My Game");
}

var ply;

Application.LevelScreen.prototype = {
	create:function(){
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
	},
	update:function(){
		//this.player.update();
		scentCollisionWithObject(this.game);
	},
	render:function(){
		//game.debug.geom(playerRing[0].circleData,'rgba(255,0,0,.2)');
	}
}


