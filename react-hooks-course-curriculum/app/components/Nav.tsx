import React from 'react'
import { useThemeContext } from '../contexts/theme'
import { NavLink } from 'react-router-dom'

export default function Nav() {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <nav className="row space-between">
      <ul className="row nav">
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? 'rgb(187, 46, 31)' : undefined,
            })}
            className="nav-link"
          >
            Top
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/new"
            style={({ isActive }) => ({
              color: isActive ? 'rgb(187, 46, 31)' : undefined,
            })}
            className="nav-link"
          >
            New
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
