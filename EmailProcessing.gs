function sendEmails() {
  var sheet_name = "Member Processing";
  var admin_email = "TO_EMAIL";
  var cc_email = "CC_EMAIL";
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var sheet = ss.getSheetByName(sheet_name);

  var startRow = 3;  
  var numRows = 50;   

  var dataRange = sheet.getRange(startRow, 1, numRows, 5)

  var data = dataRange.getValues();
  
  var message = "Hi,<br><br>This is an automated message. Here are the weekly Miller Center members that need swipe access: <br>";
  
  for (i in data) {
    var row = data[i];
    var first_name = row[1];  
    var last_name = row[2];  
    var emailAddress = row[3];  
    var studentID = row[4]; 
    if (emailAddress != "") {
      message += "<br><p>Name: "+ first_name + " " + last_name + "</p><p>Email: " + emailAddress +  "</p><p>Student ID: " + studentID +  "</p><br>";    
    }
  }
  
  if (message != "") {
    MailApp.sendEmail({to: admin_email, cc:cc_email, subject: "Weekly emails", htmlBody: message,});
  }
}