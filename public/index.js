var templates = {};
var views = [];

var getTemplates = function(){

  var headerString = $("#header-template").text()
  templates.headerInfo = Handlebars.compile(headerString);

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
    console.log(details);
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
    this.$el.html(templates.tasksInfo(this.model.viewDetails())); //.model.viewDetails())); ?
  }

})

var HeaderView = Backbone.View.extend({

  events: { "click #all": "all",
            "click #completed": "listCompleteOrIncomplete",
            "click #incomplete": "listCompleteOrIncomplete" },

  tagName: "header",

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(templates.headerInfo());
  },

  all: function(){
    listAllTasks();
  },

  listCompleteOrIncomplete: function(ev){
    listCompleteOrIncompleteTasks(ev);
  }

})

var displayHeader = function() {

    var headerView = new HeaderView();
    $("body").prepend(headerView.el);
}

var listAllTasks = function() {
    console.log("listing the tasks");
    $("#taskList").html("");
    taskCollection = new TaskList;
    taskCollection.fetch({
      success: function(data) {
        console.log(taskCollection);

        _.each(taskCollection.models, function(element, index){
        views.push(new TaskWrap(element));
        });
        console.log(views);

        _.each(views, function(element, index){
        $("#taskList").append(views[index].el);
        });

      }
    });
}

var listCompleteOrIncompleteTasks = function(ev) {

  var completeOrIncompleteEl = $(ev.currentTarget).context;
  var completeOrIncomplete = completeOrIncompleteEl.id;
  var trueOrFalse;

  if (completeOrIncomplete === 'completed') {
    trueOrFalse = true;
  }
  if (completeOrIncomplete === 'incomplete') {
    trueOrFalse = false;
  }

    $("#taskList").html("");

    var completeOrIncompleteTasks = _.filter(taskCollection.models, function(each){
      if (each.get('complete') === trueOrFalse) {
        return true;
      }
    });

    views = [];

        _.each(completeOrIncompleteTasks, function(element, index){
        views.push(new TaskWrap(element));
        });

        _.each(views, function(element, index){
        $("#taskList").append(views[index].el);
        });
}


var taskCollection;

$(document).ready(function(){

	getTemplates();
  displayHeader();
  listAllTasks();

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



	

 
});



