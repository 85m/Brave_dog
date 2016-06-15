Application.SettingScreen = function(){
    console.log("Starting My Game");
}

Application.SettingScreen.prototype = {
    preload: function() {
        console.log("Preload SettingScreen");

    },
    create:function(){
        console.log("Create SettingScreen");
        var centerX = this.game.world.centerX;
        var centerY = this.game.world.centerY;

        //use google font after
        var style = { font: "20px Verdana", fill: "#ff1105",boundsAlignH: "center", boundsAlignV: "middle" };

        var accept 		= this.game.add.text(centerX, Application.config.height-100 , "Appliquez", style);
        accept.inputEnabled = true;
        accept.events.onInputOver.add(returnTitle, this);
    }
}

function returnTitle(){
    this.state.start('Title');
}