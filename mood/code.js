/*



*/



function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', { month: 'long' });
}

var SPREADSHEET_ID_AND_TAB = "18UuPUnqdSeb0KwLV3oslzH_r47CBtz9OgY51-sZCor0/mood";


$(document).ready(function () {
  
  $.getJSON("https://opensheet.elk.sh/" + SPREADSHEET_ID_AND_TAB, function (data) {
    
    
    data.forEach(function (row, index) {
      
      console.log(row);
      
      let month = row.Timestamp.split("/")[0];
      let year = row.Timestamp.split("/")[2].substr(0,4);
      
      // Check if this month / year has appeared yet, if not then add it
      if( !$("h1[month='" + month +"'][year='" + year +"']").length ){
        $("<h1>" + getMonthName(month) + " " + year +"</h1>")
          .attr("month", month)
          .attr("year", year)
          .appendTo("#content");
      }
      
      
      let div = $(`<div class="entry">
        <p>` +  row.Timestamp + `</p>
        </div>`)
      .attr("title", row.Timestamp)
      .attr("mood", row.Mood)
      .appendTo("#content"); // 
      
      if(row.Emoji){
        $(div).append("<span class='emoji'>" + row.Emoji + "</span>")
      }
      
      
  
    });
  });  
});
  