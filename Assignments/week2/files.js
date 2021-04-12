// instantiate the fs object 
const fs  = require("fs");

// get arguments from terminal command (NOT FUNCTION args)
process.argv; // stored in an array

// creating a file using the Node FS module
fs.writeFileSync("new_file.txt", "Hello World", "utf-8");

let myCode = `
    console.log("how are ya doin'?");
    console.log(10*10);


`;

// CRUD operations work SILENTLY - no permission/warnings
fs.writeFileSync("synth_code.js", myCode, "utf-8")


// reading from an existing file
// be explicit about extensions!
let fileContents = fs.readFileSync("new_file.txt", "utf-8");

let essaycontents = fs.readFileSync("essay.txt", "utf-8")
let essayArray = essaycontents.split(" ");
console.log(`The essay has ${essayArray.length} tokens in it`);
console.log(`${essayArray}`)