import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

type ProviderProps = {
  children: React.ReactNode
}

export default function Provider({ children }: ProviderProps) {
  return <Router>{children}</Router>
}
