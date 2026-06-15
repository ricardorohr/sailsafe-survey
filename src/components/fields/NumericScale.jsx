// 0–10 scale — the willingness-to-pay question. Big, wrap-friendly tap targets
// so it's effortless on a phone (0 is a valid answer, not "empty").
const ITEMS = Array.from({ length: 11 }, (_, i) => i)

export default function NumericScale({ question, value, onChange }) {
  return (
    <div className="fieldwrap">
      <div className="scale__btns" role="radiogroup" aria-label={question.title}>
        {ITEMS.map((n) => {
          const selected = value === n
          return (
            <button
              type="button"
              key={n}
              role="radio"
              aria-checked={selected}
              aria-label={String(n)}
              className={'sc' + (selected ? ' sc--selected' : '')}
              onClick={() => onChange(n)}
            >
              {n}
            </button>
          )
        })}
      </div>
      <div className="scale__anchors">
        <span className="anchor anchor--left">{question.minLabel}</span>
        <span className="anchor anchor--right">{question.maxLabel}</span>
      </div>
    </div>
  )
}
