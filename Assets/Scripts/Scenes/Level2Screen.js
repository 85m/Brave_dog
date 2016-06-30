Application.Level2Screen = function(){
    console.log("Starting My Game");
}

Application.Level2Screen.prototype = {
    preload:function(){
        this.player = null;
        this.itemGroups = null;
        this.missing = null;
    },
    create:function(){

        console.log("Create Level2Screen");
        Application.gameplay.level = 2;

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.updateBoundsCollisionGroup();

        environmentColGroup = game.physics.p2.createCollisionGroup();
        playerColGroup = game.physics.p2.createCollisionGroup();
        missingColGroup = game.physics.p2.createCollisionGroup();
        objectColGroup = game.physics.p2.createCollisionGroup();

        /*  BACKGROUND */
        this.map = game.add.tilemap('map2');
        this.map.addTilesetImage('000');
        this.map.addTilesetImage('001');
        this.map.addTilesetImage('002');
        this.map.addTilesetImage('003');
        this.map.addTilesetImage('004');
        this.map.addTilesetImage('005');
        this.map.addTilesetImage('007');
        this.map.addTilesetImage('008');


        this.layer = this.map.createLayer('grass1');
        this.layer = this.map.createLayer('grass2');
        this.layer = this.map.createLayer('undergound');
        this.layer = this.map.createLayer('ground');
        this.layer = this.map.createLayer('forestdown');
        this.layer = this.map.createLayer('forest');
        this.layer = this.map.createLayer('forstup');
        this.layer = this.map.createLayer('housedown');
        this.layer = this.map.createLayer('house');
        this.layer = this.map.createLayer('houseup');
        this.layer = this.map.createLayer('hole');

        /* ********** */
        Application.gameplay.holes = game.add.group();
        /*   ITEMS */
        this.itemGroups = new itemGroups();
        ///* THE MISSING IS A PART OF ITEMS GROUP */
        this.missing 	= new Missing(720,960);
        this.itemGroups.add(this.missing);
        Application.gameplay.data = this.itemGroups;
        /* THE PLAYER */
        this.player = new Player(1150,100);
        /* ********** */
        Application.gameplay.canPlay = true;


/*        this.tiles = game.add.group();
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
        }*/

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
    },
    update:function(){
        this.player.sensorColSensorItem();
        this.player.overlapItem();

        if(this.player.malusTimer != null){
            this.player.malusTimer.Update();
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