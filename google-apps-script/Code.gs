/**
 * SailSafe — Google Apps Script backend for the survey.
 *
 * Saves each submission into two tabs of THIS spreadsheet:
 *   - "Respostas"  → all survey answers (one row per submission)
 *   - "Contatos"   → optional contact info, only when the person leaves it
 * They share a `submission_id` so you can join them later if needed.
 *
 * ──────────────────────────── ONE-TIME SETUP ────────────────────────────
 * 1. Create a Google Sheet (go to https://sheets.new). Name it e.g. "SailSafe".
 * 2. In the Sheet: Extensions → Apps Script. Delete any sample code and paste
 *    this entire file. Save.
 * 3. Click Deploy → New deployment.
 *      - Select type: Web app
 *      - Description: SailSafe survey
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Click Deploy, authorize when asked, and COPY the Web app URL
 *    (it ends with /exec).
 * 4. Paste that URL into the survey's .env file as VITE_SHEETS_URL.
 *
 * Notes
 * - The survey posts as text/plain on purpose, so the browser skips the CORS
 *   preflight that Apps Script can't answer. Writes are reliable.
 * - Only this script can write. The Sheet itself stays private to your Google
 *   account — that is your access control, so keep the Sheet unshared (or share
 *   only with people who should see responses).
 * - If you change the survey questions later, no edits are needed here: new
 *   answer fields automatically become new columns.
 *
 * After ANY change to this file, redeploy: Deploy → Manage deployments → edit
 * (pencil) → Version: New version → Deploy. (Same URL stays valid.)
 */

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents)
    var ss = SpreadsheetApp.getActiveSpreadsheet()
    if (body.response) writeRow_(ss, 'Respostas', body.response)
    if (body.contact) writeRow_(ss, 'Contatos', body.contact)
    return json_({ ok: true })
  } catch (err) {
    return json_({ ok: false, error: String(err) })
  }
}

// Opening the /exec URL in a browser shows this — a quick "it's alive" check.
function doGet() {
  return json_({ ok: true, service: 'sailsafe-survey' })
}

function writeRow_(ss, tabName, obj) {
  var sheet = ss.getSheetByName(tabName) || ss.insertSheet(tabName)

  // Stamp every row with the server time (first column).
  var data = { created_at: new Date() }
  Object.keys(obj).forEach(function (k) {
    data[k] = obj[k]
  })

  var headers =
    sheet.getLastRow() > 0 ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : []

  // Add any new keys as columns so the sheet always matches the survey.
  Object.keys(data).forEach(function (k) {
    if (headers.indexOf(k) === -1) headers.push(k)
  })
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])

  var row = headers.map(function (h) {
    var v = data[h]
    if (Array.isArray(v)) return v.join(', ') // multi-select → readable list
    return v === undefined || v === null ? '' : v
  })
  sheet.appendRow(row)
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
