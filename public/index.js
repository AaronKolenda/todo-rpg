var templates = {};

var getTemplates = function(){

  var tasksString = $("#tasks-template").text()
  templates.tasksInfo = Handlebars.compile(tasksString);

  var singleString = $("#single-task-template").text()
  templates.singleInfo = Handlebars.compile(singleString);

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

var getTaskByID = function(id, callback) {
	
	var urlString = ("/tasks/" + id);
	console.log(urlString);

  $.ajax({
    url: urlString,
    method: "GET",
    success: function(data) {
    	console.log(data)
      callback(id, data);
    }
  })

}

var displayOneTask = function(id, data) {

	var markAsComplete = "Mark as Complete";
	var markAsIncomplete = "Mark as Incomplete";

		if (data.complete === true) {
			data.button = markAsIncomplete;
		}

		if (data.complete === false) {
			data.button = markAsComplete;
		}

	
	var singleListString = templates.singleInfo(data);
	$("#" + id).html(singleListString);

}

var displayTaskByID = function(id, data) {

	var markAsComplete = "Mark as Complete";
	var markAsIncomplete = "Mark as Incomplete";

		if (data.complete === true) {
			data.button = markAsIncomplete;
		}

		if (data.complete === false) {
			data.button = markAsComplete;
		}

	
	var singleListString = templates.singleInfo(data);
	$("#taskList").html(singleListString);

}

var markComplete = function(id, value) {

	console.log("in markComplete value is " + value);

	var urlStringClose = ("/tasks/" + id + "/close");
	var urlStringOpen = ("/tasks/" + id + "/reopen");

	if (value === "false") {
		  $.ajax({
		    url: urlStringClose,
		    method: "POST",
		    success: function(data) {
		    }
		  })
	}

	if (value === "true") {
		  $.ajax({
		    url: urlStringOpen,
		    method: "POST",
		    success: function(data) {
		    }
		  })
	}

	getTaskByID(id, displayOneTask);

}

var displayTasks = function(data) {

	var markAsComplete = "Mark as Complete";
	var markAsIncomplete = "Mark as Incomplete";

	_.each(data, function(element, index) {

		if (element.complete === true) {
			element.button = markAsIncomplete;
		}

		if (element.complete === false) {
			element.button = markAsComplete;
		}

	});

	var taskListString = templates.tasksInfo(data);
	$("#taskList").html(taskListString);

}

var createNewTask = function(name, value, callback) {
	var data = {};
	data.task = name;
	data.value = value;

	console.log(data.task);
	console.log(data.value); //these work

  $.ajax({
    url: "/tasks",
    method: "PUT",
    data: data,
    success: function(data) { 
	console.log(data);
	var newID = data.id;
	callback(newID, data);
    }
  })

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

	$("#valueInput").click(function(){
		$("#valueInput").val(" ");
		$("#valueInput").css("color", "#555555;");
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

	$(document).on('click', ".mark", function(){
            var buttonID = this.id;
            var buttonValue = this.value;
            markComplete(buttonID, buttonValue);
        });

	$("#search").click(function(){
		var inputID = $("#searchInput").val();
		inputID = inputID.trim();
		console.log(inputID);
		getTaskByID(inputID, displayTaskByID);
	});

	$("#create").click(function(){
		var createID = $("#createInput").val();
		createID = createID.trim();
		console.log(createID);

		var valueNew = $("#valueInput").val();
		valueNew = valueNew.trim();
		console.log(valueNew);
		createNewTask(createID, valueNew, displayTaskByID);
	});


});



