import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import './bootstrap.min.css'
import ContextData from './context/ContextData'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <ContextData>
     <BrowserRouter> 
    <> <App /></>
     </BrowserRouter>
  </ContextData>
  </React.StrictMode>,
)
