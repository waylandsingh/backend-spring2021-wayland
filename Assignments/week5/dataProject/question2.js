// Loads in the array with all entry objects.
const dataset = require("./dataset.js");
let objectArray = dataset.objectArray;


// QUESTION 2: What day of the week is (on average) the most active? What hour (on average) for the week is the most active?
// Incident Time and Incident Day of Week.

console.log("What day of the week is (on average) the most active? What hour (on average) for the week is the most active?");

// Object to hold the count for each weekday.
let dayCounter = {
    "Sunday": 0,
    "Monday": 0,
    "Tuesday": 0,
    "Wednesday": 0,
    "Thursday": 0,
    "Friday": 0,
    "Saturday": 0
};

// Array to hold the count for each hour of a 24-hour period. The index will represent the individual hours.
let hourCounter = [];

// Go through each entry object...
objectArray.forEach(function (entry) {

    // Grab the hour value of the Incident Time property.
    let hour = parseInt(entry['Incident Time'].split(":")[0]);

    // If the hour does not exist...
    if (hourCounter[hour] === undefined) {
        //... We create it and assign 1.
        hourCounter[hour] = 1;
    } else {
        // Otherwise add a 1 to the count for that hour.
        hourCounter[hour]++;
    }

    // Get the value of the Day of the week for the current entry object...
    // ... and match to a case to add a count to that Day in our Day count object.
    switch (entry['Incident Day of Week']) {
        case "Sunday":
            dayCounter.Sunday++;
            break;
        case "Monday":
            dayCounter.Monday++;
            break;
        case "Tuesday":
            dayCounter.Tuesday++;
            break;
        case "Wednesday":
            dayCounter.Wednesday++;
            break;
        case "Thursday":
            dayCounter.Thursday++;
            break;
        case "Friday":
            dayCounter.Friday++;
            break;
        case "Saturday":
            dayCounter.Saturday++;
    }

});

// Hold the highest number for the most common Day.
let highestCount = 0;
let highestDay;

// Go through the Day counter an find the largest number.
 for (let day in dayCounter) {

    // If the number is larger than the current largest...
    if (dayCounter[day] > highestCount) {
        // Replace the current largest number with the new Day.
        highestCount = dayCounter[day];
        highestDay = day;
    }
};

// Display results.
console.log("The day with the most activity is " + highestDay);

// Find the highest count value and get that value.
let highestHour = Math.max(...hourCounter);
// Using the highest value, find the index of that highest value.
let highestIndex = hourCounter.indexOf(highestHour);

// Display results, based on AM or PM.
if (highestIndex >= 12) {
    console.log("The most active hour of the day is " + (highestIndex === 12 ? "12" : highestIndex - 12) + "PM.");
} else {
    console.log("The most active hour of the day is " + (highestIndex === 0 ? "12" : highestIndex) + "AM.")
}

// QUESTION 2: END