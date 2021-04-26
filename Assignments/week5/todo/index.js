// DO NOT USE "name" as a variable name when using Node.

const express = require("express");
const fs = require("fs");
const task = require("./Task.js");
const credentials = require('./credentials.js') // url stored in credentials.dbURL
const app = express();
const http = require("http").Server(app);
const port = 3000;
const mongoose = require("mongoose");
const { stringify } = require("querystring");
const { publicDecrypt } = require("crypto");

http.listen(port);

console.log("Express server is now running on port " + port);

mongoose.connect(credentials.dbURL, credentials.dbOptions, function(error) {
   //callback for conection
   if (error) {
      console.log("failed to connect to MongoDB" + error);
   } else {
      console.log("Successful connection made to MongoDB")
   }
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo error "));
mongoose.Promise = global.Promise;

// create schema for the class to be used with mongodb
let Schema  = mongoose.Schema;
let TaskSchema = Schema({
   text:String,
   priority:String,
   dueDate:String,
   dateCreated:String,
   dateDeleted:String,
   dateCompleted:String
});

TaskSchema.loadClass(task.Task);

// a MODEL lets you create new task objects using the SCHEMA above
// is CONNECTED to the MONGODB!!!!
let TodoModel = new mongoose.model("tasks", TaskSchema);

// Body Parser
app.use(express.json({strict: false}));
app.use(express.urlencoded({extended: false}));

// Routes

// The default route for when a visitor requests the URL without a file path. 
app.use("/", express.static("public_html/"));

// POST Handler for adding a new task.
app.post("/add-task", function (req, res) {
   let taskData = req.body;
   
   // SANITIZE INPUT HERE BEFORE ADDING TO DATABASE

   let newTask = new TodoModel({
      text:taskData.text,
      priority:taskData.priority,
      dueDate:taskData.dueDate,

   })

   newTask.save(function(err) {
      if (err) {
         console.log('error! :' + err);
         res.sendStatus(500); // database error: can add code that runs when error status detected
      } else {
         console.log('successful save')
         res.send({error: null}); // success!
      }

   });

});

// POST Handler for getting all tasks.
app.post("/get-tasks", function (req, res) {
   
   // Filter out the tasks that have been completed or deleted.
   // QUERY DATABASE for these tasks
   

   // Build an object holding all the Task objects that passed the filter test.
   let responseObject = {
      
   };

   // Send the resulting object back to the front-end.
   res.send(responseObject);
});

app.post("/complete-task", function (req, res) {

   let id = req.body.id;

   // Go through each task in the tasks array and find the one with the matching ID.
   for (let i = 0; i < tasks.incompleted.length; i++) {
      if (tasks.incompleted[i].id === id) {
         // If ID matches them mark the Task Object deleted.
         tasks.incompleted[i].markCompleted();
         break;
      }
   }

   saveFile();

   // Just send a message to the front-end.
   res.send({});
});

// POST Handler for deleting a single task.
app.post("/delete-task", function (req, res) {

   let id = req.body.id;

   // Go through each task in the tasks array and find the one with the matching ID.
   for (let i = 0; i < tasks.incompleted.length; i++) {
      if (tasks.incompleted[i].id === id) {
         // If ID matches them mark the Task Object deleted.
         tasks.incompleted[i].markDeleted();
         break;
      }
   }

   saveFile();

   // Just send a message to the front-end.
   res.send({});
});

app.post("/update-task", function (req, res) {
   let id = req.body.id;
   let updates = req.body;

   for (let i = 0; i < tasks.incompleted.length; i++) {
      if (id === tasks.incompleted[i].id) {
         tasks.incompleted[i].setText(updates.text);
         tasks.incompleted[i].setDueDate(updates.dueDate);
         tasks.incompleted[i].setPriority(updates.priority);
      }
   }

   saveFile();

   res.send({});
});


// TODO: Find out a way to delay multiple calls of this function.

// the saveFile function will convert our task Object into JSON and save it to filename.
function saveFile() {
   let json = JSON.stringify(tasks);
   fs.writeFileSync(taskFileName, json, "utf-8");
}