// Thin progress bar. `value` is a 0–1 fraction of the survey completed.
export default function ProgressBar({ value }) {
  const pct = Math.max(0, Math.min(1, value || 0)) * 100
  return (
    <div
      className="progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
    >
      <div className="progress__fill" style={{ width: pct + '%' }} />
    </div>
  )
}
