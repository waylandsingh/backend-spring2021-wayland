// Loads in the array with all entry objects.
const dataset = require("./dataset.js");
let objectArray = dataset.objectArray;

// QUESTION 1: What is the most common and least common type of incident that are open/active.
// NOTE: ignore any non-active/open entries, ignore any that have "Supplement" in their Report Type Description.

console.log("What is the most common and least common type of incident that are open/active?");

/*
Example of how our resultsObject object should look like.
{
    open/active:
        {
            battery: 193
            missing adult: 9
        }
}

*/

// object to hold all counts.
let resultsObject = {};

// Used for skipping any objects with the word Supplement in it.
let supplementRegex = /[sS]upplement/m;

// Go through each object...
for (let i = 0; i < objectArray.length; i++) {

    // rename current object to variable.
    let entryObject = objectArray[i];

    //... Check if the object has the word Supplement in it...
    if (supplementRegex.test(entryObject['Report Type Description'])) {
        //... if it does, skip to next object.
        continue;
    }

    // Renaming current object values to variables
    let resolutionName = entryObject['Resolution'];
    let subcategoryName = entryObject['Incident Category'];

    // Check if there is an object that represents a Resolution...
    if (resultsObject.hasOwnProperty(resolutionName)) {

        //... If it does, check if it that Resolution object has a property of the current object's subcategory...
        if (resultsObject[resolutionName].hasOwnProperty(subcategoryName)) {
            //... If subcategory property does exist, add a 1 to it.
            resultsObject[resolutionName][subcategoryName] += 1;
        } else {
            //... If subcategory property does NOT exist, assign it a 1.
            resultsObject[resolutionName][subcategoryName] = 1;
        }

    } else {
        //... If there is not Resolution object by that name, then create an object for it.
        resultsObject[resolutionName] = {};
        // And also create a property for this object with the current object's subcategory and assign a 1.
        resultsObject[resolutionName][subcategoryName] = 1;
    }
}

// Go through each object in our results.
for (let resolution in resultsObject) {

    // Counter for highest and lowest value of each Resolution.
    let openHighest = 0;
    let openHighestName = "";
    let openLowest = null;
    let openLowestName = ""

    // Display titles for each Resolution in capital letters.
    console.log("\n" + resolution.toUpperCase());

    // go through each Resolution...
    for (let count in resultsObject[resolution]) {

        // Grab the tally count of the resolution.
        let tally = resultsObject[resolution][count];

        // ...Set the first entry as the lowest...
        if (openLowest === null) {
            openLowest = tally;
            openLowestName = count;
        }

        // ...Check if the current tally is lower than the current lowest.
        if (tally < openLowest) {
            openLowest = tally;
            openLowestName = count;
        }

        // ...Check if the current tally is higher than the current highest.
        if (tally > openHighest) {
            openHighest = tally;
            openHighestName = count;
        }

    }

    // Display results.
    console.log("The highest is: ", openHighestName, ": ", openHighest);
    console.log("The lowest is: ", openLowestName, ": ", openLowest);


    // Display highest and lowest if there are multiple counts that match the current highest and lowest.
    for (let count in resultsObject[resolution]) {

        // Grab the count of the current resolution
        let tally = resultsObject[resolution][count];

        // See if the value is the same as the current highest.
        if (openHighest === tally && openHighestName !== count) {
            // Display the additional resolution that matches the highest count resolution.
            console.log("Also the highest is: ", count, ": ", tally);
        }
        // See if the value is the same as the current lowest.
        if (openLowest === tally && openLowestName !== count) {
            // Display the additional resolution that matches the lowest count resolution.
            console.log("Also the lowest is: ", count, ": ", tally);
        }
    }
}


// QUESTION 1: END