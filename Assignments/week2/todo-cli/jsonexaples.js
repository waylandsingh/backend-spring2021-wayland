const fs = require("fs");

let dummyObject = { 
    somthing: "wicked",
    thisway: "comes",
    fakeBool: false,
    aFunction: ()=>{console.log('ok')} //functions IGNORED by JSON (security)
}
console.log(dummyObject);
// dummyObject.aFunction();

fs.writeFileSync("someJSON.json", "dummyObject", "utf-8")

// JSON object includes handy methods
// is in the global namespace for JS
fs.writeFileSync("someJSON.json", JSON.stringify(dummyObject), "utf-8");
console.log(JSON.stringify(dummyObject))

// converting a JSON string back into an object
let converted = JSON.parse(fs.readFileSync("someJSON.json", "utf-8"))

console.log(converted);