function dialogue(_content){
    var _self = this;

    _self.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

    _self.update = function()
    {
        _self.NextDialogue();
    };


    _self.NextDialogue = function()
    {
        if ( _self.spacebar.isDown){
            console.log('text');
        }
    };

    return _self;


}