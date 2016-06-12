console.log("init");
var game = new Phaser.Game(1600, 900, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});


var upKey;
var downKey;
var leftKey;
var rightKey;

var FrameArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
var scaleFactor = 5;

var charRect
var ring

var flair;
var player;
var circleRay = 100;

var wall;

var speed = 200;