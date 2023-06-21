/*

  On your Google Sheet, go to File > Share > Publish to web.
  
  In the 'Link' (default) tab, choose which tab of your spreadsheet you'd like to use; and then Comma-separated values or .CSV form (not web page).
  
  Paste the link you get after you hit 'Publish' here. 
*/
var SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQHsAPcJY_X6LXCfxutA-rhqY-4luZacJBtKFF3yvuaEm4MSjA6FQBRi-sAQIFGfASKSDHlXYc32Fnv/pub?gid=541319426&single=true&output=csv";

$(document).ready(function () {
      // When the webpage is safely loaded, run the code in this function...

      Papa.parse(SPREADSHEET_URL, {
            download: true,
            header: true,
            complete: function (results) {

            // This is the entire response, but we mostly care about the data...
            console.log(results);
           
         /* The data we get is an ARRAY of OBJECTS. Each row in the spreadsheet has turned into an object.
        */
          
             console.log(results.data);
              
          // this 'forEach' function goes over every object in 'results.data'. The function takes two parameters that you can name whatever, but for simplicity I named it 'row' and 'index'. (Index is the # of that row, note that in code the index starts at 0.)
            (results.data).forEach(function (row, index) {
              
              /* To make the console not too intimidating, I stop running this when index is more than 2. */
              if(index > 2){
                return;
              }

              // Displaying this on the console, we can see each row.
                console.log(row, index);
              
              /*
              
                Objects consist of KEYS and VALUES. 'type' is a key, and its value is 'reading'.
                
                Remember that the first row of the spreadsheet  determines the key for its column, so to access the title of your row, you would write:
              */
              console.log("Title: " + row.title);
              
              // Note that variables (like the data we're using from the spreadsheet) are written without quotation marks, but we have to enclose our other text in them. (Like the SPREADSHEET_URL we provided.) 

              });

              // Now, this code displays the inspiration on the page.
            (results.data).forEach(function (row, index) {
              
              let div = $(`<div class='item'>
                <details>
                <summary>
                <h2> <span class="type">( ` + (row.type) + ` )</span> ` + row.title + `</h2>
                <span class='author'>` + row.author + `</span>
                </summary>
                <p>` + row.notes + `</p>
                <a href="` + row.link +`">Visit</a>
                </details>
                </div>`)
                .appendTo("#list");
              
              if(!row.notes || row.notes.length == 0){
                $(div).find("p").remove();
              }
              
            });
              

            }});
});

