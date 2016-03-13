let functionInput = {
	interests: [ //category
		[5, 8 /* selected variants keys */], //block index
		[6],
		//...
		[7, 4, 9]
	],
	skills: [
		[5, 8],
		[6],
		//...
		[7, 4, 9]
	]
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
	"result": [{index: 2, count: 4}, {index: 0, count: 3} /*... professions indexes, sorted by priority */]
};

/*
let profChoice = require('../../tests/ProfessionChoice/test').func.toString();

profChoice = eval(profChoice);

let res = profChoice({
	interests: [
		[2], [1], [6], [], [], [],
		[2], [5], [2, 8], [1], [], [],
		[], [6], [5], [8, 7], [8], [6],
		[2], [1], [2, 7], [], [], []
	],
	skills: [
		[], [3, 6], [7], [], [], [8],
		[4], [9], [6], [1], [9], [6],
		[3], [4], [], [5], [], [],
		[5], [1], [], [], [], []
	]
});*/
