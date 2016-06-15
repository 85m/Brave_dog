Application.LevelScreen = function(){
	console.log("Starting My Game");
}

var test;


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

	    test = this.player;
	    console.log(test);
	    //this.items = Item(this.game,10,100);

	    this.items = itemGroups(this.game);

	},
	update:function(){
		this.player.update();
	},
	render:function(){
		game.debug.spriteInfo(test, 32, 32);
	}
}