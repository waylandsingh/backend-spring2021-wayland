const md5 = require("md5");

// Define Task class
class Task {
    constructor(text, priority, dueDate) {
        this.setText(text);

        // Assign a dueDate, and test if the provided value is valid, if not, create a new Date object instead.
        let dateResults = this.setDueDate(dueDate);
        if (dateResults === 1) {
            this.dueDate = new Date();
        }

        // Create a Date object for when the Task object was created.
        this.dateCreated = new Date();

        // Generate a MD5 hash to identify this Task Object.
        this.id = md5(this.text + this.dateCreated.toString());

        // Test if priority has a value, if it doesn't, assign it priority 1...
        if (priority === undefined) {
            this.priority = 1;
        } else {
            //... Otherwise send it to the setPriority method.
            let results = this.setPriority(priority);

            // If setPriority() fails, set priority to 1.
            if (results === 1) {
                this.priority = 1;
            }
        }

        // set completed and deleted date to null when the Task is NEW.
        this.dateCompleted = null;
        this.dateDeleted = null;
    }

    // Getter/Setter for the Task text.
    getText() {return this.text;}
    setText(text) {
        if (typeof text === "string") {
            this.text = text;
        } else {
            this.text = "INVALID VALUE";
        }
    }

    // Setter/Getter for Task due date.
    getDueDate() {return this.dueDate;}
    setDueDate(dueDate) {
        // Test the provided due date string with Regular Expressions.
        // additional regex used for MONGODB integration (parse mongo formatted dates)
        let datePattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
        // Test the string with our regular expression pattern.
        let validDate = datePattern.test(dueDate);

        // If it passes the test...
        if (validDate) {
            //...Split the string and convert the String number into Number numbers
            let dateParts = dueDate.split("-");

            dateParts[0] = parseInt(dateParts[0]);
            dateParts[1] = parseInt(dateParts[1]);
            dateParts[2] = parseInt(dateParts[2]);

            // Subtract 1 from month value, as month in Date Object starts from 0.
            dateParts[1] = dateParts[1] - 1; //dateParts[1]--;

            // Check if numbers are not out of bounds, otherwise correct them.
            if (dateParts[1] > 11) {
                dateParts[1] = 11;
            }
            
            if (dateParts[2] > 31) {
                dateParts[2] = 31;
            }

            // Create a new Date object based on the numbers from the front-end.
            this.dueDate = new Date(dateParts[0], dateParts[1], dateParts[2]);
            return 0;
        } else {
            // If it fails the test, return a 1.
            this.dueDate = new Date();
            return 1;
        }
    }

    // Setter/Getter for priority.
    getPriority() {return this.priority}
    setPriority(priority) {
        // Try to parse into number, if it fails, return a 1.
        priority = parseInt(priority);
        if (Number.isNaN(priority)) {
            return 1;
        } else {
            this.priority = priority;
            return 0;
        }
    }

    // Extra helpful methods.
    markCompleted() {
        this.dateCompleted = new Date();
    }

    isCompleted() {
        if (this.dateCompleted === null) {
            return false;
        } else {
            return true;
        }
    }

    markDeleted() {
        this.dateDeleted = new Date();
    }

    isDeleted() {
        if (this.dateDeleted === null) {
            return false;
        } else {
            return true;
        }
    }

    jsonConvert(object) {
        this.text = object.text;
        this.id = object.id;
        this.priority = object.priority;
        this.dueDate = new Date(object.dueDate);
        this.dateCreated = new Date(object.dateCreated);

        if (typeof object.dateCompleted === "string") {
            this.dateCompleted = new Date(object.dateCompleted);
        } else {
            this.dateCompleted = null;
        }

        if (typeof object.dateDeleted === "string") {
            this.dateDeleted = new Date(object.dateDeleted);
        } else {
            this.dateDeleted = null;
        }

        return this;
    }
}

// Allow other files to use the Task class.
module.exports = {
    Task: Task
};