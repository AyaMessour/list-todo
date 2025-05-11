import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Form  from './App.jsx'
import FeminineTaskDashboard from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<FeminineTaskDashboard></FeminineTaskDashboard>
  </StrictMode>,
)
