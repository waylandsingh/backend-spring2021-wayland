let base_URL = "http://localhost:3000";

$(function () {
    refreshTaskList();

    $("#add-task").click(function () {
        let taskObject = {
            text: $("#task-text").val(),
            priority: $("#new-task div input[type=radio]:checked").val(),
            dueDate: $("#due-date").val()
        };

        $.post(base_URL + "/add-task", taskObject, function (data) {
            refreshTaskList();
        });
    });
});



function refreshTaskList() {
    $("div#tasks").empty();

    $.post(base_URL + "/get-tasks", {}, function(data) {

        let tasks = data.incompleted;

        tasks.forEach(function (task) {
            let datePattern = /(^[0-9]{4}-[0-9]{2}-[0-9]{2})/;
            task.dueDate = new Date(task.dueDate).toISOString().match(datePattern)[0]
            console.log(task.dueDate.match(datePattern)[0])

            let html = `
<div class="task" data-id=${task.id}>
    <button class="complete"><i class="fas fa-check"></i></button>
    <p>${task.text}</p><p>${task.dueDate}</p>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
    <button class="edit"><i class="far fa-edit"></i></button>

    <div class="edit-panel">
        <label for="task-text">Task</label>
        <input type="text" value="${task.text}"/>
        <br />
        <label for="priority-1">Priority 1</label>
        <input type="radio" name="priority${task._id}" value="1" id="priority-1" ${(task.priority === 1) ? `checked="checked"` : ``}/>
        <label for="priority-2">Priority 2</label>
        <input type="radio" name="priority${task._id}" value="2" id="priority-2" ${(task.priority === 2) ? `checked="checked"` : ``}/>
        <label for="priority-3">Priority 3</label>
        <input type="radio" name="priority${task._id}" value="3" id="priority-3" ${(task.priority === 3) ? `checked="checked"` : ``}/>
        <br />
        <label for="due-date">Due Date</label>
        <input type="date" id="due-date" value="${task.dueDate}" />
    </div>
</div>`;

            $("div#tasks").append(html);
        });

        $("button.complete").click(function () {

            let button = $(this);

            let completeObject = {
                id: button.parent().attr("data-id")
            }

            $.post(base_URL + "/complete-task", completeObject, function (data) {
                button.parent().remove();
            });
        });

        $("button.delete").click(function () {

            let button = $(this);

            let deleteObject = {
                id: button.parent().attr("data-id")
            }

            // The browser builds the URL for me
            $.post("/delete-task", deleteObject, function (data) {
                button.parent().remove();
            });
        });

        // Write this without using jQuery Toggle, and use 2 functions instead.
        $("button.edit").click(function () {
            let editPanel = $(this).next();
            let button = $(this);

            editPanel.toggle('slow', function () {

                if (button.children().hasClass("fa-edit")) {

                    button.fadeOut(300, function () {
                        button.html('<i class="far fa-save"></i>');
                    });
                    button.fadeIn(300);
                    
                } else {
                    button.fadeOut(300, function () {
                        button.html('<i class="far fa-edit"></i>');

                        let form = button.next();

                        let object = {
                            text: form.children("input[type=text]").val(),
                            id: form.parent().attr("data-id"),
                            dueDate: form.children("input[type=date]").val(),
                            // Check to make sure parseInt doesn't fail.
                            priority: form.children("input[type=radio]:checked").val()
                        }

                        $.post(base_URL + "/update-task", object, function (data) {
                            button.fadeIn(300);
                            let text = form.children("input[type=text]").val();
                            form.parent().children("p:nth-child(2)").text(text);
                        });

                    });
                    
                }
            });

            

            

        });
    });
}