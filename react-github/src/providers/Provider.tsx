import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { GeistProvider, CssBaseline } from '@geist-ui/core'

type ProviderProps = {
  children: React.ReactNode
}

export default function Provider({ children }: ProviderProps) {
  return (
    <GeistProvider>
      <CssBaseline />
      <Router>{children}</Router>
    </GeistProvider>
  )
}
