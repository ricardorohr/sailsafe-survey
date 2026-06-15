// Shown only when VITE_SHEETS_URL is missing, so a preview never looks
// "broken" and nobody assumes their submission was saved when it wasn't.
export default function ConfigBanner() {
  return (
    <div className="banner banner--warn" role="status">
      <strong>Modo de pré-visualização.</strong> O Google Sheets ainda não está conectado, então
      as respostas não serão salvas. O formulário funciona normalmente para você visualizar.
    </div>
  )
}
