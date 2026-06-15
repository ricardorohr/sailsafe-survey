// Multiple choices. An `exclusive` option (e.g. "Nenhum desses") clears the
// others when chosen, and is cleared if any other option is chosen.
export default function MultiSelect({ question, value, otherText, onChange, onOther }) {
  const selected = Array.isArray(value) ? value : []
  const otherOpt = question.options.find((o) => o.isOther)
  const showOther = otherOpt && selected.includes(otherOpt.value)

  function toggle(opt) {
    const isOn = selected.includes(opt.value)
    let next
    if (isOn) {
      next = selected.filter((v) => v !== opt.value)
    } else if (opt.exclusive) {
      next = [opt.value]
    } else {
      const exclusiveVals = question.options.filter((o) => o.exclusive).map((o) => o.value)
      next = [...selected.filter((v) => !exclusiveVals.includes(v)), opt.value]
    }
    onChange(next)
  }

  return (
    <div className="fieldwrap">
      <div className="options" role="group" aria-label={question.title}>
        {question.options.map((opt) => {
          const on = selected.includes(opt.value)
          return (
            <button
              type="button"
              key={opt.value}
              aria-pressed={on}
              className={'option' + (on ? ' option--selected' : '')}
              onClick={() => toggle(opt)}
            >
              <span className="option__box option__box--check" aria-hidden="true" />
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
            placeholder="Especifique..."
            autoFocus
            aria-label="Especifique"
          />
        </div>
      )}
    </div>
  )
}
