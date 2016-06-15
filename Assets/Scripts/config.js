var Application = {
	config:{
		width:1000,
		height:900
	},
	debugMode:false,
	gameplay:{
		itemNbr:3,//nombre d'item a collecter
		playerVisibleScent:true, //acitve ou non les sens du chien
		timerVisible:true,
		scentAlpha:.5, //alpha du sens
		colliderGroup:{
			environmentColGroup:null,
			playerColGroup:null,
			missingColGroup:null,
			objectColGroup:null
		}
	},
	gameData:{
		items:null//store object for overlap
	}
}

var playerRing = [];