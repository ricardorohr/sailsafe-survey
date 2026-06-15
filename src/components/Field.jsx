import SingleSelect from './fields/SingleSelect'
import MultiSelect from './fields/MultiSelect'
import LikertScale from './fields/LikertScale'
import NumericScale from './fields/NumericScale'
import OpenText from './fields/OpenText'

// Renders the right input for a field config (a main question OR a follow-up).
// This is what makes the survey config-driven: add a type here, use it anywhere.
export default function Field({ field, answers, otherTexts, onAnswer, onOther }) {
  const name = field.name
  const common = {
    question: field,
    value: answers[name],
    onChange: (v) => onAnswer(name, v),
  }

  switch (field.type) {
    case 'single':
      return <SingleSelect {...common} otherText={otherTexts[name]} onOther={(t) => onOther(name, t)} />
    case 'multi':
      return <MultiSelect {...common} otherText={otherTexts[name]} onOther={(t) => onOther(name, t)} />
    case 'likert':
      return <LikertScale {...common} />
    case 'scale':
      return <NumericScale {...common} />
    case 'open':
      return <OpenText {...common} />
    default:
      return null
  }
}
