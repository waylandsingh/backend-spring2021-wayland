const fs = require("fs");

let dataset = fs.readFileSync("police-data.csv", "utf-8");

let dataArray = dataset.split("\n");

let dataHeadings = dataArray[0].split(",");
let firstRow = dataArray[1].split(",");

let firstObject = {};
let ignoredIndices = new Set([0,5,6,7,8,9,10,11,12,13,19,20,23,24,25,26])

dataHeadings.forEach(function(el, i) {
    // what do with each header?
    if (! (ignoredIndices.has(i))) {
        firstObject['' + el] =  firstRow[i]
    }
    

});

console.log(firstObject['Resolution'])