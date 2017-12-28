/**
 * Moves members added from Google Form to Memebers sheet in CRM
 * Change this to on submit form 
*/

// This function runs anytime a cell is edited in the CRM - consider changing to run on form submit?
function onEdit(e) {
  var ss = e.source;
  var s = ss.getActiveSheet();
  var s_name = s.getName();
  var r = e.range;
  
  var actionSheet = 'Membership Applications';

  // Get the row and column of the active cell.
  var rowIndex = r.getRowIndex();
  var colIndex = r.getColumnIndex();
  
  // Get # of columns in the active sheet - action cell
  var colNumber = s.getLastColumn() - 1;

  // if this is the correct sheet
  if (s_name == actionSheet) {
    if (ss.getSheetByName("Members")) { 
      
      // set our target sheet and target range
      var targetSheet = ss.getSheetByName("Members");

      var colVals = targetSheet.getRange("A4:A").getValues();
      var lastVal = colVals.filter(String).length + 4;
      
      var targetRange = targetSheet.getRange(lastVal, 1, 1, colNumber);
      // get our source range/row
      var sourceRange = s.getRange(rowIndex, 1, 1, colNumber);

      sourceRange.copyTo(targetRange);
      
      // Uncomment to delete row after
      //s.deleteRow(rowIndex);
    }
  }
}

function rowWithLastValue(range, firstRow) {
  // range is passed to indicated spreadsheet cells
  for (var i = range.length - 1;  i >= 0;  -- i) {
    if (range[i] != "")  return i + firstRow;
  }
  return firstRow;
}