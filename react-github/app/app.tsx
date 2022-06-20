import React from 'react'
import './index.css'
import { useThemeContext } from './contexts/theme'
import Nav from './components/Nav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Loading from './components/Loading'

const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))

export default function App() {
  const { theme } = useThemeContext()

  return (
    <Router>
      <div className={theme}>
        <div className="container">
          <Nav />

          <React.Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Popular />} />
              <Route path="/battle" element={<Battle />} />
              <Route path="/battle/results" element={<Results />} />
              <Route element={() => <h1>404</h1>} />
            </Routes>
          </React.Suspense>
        </div>
      </div>
    </Router>
  )
}
