var x = function(){}

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
	console.log(data);
}

listTasks(displayTasks);

$(document).ready(function(){

	$("#searchInput").click(function(){
		$("#searchInput").val(" ");
		$("#searchInput").css("color", "#555555;");
	});

	$("#createInput").click(function(){
		$("#createInput").val(" ");
		$("#createInput").css("color", "#555555;");
	});

});

