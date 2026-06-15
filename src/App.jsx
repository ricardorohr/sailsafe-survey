import { useEffect, useMemo, useRef, useState } from 'react'
import { questions, TOTAL_QUESTIONS } from './data/questions'
import { submitSurvey } from './lib/submit'
import { isConfigured } from './lib/config'

import Logo from './components/Logo'
import ProgressBar from './components/ProgressBar'
import ConfigBanner from './components/ConfigBanner'
import IntroScreen from './components/IntroScreen'
import ConceptScreen from './components/ConceptScreen'
import QuestionCard from './components/QuestionCard'
import ContactScreen from './components/ContactScreen'
import ThankYouScreen from './components/ThankYouScreen'

// One submission id, generated client-side, written to BOTH tables so responses
// and (optional) contact can be re-joined later while staying separate by default.
function newSubmissionId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// The ordered screen sequence: intro → Q1..Q11 → concept → Q12..Q15 → contact → thanks.
// Follow-ups (Q8a/Q9a/Q12a) are NOT steps here — they render inline inside their
// question, so the progress denominator stays a stable "de 15".
function buildSteps() {
  const out = [{ kind: 'intro' }]
  questions.forEach((q) => {
    if (q.id === 'q12') out.push({ kind: 'concept' })
    out.push({ kind: 'question', question: q })
  })
  out.push({ kind: 'contact' })
  out.push({ kind: 'thankyou' })
  return out
}

function validate(q, answers, otherTexts) {
  if (!q.required) return null
  const otherOpt = (q.options || []).find((o) => o.isOther)
  const v = answers[q.name]

  if (q.type === 'single') {
    if (v == null || v === '') return 'Selecione uma opção para continuar.'
    if (otherOpt && v === otherOpt.value && !(otherTexts[q.name] || '').trim())
      return 'Conte um pouco mais para continuar.'
  } else if (q.type === 'multi') {
    if (!Array.isArray(v) || v.length === 0) return 'Selecione ao menos uma opção.'
    if (otherOpt && v.includes(otherOpt.value) && !(otherTexts[q.name] || '').trim())
      return 'Conte um pouco mais para continuar.'
  } else if (q.type === 'likert' || q.type === 'scale') {
    if (v == null) return 'Escolha um valor para continuar.'
  }
  return null
}

export default function App() {
  const steps = useMemo(buildSteps, [])
  const [submissionId] = useState(newSubmissionId)
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [otherTexts, setOtherTexts] = useState({})
  const [errors, setErrors] = useState({})
  const [contact, setContact] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [preview, setPreview] = useState(false)
  const bodyRef = useRef(null)

  const step = steps[stepIndex]

  // On every step change: scroll to top and move focus into the new screen.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (bodyRef.current) bodyRef.current.focus({ preventScroll: true })
  }, [stepIndex])

  function setAnswer(name, value) {
    setAnswers((a) => ({ ...a, [name]: value }))
    setErrors((e) => (e[name] ? { ...e, [name]: null } : e))
  }
  function setOther(name, text) {
    setOtherTexts((o) => ({ ...o, [name]: text }))
  }
  function goBack() {
    setStepIndex((i) => Math.max(0, i - 1))
  }
  function goNext() {
    if (step.kind === 'question') {
      const msg = validate(step.question, answers, otherTexts)
      if (msg) {
        setErrors((e) => ({ ...e, [step.question.name]: msg }))
        return
      }
    }
    setStepIndex((i) => Math.min(steps.length - 1, i + 1))
  }

  async function handleSubmit() {
    setSubmitting(true)
    setSubmitError(null)
    const result = await submitSurvey({ submissionId, answers, otherTexts, contact, honeypot })
    setSubmitting(false)
    if (result.ok) {
      setPreview(Boolean(result.preview))
      setStepIndex(steps.length - 1) // jump to the thank-you screen
    } else {
      setSubmitError(
        'Não conseguimos enviar suas respostas agora. Verifique sua conexão e tente novamente — suas respostas não foram perdidas.',
      )
    }
  }

  // Progress label + fill for the current step.
  const progress = useMemo(() => {
    if (step.kind === 'question') {
      const n = questions.findIndex((q) => q.id === step.question.id) + 1
      return { show: true, value: n / TOTAL_QUESTIONS, label: `Pergunta ${n} de ${TOTAL_QUESTIONS}` }
    }
    if (step.kind === 'concept') return { show: true, value: 11 / TOTAL_QUESTIONS, label: 'A ideia' }
    if (step.kind === 'contact') return { show: true, value: 1, label: 'Quase lá' }
    return { show: false } // intro, thankyou
  }, [step])

  return (
    <div className="app">
      {!isConfigured && <ConfigBanner />}

      <div className="wrap">
        <div className="card">
          {step.kind !== 'thankyou' && (
            <div className="cardtop">
              <span className="brand">
                <Logo className="brand__mark" />
                <span className="brand__name">SailSafe</span>
              </span>
              {progress.label && <span className="cardstep">{progress.label}</span>}
            </div>
          )}

          {progress.show && <ProgressBar value={progress.value} />}

          <div className="body" ref={bodyRef} tabIndex={-1} key={stepIndex}>
            {step.kind === 'intro' && <IntroScreen onNext={goNext} />}

            {step.kind === 'concept' && <ConceptScreen onBack={goBack} onNext={goNext} />}

            {step.kind === 'question' && (
              <QuestionCard
                question={step.question}
                answers={answers}
                otherTexts={otherTexts}
                error={errors[step.question.name]}
                onAnswer={setAnswer}
                onOther={setOther}
                onBack={goBack}
                onNext={goNext}
              />
            )}

            {step.kind === 'contact' && (
              <ContactScreen
                contact={contact}
                onContact={setContact}
                wants={answers.wants_future_tests || null}
                onWants={(v) => setAnswer('wants_future_tests', v)}
                honeypot={honeypot}
                onHoneypot={setHoneypot}
                onBack={goBack}
                onSubmit={handleSubmit}
                submitting={submitting}
                submitError={submitError}
              />
            )}

            {step.kind === 'thankyou' && <ThankYouScreen preview={preview} />}
          </div>
        </div>
      </div>

      <div className="legal">SailSafe · Pesquisa de produto · Suas respostas são confidenciais</div>
    </div>
  )
}
