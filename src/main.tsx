import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TeamsProvider } from './contexts/Teams.tsx'
import { FinalsProvider } from './contexts/Finals.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TeamsProvider>
    <FinalsProvider>
      <App />
    </FinalsProvider>
  </TeamsProvider>
)
