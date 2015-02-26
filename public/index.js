var templates = {};

var getTemplates = function(){

  var allTasksString = $("#all-tasks-template").text()
  templates.allTasksInfo = Handlebars.compile(allTasksString);

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

var displayTasks = function(data) {
	var taskListString = templates.allTasksInfo(data);
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

});



