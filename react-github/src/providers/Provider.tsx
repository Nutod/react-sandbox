import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { ThemeContextProvider, useThemeContext } from '../context/theme'

type ProviderProps = {
  children: React.ReactNode
}

export default function Provider({ children }: ProviderProps) {
  return (
    <ThemeContextProvider defaultTheme="light">
      <Router>
        <ThemeProviders>{children}</ThemeProviders>
      </Router>
    </ThemeContextProvider>
  )
}

function ThemeProviders({ children }: ProviderProps) {
  const { theme } = useThemeContext()

  return (
    <GeistProvider themeType={theme}>
      <CssBaseline />
      {children}
    </GeistProvider>
  )
}
