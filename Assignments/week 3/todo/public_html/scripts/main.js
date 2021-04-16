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

function refreshTasksList() {$.post(base_URL + "/get-tasks", {}, function(data) {
		
	// console.log(data) // instead of logging it, we'll instead change the page content based on this
	let tasks = data.incompleted

	// clear out old tasks
	$("div#tasks").empty();

	// use .foreach iteration through tasks
	tasks.forEach(element => {
		let html = `<div class="task">
						<button><i class="fas fa-check"></i></button>
						<p>${element.text}  ${element.dueDate}</p>
						
						<button><i class="fas fa-trash-alt"></i></button>
						<button><i class="far fa-edit"></i></button>
					</div>`;
		$("#tasks").append(html);

		});
	});
}