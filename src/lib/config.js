// The Google Apps Script Web App URL that receives survey submissions.
// Set it in .env as VITE_SHEETS_URL (see google-apps-script/Code.gs for setup).
export const SHEETS_URL = import.meta.env.VITE_SHEETS_URL

// When the URL is missing (e.g. local preview before setup), the form still
// renders and works for previewing, but submissions aren't sent.
export const isConfigured = Boolean(SHEETS_URL)
