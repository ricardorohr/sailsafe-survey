import Field from './Field'

function WarnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M10 5.5v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10" cy="14" r="1.1" fill="currentColor" />
    </svg>
  )
}

// One question per screen. Renders its section eyebrow, title, the field, an
// optional inline follow-up (only when its showIf passes), validation error,
// and the Back/Next nav.
export default function QuestionCard({
  question,
  answers,
  otherTexts,
  error,
  onAnswer,
  onOther,
  onBack,
  onNext,
}) {
  const followUp = question.followUp
  const showFollow = followUp && (!followUp.showIf || followUp.showIf(answers))

  return (
    <div className="step">
      {question.section && <div className="eyebrow">{question.section}</div>}
      <h2 className="qtitle">{question.title}</h2>
      {question.help && <p className="qhelp">{question.help}</p>}

      <Field
        field={question}
        answers={answers}
        otherTexts={otherTexts}
        onAnswer={onAnswer}
        onOther={onOther}
      />

      {showFollow && (
        <div className="followup">
          <h3 className="qtitle qtitle--sub">{followUp.title}</h3>
          <Field
            field={followUp}
            answers={answers}
            otherTexts={otherTexts}
            onAnswer={onAnswer}
            onOther={onOther}
          />
        </div>
      )}

      {error && (
        <div className="fielderror" role="alert">
          <WarnIcon />
          {error}
        </div>
      )}

      <div className="nav">
        <button type="button" className="btn btn--ghost" onClick={onBack}>
          Voltar
        </button>
        <button type="button" className="btn btn--primary" onClick={onNext}>
          Próxima
        </button>
      </div>
    </div>
  )
}
