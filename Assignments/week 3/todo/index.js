const { response } = require("express");
const express = require("express");
const fs = require("fs");
const task = require("./Task.js"); // using node's require - js also has import/export to do this natively?
const md5 = require("MD5");

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

// Convert JSON to 
tasksJSON = JSON.parse(fileContents);
// these objects are different than instantiated Task objects! change here to convert JSON -> Tasks
// TODO: convert tasksJSON to Task objects in tasks
// tasksJSON.foreach() // refactor here?
} else {
   // create file if it doesn't exist
   tasks = {
      incompleted: [],
      completed: [],
      deleted: []
   }

   //write task object to filename. Necessary if thisis empty?
   fs.writeFileSync(taskFileName, JSON.stringify(tasks), "utf-8");
}

// Body Parser
app.use(express.json({strict: false}));
app.use(express.urlencoded({extended: false}));

// Routes ________________________________________________________
// The default route
app.use("/", express.static("public_html/"));

// Adding tasks using the button
app.post("/add-task", function(req, res) {
   //add task to tasks.json
   let taskData = req.body;

   // TODO: modify this with new Task class definition
   let taskObject =  new task.Task(taskData.text, taskData.priority, taskData.dueDate);
   // console.log(taskObject); //once that looks good, we can save it in JSON

   // Add the new task to the incompleted array
   tasks.incompleted.push(taskObject);
   saveFile(); // save changes to the file

   // Respond to the front end so the callback function executes
   res.send({error:null}) // need to provide a response to posts or they'll be unhappy?
});

// Post handler for getting all of the tasks
app.post("/get-tasks", function(req, res) {
   // respond with object that holds incomplete array of non-deleted, non completed objects
   console.log(tasks.incompleted[0])
   console.log('significant issue with JSON vs js objects/methods preventing successful GET /list population')
   
   // Filtering out deleted and completed tasks
   let inProgress = tasks.incompleted.filter(t => (t.deleted == false))//(t.isDeleted() || t.isCompleted()))

   // Respond to the front end
   let responseObject = {incompleted: inProgress};
   res.send(responseObject);
});

// POST handler for deleting singl task
app.post("/delete-task", function(req,res) {
   // find the task with the requested id
   // use the task.markDeleted() setter to set
   //check the deleted status using isDeleted
   let id = req.body.id //look in the body of the post request for id

   // Match id with Task to delete
   for (let i=0; i<tasks.incompleted.length; i++) {
      if (tasks.incompleted[i].id === id){
         tasks.incompleted[i].markDeleted();
         break; //successfully marked the task deleted
      }
   }

   //send a response or if there's an error 
   //add an error to the object later
   res.send({});
});


// TODO: build async solution (multiple conflict saves?)
// Convert Tasks to JSON
function saveFile() {
   let json = JSON.stringify(tasks);
   fs.writeFileSync(taskFileName, json, "utf-8")
}