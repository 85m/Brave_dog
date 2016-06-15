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

		this.load.image('bunny', 'Assets/Graphics/Map/bunny.png');
		this.load.image('contra2', 'Assets/Graphics/Map/contra2.png');
		this.load.physics('physicsData', 'Assets/Graphics/Map/sprites.json');

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