console.log("init");
var game = new Phaser.Game(
    Application.config.width, 
    Application.config.height,
    Phaser.AUTO,
    'phaser-example'
);

if(Application.gameplay.settings.sensorBoolean == undefined){ PlayerPrefs.Save('sensorStatus',true); }
if(Application.gameplay.settings.timerBoolean == undefined){ PlayerPrefs.Save('timerStatus',true); }

game.state.add('Loading',Application.LoadingScreen);
game.state.add('Title',Application.TitleScreen);
game.state.add('Tutorial',Application.TutorialScreen);
game.state.add('Setting',Application.SettingScreen);
game.state.add('Level',Application.LevelScreen);
game.state.add('GameOver',Application.GameOverScreen);


game.state.start("Loading");