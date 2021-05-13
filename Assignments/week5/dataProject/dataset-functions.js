function stripSpace(text) {
    text = text.replace(/^ /g, '');
    text = text.replace(/ $/g, '');
    return text;
}

// convertEntry will convert a string of data and an array of titles, into an object with those titles and values from the string.
function convertEntry(entry, titles) {

    // Calls quoteFix which will "fix" our string if it has double quotes in it, we get an array of values in return.
    let dataArray = quoteFix(entry);
    // create empty object to fill in.
    let dataObject = {};
    // An array of indexes we want to ignore for titles as we don't need this data in our objects.
    let ignoredIndexes = [0, 5, 6, 9, 10, 12, 13, 19, 20, 23, 24, 25, 26];


    // For each element in our titles array...
    titles.forEach(function (arrayElement, i) {
    
        //... Check if we need to ignore a title...
        if (ignoredIndexes.includes(i)) {
            //... an kill the function execution immediately.
            return;
        }
    
        // assign the data array value, to the title array key.
        dataObject[arrayElement] = dataArray[i];
    });

    // return the completely built object.
    return dataObject;
}

// Searches for a double quote, if found, fixes the value and returns the corrected values, otherwise returns the array of values.
function quoteFix(entry) {

    // Regex pattern for detecting a double quote.
    let regex = /"/m;
    // Tests the string for a double quote.
    let results = regex.test(entry);

    // 
    if (results) {
        // If double quote found...

        // Split string into array by commas.
        let entryArray = entry.split(",");
        // Create array to send with proper values.
        let entryWithoutQuotes = [];
        // This value should hold the index of the ending quote value if found. Otherwise kept at -1.
        let closingQuoteIndex = -1;

        // Goes through each value of the array...
        for (let i = 0; i < entryArray.length; i++) {

            // If value with ending quote found, jump to the index after it.
            if (i <= closingQuoteIndex) {
                // set index of array to value after value with ending quote.
                i = closingQuoteIndex;
                // reset the value
                closingQuoteIndex = -1;

                continue;
            }

            // Grab the individual string of the array.
            let value = entryArray[i];

            // Test if this string STARTS with a double quote.
            if (value[0] === '"') {

                // If double quote found, add the this string value to completeString, which should hold the fixed value in the end of scope.
                let completeString = value + ",";

                // Run a loop looking for values ahead of the value that starts with a double quote.
                for (let j = i + 1; j < entryArray.length; j++) {

                    // Grab the string.
                    let endingValue = entryArray[j];

                    // Check if the string ends with a double quote.
                    if (endingValue[endingValue.length - 1] === '"') {
                        // completeString += endingValue;

                        // If it does, add it to completeString.
                        completeString = completeString + endingValue;
                        // Assign j, where we found the closing double quote.
                        closingQuoteIndex = j;
                        // Break the loop as we found the closing double quote.
                        break;
                    } else {
                        // Add the array element to the completeString.
                        completeString = completeString + endingValue + ",";
                    }

                }

                // Push the string that has been fixed, remove quotes from fixed string before pushing.
                entryWithoutQuotes.push(removeQuotes(completeString));
            } else {

                // Push string into array (this is if there were no double quotes);
                entryWithoutQuotes.push(value);
            }
        }

        // Return array where all elements of array do not have double quotes.
        return entryWithoutQuotes;
    } else {
        // Return array that is split by string that was passed to this function, and only if there was no double quotes to start off with.
        return entry.split(",");
    }
}

// Function removes surrounding quotes of a string.
function removeQuotes(text) {
    let textArray = text.split("");
    textArray.pop();
    textArray.shift();
    return textArray.join("");
}

module.exports = {
    stripSpace,
    convertEntry
};