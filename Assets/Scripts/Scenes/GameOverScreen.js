Application.GameOverScreen = function(){
	console.log("Starting My Game");
}


Application.GameOverScreen.prototype = {
	create:function(){
		console.log("Create GameOverScreen");
        var centerX = this.game.world.centerX;
        var centerY = this.game.world.centerY;
		
		Application.gameplay.audio.lose.volume = .2;
		Application.gameplay.audio.lose.play();

		var style 		= { font: "20px Verdana", fill: "#ffffff",boundsAlignH: "center", boundsAlignV: "middle" };
		var styleBtn 	= { font: "15px Verdana", fill: "#ff0000",boundsAlignH: "center", boundsAlignV: "middle" };
		var gameOverTxt = "Tu n'as pas pu sauver le disparu à temps";

		this.game.add.text(centerX-60, centerY , "Game Over", style);
		this.game.add.text(centerX/2, centerY+50 , gameOverTxt, style);


		this.button = game.add.image(centerX-74, Application.config.height-105,'button');
		var retry 		= this.game.add.text(centerX-50, Application.config.height-100 , "Recommencer", styleBtn);
        retry.inputEnabled = true;
        retry.events.onInputOver.add(retryGame, this);

	},
	update:function(){

	},
	render:function(){
	}
}


function retryGame(){
	if(Application.gameplay.level == 1){
		game.state.start('Level');
	}else{
		game.state.start('Level2');
	}
}