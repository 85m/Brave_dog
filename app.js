console.log("init");
var game = new Phaser.Game(1000, 900, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

/*  INPUT */
var upKey;
var downKey;
var leftKey;
var rightKey;

var speed = 200;

/*  SPRITE */
var bunny, contra;



//draw circle for scent
var playerRing = [];
var itemRing = [];

/*  BOOK */
var book;

/*  PLAYER */
var player;
var playerPos = {
	x:600,
	y:700
}

var items;
var itemsNbr = 2;

/*  SCENT */
var scent; //flair
var scentArray = [
	{name:'longScent',diameter:240,color:0xFFF000},
	{name:'midScent',diameter:160,color:0x00FF00},
	{name:'closeScent',diameter:80,color:0xFF0000}
]

var scents; //array of objectScent





























//LECTURE

/*

https://www.codeandweb.com/physicseditor/tutorials/phaser-p2-physics-example-tutorial


*/