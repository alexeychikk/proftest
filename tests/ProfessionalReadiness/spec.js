let functionInput = [ // a = 2, б = 1, в = 0
    {
        skill: 1,
        attitude: 2,
        desire: 0
    }
    //...
];

let functionResult = {
    columnsSums: [ // sums by columns
        {
            skill: 10,
            attitude: 20,
            desire: 25
        }
        //... length = 5
    ],
    likes: [0, 2, 4, 3, 1] //indexes of likes, sorted by priority
};

//let answers = [
//    {skill: 1, attitude: 0, desire: 0},
//    {skill: 1, attitude: 2, desire: 1},
//    {skill: 0, attitude: 0, desire: 0},
//    {skill: 0, attitude: 1, desire: 0},
//    {skill: 1, attitude: 1, desire: 0},
//    {skill: 1, attitude: 1, desire: 0},
//    {skill: 1, attitude: 1, desire: 1},
//    {skill: 0, attitude: 0, desire: 0},
//    {skill: 0, attitude: 1, desire: 0},
//    {skill: 1, attitude: 1, desire: 1},
//    {skill: 0, attitude: 0, desire: 0},
//    {skill: 2, attitude: 2, desire: 1},
//    {skill: 0, attitude: 0, desire: 0},
//    {skill: 0, attitude: 1, desire: 1},
//    {skill: 1, attitude: 1, desire: 2},
//    {skill: 0, attitude: 0, desire: 0},
//    {skill: 2, attitude: 2, desire: 2},
//    {skill: 0, attitude: 1, desire: 0},
//    {skill: 0, attitude: 1, desire: 0},
//    {skill: 2, attitude: 1, desire: 1},
//    {skill: 1, attitude: 1, desire: 1},
//    {skill: 1, attitude: 2, desire: 1},
//    {skill: 0, attitude: 1, desire: 1},
//    {skill: 0, attitude: 0, desire: 0},
//    {skill: 2, attitude: 2, desire: 1},
//    {skill: 2, attitude: 2, desire: 2},
//    {skill: 2, attitude: 2, desire: 1},
//    {skill: 0, attitude: 0, desire: 0},
//    {skill: 0, attitude: 0, desire: 0},
//    {skill: 1, attitude: 1, desire: 1},
//    {skill: 1, attitude: 2, desire: 1},
//    {skill: 1, attitude: 2, desire: 1},
//    {skill: 0, attitude: 0, desire: 0},
//    {skill: 1, attitude: 1, desire: 1},
//    {skill: 1, attitude: 2, desire: 1},
//    {skill: 2, attitude: 1, desire: 1},
//    {skill: 1, attitude: 2, desire: 1},
//    {skill: 1, attitude: 1, desire: 1},
//    {skill: 0, attitude: 1, desire: 1},
//    {skill: 1, attitude: 1, desire: 0},
//    {skill: 2, attitude: 2, desire: 2},
//    {skill: 1, attitude: 1, desire: 1},
//    {skill: 0, attitude: 1, desire: 0},
//    {skill: 0, attitude: 1, desire: 0},
//    {skill: 1, attitude: 1, desire: 0},
//    {skill: 1, attitude: 0, desire: 0},
//    {skill: 2, attitude: 2, desire: 2},
//    {skill: 0, attitude: 0, desire: 0},
//    {skill: 0, attitude: 1, desire: 1},
//    {skill: 1, attitude: 1, desire: 0}
//];