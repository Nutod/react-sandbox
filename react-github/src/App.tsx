import { Grid } from '@geist-ui/core'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { css } from 'linaria'
import Nav from './components/Nav'
import Popular from './components/Popular'
import Battle from './components/Battle'

const container = css`
  max-width: 950px;
  margin-inline: auto;
  background: pink;
  marginblockstart: 2rem;
`

function App() {
  // I'd be looking into a container component here
  return (
    <div className={container}>
      <Nav />

      {/* Routing */}
      <main>
        <Routes>
          <Route path="/" element={<Popular />} />
          <Route path="battle" element={<Battle />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
