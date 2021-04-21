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

let tasks = {
   incompleted:[]
};
let taskFileName = "tasks.json";

// Prepare tasks from JSON...
if (fs.existsSync(taskFileName)) {
   // Extract list of tasks from the JSON file
   let fileContents = fs.readFileSync(taskFileName, "utf-8");
   tasksListJSON = JSON.parse(fileContents).incompleted;

 
   // Use objectBuild to make and push new tasks onto incompleted
   tasksListJSON.forEach(function(obj){
      tasks.incompleted.push(new task.Task('','','',objectBuild=true, obj))
   });

   // console.log(tasks.incompleted)

// ... or create new JSON file
} else {
   //write task object to filename. Necessary if thisis empty?
   fs.writeFileSync(taskFileName, JSON.stringify(tasks), "utf-8");
}

// console.log(tasks.incompleted) // check the objects loaded correctly

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
   let taskObject = new task.Task(taskData.text, taskData.priority, taskData.dueDate);
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
   
   // console.log('significant issue with JSON vs js objects/methods preventing successful GET /list population')
   
   // Filtering out deleted and completed tasks
   // accidentally replacing text with true here how
   let inProgress = tasks.incompleted.filter(t => (t.dateDeleted === null));
   // let inProgress = tasks.incompleted.filter(function(t) {
   //    console.log(t.isDeleted())
   //    if (t.isDeleted() === false) {
   //       return true;
   //    }
   // });

   // Respond to the front end
   let responseObject = {incompleted: inProgress};
   res.send(responseObject); // having issue with 'true' replacement of text
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
   fs.writeFileSync(taskFileName, JSON.stringify(tasks), "utf-8");
   res.send({});
});


// POST request for task updating
app.post("/update-task", function(req,res) {
   //TODO: update the inprogress tasks and JSON file
   //

   res.send({status:'updated correctly'})
})

// TODO: build async solution (multiple conflict saves?)
// Convert Tasks to JSON
function saveFile() {
   let json = JSON.stringify(tasks);
   fs.writeFileSync(taskFileName, json, "utf-8")
}