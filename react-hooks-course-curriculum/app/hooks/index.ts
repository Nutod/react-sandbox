import React from 'react'
import { IPost } from '../components/Post'

const API = `https://hacker-news.firebaseio.com/v0`
const JSON = '.json?print=pretty'

function removeDead(posts: IPost[]) {
  return posts.filter(Boolean).filter(({ dead }) => dead !== true)
}

function removeDeleted(posts: IPost[]) {
  return posts.filter(({ deleted }) => deleted !== true)
}

function onlyComments(posts: IPost[]) {
  return posts.filter(({ type }) => type === 'comment')
}

function onlyPosts(posts: IPost[]) {
  return posts.filter(({ type }) => type === 'story')
}

export function fetchItem(id: string) {
  return fetch(`${API}/item/${id}${JSON}`).then(res =>
    res.json()
  ) as Promise<IPost>
}

export function useFetchMainPosts(type: string) {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [posts, setPosts] = React.useState<IPost[] | null>(null)

  React.useEffect(() => {
    setLoading(true)

    fetch(`${API}/${type}stories${JSON}`)
      .then(res => res.json())
      .then(ids => {
        if (!ids) {
          setError(`There was an error fetching the ${type} posts.`)
          setLoading(false)
        }

        return ids.slice(0, 50) as string[]
      })
      .then(ids => Promise.all(ids.map(fetchItem)))
      .then(posts => {
        setPosts(removeDeleted(onlyPosts(removeDead(posts))))
        setLoading(false)
      })
      .catch(err => {
        setError(`There was an error fetching the ${type} posts.`)
        setLoading(false)
      })
  }, [type])

  return {
    loading,
    error,
    posts,
  }
}

export function fetchMainPosts(type: string) {
  return fetch(`${API}/${type}stories${JSON}`)
    .then(res => res.json())
    .then(ids => {
      if (!ids) {
        throw new Error(`There was an error fetching the ${type} posts.`)
      }

      return ids.slice(0, 50)
    })
    .then(ids => Promise.all(ids.map(fetchItem)))
    .then(posts => removeDeleted(onlyPosts(removeDead(posts))))
}
