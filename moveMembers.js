/**
 * Moves members added from Google Form to Memebers sheet in CRM
*/

function onEdit(e) {
  // https://developers.google.com/apps-script/guides/triggers/events#google_sheets_events
  var ss = e.source;
  var s = ss.getActiveSheet();
  var r = e.range;
  
  var actionCol = 1;

  // Get the row and column of the active cell.
  var rowIndex = r.getRowIndex();
  var colIndex = r.getColumnIndex();
  
  // Get # of columns in the active sheet - action cell
  var colNumber = s.getLastColumn()-1;
  // if our action/status col is changed to ok do stuff
  if (e.value == "yes" && colIndex == actionCol) {
    if (ss.getSheetByName("Members")) { 
      // set our target sheet and target range
      var targetSheet = ss.getSheetByName("Members");
      r.setValue("processing");
      
      var colVals = targetSheet.getRange("A4:A").getValues();
      var lastVal = colVals.filter(String).length + 4;
      
      var targetRange = targetSheet.getRange(lastVal, 1, 1, colNumber);
      // get our source range/row
      var sourceRange = s.getRange(rowIndex, 2, 1, colNumber);

      sourceRange.copyTo(targetRange);
      // Uncomment to delete row after copied
      //s.deleteRow(rowIndex);
      r.setValue("moved");
    }
  }
}

function rowWithLastValue(range, firstRow) {
  // range is passed as an array of values from the indicated spreadsheet cells.
  for (var i = range.length - 1;  i >= 0;  -- i) {
    if (range[i] != "")  return i + firstRow;
  }
  return firstRow;
}