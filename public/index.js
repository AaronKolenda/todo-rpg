var templates = {};

var getTemplates = function(){

  var tasksString = $("#tasks-template").text()
  templates.allTasksInfo = Handlebars.compile(tasksString);

  templates.completeTasksInfo = Handlebars.compile(tasksString);

  templates.incompleteTasksInfo = Handlebars.compile(tasksString);

  };

var listTasks = function(callback) {

  $.ajax({
    url: "/tasks",
    method: "GET",
    success: function(data) {
      callback(data)
    }
  })

}

var listCompleteTasks = function(callback) {

  $.ajax({
    url: "/tasks/complete",
    method: "GET",
    success: function(data) {
      callback(data)
    }
  })

}

var listIncompleteTasks = function(callback) {

  $.ajax({
    url: "/tasks/incomplete",
    method: "GET",
    success: function(data) {
      callback(data)
    }
  })

}

var displayTasks = function(data) {
	var taskListString = templates.allTasksInfo(data);
	$("#taskList").html(taskListString);
}

var displayCompleteTasks = function(data) {
	var taskCompleteString = templates.completeTasksInfo(data);
	$("#taskList").html(taskCompleteString);
	console.log("success");
}

var displayinIncompleteTasks = function(data) {
	var taskIncompleteString = templates.incompleteTasksInfo(data);
	$("#taskList").html(taskIncompleteString);
	console.log("inc success");
}




$(document).ready(function(){

	getTemplates();

	$("#searchInput").click(function(){
		$("#searchInput").val(" ");
		$("#searchInput").css("color", "#555555;");
	});

	$("#createInput").click(function(){
		$("#createInput").val(" ");
		$("#createInput").css("color", "#555555;");
	});

	$("#all").click(function(){
		listTasks(displayTasks);
	});

	$("#completed").click(function(){
		listCompleteTasks(displayCompleteTasks);
	});

	$("#incomplete").click(function(){
		listIncompleteTasks(displayinIncompleteTasks);
	});

});



