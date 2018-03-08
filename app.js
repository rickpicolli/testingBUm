// <script type="text/javascript">
// require("dotenv").config();
// var keys = require("./keys.js");
var ytResults;
  function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

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
          var current = [results[0]]
          var index = 0;
          displayVideo(current, index)

          resetVideoHeight();
       });
    });
    
    $(window).on("resize", resetVideoHeight);
  });

function displayVideo(current, i){
  $("#results").html("");
    var ytWrap = $("<div>")
    ytWrap.attr("data-video", i)
    console.log(current)
  $.each(current, function(index, item) {
    console.log(index, item);
    $.get("item.html", function(data) {
        $(ytWrap).append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
    });
    $("#results").append(ytWrap);
  });
}


function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init(){
    gapi.client.setApiKey("AIzaSyD0-_9xMJHK9CcHCP7JET7Pv3rSuYu3KUY");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}
