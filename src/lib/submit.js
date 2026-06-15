import { SHEETS_URL, isConfigured } from './config'
import { questions } from '../data/questions'

// Is a follow-up question currently relevant, given the answers so far?
function followUpVisible(followUp, answers) {
  if (!followUp) return false
  if (!followUp.showIf) return true
  return followUp.showIf(answers)
}

// Turn one field's raw UI value into the value we store.
// - single: the option value, OR the typed text when "Outro" is chosen
// - multi:  array of option values, with "Outro" swapped for the typed text
// - likert/scale: a number (0 is valid for the 0–10 scale)
// - open:   trimmed text, or null when empty
function normalizeValue(field, value, otherText) {
  const otherOpt = (field.options || []).find((o) => o.isOther)
  const other = (otherText || '').trim()

  if (field.type === 'single') {
    if (value == null || value === '') return null
    if (otherOpt && value === otherOpt.value) return other || null
    return value
  }
  if (field.type === 'multi') {
    const arr = Array.isArray(value) ? value : []
    return arr
      .map((v) => (otherOpt && v === otherOpt.value ? other : v))
      .filter((v) => v != null && v !== '')
  }
  if (field.type === 'likert' || field.type === 'scale') {
    return value == null ? null : Number(value)
  }
  // open text
  if (value == null) return null
  const t = String(value).trim()
  return t === '' ? null : t
}

// Build the answers object (one row in the "Respostas" tab). No personal
// contact info here — that goes to "Contatos" only if the person leaves it.
export function buildResponsePayload({ submissionId, answers, otherTexts }) {
  const payload = { submission_id: submissionId }

  for (const q of questions) {
    payload[q.name] = normalizeValue(q, answers[q.name], otherTexts[q.name])
    if (q.followUp) {
      payload[q.followUp.name] = followUpVisible(q.followUp, answers)
        ? normalizeValue(q.followUp, answers[q.followUp.name], otherTexts[q.followUp.name])
        : null
    }
  }

  // Testing interest is captured here (always), so the signal survives even
  // when the person leaves no contact.
  payload.wants_future_tests = answers.wants_future_tests || null

  return payload
}

/**
 * Submit a completed survey to the Google Apps Script endpoint.
 * Returns one of:
 *   { ok: true }                  sent to the Sheet
 *   { ok: true, preview: true }   no URL configured — nothing sent (demo mode)
 *   { ok: true, dropped: true }   honeypot tripped — silently dropped
 *   { ok: false, error }          could not reach the endpoint — let user retry
 */
export async function submitSurvey({ submissionId, answers, otherTexts, contact, honeypot }) {
  // Spam protection: a real person never fills the hidden honeypot field.
  if (honeypot && honeypot.trim() !== '') {
    return { ok: true, dropped: true }
  }

  const response = buildResponsePayload({ submissionId, answers, otherTexts })
  const contactClean = (contact || '').trim()
  const contactRow = contactClean ? { submission_id: submissionId, contact: contactClean } : null
  const payload = { response, contact: contactRow }

  // No endpoint configured yet: let the flow complete for previewing, no send.
  if (!isConfigured) {
    console.info(
      '[SailSafe] VITE_SHEETS_URL não configurado — modo pré-visualização. Resposta NÃO enviada.',
      payload,
    )
    return { ok: true, preview: true }
  }

  try {
    // Posted as text/plain so the browser treats this as a "simple" request and
    // skips the CORS preflight (Apps Script can't answer preflight). We don't
    // read the opaque response — the write happens server-side regardless.
    // A real connectivity failure still rejects, so the user can retry.
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })
    return { ok: true }
  } catch (err) {
    console.error('[SailSafe] Falha ao enviar para o Google Sheets:', err)
    return { ok: false, error: err.message }
  }
}
