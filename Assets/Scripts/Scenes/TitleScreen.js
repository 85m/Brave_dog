Application.TitleScreen = function(){
	console.log("Starting My Game");
}

Application.TitleScreen.prototype = {
	preload: function() {
		console.log("Preload TitleScreen");

		/*RESET ALL*/
		Application.gameData.items = null;
		Application.gameData.timer = null;
		c = a = 0;
		cpt = 0;
	},
	create:function(){
		console.log("Create TitleScreen");
		var centerX = this.game.world.centerX;
		var centerY = this.game.world.centerY;

		//use google font after
		var style = { font: "20px Verdana", fill: "#ff1105",boundsAlignH: "center", boundsAlignV: "middle" };


		var settings 	= this.game.add.text(centerX, Application.config.height-150 , "Settings", style);
		settings.inputEnabled = true;
		settings.events.onInputOver.add(startSetting, this);

		var tutorial 	= this.game.add.text(centerX, Application.config.height-190 , "Tutorial", style);
		tutorial.inputEnabled = true;
		tutorial.events.onInputOver.add(startTuto, this);

		var start 		= this.game.add.text(centerX, Application.config.height-230 , "Start", style);
		start.inputEnabled = true;
		start.events.onInputOver.add(startGame, this);

		settings.setTextBounds(0, 0, 0, 0);
		tutorial.setTextBounds(0, 0, 0, 0);
		start.setTextBounds(0, 0, 0, 0);
	}
}

function startTuto(){
	this.state.start('Tutorial');
}

function startGame(){
	this.state.start('Level');
}

function startSetting(){
	this.state.start('Setting');
}