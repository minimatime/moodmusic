/* This music thing uses an API called 'Open Sheet' to get Google Sheets as JSON. Unlike the 'Inspiration' page that uses the 'papaparse' library to turn CSV into JSON, this API does it for us. 

Learn more at https://github.com/benborgers/opensheet
*/

/*
  The API's format is https://opensheet.elk.sh/spreadsheet_id/tab_name.
  
  
  To get your spreadsheet ID, hit Share at the top-right and make sure ANYONE WITH THE LINK CAN VIEW. Then, copy the end of your URL in your address bar after docs.google.com/spreadsheets/d/...
  
  e.g.
  https://docs.google.com/spreadsheets/d/1gLyh6gv41vl9H1fBmjFrGfKip9dKkvIu6o8sccTw2lY/edit#gid=1875797309
  copy
  "1gLyh6gv41vl9H1fBmjFrGfKip9dKkvIu6o8sccTw2lY" is your spreadsheet ID.
  
  We're using the 'Music' tab, so this is what we write...
*/
var SPREADSHEET_ID_AND_TAB = "126OHKbEF_Q-XboowWjMfQiRaXbkky2uJG7IvuBgLDl4/Sheet";


$(document).ready(function () {
  
  $.getJSON("https://opensheet.elk.sh/" + SPREADSHEET_ID_AND_TAB, function (data) {

    

    $("<div>")
    .attr("id", "entry-container")
    .appendTo("body");

    data.forEach(function (row, index) {

      let thoughtsId = "thoughts-" + index;

      $("<div>")
    .addClass("entry")
    .append(
        $("<h2>").text(row.Name),
        $("<img>").attr("src", row.Image),
        $("<h3>").text(row.Media),
        $("<p>").text(row.Rating),
        $("<button>")
                .addClass("btn")
                .attr({
                    type: "button",
                    "data-toggle": "collapse",
                    "data-target": "#" + thoughtsId,
                    "aria-expanded": "false",
                    "aria-controls": thoughtsId
                })
                .text("Toggle Thoughts"),
            // Add the collapse div for thoughts
            $("<div>")
                .addClass("collapse")
                .attr("id", thoughtsId)
                .append(
                        $("<p>").text(row.Thoughts)
                )
        )
    .appendTo("#entry-container");
    });
  });  
});
  