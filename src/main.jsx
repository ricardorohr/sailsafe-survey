import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Admin from './admin/Admin.jsx'
import './styles/tokens.css'
import './styles/app.css'

// Tiny router: /admin → dashboard, everything else → the survey.
const path = window.location.pathname.replace(/\/+$/, '')
const isAdmin = path.endsWith('/admin')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>{isAdmin ? <Admin /> : <App />}</React.StrictMode>,
)
