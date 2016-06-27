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
        game.load.tilemap('map', 'Assets/Graphics/Map/Map2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('000', 'Assets/Graphics/Map/Tile/000.png');
        game.load.image('001', 'Assets/Graphics/Map/Tile/001.png');
        game.load.image('002', 'Assets/Graphics/Map/Tile/002.png');
        game.load.image('003', 'Assets/Graphics/Map/Tile/003.png');
        game.load.image('004', 'Assets/Graphics/Map/Tile/004.png');
        game.load.image('005', 'Assets/Graphics/Map/Tile/005.png');
        game.load.image('006', 'Assets/Graphics/Map/Tile/006.png');
        game.load.image('007', 'Assets/Graphics/Map/Tile/007.png');
        game.load.image('008', 'Assets/Graphics/Map/Tile/008.png');
        game.load.image('009', 'Assets/Graphics/Map/Tile/009.jpg');
        game.load.image('010', 'Assets/Graphics/Map/Tile/010.png');
        
        /* PLAYER  */
        //this.load.image('player', 'Assets/Graphics/Player/player.jpg');
        this.load.spritesheet('player', 'Assets/Graphics/Player/dog.png',40,40,12);

        /* GUI*/
        this.load.spritesheet('heart', 'Assets/Graphics/GUI/heart.png',32,32,2);

        /* MISSING  */
        this.load.image('missing', 'Assets/Graphics/Missing/missing.jpg');
		
		/* MISSING ITEMS GOOD/BAD  */
		this.load.image('book', 'Assets/Graphics/Items/book.jpg');
		this.load.image('bBook', 'Assets/Graphics/Items/bBook.jpg');



		/* AUDIO  */
		this.game.load.audio('happy', ['Assets/audio/Dog-happy.mp3', 'Assets/audio/Dog-happy.ogg']);
		this.game.load.audio('nohappy','Assets/audio/Dog-nohappy.ogg');
		this.game.load.audio('heartbeat', ['Assets/audio/heartbeat.mp3', 'Assets/audio/heartbeat.ogg']);
		this.game.load.audio('heartstop', ['Assets/audio/heartbeat-stop.mp3', 'Assets/audio/heartbeat-stop.ogg']);
		this.game.load.audio('lose', 'Assets/audio/Dog-lose.ogg');

		/* TEST  */

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