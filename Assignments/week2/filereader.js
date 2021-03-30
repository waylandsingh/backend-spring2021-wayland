const fs = require("fs");
const arguments = process.argv;



if (fs.existsSync(arguments[2])) {
    // what to do when we read a file?
    let fileContent = fs.readFileSync(arguments[2]);
    console.log(fileContent);

    return;
}

else {
    console.log('File not found.')
}
