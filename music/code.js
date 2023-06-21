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


var SPREADSHEET_ID_AND_TAB = "1gLyh6gv41vl9H1fBmjFrGfKip9dKkvIu6o8sccTw2lY/Music";


let song_ratings = 0;


$(document).ready(function () {
  
  // this is a jquery function that parses JSON
  
  $.getJSON("https://opensheet.elk.sh/" + SPREADSHEET_ID_AND_TAB, function (data) {
    
    // This shows me everything
    console.log(data);
    

    // This function goes through the array of data, accessing each row/item in the array one by one and applying the code within for each. We also can use the index, if desired.
    data.forEach(function (row, index) {
      
    
      console.log(row);
      
    /* Your first row's headers designate the KEYs for your data.
    */  
      
      $(`<tr type="` + row.Vibe +`">
          
          <td info="artist">` + row.Artist + `</td></a>
          <td info="title">` + row.Title + `</td>
          <td info="rating">` + row.Rating + `</td>
          <td info="recommender">` + row.From + `</td>
          <td><a href="` + row.Link +`" target="_blank">Listen</a></td>
        </tr>`)
        .appendTo("#music");
      
      song_ratings = song_ratings + parseInt(row.Rating);
      
    })
    
    
  // once we're done iterating, average it out
  $("span[average]").text( (song_ratings / data.length) );
    
  });
  
});  


  new Tablesort(document.getElementById('music'));