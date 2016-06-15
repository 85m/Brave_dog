var scentArray = [
    {name:'longScent',diameter:240,color:0xFFF000},
    //{name:'midScent',diameter:160,color:0x00FF00},
    //{name:'closeScent',diameter:80,color:0xFF0000}
]


function Scent(_game,_object,cpt){
    if(_object.name != "player"){
        var _self = _game.add.graphics(0,0);
        _self.name = _object.name+'_'+scentArray[cpt].name;
        _self.circleData = new Phaser.Circle(_object.x,_object.y,scentArray[cpt].diameter);
        _self.beginFill(scentArray[cpt].color, Application.gameplay.scentAlpha);
        _self.drawCircle(-_object.x,-_object.y,scentArray[cpt].diameter);
        _self.endFill();
        _game.physics.p2.enable([ _self ], false);
        _self.body.x = _object.x;
        _self.body.y = _object.y;
        _self.body.static = true;
        _self.body.immovable = true;
        _self.body.debug = true;

    }else{
        var _self = _game.add.graphics(_object.x, _object.y);
        _self.name = _object.name+'_'+scentArray[cpt].name;
        _self.circleData = new Phaser.Circle(_object.x,_object.y,scentArray[cpt].diameter);
        _self.beginFill(scentArray[cpt].color, Application.gameplay.scentAlpha);
        _self.drawCircle(0,0,scentArray[cpt].diameter);
        _self.endFill();
        _game.physics.p2.enable([ _self ], false);
        //_self.body.static = true;
        _self.body.debug = true;
    }
    return _self;
}


function layerScent(_game,_object){
    var _self;
    for (var y = 0; y < scentArray.length; y++) {
        _self = Scent(_game,_object,y);
        if(_object.name != "player"){
            _object.addChild(_self);
        }   
    }
    return _object;
}


/* APPLY FOR SCENT OF PLAYER*/
function updatePlayerScent(_player){

var subX,subY;

    var info1 = {
        px:_player.x,
        py:_player.y,
        pbx:_player.body.x,
        pby:_player.body.y
    }
        var info2 = {
        gx:_player.children[0].x,
        gy:_player.children[0].y,
        gbx:_player.children[0].body.x,
        gby:_player.children[0].body.y
    }

    subX = _player.x - _player.children[0].body.x;
    subY = _player.y - _player.children[0].body.y;

    _player.children[0].x =_player.x + subX;
    _player.children[0].y =_player.y;
    _player.children[0].body.x =_player.body.x + subX;
    _player.children[0].body.y =_player.body.y;



    console.log(info1);
    console.log(info2);
    console.log(subX);
    console.log(subY);
    console.log('---------------------------------------------');
}


