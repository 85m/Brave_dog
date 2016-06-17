Application.SettingScreen = function(){
    console.log("Starting My Game");
}

var timerBoolean,sensorBoolean,TimerStatus,SensorStatus;

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

        timerBoolean = PlayerPrefs.Load("timerStatus");
        sensorBoolean = PlayerPrefs.Load("sensorStatus");

        this.game.add.text(centerX-200, centerY , "Timer", style);
        this.game.add.text(centerX-200, centerY+50 , "Sensor", style);

        TimerStatus = this.game.add.text(centerX+150, centerY , "Yes", style);
        SensorStatus = this.game.add.text(centerX+150, centerY+50 , "Yes", style);

        TimerStatus.inputEnabled = true;
        TimerStatus.events.onInputOver.add(changeTimerStatus, this);

        SensorStatus.inputEnabled = true;
        SensorStatus.events.onInputOver.add(changeSensorStatus, this);

        var accept 		= this.game.add.text(centerX-50, Application.config.height-100 , "Appliquez", style);
        accept.inputEnabled = true;
        accept.events.onInputOver.add(returnTitle, this);
    }
}

function returnTitle(){
    this.state.start('Title');
}


function changeTimerStatus(){
    timerBoolean = !timerBoolean;
    var val = timerBoolean ? "Yes" : "No";
    TimerStatus.setText(val);
    PlayerPrefs.Save('timerStatus',timerBoolean);

}

function changeSensorStatus(){
    sensorBoolean = !sensorBoolean;
    var val = sensorBoolean ? "Yes" : "No";
    SensorStatus.setText(val);
    PlayerPrefs.Save('sensorStatus',sensorBoolean);
}
