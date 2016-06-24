Application.SettingScreen = function(){
    console.log("Starting My Game");
}

var TimerStatus,SensorStatus;

Application.SettingScreen.prototype = {
    preload: function() {
        console.log("Preload SettingScreen");
    },
    create:function(){
        console.log("Create SettingScreen");
        var centerX = this.game.world.centerX;
        var centerY = this.game.world.centerY;

        //use google font after
        var style = { font: "20px Verdana", fill: "#ffffff",boundsAlignH: "center", boundsAlignV: "middle" };

        /* TITLE */
        this.game.add.text(centerX-200, centerY , "Sensor", style);
        this.game.add.text(centerX-200, centerY+50 , "Timer", style);

        SensorStatus = this.game.add.text(centerX+150, centerY , "", style);
        TimerStatus = this.game.add.text(centerX+150, centerY+50 , "", style);

        var s = Application.gameplay.settings.sensorBoolean === 'true' ? "YES" : "NO";
        var t = Application.gameplay.settings.timerBoolean === 'true' ? "YES" : "NO";
        SensorStatus.setText(s);
        TimerStatus.setText(t);


        SensorStatus.inputEnabled = true;
        SensorStatus.events.onInputOver.add(changeSensorStatus, this);
        TimerStatus.inputEnabled = true;
        TimerStatus.events.onInputOver.add(changeTimerStatus, this);

        var accept 		= this.game.add.text(centerX-50, Application.config.height-100 , "Appliquer", style);
        accept.inputEnabled = true;
        accept.events.onInputOver.add(returnTitle, this);
    }
}

function returnTitle(){
    this.state.start('Title');
}
function changeSensorStatus(){
    Application.gameplay.settings.sensorBoolean = !Application.gameplay.settings.sensorBoolean;
    var val = Application.gameplay.settings.sensorBoolean ? "YES" : "NO";
    SensorStatus.setText(val);
    PlayerPrefs.Save('sensorStatus',Application.gameplay.settings.sensorBoolean);
}

function changeTimerStatus(){
    Application.gameplay.settings.timerBoolean = !Application.gameplay.settings.timerBoolean;
    var val = Application.gameplay.settings.timerBoolean ? "YES" : "NO";
    TimerStatus.setText(val);
    PlayerPrefs.Save('timerStatus',Application.gameplay.settings.timerBoolean);
}
