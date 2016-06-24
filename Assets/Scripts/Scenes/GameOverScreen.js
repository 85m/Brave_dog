Application.GameOverScreen = function(){
	console.log("Starting My Game");
}


Application.GameOverScreen.prototype = {
	create:function(){
		console.log("Create GameOverScreen");

		
		ply.audio.looseGame.volume = .2;
		ply.audio.looseGame.play();

	},
	update:function(){

	},
	render:function(){
		this.game.debug.text('Gamer Over', 100, 32);
	}
}
