// basic task-management
const fs = require("fs");

class Task {
    constructor(text, priority, dueDate) {
        this.text = text;
        this.dueDate = dueDate;
        this.dateCreated = new Date();
        this.priority = priority;
        this.dateCompleted = null;
    }
}



let taskArray = JSON.parse(fs.readFileSync("tasks.json", "utf-8")).tasksList

let action = process.argv[2];
let text = process.argv[3];
let priority = process.argv[4];

if (action === "add") {
    taskArray.push(new Task(text, priority));
    console.log("You have added this task");

    let objectToSave = JSON.stringify({
        tasksList: taskArray
    })
    
    fs.writeFileSync("tasks.json", objectToSave, "utf-8");    
    
}

else if (action ==="list") {
    if (taskArray[0].dateCompleted === null) {
        var completed = "no"
    }
    else {
        var completed = "yes"
    }
    let taskPrint = `Priority: ${taskArray[0].priority}`
}





console.log(taskArray);