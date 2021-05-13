// Loads in the array with all entry objects. Also include functions file.
const dataset = require("./dataset.js");
const dsFunctions = require("./dataset-functions.js");
let objectArray = dataset.objectArray;

// Question 5: What street has the most activity?
console.log("What street has the most activity?");

// Create object to hold our counters.
let streets = {};

// Loop through each entry object...
for (let i = 0; i < objectArray.length; i++) {

    // Get the values of the streets from the entry object.
    let entry = objectArray[i];
    let streetArray = entry["Intersection"].split("\\");
    // Run a function for each array element, remove spaces around street name, and puts it back into the array.
    streetArray = streetArray.map(function (street) {
        return dsFunctions.stripSpace(street);
    });

    // Loop through each element in the streetArray...
    for (let i = 0; i < streetArray.length; i++) {

        // Rename array entry as current street.
        let street = streetArray[i];

        // Check if the street is empty  or if it has UNNAMED, if it does, skip it.
        if (street === "" || street.includes("UNNAMED")) {
            continue;
        }

        // Check if the streets object has the street in it...
        if (streets.hasOwnProperty(street)) {
            // ...If it does, add a 1 to current count.
            streets[street] += 1;
        } else {
            // ...Otherwise create the property and assign a 1.
            streets[street] = 1;
        }
    }
}

// Hold the highest number value for a street.
let highestStreetCount = 0;
let highestStreetName;

// Go through each street in the street counter object...
for (let street in streets) {

    // If the current street value higher than the highest count...
    if (streets[street] > highestStreetCount) {
        // ...Then replace it
        highestStreetCount = streets[street];
        highestStreetName = street;
    }
}

// Display results.
console.log(`The street with the most police activity is ${highestStreetName} with a total of ${highestStreetCount} incidents.`);

// Question 5: END