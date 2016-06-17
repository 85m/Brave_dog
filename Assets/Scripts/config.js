var Application = {
	config:{
		width:1000,
		height:900
	},
	debugMode:false,
	gameplay:{
		itemNbr:2,//nombre d'item a collecter
		playerVisibleScent:true, //acitve ou non les sens du chien
		timerVisible:true,
		scentAlpha:.4, //alpha du sens
		objectVisible:true,
		colliderGroup:{
			environmentColGroup:null,
			playerColGroup:null,
			missingColGroup:null,
			objectColGroup:null
		}
	},
	gameData:{
		items:null,//store object for overlap
		missing:null,
		layers:1,
		malus:null
	}
}

var playerRing = [];

/* FOR TEST */
var objectPosTest = [{x:100,y:100},{x:200,y:800},{x:900,y:700}];
