var templates = {};

var getTemplates = function(){

  var tasksString = $("#tasks-template").text()
  templates.tasksInfo = Handlebars.compile(tasksString);

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

	var markAsComplete = "Mark as Complete";
	var markAsIncomplete = "Mark as Incomplete";

	_.each(data, function(element, index){

		if (element.complete === true) {
			element.button = markAsIncomplete;
		}

		if (element.complete === false) {
			element.button = markAsComplete;
		}
		console.log(element);

	});

	var taskListString = templates.tasksInfo(data);
	$("#taskList").html(taskListString);

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
		listCompleteTasks(displayTasks);
	});

	$("#incomplete").click(function(){
		listIncompleteTasks(displayTasks);
	});

});



