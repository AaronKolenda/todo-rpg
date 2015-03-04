var templates = {};
var views = [];

var getTemplates = function(){

  var tasksString = $("#tasks-template").text()
  templates.tasksInfo = Handlebars.compile(tasksString);

  var singleString = $("#single-task-template").text()
  templates.singleInfo = Handlebars.compile(singleString);

  var statString = $("#stats-template").text()
  templates.statInfo = Handlebars.compile(statString);

  };

var Task = Backbone.Model.extend({

  defaults: {
    task: "",
    complete: false,
    id: 0,
    value: 0,
    createdAt: ""
  },

  viewDetails: function() {
  	var details = this.toJSON();
  	var task = details.task;
  	var complete = details.complete;
  	var id = details.id;
  	var value = details.value;
  	var createdAt = details.createdAt;
  	return details;
  }

});

var TaskList = Backbone.Collection.extend({

  url: "/tasks",
  model: Task

});

var TaskWrap = Backbone.View.extend({

  tagName: "div",

  initialize: function(model) {
  	this.model = model;
    this.render();
  },

  render: function() {
  	console.log(this, this.model)
    this.$el.html(templates.tasksInfo(this)); //.model.viewDetails())); ?
  }

})





var taskCollection;

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

	/*
	$("#search").click(function(){
		var inputID = $("#searchInput").val();
		inputID = inputID.trim();
		getTaskByID(inputID, displayTaskByID);
	});

	$("#create").click(function(){
		var createID = $("#createInput").val();
		createID = createID.trim();

		var valueNew = $("#valueInput").val();
		valueNew = valueNew.trim();
		createNewTask(createID, valueNew, displayTaskByID);
	});*/

	taskCollection = new TaskList;
  	taskCollection.fetch({
  		success: function(data) {
  			console.log(taskCollection);

		  	_.each(taskCollection, function(element, index){
				views[index] = new TaskWrap(element);
				$("#taskList").append(views[index].el);
		  	});
  		}
  	});

	

 
});



