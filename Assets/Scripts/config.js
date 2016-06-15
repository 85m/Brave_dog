var Application = {
	config:{
		width:1000,
		height:900
	},
	debugMode:true,
	gameplay:{
		itemNbr:1,//nombre d'item a collecter
		playerActiveScent:true, //acitve ou non les sens du chien
		scentAlpha:.3, //alpha du sens
		colliderGroup:{
			environmentColGroup:null,
			playerColGroup:null,
			objectColGroup:null
		}
	}
}