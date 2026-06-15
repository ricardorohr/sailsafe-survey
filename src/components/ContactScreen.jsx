// Final screen before submit. Contact is clearly optional. The testing-interest
// answer is captured into survey_responses (always), separate from the contact.
const WANTS = [
  { value: 'sim_topo', label: 'Sim, topo' },
  { value: 'talvez', label: 'Talvez' },
  { value: 'prefiro_nao', label: 'Prefiro não' },
]

export default function ContactScreen({
  contact,
  onContact,
  wants,
  onWants,
  honeypot,
  onHoneypot,
  onBack,
  onSubmit,
  submitting,
  submitError,
}) {
  return (
    <div className="step contact">
      <div className="eyebrow">Quase lá</div>
      <h2 className="qtitle">Obrigado! 🙏 Suas respostas vão ajudar muito.</h2>
      <p className="contact__lead">
        Se você topar participar de testes futuros (testar um protótipo, dar feedback rápido),
        deixe um contato abaixo — totalmente opcional.
      </p>

      <div className="field">
        <label className="label" htmlFor="contact-field">
          Contato <span className="optional">opcional</span>
        </label>
        <input
          id="contact-field"
          className="input"
          type="text"
          value={contact}
          onChange={(e) => onContact(e.target.value)}
          placeholder="WhatsApp, e-mail ou Instagram"
          autoComplete="off"
        />
      </div>

      <div className="field">
        <div className="label">
          Você toparia participar de testes futuros? <span className="optional">opcional</span>
        </div>
        <div className="options" role="radiogroup" aria-label="Você toparia participar de testes futuros?">
          {WANTS.map((o) => {
            const selected = wants === o.value
            return (
              <button
                type="button"
                key={o.value}
                role="radio"
                aria-checked={selected}
                className={'option' + (selected ? ' option--selected' : '')}
                onClick={() => onWants(selected ? null : o.value)}
              >
                <span className="option__box option__box--radio" aria-hidden="true" />
                <span className="option__label">{o.label}</span>
              </button>
            )
          })}
        </div>
      </div>

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
