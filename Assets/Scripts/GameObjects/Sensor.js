//SENSOR FOR ITEM
function addSensorToItem(_item){
    var _self           = game.add.graphics(0,0);
    _self.name          = _item.name+'_'+Application.SensorConf.items.layer.name;
    _self.circleData    = new Phaser.Circle(_item.x, _item.y, Application.SensorConf.items.layer.diameter );

    _self.beginFill(
        Application.SensorConf.items.layer.color,
        Application.SensorConf.items.feedBackAlpha
    );
    _self.drawCircle(-_item.x,-_item.y,Application.SensorConf.items.layer.diameter);
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
    _self.name              = _player.name+'_'+Application.SensorConf.player.sensors[ _player.sensor.length ].name;
    _self.circleData        = new Phaser.Circle(_player.x,_player.y,Application.SensorConf.player.sensors[ _player.sensor.length ].diameter);

    _self.beginFill(
        Application.SensorConf.player.sensors[ _player.sensor.length ].color,
        Application.SensorConf.player.sensorsAlpha
    );
    _self.drawCircle(0,0,Application.SensorConf.player.sensors[ _player.sensor.length ].diameter);
    _self.endFill();

    game.physics.p2.enable( _self , false);
    _self.body.static = true;
    _self.body.debug = Application.debugMode;

    _player.sensor.push(_self);
    playerFeedBackSensor(_player);
}


function playerFeedBackSensor(_player){
    var _self           = game.add.graphics(_player.x, _player.y);
    _self.name          = _player.name+'_feedback';

    var currentDiameter = _player.sensor[ _player.sensor.length-1 ].circleData.diameter;
    _self.circleData = new Phaser.Circle(_player.x,_player.y,currentDiameter);

    _self.beginFill(
        Application.SensorConf.player.feedBackColor,
        Application.SensorConf.player.feedBackAlpha
    );
    _self.drawCircle(0,0,currentDiameter);
    _self.endFill();

    game.physics.p2.enable(_self, false);
    _self.body.static = true;
    _self.body.setCircle( _player.sensor[ _player.sensor.length-1 ].circleData.radius  );
    //_self.body.debug = true;
    _player.sensor.push(_self);
}