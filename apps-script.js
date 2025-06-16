// Google Apps Script for Orbital Defence Elite leaderboard
// Replace SHEET_ID with your Google Sheet ID
const SHEET_ID = 'YOUR_SHEET_ID_HERE';
const SHEET_NAME = 'Sheet1';

function getSheet() {
  return SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
}

function doGet(e) {
  const values = getSheet().getDataRange().getValues();
  return ContentService.createTextOutput(JSON.stringify(values))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
}

function doPost(e) {
  const payload = JSON.parse(e.postData.contents);
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  let updated = false;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][0] === payload.initials) {
      const wave = parseInt(rows[i][1], 10);
      const time = parseInt(rows[i][2], 10);
      if (payload.wave > wave || (payload.wave === wave && payload.time < time)) {
        sheet.getRange(i + 1, 1, 1, 4).setValues([[payload.initials, payload.wave, payload.time, payload.date]]);
      }
      updated = true;
      break;
    }
  }
  if (!updated) {
    sheet.appendRow([payload.initials, payload.wave, payload.time, payload.date]);
  }
  return ContentService.createTextOutput('ok')
    .setHeader('Access-Control-Allow-Origin', '*');
}

function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*');
}
