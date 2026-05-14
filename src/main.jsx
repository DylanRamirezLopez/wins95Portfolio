// Dylan Ramirez Lopez — Windows 95 Portfolio
// https://github.com/tomatitomkk/wins95Portfolio

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LanguageProvider } from './i18n/LanguageContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  // </React.StrictMode>,
)
