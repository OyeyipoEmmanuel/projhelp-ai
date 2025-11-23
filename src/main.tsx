import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthChangedProvider } from './context/AuthChangedContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <AuthChangedProvider>
        <App />
      </AuthChangedProvider>
    </StrictMode>
  </BrowserRouter>,
)
