Application.LevelScreen = function(){
	console.log("Starting My Game");
}

var ply;
var layerwood;
var test;
var tiles;

Application.LevelScreen.prototype = {
	preload:function(){
		this.player = null;
		this.itemGroups = null;
		this.missing = null;
	},
	create:function(){

		console.log("Create LevelScreen");
		Application.gameplay.level = 1;


	    this.game.physics.startSystem(Phaser.Physics.P2JS);
	    this.game.physics.p2.setImpactEvents(true);
	    this.game.physics.p2.updateBoundsCollisionGroup();

		environmentColGroup = game.physics.p2.createCollisionGroup();
		playerColGroup = game.physics.p2.createCollisionGroup();
		missingColGroup = game.physics.p2.createCollisionGroup();
		objectColGroup = game.physics.p2.createCollisionGroup();

		/*  BACKGROUND */
		this.map = game.add.tilemap('map');
		this.map.addTilesetImage('000');
		this.map.addTilesetImage('001');
		this.map.addTilesetImage('002');
		this.map.addTilesetImage('003');
		this.map.addTilesetImage('004');
		this.map.addTilesetImage('005');
		this.map.addTilesetImage('007');
		this.map.addTilesetImage('008');


		this.layer = this.map.createLayer('grass');
		this.layer = this.map.createLayer('base');
		this.layer = this.map.createLayer('tile');
		this.layer = this.map.createLayer('uptile');
		this.layer = this.map.createLayer('hole');
		this.layer = this.map.createLayer('garbage1');
		this.layer = this.map.createLayer('garbage2');
		this.layer = this.map.createLayer('garbage3');
		this.layer = this.map.createLayer('garbage4');
		this.layer = this.map.createLayer('wood');
		this.layer = this.map.createLayer('downthree');

		/* ********** */
		Application.gameplay.holes = game.add.group();
		/*   ITEMS */
		this.itemGroups = new itemGroups();
		/* THE MISSING IS A PART OF ITEMS GROUP */
		this.missing 	= new Missing(45,520);
		this.itemGroups.add(this.missing);
		Application.gameplay.data = this.itemGroups;
		/* THE PLAYER */
		this.player = new Player(750,500);
		/* ********** */

		this.layer = this.map.createLayer('upthree');
		this.map.setCollisionBetween(0,5000);
		game.physics.p2.convertTilemap(this.map, this.layerwood);

		this.tiles = game.add.group();
		this.tiles.enableBody = true;
		this.tiles.physicsBodyType = Phaser.Physics.P2JS;

		for(var i=0 ; i < collideTile.length ; i++){
			var t = this.tiles.create(collideTile[i].x, collideTile[i].y, null);
			t.anchor.set(0);
			t.body.setRectangle(collideTile[i].w, collideTile[i].h, 0, 0, 0);
			t.body.static = true;
			t.body.setCollisionGroup(environmentColGroup);
			t.body.collides([environmentColGroup,playerColGroup]);
			t.body.debug = false;
		}

		this.alreadyDown = false;
		this.spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


		//CREDIT TO FF7 - Anxious Heart
		if(!Application.gameplay.audio.ambiantPlayed){
			Application.gameplay.audio.ambiant = game.add.audio('ambiant');
			Application.gameplay.audio.ambiant.volume = .2;
				Application.gameplay.audio.ambiant.play();
				Application.gameplay.audio.ambiantPlayed = true;
			}

		/* THE TIMER */
		Application.gameplay.showTimer = new Timer(Phaser.Timer.MINUTE*Application.gameplay.gameTimer,false,this.gameOverScreen,this.game);
		//Application.gameplay.showTimer = new Timer(Phaser.Timer.SECOND*5,false,this.gameOverScreen,this.game);
		this.guiTimer = game.add.image(50,10,'timerbg');
		this.textTimer = game.add.text(73, 14,Application.gameplay.showTimer.Display(), { font: "20px Verdana", fill: "#FFFFFF",boundsAlignH: "center", boundsAlignV: "middle" });


		//TEST TEXT
		this.content = [
				{txt:"Secouriste Dexter, on nous a signalé qu'un accident a eu lieu ici.\nUne personne est portée disparue et qu'il ou elle est blessé(e).\n\nTa mission est de le retrouver mais attention car chaque seconde compte."},
				{txt:"Pour cela tu peux faire confiance à ton incroyable flair\n(qui est représenté ici par un cercle bleu).\n\nTu peux utiliser ton flair pour retrouver des objets appartenant aux disparu,\nte permettant d'élargir ton flair facilitant ta recherche,"},
				{txt:"aussi, certain objet peuvent te nuire (le cercle disparait un certain temps)\nou alors rechercher directement le disparu."},
				{txt:"Bonne chance à toi Dexter, et rapelle toi, chaque seconde compte."}
		]


		if(Application.tuto == "false"){
			this.dial = new Dialogue(this.content);
			Application.gameplay.canPlay = false;
		}else{
			Application.gameplay.canPlay = true;
		}
		
	},
	update:function(){
		this.player.sensorColSensorItem();
		this.player.overlapItem();

		if(this.player.malusTimer != null){
			this.player.malusTimer.Update();
		}

		//MANAGE DIALOGUE
		if(Application.tuto == "false"){
			if (this.spacebarKey.isDown){
	            if(!this.alreadyDown){
	                this.alreadyDown = true;
	                this.dial.NextDialogue();
	            }
	        }else{
	            this.alreadyDown = false;
	        }
	    }

        //MANAGE TIMER
        if(Application.gameplay.canPlay){
        	Application.gameplay.showTimer.Update();
        }
	},
	render:function(){
		//Display updated timer
		this.textTimer.setText(  Application.gameplay.showTimer.Display()   );
	},
	gameOverScreen:function(){
		//console.log(Application.gameplay.audio.heartbeat)
		//Application.gameplay.audio.heartbeat.isPlaying = true;
		//Application.gameplay.audio.heartbeat.stop();
		//console.log(this);
		//this.heartbeat.isPlaying = true;
		//this.heartbeat.stop();
		game.state.start('GameOver');
	},
}