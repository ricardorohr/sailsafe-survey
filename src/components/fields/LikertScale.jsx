// 1–5 Likert. Larger touch targets than a radio row, with anchor labels.
const ITEMS = [1, 2, 3, 4, 5]

export default function LikertScale({ question, value, onChange }) {
  return (
    <div className="fieldwrap">
      <div className="likert__btns" role="radiogroup" aria-label={question.title}>
        {ITEMS.map((n) => {
          const selected = value === n
          return (
            <button
              type="button"
              key={n}
              role="radio"
              aria-checked={selected}
              aria-label={String(n)}
              className={'lk' + (selected ? ' lk--selected' : '')}
              onClick={() => onChange(n)}
            >
              {n}
            </button>
          )
        })}
      </div>
      <div className="likert__anchors">
        <span className="anchor anchor--left">{question.minLabel}</span>
        <span className="anchor anchor--right">{question.maxLabel}</span>
      </div>
    </div>
  )
}
