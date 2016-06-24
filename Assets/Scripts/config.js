var Application = {
	config:{
		width:window.innerWidth,
		height:window.innerHeight
	},
	debugMode:false,
	gameplay:{
		items:3,//number of items in game
		data:null,//store :item, missing and all
		gameTimer:null,
		malusTimer:5,
		settings:{
			sensorBoolean:PlayerPrefs.Load("sensorStatus"),
			timerBoolean:PlayerPrefs.Load("timerStatus")
		},
		playerVisibleSensor:true,
		timerVisible:true,
		audio:{},
		colliderGroup:{
			environmentColGroup:null,
			playerColGroup:null,
			missingColGroup:null,
			objectColGroup:null
		}
	},
	gameData:{
		items:null,//les items sont stocké ici
		missing:1,
		layers:1,
		malus:null,
		timer:null
	},
	settings:{
		sensorBoolean:PlayerPrefs.Load("sensorStatus"),
		timerBoolean:PlayerPrefs.Load("timerStatus")
	},
	Audio:{
		heart_beat:null,
		heart_stop:null
	}
}

var layerIdx = 0;
var g,s, cpt = 0;

/* FOR TEST */
var objectPosTest = [{x:100,y:100},{x:200,y:800},{x:900,y:700}];




var gameplay = {
	debugMode:false,
	items:3,//number of items in game
	data:null,//store :item, missing and all
	gameTimer:null,
	malusTimer:5,
	settings:{
		sensorBoolean:PlayerPrefs.Load("sensorStatus"),
		timerBoolean:PlayerPrefs.Load("timerStatus")
	},
	playerVisibleSensor:true,
	timerVisible:true,
	audio:{},
	colliderGroup:{
		environmentColGroup:null,
		playerColGroup:null,
		missingColGroup:null,
		objectColGroup:null
	}
}
var PlayerConf ={
		normalSpeed:120,
		runSpeed:450
};

var ItemsConf ={
	alpha:.5
};

var SensorConf ={
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
};