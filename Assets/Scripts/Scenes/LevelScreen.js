Application.LevelScreen = function(){
	console.log("Starting My Game");
}

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

		Application.gameData.items 	= itemGroups(this.game);

	    this.player = Player(this.game,400,400);

	    this.missing = Missing(this.game,900,100);
	},
	update:function(){
		this.player.update();
		scentCollision(this.game);
	},
	render:function(){
		game.debug.geom(playerRing[0].circleData,'rgba(255,0,0,.2)');
	}
}


