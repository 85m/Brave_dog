Application.LevelScreen = function(){
	console.log("Starting My Game");
	this.items;
}

Application.LevelScreen.prototype = {
	create:function(){
		console.log("Create LevelScreen");
	    this.game.physics.startSystem(Phaser.Physics.P2JS);
	    this.game.physics.p2.setImpactEvents(true);
	    this.game.physics.p2.updateBoundsCollisionGroup();

		environmentColGroup  	= game.physics.p2.createCollisionGroup();
		playerColGroup        	= game.physics.p2.createCollisionGroup();
		objectColGroup        	= game.physics.p2.createCollisionGroup();


	    this.player = Player(this.game,400,400);
		Application.gameData.items 	= itemGroups(this.game);
	},
	update:function(){
		this.player.update();
	},
	render:function(){
		game.debug.geom(playerRing[0].circleData,'rgba(255,0,0,.2)');
	}
}


