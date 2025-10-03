function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('Digital India Farming and Monitoring System');
}

function getUserDetails(token, sheetName) {
  var sheetId = "1s28ka9-ve2x5C3ew02HeEfN71C2i17DzrfF9aBPQnoc"; // Google Sheet ID
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  
  if (!sheet) {
    return "Invalid Sheet!";
  }

  var data = sheet.getDataRange().getValues();
  
  if (data.length < 2) {
    return "No data found!";
  }

  var headers = data[0]; // Get column headers from the first row

  for (var i = 1; i < data.length; i++) {
    if (data[i][10].toString().trim() == token.trim()) { // Check column K for token
      var userDetails = {};
      for (var j = 0; j < headers.length; j++) {
        userDetails[headers[j]] = data[i][j]; // Map header names to row values
      }
      return JSON.stringify(userDetails); // Return JSON string
    }
  }
  return "Invalid Token!";
}

function verifyBIN(binNumber) {
  return getUserDetails(binNumber, "CS"); // Fetch data from CS sheet
}

function verifyFLINumber(fliTokenNumber) {
  return getUserDetails(fliTokenNumber, "Registration"); // Fetch data from Registration sheet
}
