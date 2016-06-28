function Dialogue(_content){

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
        contentGutter : this.fontSize * 1.2
    }

    this.txt = "";

    this.update = function(){
        this.box();
        this.launch();
        this.displayTxt();
    }
    this.launch = function(){
        if (this.spacebar.isDown){
            if(!this.alreadyDown){
                this.alreadyDown = true;
                //_content[ this.idx].txt;
                console.log( _content[ this.idx].txt );
                this.idx++;
            }
        }else{
            this.alreadyDown = false;
        }
    }

    this.box = function(){
            var graphics = game.add.graphics(0, 0);

            // draw a rectangle
            graphics.beginFill(0x333333, 1);
            graphics.lineStyle(2, 0xFF0000 , 1);
            graphics.drawRect(this.dialogData.x, this.dialogData.y, this.dialogData.w, this.dialogData.h);
            graphics.endFill();
    }

    this.displayTxt = function(){

        var style = { font: this.dialogData.fontSize+"px Verdana", fill: "#ffffff",boundsAlignH: "center", boundsAlignV: "middle" };
        if(this.idx < _content.length){

            console.log(this.dialogData.y)


            this.txt = game.add.text(
                this.dialogData.x + this.dialogData.boxGutter,
                this.dialogData.y,
                _content[ this.idx].txt,
                style
            );
        }
    }

    return this;
}