import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeContextProvider } from './contexts/theme'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <Router>
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </Router>
  )
}
