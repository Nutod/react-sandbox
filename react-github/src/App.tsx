import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { css } from 'linaria'
import Nav from './components/Nav'
import Popular from './components/Popular'
import Todos from './components/Todos'

const container = css`
  max-width: 950px;
  margin-inline: auto;
  margin-block-start: 2rem;
`

function App() {
  return (
    <div className={container}>
      <Nav />

      <main>
        <Routes>
          <Route path="/" element={<Popular />} />
          <Route path="todos" element={<Todos />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
