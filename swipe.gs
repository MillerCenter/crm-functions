/**
 * Extracts event information from rest api
*/

function pullJSON() {
  var url = "URL";
  var sheet_name = "SHEET";
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var sheet = ss.getSheetByName(sheet_name);
  
  // Clear range
  dataRange = sheet.getRange(6, 5, 1000, 300); 
  dataRange.clearContent();
  
  var response = UrlFetchApp.fetch(url); 
  var data = JSON.parse(response.getContentText());   
  var rows = [],
      data;

  for (i = 0; i < data.length; i++) {
    column_length = data[i].names.length + 2;
    
    var merged = flatten(data[i].names);
    var arrays = [];
    arrays.push(data[i].event_name, data[i].date,merged);
    var flat = flatten(arrays);
    rows.push([flat]);

    dataRange = sheet.getRange(i + 6, 5, 1, flat.length); 
    dataRange.setValues([flat]);
  }
}

function flatten(arrayOfArrays){
  return [].concat.apply([], arrayOfArrays);
}