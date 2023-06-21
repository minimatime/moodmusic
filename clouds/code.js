
// gets a random integer between the min and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



var SPREADSHEET_ID_AND_TAB = "1gLyh6gv41vl9H1fBmjFrGfKip9dKkvIu6o8sccTw2lY/Clouds";


$(document).ready(function () {
  
  
  $.getJSON("https://opensheet.elk.sh/" + SPREADSHEET_ID_AND_TAB, function (data) {
    
    data.forEach(function (row, index) {
      
      if(index == 0) return;
      
      let div = $(`<div class='cloud' type='` + row.type +`' index="` + index +`">
        <span class='emoji'>` + row.cloud +`</span>
        <p>` +  row.msg + `</p>
        </div>`)
      .addClass( (row.size).toLowerCase() )
      .attr("title", row.msg)
      .css("top", getRandomInt(0, 80) + "%")
      .css("left", getRandomInt(0, 90) + "%")
      .appendTo("#clouds");
  
    });
  });  
});
  

// Filter

$("#filter").on("click", "button[filter]", function(){
  
  $("#filter button[filter]").css("opacity", 0.3);
  $(this).css("opacity", 1);
  
  let to_filter = $(this).attr("filter");
  console.log(to_filter);
  
  if(to_filter == "all"){
    $("#clouds .cloud").show();
    return;
  }
  
    $("#clouds .cloud").hide();
    $("#clouds .cloud[type='" + to_filter +"']").show();
});


// Look at cloud
$("#clouds").on("click", ".cloud", function(){
  
  // get information from cloud
  let index = $(this).attr("index");
  let symbol = $(this).find(".emoji").text();
  let msg = $(this).find("p").text();
  
  $("#look .cloud .emoji").text(symbol);
  $("#look .cloud p").text(msg);
  
  $("#look").show();
  
  // also, mark that cloud as seen
  $("#clouds .cloud[index='" + index +"']").attr("seen", "");
  
});

// hide when button is clicked
$("#look").on("click", "button[hide]", function(){
  $("#look").hide();
});
