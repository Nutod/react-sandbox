import React from 'react'
import PropTypes from 'prop-types'
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'
import type { IRepo } from '../types'
import { useFetchPopularRepos } from '../hooks/api'

type LangaugesNavProps = {
  selected: string
  onUpdateLanguage: (param: string) => void
}

function LangaugesNav({ selected, onUpdateLanguage }: LangaugesNavProps) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

  return (
    <ul className="flex-center">
      {languages.map(language => (
        <li key={language}>
          <button
            className="btn-clear nav-link"
            style={
              language === selected ? { color: 'rgb(187, 46, 31)' } : undefined
            }
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}

LangaugesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
}

type ReposGridProps = {
  repos: IRepo[]
}

function ReposGrid({ repos }: ReposGridProps) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const { name, owner, html_url, stargazers_count, forks, open_issues } =
          repo
        const { login, avatar_url } = owner

        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              <ul className="card-list">
                <li>
                  <Tooltip text="Github username">
                    <FaUser color="rgb(255, 191, 116)" size={22} />
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </Tooltip>
                </li>
                <li>
                  <FaStar color="rgb(255, 215, 0)" size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                  {open_issues.toLocaleString()} open
                </li>
              </ul>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

export default function Popular() {
  const [selectedLanguage, setSelectedLanguage] = React.useState('All')
  const { repos, error, loading } = useFetchPopularRepos(selectedLanguage)

  const updateLanguage = (selectedLanguage: string) => {
    setSelectedLanguage(selectedLanguage)
  }

  const getLanguagesNavProps = () => ({
    selected: selectedLanguage,
    onUpdateLanguage: updateLanguage,
  })

  return (
    <React.Fragment>
      <LangaugesNav {...getLanguagesNavProps()} />

      {loading && <Loading text="Fetching Repos" />}

      {error && <p className="center-text error">{error}</p>}

      {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
    </React.Fragment>
  )
}
