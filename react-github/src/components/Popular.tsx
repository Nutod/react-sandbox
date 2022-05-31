import React from 'react'
import { css } from 'linaria'
import { Card, Grid, Link, Loading, Note, Text } from '@geist-ui/core'
import { useFetchPopularRepos } from '../api'
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

type ReposGridProps = {
  repos: IRepo[] | null
}

function ReposGrid({ repos }: ReposGridProps) {
  if (!repos) return null

  return (
    <Grid.Container gap={1.5}>
      {repos.map(repo => (
        <Grid xs={8} justify="center">
          <Card width="100%">
            <Text h4 my={0}>
              {repo.name}
            </Text>
            <Text>Modern and minimalist React UI library.</Text>
            <Card.Footer>
              <Link
                color
                target="_blank"
                href="https://github.com/geist-org/geist-ui"
              >
                Visit source code on GitHub.
              </Link>
            </Card.Footer>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  )
}

export default function Popular() {
  const [selectedLanguage, setSelectedLanguage] =
    React.useState<Language>('All')
  const { repos, loading, error } = useFetchPopularRepos(selectedLanguage)

  const getLanguageSelectionNavProps = () => ({
    selectedLanguage,
    setSelectedLanguage,
  })

  if (error) {
    return <Note type="error">Something went wrong</Note>
  }

  return (
    <div>
      <LanguageSelectionNav {...getLanguageSelectionNavProps()} />

      {loading && <Loading>Loading</Loading>}

      {!loading && <ReposGrid repos={repos[selectedLanguage]} />}
    </div>
  )
}
