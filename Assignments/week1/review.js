// variables - used to hold data
var fakeVariable = "Hello String";

//other variable keywords
let locallyScopedVariable = "I exist only inside the calling scope"
const immutableVariable = "I can't be modified after instantiation!"

// Datatypes int, string ('. ", ` quotes all legal, but can be different)

// Arrays and Objects
let myArray = [];
let mySecondArray = new Array(); // accepts a length parameter

// ASsign values to different places in the array using [ ]
myArray[1] = 100;
myArray[100] = 10;

// Objects
let myObject = {};
let mySecondObject = new Object(); // alt way to inst

// Comparison: == coerce and compare
//              vs === compare object equivalence (value AND datatype)

while (false) {}; // executes block while the condition true

do {} while (false); // executes once, then again while condition is true

// for loops CAN be rewritten as while (less efficient though)