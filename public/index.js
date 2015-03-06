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
    createdAt: "",
    button: "Mark as Complete"
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

  events: { "click .mark": "toggleComplete"},

  tagName: "div",

  initialize: function(model) {
  	this.model = model;
    this.render();
    this.listenTo(model, "change", this.render);
    //this.listenTo(model, "change", this.model.save());
  },

  render: function() {
    this.$el.html(templates.tasksInfo(this.model.viewDetails()));
    this.setBackground();
  },

  setBackground: function() {
       if (this.model.get('complete') === true) {
        this.$el.find(".taskWrap").css("background-color", "lightblue");
        }
      if (this.model.get('complete') === false) {
        this.$el.find(".taskWrap").css("background-color", "rgb(255, 0, 67);");
      }
  },

  toggleComplete: function(ev) {
    var whatever = $(ev.currentTarget).context.id;
    var currentObj = taskCollection.models[whatever-1];
  
    if (currentObj.get('complete') === true) {
      currentObj.set('complete', false);
      currentObj.set('button', "Mark as Complete");
      return;
    }
    if (currentObj.get('complete') === false) {
      currentObj.set('complete', true);
      currentObj.set('button', "Mark as Incomplete");
      return;
    }
    

  }

})

var HeaderView = Backbone.View.extend({

  events: { "click #all": "all",
            "click #completed": "listCompleteOrIncomplete",
            "click #incomplete": "listCompleteOrIncomplete",
            "click #search": "listSingle" },

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
  },

  listSingle: function(mod) {
    listSingleTask(mod);
  }

})

var displayHeader = function() {

    var headerView = new HeaderView();
    $("body").prepend(headerView.el);
}

var listAllTasks = function() {
    $("#taskList").html("");
    views = [];
    taskCollection = new TaskList;
    taskCollection.fetch({
      success: function(data) {
        _.each(taskCollection.models, function(element, index){
        views.push(new TaskWrap(element));
        });

        _.each(views, function(element, index){
        $("#taskList").append(views[index].el);
        });

      }
    });
}

var listSingleTask = function(mod) {
  var searchedID = $("#searchInput").val();
  $("#taskList").html("");
  var searchedTask = taskCollection.get(Number(searchedID));
  views = [];
  var searchedTaskView = new TaskWrap(searchedTask);
  views.push(searchedTaskView);
  $("#taskList").append(views[0].el);
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



