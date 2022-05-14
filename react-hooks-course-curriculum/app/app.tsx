import React from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/theme'
import Loading from './components/Loading'
import Nav from './components/Nav'

const Posts = React.lazy(() => import('./components/Posts'))
const Post = React.lazy(() => import('./components/Post'))
const User = React.lazy(() => import('./components/User'))

export function App() {
  return (
    <Router>
      <ThemeProvider value={{ theme: 'light', toggleTheme: () => {} }}>
        <div className={'light'}>
          <div className="container">
            <Nav />

            <React.Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Posts type="top" />} />
                <Route path="new" element={<Posts type="new" />} />
                <Route path="post" element={<Post />} />
                <Route path="user" element={<User />} />
                <Route element={<h1>404</h1>} />
              </Routes>
            </React.Suspense>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  )
}
