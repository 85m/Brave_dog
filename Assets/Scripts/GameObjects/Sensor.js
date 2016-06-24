var playerSensorArray = [
    {name:'closeSensor',diameter:100,color:0xFF0000},
    {name:'midSensor',diameter:160,color:0x00FF00},
    {name:'nv1Sensor',diameter:220,color:0xFFF000},
    {name:'nv2Sensor',diameter:280,color:0x0000FF},
    {name:'nv3Sensor',diameter:340,color:0xFF00FF}
]

var itemSensor = {name:'objSensor',diameter:220,color:0xFF6D34};

//SENSOR FOR ITEM
function addSensorToItem(_item){
    var _self           = game.add.graphics(0,0);
    _self.name          = _item.name+'_'+itemSensor.name;
    _self.circleData    = new Phaser.Circle(_item.x, _item.y, itemSensor.diameter );

    _self.beginFill(itemSensor.color, Application.gameplay.debugSensorAlpha);
    _self.drawCircle(-_item.x,-_item.y,itemSensor.diameter);
    _self.endFill();

    game.physics.p2.enable(_self, false);
    _self.body.x            = _item.x;
    _self.body.y            = _item.y;
    _self.body.static       = true;
    _self.body.immovable    = true;
    _self.body.debug        = Application.debugMode;

    _item.addChild(_self);
    return _item;
}

//SENSOR FOR PLAYER
function addLayerstoPlayer(_player){
    //avoid the first pop => closesensor + feedback
    if(_player.sensor.length > 0){
        //remove shape each time feedback added else the shape remain
        _player.sensor[ _player.sensor.length-1 ].kill();
        _player.sensor.pop();
    }
    var _self               = game.add.graphics(_player.x, _player.y);
    _self.name              = _player.name+'_'+playerSensorArray[ _player.sensor.length ].name;
    _self.circleData        = new Phaser.Circle(_player.x,_player.y,playerSensorArray[ _player.sensor.length ].diameter);

    _self.beginFill(playerSensorArray[ _player.sensor.length ].color, Application.gameplay.debugSensorAlpha);
    _self.drawCircle(0,0,playerSensorArray[ _player.sensor.length ].diameter);
    _self.endFill();

    game.physics.p2.enable( _self , false);
    _self.body.static = true;
    _self.body.debug = Application.debugMode

    _player.sensor.push(_self);
    playerFeedBackSensor(_player);
}


function playerFeedBackSensor(_player){
    var _self           = game.add.graphics(_player.x, _player.y);
    _self.name          = _player.name+'_feedback';

    var currentDiameter = _player.sensor[ _player.sensor.length-1 ].circleData.diameter;
    _self.circleData = new Phaser.Circle(_player.x,_player.y,currentDiameter);

    _self.beginFill(Application.gameplay.playerFColor, Application.gameplay.playerFSensorAlpha );
    _self.drawCircle(0,0,currentDiameter);
    _self.endFill();

    game.physics.p2.enable(_self, false);
    _self.body.static = true;
    _self.body.setCircle( _player.sensor[ _player.sensor.length-1 ].circleData.radius  );
    //_self.body.debug = true;
    _player.sensor.push(_self);
}

/* APPLY FOR SENSOR OF PLAYER*/
function moveUpdatePlayerSensor(_player){
    if(_player.sensor.length > 0){
        for (var i = 0; i < _player.sensor.length; i++) {
            _player.sensor[i].body.x = _player.body.x;
            _player.sensor[i].body.y = _player.body.y;
            _player.sensor[i].circleData.x = _player.body.x;
            _player.sensor[i].circleData.y = _player.body.y;
        }
        _player.sensor[_player.sensor.length-1].body.x = _player.x;
        _player.sensor[_player.sensor.length-1].body.y = _player.y;
        _player.sensor[_player.sensor.length-1].circleData.x = _player.x;
        _player.sensor[_player.sensor.length-1].circleData.y = _player.y;
    }
}


