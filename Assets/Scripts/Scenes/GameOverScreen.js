Application.GameOverScreen = function(){
	console.log("Starting My Game");
}


Application.GameOverScreen.prototype = {
	create:function(){
		console.log("Create GameOverScreen");

		Application.Audio.heart_beat.isPlaying = true;
		Application.Audio.heart_beat.stop();

		ply.audios.looseGame.volume = .1;
		ply.audios.looseGame.play();

	},
	update:function(){

	},
	render:function(){
		this.game.debug.text('Gamer Over', 100, 32);
	}
}
