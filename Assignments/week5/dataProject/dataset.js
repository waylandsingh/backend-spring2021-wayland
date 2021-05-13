// imports the performance object to track how long the script takes to execute.
const {performance} = require('perf_hooks');
// Gets the time in microseconds and stores it in the variable t0 for later calculation.
let t0 = performance.now();
// Imports the fs package so we can read the dataset file.
const fs = require("fs");
// Get our function in dataset-functions.js file.
const dsFunctions = require("./dataset-functions.js");

// Our entry object holder. Here is where we put all of our converted objects for later use.
let objectArray = [];

// If the JSON exists...
if (fs.existsSync("dataset.json")) {
    // Read the JSON file
    let jsonSave = fs.readFileSync("dataset.json", "utf-8");
    // Parse it into an object.
    let convertedObject = JSON.parse(jsonSave);
    // Get the array in the object and store it in objectArray global variable.
    objectArray = convertedObject.dataset;
} else {

    // Get ENTIRE string from dataset
    let dataset = fs.readFileSync("dataset.csv", "utf-8");
    // Split the dataset string into an array so each entry is its own array element.
    let lineArray = dataset.split("\n");
    
    // Split each array element string by commas. Each string entry now becomes an array with individual elements for each piece of data of that line.
    let dataHeadings = lineArray[0].split(",");
    
    // Loop through each of the arrays in lineArray and run them through the convertEntry() function, which should return an object, and immediately pass them into objectArray.
    for (let i = 0; i < lineArray.length; i++) {
        objectArray.push(dsFunctions.convertEntry(lineArray[i], dataHeadings));
    }

    // Removes the oddballs from array.
    objectArray.pop();
    objectArray.shift();

    // Create an object so we can save it to JSON.
    let objectToSave = {
        dataset: objectArray 
    }

    // Stringify the object we just created.
    let stringToSave = JSON.stringify(objectToSave);

    // Save the JSON string to a file.
    fs.writeFileSync("dataset.json", stringToSave, "utf-8");
}

// lines to test, 45. 5002, 61000


// let stopAll = false;
// for (let i = 0; i < objectArray.length; i++) {
//     if (stopAll) {
//         break;
//     }

//     for (let e = 0; e < objectArray.length; e++) {
//         if (i === e) {
//             continue;
//         }

//         if (objectArray[i]['Incident ID'] === objectArray[e]['Incident ID']) {
//             console.log(objectArray[i], objectArray[e]);
//             console.log("FOUND DUPLICATE", i, e);
//             stopAll = true;
//             break; 
//         }
//     }
// }

// Gets the time in microseconds and stores it in the variable t1 for later calculation.
let t1 = performance.now();

// Calculate how long building objects took.
console.log(`Building Objects took ${t1 - t0} milliseconds to execute!`);

module.exports = {
    objectArray
}