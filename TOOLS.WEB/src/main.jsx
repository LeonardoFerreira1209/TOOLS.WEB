import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import ThemeProvider from './components/store/context/ThemeContext'
import App from './App'
import UserProvider from './components/store/context/UserContext'
import NotifyProvider from './components/store/context/NotifyContext'

createRoot(document.getElementById('root')).render (
  <React.Fragment>
    <Router>
        <UserProvider>
          <ThemeProvider>
            <NotifyProvider>
              <App />
            </NotifyProvider>
          </ThemeProvider>
        </UserProvider>
    </Router>
  </React.Fragment>
)