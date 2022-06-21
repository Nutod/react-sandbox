import React from 'react'
import queryString from 'query-string'
import { IPlayer } from '../components/Results'
import { battle, fetchPopularRepos } from '../utils/api'
import type { IRepo } from '../types'

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

export function useFetchResults(search: string) {
  const [winner, setWinner] = React.useState<IPlayer | null>(null)
  const [loser, setLoser] = React.useState<IPlayer | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const { playerOne, playerTwo } = queryString.parse(search) as {
      [id: string]: string
    }

    battle([playerOne, playerTwo])
      .then(players => {
        setWinner(players[0])
        setLoser(players[1])
        setError(null)
        setLoading(false)
      })
      .catch(({ message }) => {
        setError(message)
        setLoading(false)
      })
  }, [])

  return {
    winner,
    loser,
    error,
    loading,
  }
}
