import React from 'react'
import { css } from 'linaria'
import { Button } from '@geist-ui/core'
import { NavLink } from 'react-router-dom'

const navigation = css`
  display: flex;
  justify-content: space-between;

  ul {
    display: flex;
    gap: 1rem;
    margin-left: 0;

    li {
      margin-bottom: 0;

      &:before {
        display: none;
      }
    }
  }
`

const activeStyle = ({
  isActive,
}: {
  isActive: boolean
}): { color: string | undefined } => ({
  color: isActive ? '#f81ce5' : undefined,
})

// TODO: Use polished somewhere here instead?
// How about customizing the theme altogether?

export default function Nav() {
  return (
    <nav className={navigation}>
      <ul>
        <li>
          <NavLink to="/" style={activeStyle}>
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink to="/battle" style={activeStyle}>
            Battle
          </NavLink>
        </li>
      </ul>
      <Button>Switch Theme</Button>
    </nav>
  )
}
