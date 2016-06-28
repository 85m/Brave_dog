function textBox(_info){
    var x,y;
    if(_info.boxed){
        var graphics = game.add.graphics(0, 0);
        var width = _info.w;
        var height = _info.h;
        if(_info.centered){
            x = Application.config.width/2 - width/2;
            y = Application.config.height/2 - height/2;
        }else{
            x =  _info.x;
            y =  _info.y;
        }
        var boxGutter = 20;
        var contentGutter = _info.fontSize * 1.2;

        // draw a rectangle
        graphics.beginFill(_info.bgColor, 1);
        graphics.lineStyle(2, _info.borderColor, 1);
        graphics.drawRect(x, y, width, height);
        graphics.endFill();
    }

    var style = { font: _info.fontSize+"px Verdana", fill: "#ffffff",boundsAlignH: "center", boundsAlignV: "middle" };

    for (var i= 0 ; i < _info.content.length ; i++){
        y = y+contentGutter;
        game.add.text(x+boxGutter, y+ contentGutter*i, _info.content[i].txt, style);
    }
}