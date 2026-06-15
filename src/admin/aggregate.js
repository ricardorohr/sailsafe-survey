import { questions } from '../data/questions'

// Human label for a stored option value (free-text "Outro" values pass through).
function labelFor(q, value) {
  const opt = (q.options || []).find((o) => o.value === value)
  return opt ? opt.label : value
}

// Turn an array of response rows into everything the dashboard renders.
export function aggregate(responses) {
  const total = responses.length

  const perQuestion = questions
    .map((q) => {
      if (q.type === 'single') {
        const counts = {}
        let answered = 0
        for (const r of responses) {
          const v = r[q.name]
          if (v == null || v === '') continue
          answered++
          counts[v] = (counts[v] || 0) + 1
        }
        const items = Object.entries(counts)
          .map(([value, count]) => ({ label: labelFor(q, value), value, count }))
          .sort((a, b) => b.count - a.count)
        return { q, kind: 'bars', items, answered }
      }
      if (q.type === 'multi') {
        const counts = {}
        let answered = 0
        for (const r of responses) {
          const arr = r[q.name]
          if (!Array.isArray(arr) || arr.length === 0) continue
          answered++
          for (const v of arr) counts[v] = (counts[v] || 0) + 1
        }
        const items = Object.entries(counts)
          .map(([value, count]) => ({ label: labelFor(q, value), value, count }))
          .sort((a, b) => b.count - a.count)
        return { q, kind: 'bars', items, answered, multi: true }
      }
      if (q.type === 'likert' || q.type === 'scale') {
        const min = q.type === 'likert' ? 1 : 0
        const max = q.type === 'likert' ? 5 : 10
        const dist = {}
        for (let i = min; i <= max; i++) dist[i] = 0
        let sum = 0
        let n = 0
        for (const r of responses) {
          const v = r[q.name]
          if (v == null) continue
          const num = Number(v)
          if (Number.isNaN(num)) continue
          dist[num] = (dist[num] || 0) + 1
          sum += num
          n++
        }
        const items = []
        for (let i = min; i <= max; i++) items.push({ label: String(i), value: i, count: dist[i] || 0 })
        return { q, kind: 'dist', items, answered: n, avg: n ? sum / n : null }
      }
      return null
    })
    .filter(Boolean)

  // Open-text answers (the follow-up questions).
  const openQuestions = []
  for (const q of questions) {
    if (q.type === 'open') {
      openQuestions.push({ q, answers: responses.map((r) => r[q.name]).filter(Boolean) })
    }
    if (q.followUp && q.followUp.type === 'open') {
      const fu = q.followUp
      openQuestions.push({ q: fu, answers: responses.map((r) => r[fu.name]).filter(Boolean) })
    }
  }

  // Beta interest (lives on responses, not in the questions array).
  const betaCounts = {}
  for (const r of responses) {
    const v = r.beta_interesse
    if (!v) continue
    betaCounts[v] = (betaCounts[v] || 0) + 1
  }

  const intent = perQuestion.find((s) => s.q.name === 'intencao_uso')

  return {
    total,
    perQuestion,
    openQuestions,
    betaCounts,
    intentAvg: intent ? intent.avg : null,
  }
}
