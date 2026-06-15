// Pure HTML/CSS illustration of the SailSafe concept: a boat "health passport"
// with green / amber / red component statuses. No external images.
const ITEMS = [
  { name: 'Motor', status: 'g', label: 'Em dia' },
  { name: 'Baterias', status: 'a', label: 'Atenção' },
  { name: 'Casco', status: 'g', label: 'Em dia' },
  { name: 'Bomba de porão', status: 'r', label: 'Verificar' },
  { name: 'Velas', status: 'g', label: 'Em dia' },
]

export default function HealthPassport() {
  return (
    <div className="passport" aria-hidden="true">
      <div className="passport__top">
        <span className="passport__title">Passaporte de saúde · Veleiro Aurora</span>
        <span className="passport__tag">2 itens p/ revisar</span>
      </div>
      <div className="passport__list">
        {ITEMS.map((it) => (
          <div className="prow" key={it.name}>
            <span className={`pdot pdot--${it.status}`} />
            <span className="pname">{it.name}</span>
            <span className={`pstatus pstatus--${it.status}`}>{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
