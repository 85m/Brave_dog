Application.LoadingScreen = function(){
	console.log("Starting My Game");
}

Application.LoadingScreen.prototype = {
	preload: function() {
		console.log("Preload LoadingScreen");
        this.load.image("technobel_logo","Assets/Graphics/Preload/logo_technobel.png");
        this.load.image("loading","Assets/Graphics/Preload/preloader-bar.png");

		this.load.image('player', 'Assets/Graphics/Player/player.jpg');
		this.load.image('book', 'Assets/Graphics/Items/book.jpg');
		this.load.image('missing', 'Assets/Graphics/Missing/missing.jpg');

		this.load.image('bunny', 'Assets/Graphics/Map/bunny.png');
		this.load.image('contra2', 'Assets/Graphics/Map/contra2.png');
		this.load.physics('physicsData', 'Assets/Graphics/Map/sprites.json');

		this.game.load.audio('happy', ['Assets/audio/Dog-happy.mp3', 'Assets/audio/Dog-happy.ogg']);
		this.game.load.audio('heartbeat', ['Assets/audio/heartbeat.mp3', 'Assets/audio/heartbeat.ogg']);
		this.game.load.audio('heartstop', ['Assets/audio/heartbeat-stop.mp3', 'Assets/audio/heartbeat-stop.ogg']);

		this.game.load.audio('lose', 'Assets/audio/Dog-lose.ogg');

	},
	create:function(){
		console.log("Create LoadingScreen");
		var image = this.add.image(Application.config.width / 2, Application.config.height / 2, 'technobel_logo');
		image.anchor.setTo(0.5,0.5);

		var _self = this;
		setTimeout(function () {	
			_self.state.start("Title");
		}, 1000)
	}
}