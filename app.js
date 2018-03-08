// <script type="text/javascript">
// require("dotenv").config();
// var keys = require("./keys.js");
var ytResults;

function tplawesome(e,t){
  res=e;for(var n=0;n<t.length;n++){
    res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){
      return t[n][r]
    })
  }return res
}

// on submit for youtube
$(function() {
  $("form").on("submit", function(e) {
     e.preventDefault();
     // prepare the request
     var request = gapi.client.youtube.search.list({
          part: "snippet",
          type: "video",
          q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
          maxResults: 3,
          order: "viewCount",
          publishedAfter: "2015-01-01T00:00:00Z"
     }); 
     // execute the request
      request.execute(function(response) {

        //console.log(response);
        ytResults = response.items;
        console.log(results)
        var current = [ytResults[0]]
        var index = 0;
        displayVideo(current, index)

        resetVideoHeight();
     });
  });
  
  $(window).on("resize", resetVideoHeight);
});

function displayVideo(current, i){
  $("#results").html("");
    var $ytWrap = $("<div>")
    $ytWrap.addClass("currentVideo")
    $ytWrap.attr("data-video", i)
    console.log(current)

  $.each(current, function(index, item) {
    console.log(index, item);
    $.get("item.html", function(data) {
        $($ytWrap).append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
    });
    // save wrapper with result buttons to a variable
    var btns = createButtons()
    // ad video then wrap with buttons to page
    $("#results").append($ytWrap, btns);

  });
}

// create buttons for results and add them to a wrapper
function createButtons(){
  var $btnWrap = $("<div>").addClass("resBtnWrap");

  var $next = $("<button>")
  $next.text("next").addClass("resultBtn nextBtn")
  
  var $clear = $("<button>")
  $clear.text("clear").addClass("resultBtn clearBtn")
  
  var $save = $("<button>")
  $save.text("save").addClass("resultBtn saveBtn")

  return $($btnWrap).append($next, $clear, $save)
}

// for youtube
function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}
function init(){
    gapi.client.setApiKey("AIzaSyD0-_9xMJHK9CcHCP7JET7Pv3rSuYu3KUY");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}

// click for any of the result buttons (next, clear, save)
$(document).on("click", ".resultBtn", function(){

  var selectedBtn = $(this).text();

  switch(selectedBtn){
    case "next":
      // if selected catelgoy is youtube
      nextYoutube();

      // stop 
    break;
    case "clear":
    break
    case "save":
    break

  }
})


function nextYoutube(){
  // youtube 
      var current = $(".currentVideo").data("video");
      var next = [ytResults[current+1]]
      var i = current+1
      if(current < 3){
        $(".nextBtn").removeClass("hide");
        displayVideo(next, i);
      }else {
        $(".nextBtn").addClass("hide");
        return
      }
      // if (current === 3){
        
      // }else {
        
      // }
}