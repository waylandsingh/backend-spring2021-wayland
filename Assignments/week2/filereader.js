const fs = require("fs");

console.log(`You are running ${process.platform} as an operating system.`)
const arguments = process.argv;

let action = arguments[2];
let filename = arguments[3];



if (fs.existsSync(filename) && action === "read") {
    let fileContent = fs.readFileSync(filename, "utf-8");
    console.log(fileContent);
}
else if (action === "write") {
    if (!fs.existsSync(filename)) {
        fs.writeFileSync(filename,"","utf-8");
        console.log('Write complete')
    }
    else {
        console.log('File exists. Try some other filename')
    }
}
else if (action === "update") {

}
else if (action === "delete") {

}


else {
    console.log(
        `File not found.
        Try \`node filereader.js [action] [filename]\`
        Possible actions include: read, write, update or delete`)
}
