const base_URL = "http://localhost:3000"

$(function () {
	//on page load, this jQuery function makes a POST request to get tasks
	// on the backend, get tasks loads and responds with 'data' (the incompleted tasks)
	refreshTasksList()

	// somethign else 

    $("#add-task").click(function() {
		
		let taskObject = {
			text: $("#task-text").val(), //grab id=tasktext's value
			priority: $("#new-task div input[type=radio]:checked").val(), // attribute select the checked radio value
			dueDate: $("#due-date").val()
		}
			
		console.log(taskObject);

		$.post(base_URL + "/add-task", taskObject, function(data) {

			refreshTasksList(); // add this inside the callback (PREVENTS ASYNC issues!)
		});

		
		
	});
});

function refreshTasksList() {
	$.post(base_URL + "/get-tasks", {}, function(data) {
		
		// console.log(data) // instead of logging it, we'll instead change the page content based on this
		let tasks = data.incompleted

		// clear out old tasks
		$("div#tasks").empty();

		// use .foreach iteration through tasks
		tasks.forEach(element => {
			let html = `<div class="task" data-id=${element.id}>
							<button><i class="fas fa-check"></i></button>
							<p>${element.text}  ${element.dueDate}</p>
							
							<button class="delete"><i class="fas fa-trash-alt"></i></button>
							<button class="edit"><i class="far fa-edit"></i></button>
						</div>`;
			$("#tasks").append(html);

			});

		console.log(tasks)
		
		$("button.delete").click(function() {
			//goign to want this to execute AFTER the POST request responds successfully
			// assigning this to a variable allows removal to work properly
			let button = $(this)
			let deleteObject = {
				id: button.parent().attr("data-id")
			}

			$.post("/delete-task", deleteObject, function() {
				console.log(deleteObject)
				console.log('something here')
				button.parent().remove();
			});
			
		
			
		});

		$("button.edit").click(function() {
			console.log("clicked edit")
			let htmlDrawer = `<div class="edit-panel">
				<label for="task-text">Task</label>
				<input type="text" id="task-text" />
				<br />
				<label for="priority-1">Priority 1</label>
				<input type="radio" name="priority" id="priority-1" value="1" checked="checked"/>
				<label for="priority-2">Priority 2</label>
				<input type="radio" name="priority" id="priority-2" value="2"/>
				<label for="priority-3">Priority 3</label>
				<input type="radio" name="priority" id="priority-3" value="3"/>
				<br />
				<label for="due-date">Due Date</label>
				<input type="date" id="due-date" required="required"/>
				<button id="add-task">Add Task!</button>
			</div>`
			let button = $(this)
			button.parent().append(htmlDrawer)
			// switch edit icon to save and allow it to close/save
			
		})
	});
}