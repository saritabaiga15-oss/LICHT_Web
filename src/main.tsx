import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

// Remove data left by the old demo build (mock profiles, a shared token, stored employer passwords)
try {
  [
    'licht_token',
    'licht_recruitment_auth_user',
    'licht_employer_profile',
    'licht_all_employers',
    'licht_employer_jobs',
    'licht_employer_saved_cand',
    'licht_admin_candidates',
    'licht_admin_applications'
  ].forEach(key => localStorage.removeItem(key))
} catch {
  // storage unavailable
}

// On phones, dashboard tab bars scroll sideways: bring the tapped tab fully into view
document.addEventListener("click", (event) => {
  const tab = (event.target as HTMLElement).closest?.(".mobile-tab-scroller > *")
  if (tab) tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" })
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
