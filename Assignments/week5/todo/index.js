// DO NOT USE "name" as a variable name when using Node.

const express = require("express");
const sanitize = require("mongo-sanitize");
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

// Attach Task class to db docs
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

   // Build Mongoose Object
   let newTask =  new TodoModel({
      dateCompleted: null,
      dateDeleted: null,
      dateCreated: new Date() //auto type conversion on backend
   })

   // set Mongoose Object values
   newTask.setText(taskData.text);
   newTask.setPriority(taskData.priority);
   newTask.setDueDate(task.dueDate);

   // SANITIZE INPUT HERE BEFORE ADDING TO DATABASE

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
   
   // Query DB for non-complete, non-deleted tasks
   TodoModel.find({dateDeleted:null, dateCompleted:null}, function(error, results) {
      if (error) {
         console.log("failed to find all docs" + error);
         res.sendStatus(500);
      } else {
         // Build an object holding all the Task objects that passed the filter test.
         console.log(results)
         // Create object to send to front end: holds results of query
         let responseObject = {
            incompleted:results
            };
         res.send(responseObject);
      }
   });
});

app.post("/complete-task", function (req, res) {

   let _id = req.body.id;

   // Find matching ID to mark complete
   TodoModel.find({_id:_id}, function(error,results) {
      if (error) {

      } else {
         results[0].markCompleted();
         results[0].save(function(error) {
            if (error) {
               console.log(error);
               res.send(500);
            } else {
               res.send({})    // Just send a message to the front-end.

            }
         });
      }
   });
});

// POST Handler for marking a task deleted
app.post("/delete-task", function (req, res) {

   let _id = req.body.id;

   // Mark the matched ID task deleted
   TodoModel.find({_id:_id}, function(error,results) {
      if (error) {

      } else {
         results[0].markDeleted();
         results[0].save(function(error) {
            if (error) {
               console.log(error);
               res.send(500);
            } else {
               res.send({})    // Just send a message to the front-end.

            }
         });
      }
   });
});

// POST handler for updating DB entries
app.post("/update-task", function (req, res) {
   console.log(req.body)
   let _id = req.body.id;
   let updates = req.body;

   delete updates._id;

   TodoModel.find({_id:_id}, function (error, results) {
      if (error) {

      } else {
         // Update DB objects using setters
         results[0].setText(sanitize(updates.text)); // santize the mongodb query
         results[0].setPriority(updates.priority);
         results[0].setDueDate(updates.dueDate);

         // save results and send response based on the save
         results[0].save(function(error){
            if (error) {
               console.log(error);
               res.sendStatus(500)
            } else {
               res.send({});
            }
         })
      }
   });

   // for (let i = 0; i < tasks.incompleted.length; i++) {
   //    if (id === tasks.incompleted[i].id) {
   //       tasks.incompleted[i].setText(updates.text);
   //       tasks.incompleted[i].setDueDate(updates.dueDate);
   //       tasks.incompleted[i].setPriority(updates.priority);
   //    }
   // }

   // saveFile();

   
});


// TODO: Find out a way to delay multiple calls of this function.

// the saveFile function will convert our task Object into JSON and save it to filename.
function saveFile() {
   let json = JSON.stringify(tasks);
   fs.writeFileSync(taskFileName, json, "utf-8");
}