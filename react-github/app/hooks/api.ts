import React from 'react'
import type { IRepo } from '../types'
import { fetchPopularRepos } from '../utils/api'

export function useFetchPopularRepos(selectedLanguage: string) {
  const [repos, setRepos] = React.useState<Record<string, IRepo[]>>({})
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    setError(null)

    if (!repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then(data => {
          setRepos(repos => ({
            ...repos,
            [selectedLanguage]: data,
          }))
        })
        .catch(() => {
          console.warn('Error fetching repos: ', error)

          setError(`There was an error fetching the repositories.`)
        })
    }
  }, [selectedLanguage])

  const isLoading = () => {
    return !repos[selectedLanguage] && error === null
  }

  return {
    repos,
    loading: isLoading(),
    error,
  }
}
