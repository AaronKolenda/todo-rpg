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

	var taskListString = templates.tasksInfo(data);
	$("#taskList").html(taskListString);

	console.log(data);

	_.each(data, function(element, index){
		if (element.complete === false) {
			console.log("in if statement");
		var buttonString = "<button>Mark as incomplete</button>";
		console.log("button string is " + buttonString);
		$("#taskWrap").append(buttonString);
		}
		console.log(element);
	});

}


var createButtons = function(task) {

		if (task.complete === true) {
		var buttonString = "<button>Mark as incomplete</button>";
		$("#taskWrap").append(buttonString);
		}

		if (task.complete === false) {
		var buttonString = "<button>Mark as complete</button>";
		$("#taskWrap").append(buttonString);
		}

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



