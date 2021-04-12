// include the express package
// const { urlencoded } = require("express");
const express = require("express");

// instantiate an express object
const app = express();
// app.use(express.json()); // allow app to use the json parser
app.use(express.urlencoded(
    {extended: false} // need provide extended option (why?)
));  // use urlencoding to break apart the url(?)

// Set server to HTTP (allows requests)
const http = require("http").Server(app) // unpack this syntax a bit more later
const port = 3000;

// Tell the http to look at port 3000
http.listen(port);
console.log("running the server on " + port + ". CTRL + C to stop server.");

// Setting up the Routes

// Root '/' Route (aka http://localhost:3000/)
// Learning note: make sure folders are spelled correctly
app.use("/", express.static("./public_html/"));
app.use("/secret", express.static("./public_html/secret_html/"));

// Deal with the POST request sent when hitting the button
// Don't need to render a new page here, just send a response
app.post("/submitNumber", function (request, response) {
    let dataFromButton = request.body; // request is an object
    console.log(dataFromButton.number)
    response.send("Thank you for your request, dude.");

});