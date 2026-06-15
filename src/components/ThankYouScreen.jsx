function BigCheck() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5l4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Shown after a successful submit (or a preview-mode submit).
export default function ThankYouScreen({ preview }) {
  return (
    <div className="step thankyou">
      <div className="thankyou__ic">
        <BigCheck />
      </div>
      <h2 className="thankyou__title">Pronto! Recebemos suas respostas.</h2>
      <p className="thankyou__text">Obrigado por ajudar a construir o SailSafe. ⛵</p>
      {preview && (
        <p className="thankyou__note">
          Modo de pré-visualização: nenhuma resposta foi enviada.
        </p>
      )}
    </div>
  )
}
