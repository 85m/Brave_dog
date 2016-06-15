console.log("init");
var game = new Phaser.Game(
    Application.config.width, 
    Application.config.height,
    Phaser.AUTO,
    'phaser-example'
);

game.state.add('Loading',Application.LoadingScreen);
game.state.add('Title',Application.TitleScreen);
game.state.add('Tutorial',Application.TutorialScreen);
game.state.add('Level',Application.LevelScreen);


game.state.start("Loading");