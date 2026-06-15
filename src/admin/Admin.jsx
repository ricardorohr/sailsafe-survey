import { useMemo } from 'react'
import './admin.css'
import { aggregate } from './aggregate'
import { makeSampleData } from './sampleData'
import Logo from '../components/Logo'

/* NOTE: With the Google Sheets backend, your real analysis lives in the Sheet
   (the "Respostas" and "Contatos" tabs). This /admin page is a self-contained
   PREVIEW of a dashboard layout, running on sample data — handy for design, not
   wired to live responses. */

/* ------------------------------------------------------------------ helpers */
function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  } catch (e) {
    return ''
  }
}
function toCSV(rows) {
  if (!rows || !rows.length) return ''
  const cols = Object.keys(rows[0])
  const esc = (v) => {
    if (v == null) return ''
    if (Array.isArray(v)) v = v.join('; ')
    v = String(v).replace(/"/g, '""')
    return /[",\n]/.test(v) ? `"${v}"` : v
  }
  return [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\n')
}
function download(name, text) {
  const blob = new Blob([text], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  URL.revokeObjectURL(url)
}

/* ----------------------------------------------------------- presentational */
function Kpi({ label, value, sub }) {
  return (
    <div className="adm-kpi">
      <div className="adm-kpi__value">{value}</div>
      <div className="adm-kpi__label">{label}</div>
      {sub && <div className="adm-kpi__sub">{sub}</div>}
    </div>
  )
}

function QuestionCard({ stat }) {
  const max = Math.max(1, ...stat.items.map((i) => i.count))
  return (
    <div className="adm-card">
      <h3 className="adm-card__title">
        {stat.q.title}
        {stat.multi && <span className="adm-tag">múltipla</span>}
        {stat.kind === 'dist' && stat.avg != null && (
          <span className="adm-avg">média {stat.avg.toFixed(1)}</span>
        )}
      </h3>
      <div className="adm-bars">
        {stat.items.map((it) => (
          <div className="adm-bar" key={String(it.value)}>
            <span className="adm-bar__label" title={it.label}>
              {it.label}
            </span>
            <span className="adm-bar__track">
              <span className="adm-bar__fill" style={{ width: (it.count / max) * 100 + '%' }} />
            </span>
            <span className="adm-bar__count">{it.count}</span>
          </div>
        ))}
        {stat.items.length === 0 && <p className="adm-empty">Sem respostas ainda.</p>}
      </div>
    </div>
  )
}

/* --------------------------------------------------------------------- main */
export default function Admin() {
  const { responses: rows, contacts } = useMemo(() => makeSampleData(48), [])
  const data = useMemo(() => aggregate(rows), [rows])

  const simTopo = data.wantsCounts.sim_topo || 0
  const talvez = data.wantsCounts.talvez || 0
  const pctWouldTest = data.total ? Math.round(((simTopo + talvez) / data.total) * 100) : 0
  const hasOpen = data.openQuestions.some((o) => o.answers.length)

  return (
    <div className="adm">
      <header className="adm__bar">
        <div className="adm__brand">
          <Logo className="adm__mark" />
          <span>
            SailSafe <span className="adm__brandsub">· Painel</span>
          </span>
        </div>
        <div className="adm__actions">
          <span className="adm__demo">dados de exemplo</span>
          <button className="adm__btn" onClick={() => download('sailsafe-exemplo.csv', toCSV(rows))}>
            Exportar CSV
          </button>
        </div>
      </header>

      <main className="adm__main">
        <div className="adm__note">
          Prévia do layout com dados de exemplo. As respostas reais ficam no seu Google Sheet
          (abas <strong>Respostas</strong> e <strong>Contatos</strong>).
        </div>

        <section className="adm__kpis">
          <Kpi label="Respostas" value={data.total} />
          <Kpi
            label="Intenção média (0–10)"
            value={data.intentAvg != null ? data.intentAvg.toFixed(1) : '—'}
            sub="chance de testar e pagar"
          />
          <Kpi label="Testariam o app" value={pctWouldTest + '%'} sub={`${simTopo} disseram "Sim, topo"`} />
          <Kpi label="Contatos deixados" value={contacts.length} />
        </section>

        <section className="adm__grid">
          {data.perQuestion.map((stat) => (
            <QuestionCard key={stat.q.name} stat={stat} />
          ))}
        </section>

        {hasOpen && (
          <section className="adm__section">
            <h2 className="adm__h2">Respostas abertas</h2>
            {data.openQuestions
              .filter((o) => o.answers.length)
              .map((o) => (
                <div className="adm-card" key={o.q.name}>
                  <h3 className="adm-card__title">
                    {o.q.title} <span className="adm-tag">{o.answers.length}</span>
                  </h3>
                  <ul className="adm-quotes">
                    {o.answers.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </section>
        )}

        <section className="adm__section">
          <div className="adm__sectionhead">
            <h2 className="adm__h2">Contatos ({contacts.length})</h2>
            {contacts.length > 0 && (
              <button
                className="adm__btn adm__btn--ghost"
                onClick={() => download('sailsafe-contatos-exemplo.csv', toCSV(contacts))}
              >
                Exportar contatos
              </button>
            )}
          </div>
          {contacts.length === 0 ? (
            <p className="adm-empty">Nenhum contato ainda.</p>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Contato</th>
                  <th>Quando</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id}>
                    <td>{c.contact}</td>
                    <td>{fmtDate(c.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  )
}
