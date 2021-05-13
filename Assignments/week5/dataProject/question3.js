// Loads in the array with all entry objects.
const dataset = require("./dataset.js");
let objectArray = dataset.objectArray;

// QUESTION 3: Which neighborhood is the most active and least active? Supervisor district? (with and without supplements)
console.log("Which neighborhood is the most active and least active? Supervisor district?");

// Create objects to hold our results for neighborhood and district.
let resultsQuestion3 = {};
let resultsQuestion3District = {};

// Go through each entry object...
for (let i = 0; i < objectArray.length; i++) {

    // ... Store each entry object into the variable entry.
    let entry = objectArray[i];

    // Check if the results object has that neighborhood as a property.
    if (resultsQuestion3.hasOwnProperty(entry['Analysis Neighborhood'])) {

        // If it does, add a 1 to the value of that neighborhood property.
        var neighborhood = entry['Analysis Neighborhood'];
        resultsQuestion3[neighborhood] += 1;
    } else {
        // If it doesn't, assign it a 1.
        resultsQuestion3[entry['Analysis Neighborhood']] = 1;
    }

    // Just as the neighorhood code above, do the same for district.
    if (resultsQuestion3District.hasOwnProperty(entry['Supervisor District'])) {
        resultsQuestion3District[entry['Supervisor District']] += 1;
    } else {
        resultsQuestion3District[entry['Supervisor District']] = 1;
    }
}

// Track the highest neighborhood count.
let highestNeighborhoodCount = 0;
let highestNeighborhoodName;

// For each neighborhood...
for (let neighborhood in resultsQuestion3) {

    // ... Check if the current neighborhood has a higher count than then highest count....
    if (resultsQuestion3[neighborhood] > highestNeighborhoodCount) {
        // If it does, replace the highest count with the current neighborhood count.
        highestNeighborhoodCount = resultsQuestion3[neighborhood];
        highestNeighborhoodName = neighborhood;
    }
}

// Track the highest values for district.
let highestDistrict = 0;
let highestDistrictName;

// For each district...
for (let district in resultsQuestion3District) {

    //... Check if the current district has a higher count than the current highest count...
    if (resultsQuestion3District[district] > highestDistrict) {
        // If it does, then replace the current highest count with the current neighborhood count.
        highestDistrict = resultsQuestion3District[district];
        highestDistrictName = district;
    }
}

// Display results.
console.log(`The neighborhood with the highest activity is ${highestNeighborhoodName} with ${highestNeighborhoodCount} entries.`);
console.log(`The district with the highest activity is ${highestDistrictName} with ${highestDistrict} entries.`);

// QUESTION 3: END