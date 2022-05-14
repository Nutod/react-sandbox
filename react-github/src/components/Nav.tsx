import React from 'react'
import { css } from 'linaria'
import { Button } from '@geist-ui/core'
import { Link } from 'react-router-dom'

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

export default function Nav() {
  return (
    <nav className={navigation}>
      <ul>
        <li>
          <Link to="/">Popular</Link>
        </li>
        <li>
          <Link to="/battle">Battle</Link>
        </li>
      </ul>
      <Button>Switch Theme</Button>
    </nav>
  )
}
