import React from 'react'
import { useThemeContext } from '../contexts/theme'
import { NavLink } from 'react-router-dom'

const activeStyle = ({
  isActive,
}: {
  isActive: boolean
}): { color: 'rgb(187, 46, 31)' | undefined } => ({
  color: isActive ? 'rgb(187, 46, 31)' : undefined,
})

export default function Nav() {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <nav className="row space-between">
      <ul className="row nav">
        <li>
          <NavLink to="/" style={activeStyle} className="nav-link">
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink to="/battle" style={activeStyle} className="nav-link">
            Battle
          </NavLink>
        </li>
      </ul>
      <button
        style={{ fontSize: 30 }}
        className="btn-clear"
        onClick={toggleTheme}
      >
        {theme === 'light' ? '🔦' : '💡'}
      </button>
    </nav>
  )
}
