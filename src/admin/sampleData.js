import { questions } from '../data/questions'

// Demo data so the dashboard preview is viewable without a live data source.
// Shape matches what survey_responses / survey_contacts return.
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function sampleValue(q) {
  if (q.type === 'single') return pick(q.options).value
  if (q.type === 'multi') {
    const n = 1 + Math.floor(Math.random() * Math.min(3, q.options.length))
    const shuffled = [...q.options].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, n).map((o) => o.value)
  }
  if (q.type === 'likert') return 1 + Math.floor(Math.random() * 5)
  // scale 0–10 — skew a little positive so the demo looks like a real signal
  if (q.type === 'scale') return Math.max(0, Math.min(10, 4 + Math.floor(Math.random() * 7)))
  return null
}

const SAMPLE_OPEN = [
  'O motor falhou no meio do passeio e tivemos que voltar rebocados.',
  'Bateria descarregou e não consegui dar partida na rampa.',
  'Sempre verifico combustível, coletes e a previsão do tempo.',
  'Acho a ideia ótima, principalmente o aviso de quando fazer cada coisa.',
  'Tenho receio de mais um app pra alimentar, mas o status visual ajuda.',
]
const SAMPLE_CONTACTS = ['(11) 98888-1212', 'maria.veleira@email.com', '@catamarã.sp', 'joao.angra@gmail.com', '(21) 99777-3030']

export function makeSampleData(n = 48) {
  const responses = []
  const contacts = []
  for (let i = 0; i < n; i++) {
    const created = new Date(Date.now() - i * 5.5 * 36e5).toISOString()
    const row = { id: 'sample-' + i, created_at: created, submission_id: 'sub-' + i }
    for (const q of questions) {
      row[q.name] = sampleValue(q)
      if (q.followUp) row[q.followUp.name] = Math.random() < 0.28 ? pick(SAMPLE_OPEN) : null
    }
    row.wants_future_tests = pick(['sim_topo', 'sim_topo', 'talvez', 'prefiro_nao', null])
    responses.push(row)

    if (Math.random() < 0.32) {
      contacts.push({
        id: 'c-' + i,
        created_at: created,
        submission_id: row.submission_id,
        contact: pick(SAMPLE_CONTACTS),
      })
    }
  }
  return { responses, contacts }
}
