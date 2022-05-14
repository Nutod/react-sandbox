import { Grid } from '@geist-ui/core'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Popular from './components/Popular'

function App() {
  // I'd be looking into a container component here
  return (
    <div
      style={{
        maxWidth: '950px',
        marginInline: 'auto',
        background: 'pink',
        marginBlockStart: '2rem',
      }}
    >
      <Nav />

      {/* Routing */}
      <main>
        <Routes>
          <Route path="/" element={<Popular />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
