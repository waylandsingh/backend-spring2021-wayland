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
		
		let tasks = data.incompleted
		// console.log(tasks) // instead of logging it, we'll instead change the page content based on this

		// clear out old tasks
		$("div#tasks").empty();

		// use .foreach iteration through tasks
		tasks.forEach(element => {
			let datePattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}/;

			let html = `<div class="task" data-id=${element.id}>
							<button class="complete"><i class="fas fa-check"></i></button>
							<p>${element.text} ${element.dueDate}</p> 
							
							<button class="delete"><i class="fas fa-trash-alt"></i></button>
							<button class="edit"><i class="far fa-edit"></i></button>
							<div class="edit-panel">
								<label for="task-text">Task</label>
								<input type="text" id="text${element.id}" value="${element.text}" />
								<br />
								<label for="priority-1">Priority 1</label>
								<input type="radio" name="priority${element.id}" id="priority-1" value="1" ${(element.priority===1) ? `checked="checked"`: ``}/>
								<label for="priority-2">Priority 2</label>
								<input type="radio" name="priority${element.id}" id="priority-2" value="2" ${(element.priority===2) ? `checked="checked"`: ``}/>
								<label for="priority-3">Priority 3</label>
								<input type="radio" name="priority${element.id}" id="priority-3" value="3" ${(element.priority===3) ? `checked="checked"`: ``}/>
								<br />
								<label for="due-date">Due Date</label>
								<input type="date" id="due-date" value="${element.dueDate.match(datePattern)[0]}"/>
								<button id="add-task">Add Task!</button>
							</div>
						</div>`;
						
			$("#tasks").append(html);

			});

		// console.log(tasks)
		
		$("button.delete").click(function() {
			//goign to want this to execute AFTER the POST request responds successfully
			// assigning this to a variable allows removal to work properly
			let button = $(this)
			let deleteObject = {
				id: button.parent().attr("data-id")
			}

			//post request to mark a task deleted in the back end
			$.post("/delete-task", deleteObject, function() {
				console.log(deleteObject)
				console.log('something here')
				button.parent().remove();
			});
			
		
			
		});

		$("button.edit").click(function() {
			let button = $(this);
			let editPanel = $(this).next();
			let buttonIcon = $(this).children();

			editPanel.toggle("slow", function() {
				// detect class of the button

				if (buttonIcon.hasClass("fa-edit")) {
					button.html("<i class='far fa-save'></i>")
				} else {
					button.html("<i class='far fa-edit'></i>")
					// TODO: add a POST request for updating on the backend
					
					let form = button.next(); //this is the edit panel

					let objectPost = {
						text: form.children("input[type=text]").val(),
						id: form.parent().attr("data-id"),
						dueDate: form.children("input[type=date]").val(),
						priority: form.children("input[type=radio]:checked").val() //css selector for radio button input

					}

					// fire the POST
					$.post(base_URL + '/update-task', objectPost, function(data) {
						//what do with data received from backend? -  nothing, just refresh the button info instead
						alert(data.status)
						// refreshtaskslist to auto close the section vs
						// update the section info manually
					});
				}
			});
		});

		$("button.complete").click(function() {
			let completedTask = $(this).parent().attr("data-id")
			console.log('hey you completed the task' + completedTask)
		});
	});
}

//rewrite without jQuery toggle using 2 functions that call each other based on button.edit
function hideShowEditSave() {
	console.log("clicked edit")
	// TODO: change css property of the NEXT child to show
	let button = $(this)
	button.next().css("display", "block")
	// $(this).parent(-1) // last child of the element works as well

	// switch edit icon to save and allow it to close/save
	button.html("<i class='far fa-save'></i>")
	// TODO: disconnect the click function and replace it with save
	button.unbind();
	button.click(function() {
		// TODO: add a save request and hide the drawer
		button.html("<i class='far fa-edit'></i>")				
		button.next().css("display", "none")
		button.unbind()
		button.click(hideShowEditSave())
	});
	
}