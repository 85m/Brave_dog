var Application = {
	config:{
		width:window.innerWidth,
		height:window.innerHeight
	},
	debugMode:false,
	gameplay:{
		itemNbr:2,//nombre d'item a collecter
		playerVisibleSensor:true, //acitve ou non les sens du chien
		playerFSensorAlpha:.5,
		playerFColor:0x61b2cd,
		timerVisible:true,
		debugSensorAlpha:.4, //alpha du sens
		objectVisible:true,
		colliderGroup:{
			environmentColGroup:null,
			playerColGroup:null,
			missingColGroup:null,
			objectColGroup:null
		}
	},
	gameData:{
		items:1,//store object for overlap
		missing:1,
		layers:1,
		malus:null
	},
	settings:{
		sensorBoolean:PlayerPrefs.Load("sensorStatus"),
		timerBoolean:PlayerPrefs.Load("timerStatus")
	}
}


var playerRing = [];

/* FOR TEST */
var objectPosTest = [{x:100,y:100},{x:200,y:800},{x:900,y:700}];
