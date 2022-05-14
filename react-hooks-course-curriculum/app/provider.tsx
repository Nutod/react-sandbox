import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

export default function Provider({ children }: { children: React.ReactNode }) {
  return <Router>{children}</Router>
}