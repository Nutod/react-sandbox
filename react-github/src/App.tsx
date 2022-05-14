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
  margin-block-start: 2rem;

  /* display: grid;
  grid-template-rows: min-content 1fr min-content; */
`

function App() {
  return (
    <div className={container}>
      <Nav />

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
