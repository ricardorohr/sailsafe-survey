import HealthPassport from './HealthPassport'

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// The pitch. Short and punchy on purpose — long blocks are where people quit.
// Each benefit wraps its text in one span so it flows as a sentence (not as
// separate flex items per word).
export default function ConceptScreen({ onBack, onNext }) {
  return (
    <div className="step concept">
      <div className="eyebrow">A ideia</div>
      <h2 className="concept__title">Um passaporte digital de saúde do seu barco</h2>
      <p className="concept__text">
        Veja cada parte importante do barco (motor, casco, baterias, bomba de porão) com um
        status simples: verde, amarelo ou vermelho, baseado no tempo e no uso real.
      </p>

      <HealthPassport />

      <div className="benefits">
        <div className="benefit">
          <span className="benefit__ic">
            <Check />
          </span>
          <span className="benefit__text">
            <strong>Avisa</strong> a hora de cuidar de cada item, antes de virar problema.
          </span>
        </div>
        <div className="benefit">
          <span className="benefit__ic">
            <Check />
          </span>
          <span className="benefit__text">
            <strong>Explica</strong> como resolver, em linguagem simples.
          </span>
        </div>
        <div className="benefit">
          <span className="benefit__ic">
            <Check />
          </span>
          <span className="benefit__text">
            <strong>Guarda</strong> o histórico de tudo o que já foi feito.
          </span>
        </div>
      </div>

      <div className="nav">
        <button type="button" className="btn btn--ghost" onClick={onBack}>
          Voltar
        </button>
        <button type="button" className="btn btn--primary" onClick={onNext}>
          Continuar
        </button>
      </div>
    </div>
  )
}
