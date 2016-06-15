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

		//use google font after
		var style = { font: "20px Verdana", fill: "#ff1105",boundsAlignH: "center", boundsAlignV: "middle" };

		var accept 		= this.game.add.text(Application.config.width - 100, Application.config.height-100 , "Accept", style);
		accept.inputEnabled = true;
		accept.events.onInputOver.add(returnTitle, this);
	}
}

function returnTitle(){
	this.state.start('Title');
}