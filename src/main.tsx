// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TeamsProvider } from './contexts/Teams.tsx'
import { BrowserRouter } from 'react-router-dom'
import { FinalsProvider } from './contexts/Finals.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <TeamsProvider>
      <FinalsProvider>
        <App />
      </FinalsProvider>
    </TeamsProvider>
  </BrowserRouter>
)
