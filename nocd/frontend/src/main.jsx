import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Tailwind CSS
import './css/input.css'
// App
import App from './pages/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode className='bg-blue-400'>
    <App/>
  </StrictMode>,
)
