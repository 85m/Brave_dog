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

		//game.stage.backgroundColor = "#000";
		game.add.image(0,0,'bgTitle');

		if(Application.gameplay.audio.ambiant != null){
			Application.gameplay.audio.ambiant.stop();
		}

		/* LOGO BRAVE DOG */
		var image = this.add.image(Application.config.width / 2, Application.config.height / 2, 'logoBraveDog');
		image.anchor.setTo(0.5,0.5);

		/* Button */
		this.button1 = game.add.image(centerX-75, Application.config.height-150,'button');
		this.button2 = game.add.image(centerX-75, Application.config.height-190,'button');
		this.button1.anchor.set(0);
		this.button2.anchor.set(0);


		//use google font after
		var style = { font: "20px Verdana", fill: "#e13700",boundsAlignH: "center", boundsAlignV: "middle" };


/*		var settings 	= this.game.add.text(centerX, Application.config.height-190 , "Settings", style);
		settings.inputEnabled = true;
		settings.events.onInputOver.add(startSetting, this);*/

		var command 	= this.game.add.text(centerX, Application.config.height-133 , "COMMAND", style);
		command.inputEnabled = true;
		command.events.onInputOver.add(startTuto, this);

		var start 		= this.game.add.text(centerX, Application.config.height-173 , "JOUER", style);
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