var Application = {
	config:{
		width:1000,
		height:900
	},
	debugMode:false,
	gameplay:{
		itemNbr:2,//nombre d'item a collecter
		playerVisibleSensor:true, //acitve ou non les sens du chien
		playerSensorAlpha:.5,
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
