let functionInput = [
	0, 1, 2, 1, 0, 0 /* а = 0, б = 1, в = 2 */
];

//questions indexes decrement needed
let functionResult = {result: {
	A: { //factor
		count: 20, //sum
		level: "low", //"high"
		diff: 0.5 //difference with average value
	}
	/*...
	Q4: { ... }
	 */
}};

/*
let test = require('../../tests/TeenageKettel/test');
let res = test.func([0,0,1,0,0,0,1,1,2,0,0,0,0,2,0,1,1,0,1,0,0,0,1,0,1,0,0,1,1,2,1,2,1,1,0,1,1,1,1,1,0,1,0,0,1,1,0,0,1,1,0,2,2,1,0,0,0,1,1,0,1,0,1,1,0,0,1,0,0,0,1,1,1,0,0,1,1,0,0,0,2,0,1,1,1,0,0,0,0,1,0,2,1,1,0,0,0,0,0,1,1,1,1,0,1,2,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,1,1,0,2,0,1,1,0,0,1,0,0,0,1,1,0,0,0,0,1,2], {age: 18, gender: 'M'});

console.log(res);
*/
