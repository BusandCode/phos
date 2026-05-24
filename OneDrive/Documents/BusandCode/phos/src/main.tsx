import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element not found. Check your index.html for <div id="root"></div>')
}

const root = createRoot(container)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)