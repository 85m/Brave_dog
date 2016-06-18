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

        var s = Application.settings.sensorBoolean === 'true' ? "YES" : "NO";
        var t = Application.settings.timerBoolean === 'true' ? "YES" : "NO";
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
    Application.settings.sensorBoolean = !Application.settings.sensorBoolean;
    var val = Application.settings.sensorBoolean ? "YES" : "NO";
    SensorStatus.setText(val);
    PlayerPrefs.Save('sensorStatus',Application.settings.sensorBoolean);
}

function changeTimerStatus(){
    Application.settings.timerBoolean = !Application.settings.timerBoolean;
    var val = Application.settings.timerBoolean ? "YES" : "NO";
    TimerStatus.setText(val);
    PlayerPrefs.Save('timerStatus',Application.settings.timerBoolean);

}
