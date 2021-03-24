// Load the full lodash build
// Note use of _ naming convention. It is followed in the docs!
const _ = require('lodash');

// JS way to get random number
const jsRandom = Math.floor(Math.random()*100 + 1);

// Using the _ utility library
const loRandom = _.random(1,100);

// Concatenation: another example of simplifying behavior
const combinedArr = [1,2,3] + [4,5]; // returns the STRING 1 2 34 5
const loCombined = _.concat([1,2,3], [4,5]);


console.log(combinedArr);
console.log(loCombined)

// try using `nodemon index.js` to live-reload and rerun on save