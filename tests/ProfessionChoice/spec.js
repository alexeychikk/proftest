let functionInput = {
	'0': { //category index
		'0': [5, 8 /* selected variants keys */], //block index
		'1': [6],
		//...
		'23': [7, 4, 9]
	},
	'1': {
		'0': [5, 8],
		'1': [6],
		//...
		'23': [7, 4, 9]
	}
};

let functionResult = {
	"interests": { //minimum 2 keys
		"2": 3,
		"7": 10
	},
	"skills": { //minimum 2 keys
		"5": 4,
		"8": 7
	},
	"result": [2, 0, 3 /*... professions indexes, sorted by priority */]
};
