Application.LoadingScreen = function(){
	console.log("Starting My Game");
}

Application.LoadingScreen.prototype = {
	preload: function() {
		console.log("Preload LoadingScreen");

		/* LOGO TECHNOBEL  */
        this.load.image("technobel_logo","Assets/Graphics/Preload/logo_technobel.png");
        this.load.image("loading","Assets/Graphics/Preload/preloader-bar.png");


        /* BACKGROUND AN ENVIRONMENT  */
        this.load.image("bg","Assets/Graphics/Map/bg.jpg");
        this.game.load.physics('bgPhysicsData', 'Assets/Graphics/Map/bg.json');
        
        /* PLAYER  */
        this.load.image('player', 'Assets/Graphics/Player/player.jpg');
        //this.load.spritesheet('dog', 'Assets/Graphics/Player/dog.png',40,40,12);
        /* MISSING  */
        this.load.image('missing', 'Assets/Graphics/Missing/missing.jpg');
		
		/* MISSING ITEMS GOOD/BAD  */
		this.load.image('book', 'Assets/Graphics/Items/book.jpg');
		this.load.image('bBook', 'Assets/Graphics/Items/bBook.jpg');



		/* AUDIO  */
		this.game.load.audio('happy', ['Assets/audio/Dog-happy.mp3', 'Assets/audio/Dog-happy.ogg']);
		this.game.load.audio('heartbeat', ['Assets/audio/heartbeat.mp3', 'Assets/audio/heartbeat.ogg']);
		this.game.load.audio('heartstop', ['Assets/audio/heartbeat-stop.mp3', 'Assets/audio/heartbeat-stop.ogg']);
		this.game.load.audio('lose', 'Assets/audio/Dog-lose.ogg');

		/* TEST  */
		this.game.load.image('contra2', 'Assets/Graphics/Map/contra2.png');
		this.game.load.physics('physicsData', 'Assets/Graphics/Map/sprites.json');
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