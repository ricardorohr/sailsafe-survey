import Logo from './Logo'

// Opening / consent screen. The "Vamos começar" tap is the explicit LGPD consent.
export default function IntroScreen({ onNext }) {
  return (
    <div className="step intro">
      <Logo className="intro__mark" />
      <h1 className="intro__title">SailSafe — Pesquisa com donos de barco</h1>
      <p className="intro__lead">
        Oi! Estamos desenvolvendo um app para ajudar donos de barco de lazer a cuidar da
        manutenção e navegar com mais tranquilidade. São ~5 minutos. Suas respostas são
        confidenciais e usadas só para o desenvolvimento do produto. Participação é
        voluntária.
      </p>

      <div className="chips">
        <span className="chip">≈ 5 minutos</span>
        <span className="chip">Confidencial</span>
        <span className="chip">Anônimo por padrão</span>
      </div>

      <button type="button" className="btn btn--primary btn--block intro__cta" onClick={onNext}>
        Vamos começar
      </button>

      <p className="consent">
        Ao tocar em “Vamos começar”, você concorda em participar voluntariamente desta
        pesquisa. Suas respostas são confidenciais e usadas apenas para o desenvolvimento do
        produto (LGPD). Se você deixar um contato no final, ele será usado só para um eventual
        follow-up.
      </p>
    </div>
  )
}
