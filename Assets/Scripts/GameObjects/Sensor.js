var playerSensorArray = [
    {name:'closeSensor',diameter:100,color:0xFF0000},
    {name:'midSensor',diameter:160,color:0x00FF00},
    {name:'nv1Sensor',diameter:220,color:0xFFF000},
    {name:'nv2Sensor',diameter:280,color:0x0000FF},
    {name:'nv3Sensor',diameter:340,color:0xFF00FF}
]
var itemSensor = {name:'objSensor',diameter:220,color:0xFF6D34};

function addSensorToObject(_game,_object){
    var _self           = _game.add.graphics(0,0);
    _self.name          = _object.name+'_'+itemSensor.name;
    _self.circleData    = new Phaser.Circle(_object.x, _object.y, itemSensor.diameter );

    _self.beginFill(itemSensor.color, Application.gameplay.debugSensorAlpha);
    _self.drawCircle(-_object.x,-_object.y,itemSensor.diameter);
    _self.endFill();

    _game.physics.p2.enable([ _self ], false);
    _self.body.x            = _object.x;
    _self.body.y            = _object.y;
    _self.body.static       = true;
    _self.body.immovable    = true;
    _self.body.debug        = Application.debugMode;

    _object.addChild(_self);
    return _object;
}


var layerIdx = 0;
function addLayerstoPlayer(_game,_object){
    //avoid the first pop => closesensor + feedback
    if(layerIdx > 0){
        //remove shape each time feedback added else the shape remain
        _object.sensor[ _object.sensor.length-1 ].kill();
        playerRing.pop();
    }
    var _self               = _game.add.graphics(_object.x, _object.y);
    _self.name              = _object.name+'_'+playerSensorArray[ layerIdx ].name;
    _self.circleData        = new Phaser.Circle(_object.x,_object.y,playerSensorArray[ layerIdx ].diameter);

    _self.beginFill(playerSensorArray[ layerIdx ].color, Application.gameplay.debugSensorAlpha);
    _self.drawCircle(0,0,playerSensorArray[ layerIdx ].diameter);
    _self.endFill();

    _game.physics.p2.enable([ _self ], false);
    _self.body.static = true;
    _self.body.debug = Application.debugMode;
    playerRing.push(_self);
    playerFeedBackSensor(_game,_object);
    layerIdx++;
}


function playerFeedBackSensor(_game,_object){
    var _self           = _game.add.graphics(_object.x, _object.y);
    _self.name          = _object.name+'_feedback';

    var currentDiameter = _object.sensor[ _object.sensor.length-1 ].circleData.diameter;
    _self.circleData = new Phaser.Circle(_object.x,_object.y,currentDiameter);

    _self.beginFill(Application.gameplay.playerFColor, Application.gameplay.playerFSensorAlpha );
    _self.drawCircle(0,0,currentDiameter);
    _self.endFill();

    _game.physics.p2.enable([ _self ], false);
    _self.body.static = true;
    _self.body.setCircle( _object.sensor[ _object.sensor.length-1 ].circleData.radius  );
    //_self.body.debug = true;
    playerRing.push(_self);
}

/* APPLY FOR SENSOR OF PLAYER*/
function moveUpdatePlayerSensor(_player){
    if(playerRing.length >0){
        for (var i = 0; i < Application.gameData.layers; i++) {
            playerRing[i].body.x = _player.body.x;
            playerRing[i].body.y = _player.body.y;
            playerRing[i].circleData.x = _player.body.x;
            playerRing[i].circleData.y = _player.body.y;

        }
        playerRing[playerRing.length-1].body.x = _player.x;
        playerRing[playerRing.length-1].body.y = _player.y;
        playerRing[playerRing.length-1].circleData.x = _player.x;
        playerRing[playerRing.length-1].circleData.y = _player.y;
    }
}


