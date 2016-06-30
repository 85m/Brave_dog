function Dialogue(_content){

    var _self = this;
    this.idx = 0;
    this.alreadyDown = false;
    this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.dialogData = {
        x:50,
        y:600,
        w:Application.config.width - 100,
        h:150,
        boxGutter:20,
        fontSize:15,
        contentGutter:function() {return this.fontSize * 1.2;}
    }

    //INIT BOX AND TEXT
    this.graphics = game.add.graphics(0, 0);
    var style = { font: this.dialogData.fontSize+"px Verdana", fill: "#ffffff",boundsAlignH: "center", boundsAlignV: "middle" };
    _self.txt = game.add.text( this.dialogData.x + this.dialogData.boxGutter,
                this.dialogData.y + this.dialogData.contentGutter(),
                _content[ this.idx ].txt ,
                style);
    this.dialNext = game.add.image(Application.config.width-70,Application.config.height-70,'dialogueNext');


    this.NextDialogue = function(){
        if(this.idx < _content.length-1){
            this.idx++;
            _self.displayTxt();
        }else{
            this.graphics.destroy();
            this.txt.destroy();
            Application.gameplay.canPlay = true;
            PlayerPrefs.Save('tutoShowed',true);
        }
    }

    this.box = function(){
        // draw a rectangle
        _self.graphics.clear();
        _self.graphics.beginFill(0x333333, 1);
        _self.graphics.lineStyle(2, 0xFFFFFF , 1);
        _self.graphics.drawRect(_self.dialogData.x, _self.dialogData.y, _self.dialogData.w, _self.dialogData.h);
        _self.graphics.endFill();
    }

    this.displayTxt = function(){
        _self.txt.setText(_content[ this.idx].txt );
        //diplay next
        if(this.idx == _content.length-1){
            this.dialNext.destroy();
        }
    }
    this.box();

    return this;
}