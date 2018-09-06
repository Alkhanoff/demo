// Global variable definitions
// DB column numbers
var OPT_ID = 0;
var OPT_TITLE = 1;
var OPT_VOTES = 2;

var votedID;

$(document).ready(function(){
  $("#poll").submit(formProcess); // setup the submit handler
  
  if ($("#poll-results").length > 0 ) {
    animateResults();
  }
  
  /*if ($.cookie('vote_id')) {
    $("#poll-container").empty();
    votedID = $.cookie('vote_id');
    $.getJSON("http://www.interview.az/poll/poll_ajax/",loadResults);
  }*/
});

function formProcess(event){
  event.preventDefault();
  
  var id = $("input[@name='poll']:checked").attr("value");
  id = id.replace("opt",'');
  
  $("#poll-container").fadeOut("slow",function(){
    $(this).empty();
    
    votedID = id; alert(id);
    $.getJSON("http://www.interview.az/poll/poll_ajax/"+id,loadResults);
    
    $.cookie('vote_id', id, {expires: 365});
    });
}

function animateResults(){
  $("#poll-results div").each(function(){
      var percentage = $(this).next().text();
      $(this).css({width: "0%"}).animate({
				width: percentage}, 'slow');
  });
}

function loadResults(data) {
  var total_votes = 0;
  var percent;
  
  for (id in data) {
    total_votes = total_votes+parseInt(data[id][OPT_VOTES]);
  }
  
  var results_html = "<div id='poll-results'><h3>Результаты</h3>\n<dl class='graph'>\n";
  for (id in data) {
    percent = Math.round((parseInt(data[id][OPT_VOTES])/parseInt(total_votes))*100);
    if (data[id][OPT_ID] !== votedID) {
      results_html = results_html+"<dt class='bar-title'>"+data[id][OPT_TITLE]+"</dt><dd class='bar-container'><div id='bar"+data[id][OPT_ID]+"'style='width:0%;'>&nbsp;</div><span>"+percent+"%</span></dd>\n";
    } else {
      results_html = results_html+"<dt class='bar-title'>"+data[id][OPT_TITLE]+"</dt><dd class='bar-container'><div id='bar"+data[id][OPT_ID]+"'style='width:0%;background-color:#0066cc;'>&nbsp;</div><span>"+percent+"%</span></dd>\n";
    }
  }
  
  results_html = results_html+"</dl>\n\n<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><p>Всего голосов: "+total_votes+"</p></div>\n";
  
  $("#poll-container").append(results_html).fadeIn("slow",function(){
    animateResults();});
}