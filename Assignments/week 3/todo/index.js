const { response } = require("express");
const express = require("express");
const fs = require("fs");
const task = require("./Task.js"); // using node's require - js also has import/export to do this natively?

const app = express();

const http = require("http").Server(app);

const port = 3000;

http.listen(port);

console.log("Express server is now running on port " + port);

let tasks;
let taskFileName = "tasks.json";

// Prepare JSON tasks file
 if (fs.existsSync(taskFileName)) {
    let fileContents = fs.readFileSync(taskFileName, "utf-8");
    tasks = JSON.parse(fileContents);
 } else {
    tasks = {
        incompleted: [],
        completed: [],
        deleted: []
    }

    fs.writeFileSync(taskFileName, JSON.stringify(tasks), "utf-8");
 }

// Body Parser
app.use(express.json({strict: false}));
app.use(express.urlencoded({extended: false}));

// Routes
app.use("/", express.static("public_html/"));

app.post("/add-task", function(req, res) {
   //add task to tasks.json
   let taskData = req.body;

   // check for text is task
   let taskObject =  new task.Task(taskData.text, taskData.priority, taskData.dueDate);
   // console.log(taskObject); //once that looks good, we can save it in JSON

   tasks.incompleted.push(taskObject);
   saveFile();
   res.send({error:null}) // need to provide a response to posts or they'll be unhappy?
});

app.post("/get-tasks", function(req, res) {
   // respond with object that holds incomplete array
   let responseObject = {incompleted: tasks.incompleted};

   res.send(responseObject);
});

// may want a way to avoid calling multiple times for multiple entries
function saveFile() {
   let json = JSON.stringify(tasks);
   fs.writeFileSync(taskFileName, json, "utf-8")
}