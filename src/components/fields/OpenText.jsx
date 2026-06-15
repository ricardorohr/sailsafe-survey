// Free-text answer (used for the open follow-ups).
export default function OpenText({ question, value, onChange }) {
  return (
    <div className="fieldwrap">
      <textarea
        className="textarea"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder || 'Escreva aqui...'}
        rows={4}
        aria-label={question.title}
      />
    </div>
  )
}
