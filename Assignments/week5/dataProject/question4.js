// Loads in the array with all entry objects.
const dataset = require("./dataset.js");
let objectArray = dataset.objectArray;

// QUESTION 4: How many open/active vs closed? Per Year? Per Month?
console.log("How many open/active vs closed? Per Year? Per Month?");

// Create object that holds results.
let activeClose = {};

// Go through each entry object...
for (let i = 0; i < objectArray.length; i++) {

    // Rename and grab specific values.
    let entry = objectArray[i];
    const date = entry['Incident Date'];
    const year = date.split('/')[0];

    // Check if the year exists in the object holding the year values.
    if (!activeClose.hasOwnProperty(year)) {
        // If it doesn't (NOT operator), create an object for that year.
        activeClose[year] = {};
    }

    // If the current entry object's year has a property of the Resolution of that entry object...
    if (activeClose[year].hasOwnProperty(entry['Resolution'])) {
        // ... we will add a 1 to the existing value for that resolution.
        activeClose[year][entry['Resolution']] += 1;
    } else {
        // ... If not, we will create the resolution property and assign a 1.
        activeClose[year][entry['Resolution']] = 1;
    }
}

// Display the results for each year.
for (let year in activeClose) {
    console.log(`For the year ${year}, we had ${activeClose[year]['Open or Active']} for Open or Active, and ${activeClose[year]['Cite or Arrest Adult']} for Cite or Arrest.`);
}

// Question 4: END