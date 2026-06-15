// One choice. Picking the "Outro" option reveals a free-text input.
export default function SingleSelect({ question, value, otherText, onChange, onOther }) {
  const otherOpt = question.options.find((o) => o.isOther)
  const showOther = otherOpt && value === otherOpt.value

  return (
    <div className="fieldwrap">
      <div className="options" role="radiogroup" aria-label={question.title}>
        {question.options.map((opt) => {
          const selected = value === opt.value
          return (
            <button
              type="button"
              key={opt.value}
              role="radio"
              aria-checked={selected}
              className={'option' + (selected ? ' option--selected' : '')}
              onClick={() => onChange(opt.value)}
            >
              <span className="option__box option__box--radio" aria-hidden="true" />
              <span className="option__label">{opt.label}</span>
            </button>
          )
        })}
      </div>

      {showOther && (
        <div className="other">
          <input
            className="input"
            type="text"
            value={otherText || ''}
            onChange={(e) => onOther(e.target.value)}
            placeholder={question.otherPlaceholder || 'Conte um pouco mais...'}
            autoFocus
            aria-label="Especifique"
          />
        </div>
      )}
    </div>
  )
}
