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
var SPREADSHEET_ID_AND_TAB = "16ABb-dvasSNME_7Rq-MfoAwqzUGL9n0fMCSUNn3lYoY/Music";


$(document).ready(function () {
  
  $.getJSON("https://opensheet.elk.sh/" + SPREADSHEET_ID_AND_TAB, function (data) {
    
    console.log(data);
    

    data.forEach(function (row, index) { // iterate over every object in data and run this function
      //console.log(row);
      //console.log(row["Name"]);
      
      //if(index == 0) return; // you might not need this. guess why?
      $("<img src=" + row.Image + ">").appendTo("body");
      //let div = $("<p>" + row.Name + "</p>").appendTo("table"); // # refers to div id
      
      // let's make a checkbox that's checked or not depending on whether we listened to it already
      // if(row["Listened?"] == "TRUE"){
      //   $(`<input type="checkbox" checked>`).appendTo(div);
      // } else{
      //   $(`<input type="checkbox">`).hide();
      // }
  
    });
  });  
});
  