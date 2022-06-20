import React from 'react'
import PropTypes from 'prop-types'
import { useThemeContext } from '../contexts/theme'

type CardProps = {
  header: string
  subheader?: string
  avatar: string
  href: string
  name: string
  children: React.ReactNode
}

export default function Card({
  header,
  subheader,
  avatar,
  href,
  name,
  children,
}: CardProps) {
  const { theme } = useThemeContext()

  return (
    <div className={`card bg-${theme}`}>
      <h4 className="header-lg center-text">{header}</h4>
      <img className="avatar" src={avatar} alt={`Avatar for ${name}`} />
      {subheader && <h4 className="center-text">{subheader}</h4>}
      <h2 className="center-text">
        <a className="link" href={href}>
          {name}
        </a>
      </h2>
      {children}
    </div>
  )
}

Card.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}
