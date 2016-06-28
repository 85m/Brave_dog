var Application = {
	config:{
		//width:window.innerWidth,
		//height:window.innerHeight
		width:800,
		height:800
	},
	debugMode:false,
	gameplay:{
		items:5,//number of items in game
		data:null,//store :item, missing and all
		gameTimer:10,//minute
		malusTimer:5,//Seconde
		settings:{
			sensorBoolean:PlayerPrefs.Load("sensorStatus"),
			timerBoolean:PlayerPrefs.Load("timerStatus")
		},
		playerVisibleSensor:true,
		timerVisible:true,
		colliderGroup:{
			environmentColGroup:null,
			playerColGroup:null,
			missingColGroup:null,
			objectColGroup:null
		},
		audio:{
			heartbeat:null
		}
	},
	PlayerConf:{
		normalSpeed:120,
		runSpeed:450
	},
	ItemsConf:{ alpha:1},
	SensorConf:{
		player:{
			layers:1,//actif layers in begin of game
			sensors:
			[
			{name:'closeSensor'	,diameter:100,color:0xFF0000},
			{name:'midSensor'	,diameter:160,color:0x00FF00},
			{name:'nv1Sensor'	,diameter:220,color:0xFFF000},
			{name:'nv2Sensor'	,diameter:280,color:0x0000FF},
			{name:'nv3Sensor'	,diameter:340,color:0xFF00FF}
			],
			sensorsAlpha:0,
			layersAlpha:0,
			feedBackColor:0x61b2cd,//feedBack color
			feedBackAlpha:.5
		},
		items:{
			layer:{name:'objSensor',diameter:220,color:0xFF6D34},
			feedBackAlpha:.5,
			visible:false
		}
	}
}

/* FOR TEST */
var objectPosTest = [{x:100,y:100},{x:200,y:800},{x:900,y:700}];

//create empty sprite and put it en group
//calcul = tile (32x32) * position + offset
var offsetX = 32;
var offsetY = 16;
var collideTile =[
//wood
{x:0+offsetX,y:320+offsetY,w:64,h:32},
{x:160+offsetX,y:288+offsetY,w:64,h:32},
{x:192+offsetX,y:320+offsetY,w:64,h:32},
{x:256+offsetX,y:320+offsetY,w:64,h:32},
//grand three
{x:64+offsetX,y:384+offsetY,w:64,h:32},
{x:576+offsetX,y:384+offsetY,w:64,h:32},
//small three
{x:320+offsetY,y:384+offsetY,w:32,h:32},
{x:544+offsetY,y:640+offsetY,w:32,h:32},
//forest border
{x:(0*32)+offsetY,y:(8*32)+offsetY,w:32,h:32},
{x:(1*32)+offsetX,y:(8*32)+offsetY,w:64,h:32},
{x:(3*32)+offsetX,y:(7*32)+offsetY,w:64,h:32},
{x:(3*32)+offsetX,y:(6*32)+offsetY,w:32,h:32},
{x:(5*32)+offsetX,y:(5*32)+offsetY,w:64,h:32},
{x:(15*32)+offsetX,y:(6*32)+offsetY,w:64*9,h:32},
{x:(12*32)+offsetX,y:(7*32)+offsetY,w:64,h:32},
{x:(22*32)+offsetX,y:(7*32)+offsetY,w:64,h:32},
//hole
{x:(6*32)+offsetY,y:(13*32)+offsetY,w:32*2,h:32*2},
{x:(8*32)+offsetY,y:(20.5*32)+offsetY,w:32*2,h:32*5},
{x:(20.5*32)+offsetY,y:(8.5*32)+offsetY,w:32*3,h:32*1.5},
//little hole
{x:(2.9*32)+offsetX,y:(22.5*32)+offsetY,w:32*1.5,h:32*2},
{x:(12.5*32)+offsetX,y:(23.5*32)+offsetY,w:32 ,h:32*2},
{x:(13.5*32)+offsetX,y:(21.5*32)+offsetY,w:32 ,h:32*2},
{x:(22.5*32)+offsetX,y:(22.5*32)+offsetY,w:32 ,h:32*2}
];


var goodItem = [
	{name:'bomberman',	x:784,y:291,w:16,h:16,type:'good'},
	{name:'book',		x:270,y:779,w:16,h:16,type:'good'},
	{name:'glass',		x:469,y:241,w:16,h:16,type:'good'},
	{name:'hat',		x:354,y:369,w:16,h:16,type:'good'},
	{name:'shave',		x:232,y:303,w:16,h:16,type:'good'}
]



window.addEventListener('click', getCoordonne);

function getCoordonne(e){
	console.log('x:'+e.clientX ,',y:'+e.clientY);
}