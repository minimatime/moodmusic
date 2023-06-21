/* This music thing uses an API called 'Open Sheet' to get Google Sheets as JSON. Unlike the 'Inspiration' page that uses the 'papaparse' library to turn CSV into JSON, this API does it for us. 

Learn more at https://github.com/benborgers/opensheet
*/

/*
  The API's format is https://opensheet.elk.sh/spreadsheet_id/tab_name.

  
  To get your spreadsheet ID, hit Share at the top-right and make sure ANYONE WITH THE LINK CAN VIEW. Then, copy the end of your URL in your address bar after docs.google.com/spreadsheets/d/...
  
  e.g.
  If my URL is https://docs.google.com/spreadsheets/d/1gLyh6gv41vl9H1fBmjFrGfKip9dKkvIu6o8sccTw2lY/edit#gid=1875797309
  
  "1gLyh6gv41vl9H1fBmjFrGfKip9dKkvIu6o8sccTw2lY" is my spreadsheet ID.
  
  We're using the 'Clouds' tab, so...
*/
var SPREADSHEET_ID_AND_TAB = "1gLyh6gv41vl9H1fBmjFrGfKip9dKkvIu6o8sccTw2lY/Clouds";
// Instead of a /tab_name you can also just write /1 (to use the first tab, etc.)


$(document).ready(function () {
  
  $.getJSON("https://opensheet.elk.sh/" + SPREADSHEET_ID_AND_TAB, function (data) {
    
    /* TO VIEW CONSOLE.LOG RESULTS, RIGHT-CLICK AND INSPECT */
    console.log(data); // This gives me an ARRAY of every OBJECT...
    
    data.forEach(function (entry, index) { // For each object in data, read it as an ENTRY...
      
      console.log(entry); // This logs the OBJECT...
      
      if(index == 0) return;
      
      // class is an identifier
      
      /*
        Either dot notation   entry.label
        or bracket notation   entry["label"] -- good if your top row has spaces
        works!
      */
      let div = $(`<div class="item">
        <h1>` + entry.cloud +`</h1>
        <p>` +  entry["msg"] + `</p>
        </div>`)
      .appendTo("#content"); // # refers to div id
  
    });
  });  
});
  