// <script type="text/javascript">
// require("dotenv").config();
// var keys = require("./keys.js");
var ytResults = null;
var selectedCat = null;

// get what user wants to do
$(document).on("click", ".catBtn", function(){
  selectedCat = $(this).data("category");
  $(".search-wrap").removeClass("hide");
})


function tplawesome(e,t){
  res=e;for(var n=0;n<t.length;n++){
    res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){
      return t[n][r]
    })
  }return res
}

$("form").on("submit", function(e) {
   e.preventDefault();
   // prepare the request
   $("#results").append(`
      <img src="https://i.imgur.com/k8TI4sY.gif" class="loading">
    `)
   $("#submit").text("loading....")
   console.log(selectedCat);
    switch(selectedCat){

        case "youtube":
        console.log(selectedCat);
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
            $("#search").val("");
            //console.log(response);
            ytResults = response.items;
            console.log(results)
            var current = [ytResults[0]]
            var index = 0;
            displayVideo(current, index)

            resetVideoHeight();
            $(window).on("resize", resetVideoHeight);
         });
        break;
    }
});



function displayVideo(current, i){
  $("#submit").text("search")
   $("#results").empty();
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
    var btns = createButtons(i)
    // ad video then wrap with buttons to page
    $("#results").append($ytWrap, btns);

  });
}

// create buttons for results and add them to a wrapper
function createButtons(i){
  var $btnWrap = $("<div>").addClass("resBtnWrap");

  var $next = $("<button>")
  $next.text("next").addClass("resultBtn nextBtn")
  if(i === 3){
    $next.addClass("hide");
  }else{
    $next.removeClass("hide");
  }
  
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
      resetResults();
    break
    case "save":
      // call function to hit endpoint
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
      }
}

function resetResults(){
  ytResults = null;
  $("#results").empty();
  // hide inout
}