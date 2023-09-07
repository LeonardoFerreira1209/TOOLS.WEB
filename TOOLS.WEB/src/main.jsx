import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import ThemeProvider from './shared/utils/ThemeContext'
import App from './App'
import ContextProvider from './components/store/ContextProvider'
import UserProvider from './components/store/context/UserContext'

createRoot(document.getElementById('root')).render (
  <React.Fragment>
    <Router>
      <ContextProvider>
        <UserProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </UserProvider>
      </ContextProvider>
    </Router>
  </React.Fragment>
)