Application.TutorialScreen = function(){
	console.log("Starting My Game");
}

Application.TutorialScreen.prototype = {
	preload: function() {
		console.log("Preload TutorialScreen");

	},
	create:function(){
		console.log("Create TutorialScreen");
		var centerX = this.game.world.centerX;
		var centerY = this.game.world.centerY;
		game.add.image(0,0,'bgTitle');


		var image = this.add.image(Application.config.width / 2, Application.config.height / 2, 'command');
		image.anchor.setTo(0.5,0.5);


		//use google font after
		var style = { font: "20px Verdana", fill: "#e13700",boundsAlignH: "center", boundsAlignV: "middle" };

		this.button		= game.add.image(Application.config.width - 170, Application.config.height-100 ,'button');
		var accept 		= this.game.add.text(Application.config.width - 135, Application.config.height-97 , "RETOUR", style);
		accept.inputEnabled = true;
		accept.events.onInputOver.add(returnTitle, this);
	}
}

function returnTitle(){
	this.state.start('Title');
}