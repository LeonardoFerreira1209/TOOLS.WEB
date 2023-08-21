import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom'
import ThemeProvider from './shared/utils/ThemeContext'
import App from './App'

createRoot(document.getElementById('root')).render (
  <React.Fragment>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </React.Fragment>
)