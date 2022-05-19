import { css } from 'linaria'
import React from 'react'
import { fetchPopularRepos } from '../api'

// render a list of the popular repos and then we can move on from there
// we need the raw data from the endpoint and then we render that

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

export interface IRepo {
  id: number
  name: string
  full_name: string
  owner: {
    login: string
    id: number
    avatar_url: string
    url: string
    html_url: string
    subscriptions_url: string
    repos_url: string
    events_url: string
    type: string
  }
  score: number
  url: string
  created_at: string
  updated_at: string
  stargazers_count: number
  watchers_count: number
  language: string
  open_issues_count: number
  forks: number
  open_issues: number
  watchers: number
}

const repo = {
  url: 'https://api.github.com/repos/freeCodeCamp/freeCodeCamp',
  created_at: '2014-12-24T17:49:19Z',
  updated_at: '2022-05-19T18:06:15Z',
  stargazers_count: 346121,
  watchers_count: 346121,
  language: 'TypeScript',
  open_issues_count: 155,
  forks: 28637,
  open_issues: 155,
  watchers: 346121,
  score: 1,
}

export default function Popular() {
  const [selectedLanguage, setSelectedLanguage] =
    React.useState<Language>('All')

  React.useEffect(() => {
    fetchPopularRepos(selectedLanguage).then(data => console.log(data))
  }, [])

  const getLanguageSelectionNavProps = () => ({
    selectedLanguage,
    setSelectedLanguage,
  })

  return (
    <div>
      <LanguageSelectionNav {...getLanguageSelectionNavProps()} />

      {/* List of the data items */}
    </div>
  )
}
