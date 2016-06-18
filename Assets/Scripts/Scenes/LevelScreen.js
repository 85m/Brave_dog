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
		//game.debug.geom(playerRing[ playerRing.length-1 ].circleData,'rgba(255,0,0,.2)');
	}
}


/*var outerCircleRadius = 50.0;
//in create:
outerCircleTween = game.add.tween(outerCircleRadius);
outerCircleTween.to(50, 100, Phaser.Easing.Linear.None);
outerCircleTween.start();
//in update:
outerCircleGraphics.clear();
outerCircleGraphics.drawCircle(400, 450, outerCircleRadius);
outerCircleGraphics.endFill();*/

//this.burstCircle = new Phaser.Circle(0, 0, 0);
//this.burstRing = game.add.graphics(0, 0);
////Update loop:
//this.burstCircle.radius = this.burstRadius / 2;
//this.burstRadius+= 3;
//this.burstRing.clear();
//this.burstRing.lineStyle(64, 0xffffff);
//this.burstRing.drawCircle(this.burstOrigin.x, this.burstOrigin.y, this.burstRadius);