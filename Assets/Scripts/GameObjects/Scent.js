/*var scentArray = [
    {name:'closeScent',diameter:100,color:0xFF0000},
    {name:'midScent',diameter:160,color:0x00FF00},
    {name:'nv1Scent',diameter:220,color:0xFFF000},
    {name:'nv2Scent',diameter:280,color:0x0000FF},
    {name:'nv3gScent',diameter:340,color:0xFF00FF}
]*/

var scentArray = [
    {name:'nv1Scent',diameter:220,color:0xFFF000},
    {name:'midScent',diameter:160,color:0x00FF00},
    {name:'closeScent',diameter:100,color:0xFF0000}
]


/*
name : name du cercle du flair
circleData : cercle de la meme taille de celui dessiné pour gerer la collision avec celui du player
 ** dessine le cercle
ajout de la physics
*/
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
    }else{
        var _self = _game.add.graphics(_object.x, _object.y);
        _self.name = _object.name+'_'+scentArray[cpt].name;
        _self.circleData = new Phaser.Circle(_object.x,_object.y,scentArray[cpt].diameter);
        _self.beginFill(scentArray[cpt].color, Application.gameplay.scentAlpha);
        _self.drawCircle(0,0,scentArray[cpt].diameter);
        _self.endFill();
        _game.physics.p2.enable([ _self ], false);
        _self.body.static = true;
    }
    _self.body.debug = Application.debugMode;
    return _self;
}


function layerScent(_game,_object){
    var _self;
    for (var y = 0; y < scentArray.length; y++) {
        _self = Scent(_game,_object,y);
        if(_object.name != "player"){
            _object.addChild(_self);
        }else{
            playerRing.push(_self);
        }
    }
    return _object;
}



function playerFeedBackScent(_game,_object){
    var _self = _game.add.graphics(_object.x, _object.y);
    _self.name = _object.name+'_feedback';
    //_self.circleData = new Phaser.Circle(_object.x,_object.y,scentArray[cpt].diameter);
    _self.beginFill(0x0000FF, 1);
    _self.drawCircle(0,0,scentArray[0].diameter);
    _self.endFill();
    _game.physics.p2.enable([ _self ], false);
    _self.body.static = true;
    playerRing.push(_self);
}

/* APPLY FOR SCENT OF PLAYER*/
function moveUpdatePlayerScent(_player){
    for (var i = 0; i < scentArray.length; i++) {
        playerRing[i].body.x = _player.body.x;
        playerRing[i].body.y = _player.body.y;
    }
    playerRing[0].circleData.x = _player.body.x;
    playerRing[0].circleData.y = _player.body.y;
}


