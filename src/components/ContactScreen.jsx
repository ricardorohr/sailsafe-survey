// Final screen. Asks about joining the beta; if they're in (or maybe), it
// reveals an email field. The email is stored separately from the answers
// (privacy by design), reusing the same `contact` channel as before.
const BETA_OPTIONS = [
  { value: 'sim_quero_beta', label: 'Sim, quero entrar no beta' },
  { value: 'talvez', label: 'Talvez, me conta mais perto do lançamento' },
  { value: 'prefiro_nao', label: 'Por enquanto, prefiro não' },
]

// Which answers reveal the email field. Kept here AND mirrored in App.jsx's
// onBeta handler (which clears the email if they switch to a non-revealing answer).
export const BETA_EMAIL_REVEAL = ['sim_quero_beta', 'talvez']

export default function ContactScreen({
  contact,
  onContact,
  beta,
  onBeta,
  honeypot,
  onHoneypot,
  onBack,
  onSubmit,
  submitting,
  submitError,
}) {
  const showEmail = BETA_EMAIL_REVEAL.includes(beta)

  return (
    <div className="step contact">
      <div className="eyebrow">Quase lá</div>
      <h2 className="qtitle">Obrigado! 🙏 Suas respostas já ajudam muito.</h2>
      <p className="contact__lead">
        Vamos abrir uma versão beta para um grupo pequeno testar antes de todo mundo, com vagas
        limitadas. Se quiser, a gente te chama para essa primeira leva.
      </p>

      <div className="field">
        <div className="label">
          Quando lançarmos a versão beta do SailSafe, você quer ser um dos primeiros a testar?{' '}
          <span className="optional">opcional</span>
        </div>
        <div
          className="options"
          role="radiogroup"
          aria-label="Quer ser um dos primeiros a testar a versão beta?"
        >
          {BETA_OPTIONS.map((o) => {
            const selected = beta === o.value
            return (
              <button
                type="button"
                key={o.value}
                role="radio"
                aria-checked={selected}
                className={'option' + (selected ? ' option--selected' : '')}
                onClick={() => onBeta(selected ? null : o.value)}
              >
                <span className="option__box option__box--radio" aria-hidden="true" />
                <span className="option__label">{o.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {showEmail && (
        <div className="field">
          <label className="label" htmlFor="beta-email">
            Seu melhor e-mail para o convite da beta
          </label>
          <input
            id="beta-email"
            className="input"
            type="email"
            inputMode="email"
            value={contact}
            onChange={(e) => onContact(e.target.value)}
            placeholder="voce@email.com"
            autoComplete="email"
            autoFocus
          />
        </div>
      )}

      {/* Honeypot — invisible to humans. If a bot fills it, the submission is
          silently dropped in submit.js. */}
      <input
        className="hp"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => onHoneypot(e.target.value)}
        placeholder="Deixe este campo em branco"
      />

      {submitError && (
        <div className="submit-error" role="alert">
          {submitError}
        </div>
      )}

      <div className="nav">
        <button type="button" className="btn btn--ghost" onClick={onBack} disabled={submitting}>
          Voltar
        </button>
        <button type="button" className="btn btn--primary" onClick={onSubmit} disabled={submitting}>
          {submitting ? (
            <>
              <span className="spinner" /> Enviando…
            </>
          ) : (
            'Enviar respostas'
          )}
        </button>
      </div>
    </div>
  )
}
