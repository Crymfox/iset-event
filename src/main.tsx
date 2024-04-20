// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TeamsProvider } from './contexts/Teams.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <TeamsProvider>
      <App />
    </TeamsProvider>
  </BrowserRouter>
)
