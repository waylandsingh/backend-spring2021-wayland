const md5 = require('MD5');


//TODO: refactor to match JSON file output for easy instantiation
class Task {
    constructor(text, priority, dueDate, objectBuild=false, obj=null) {
        if (objectBuild) {
            this.buildFromObject(obj)

        } else {
            // normal way to build up the Task object
            this.setText(text);

            let dateResults = this.setDueDate(dueDate);
            if (dateResults === 1) {
                this.dueDate = new Date();
            }

            this.dateCreated = new Date();
            this.dueDate = new Date(dueDate);

            if (priority === undefined) {
                this.priority = 1;
            } else {
                let results = this.setPriority(priority);
                if (results === 1) {
                    this.priority = 1;
                }
            }



            this.id = md5(this.dateCreated)

            this.dateCompleted = null;
            this.dateDeleted = null;
        }   
        return this;
    }

    buildFromObject(obj) {
        this.text = obj.text;
        this.dueDate = new Date(obj.dueDate);
        this.setPriority(obj.priority)
        this.dateCreated = new Date(obj.dateCreated) //directly access properties. bad?
        this.id = md5(obj.dateCreated);
        this.dateCompleted = (obj.dateCompleted === null) ? null : new Date(obj.dateCompleted);
        this.dateDeleted = (obj.dateDeleted === null) ? null : new Date(obj.dateDeleted);
    }

    getText() {return this.text;}
    setText(text) {
        this.text = text.toString();
    }

    getDueDate() {return this.dueDate;}
    setDueDate(dueDate) {
        let datePattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
        let validDate = datePattern.test(dueDate);

        if (validDate) {
            let dateParts = dueDate.split("-");

            dateParts[0] = parseInt(dateParts[0]);
            dateParts[1] = parseInt(dateParts[1]) - 1; // correct for the form (1-12) to js date convention(0-11)
            dateParts[2] = parseInt(dateParts[2]);

            if (dateParts[1] > 11) {
                dateParts[1] = 11;
            }

            if (dateParts[2] > 31) {
                dateParts[2] = 31;
            }

            this.dueDate = new Date(dateParts[0], dateParts[1], dateParts[2]);
            return 0;
        } else {
            return 1;
        }
    }

    getPriority() {return this.priority}
    setPriority(priority) {
        priority = parseInt(priority);
        if (Number.isNaN(priority)) {
            return 1;
        } else {
            this.priority = priority;
            return 0;
        }
    }

    markCompleted() {
        this.dateCompleted = new Date();
    }

    isCompleted() {
        if (this.dateComplete === null) {
            return false;
        } else {
            return true;
        }
    }

    markDeleted() {
        this.dateDeleted = new Date();
    }

    isDeleted () {
        if (this.dateDeleted === null) {
            return false;
        } else {
            return true;
        }
    }
}

module.exports = {
    Task: Task
};