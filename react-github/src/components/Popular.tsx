import React from 'react'
import { css } from 'linaria'
import { Loading } from '@geist-ui/core'
import { fetchPopularRepos } from '../api'
import { IRepo } from '../types'

type Language = 'All' | 'JavaScript' | 'Ruby' | 'Java' | 'CSS' | 'Python'

const LANGUAGES: Language[] = [
  'All',
  'JavaScript',
  'Ruby',
  'Java',
  'CSS',
  'Python',
]

const listItems = css`
  display: flex;
  gap: 2rem;
  justify-content: center;

  li {
    cursor: pointer;

    &:before {
      display: none;
    }

    &:hover {
      color: #0070f3;
    }
  }

  li.active {
    border-bottom: 2px solid #0070f3;
    color: #0070f3;
  }
`

type LanguageSelectionNavProps = {
  selectedLanguage: Language
  setSelectedLanguage: React.Dispatch<React.SetStateAction<Language>>
}

function LanguageSelectionNav({
  selectedLanguage,
  setSelectedLanguage,
}: LanguageSelectionNavProps) {
  return (
    <ul className={listItems}>
      {LANGUAGES.map(language => (
        <li
          className={selectedLanguage === language ? 'active' : undefined}
          onClick={() => setSelectedLanguage(language)}
        >
          {language}
        </li>
      ))}
    </ul>
  )
}

export default function Popular() {
  const [selectedLanguage, setSelectedLanguage] =
    React.useState<Language>('All')
  const [repos, setRepos] = React.useState<IRepo[] | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<null | string>(null)

  React.useEffect(() => {
    fetchPopularRepos(selectedLanguage)
      .then(data => {
        console.log(data)
        setRepos(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [])

  const getLanguageSelectionNavProps = () => ({
    selectedLanguage,
    setSelectedLanguage,
  })

  if (error) {
    return <div>A big error occurred</div>
  }

  return (
    <div>
      <LanguageSelectionNav {...getLanguageSelectionNavProps()} />

      {/* List of the data items */}
      {loading && <Loading>Loading</Loading>}

      {!loading && JSON.stringify(repos)}
    </div>
  )
}
