var ss = SpreadsheetApp.openById("1skHJG335stgk_tsgkh833SHSG294-809245Ewwa");
var ss1 = ss.getSheetByName("Sheet1");

function doGet(e) {
  var firstName = e.parameter.fn;
  var lastName = e.parameter.ln;
  var local = e.parameter.loc;
  var zipcode = e.parameter.zip;
  var edus = e.parameter.edu;
  var poss = e.parameter.pos;
  var path = e.parameter.path;
  var skills = e.parameter.sklz;
  var tosheet = new Array([path, firstName, lastName, local, zipcode, poss, edus, skills]);
  var lastrow = ss1.getLastRow()+1;
  ss1.getRange(lastrow, 1, 1, tosheet[0].length).setValues(tosheet);
  return ContentService.createTextOutput(tosheet);
}
