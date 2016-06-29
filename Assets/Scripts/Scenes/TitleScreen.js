Application.TitleScreen = function(){
	console.log("Starting My Game");
}

Application.TitleScreen.prototype = {
	preload: function() {
		console.log("Preload TitleScreen");
	},
	create:function(){
		console.log("Create TitleScreen");
		var centerX = this.game.world.centerX;
		var centerY = this.game.world.centerY;

		game.stage.backgroundColor = "#000";

		if(Application.gameplay.audio.ambiant != null){
			Application.gameplay.audio.ambiant.stop();
		}
		


		var image = this.add.image(Application.config.width / 2, Application.config.height / 2, 'logoBraveDog');
		image.anchor.setTo(0.5,0.5);

		//use google font after
		var style = { font: "20px Verdana", fill: "#E13700",boundsAlignH: "center", boundsAlignV: "middle" };


/*		var settings 	= this.game.add.text(centerX, Application.config.height-190 , "Settings", style);
		settings.inputEnabled = true;
		settings.events.onInputOver.add(startSetting, this);*/

		var command 	= this.game.add.text(centerX, Application.config.height-150 , "Command", style);
		command.inputEnabled = true;
		command.events.onInputOver.add(startTuto, this);

		var start 		= this.game.add.text(centerX, Application.config.height-190 , "Start", style);
		start.inputEnabled = true;
		start.events.onInputOver.add(startGame, this);

		//settings.setTextBounds(0, 0, 0, 0);
		command.setTextBounds(0, 0, 0, 0);
		start.setTextBounds(0, 0, 0, 0);
	}
}

function startTuto(){
	this.state.start('Tutorial');
}

function startGame(){
	this.state.start('Level');
}

/*function startSetting(){
	this.state.start('Setting');
}*/