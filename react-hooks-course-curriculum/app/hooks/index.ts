import React from 'react'
import { IPost } from '../components/Post'
import { IUser } from '../components/User'

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

export async function fetchComments(ids: string[]) {
  const comments = await Promise.all(ids.map(fetchItem))

  return removeDeleted(onlyComments(removeDead(comments)))
}

export function fetchUser(id: string) {
  return fetch(`${API}/user/${id}${JSON}`).then(res =>
    res.json()
  ) as Promise<IUser>
}

export async function fetchPosts(ids: string[]) {
  const posts = await Promise.all(ids.map(fetchItem))

  return removeDeleted(onlyPosts(removeDead(posts)))
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

export function usePostsAndComments(id: string) {
  return {}
}

export function useUserDataAndPosts(id: string) {
  const [user, setUser] = React.useState<IUser | null>(null)
  const [isUserLoading, setIsUserLoading] = React.useState(true)
  const [posts, setPosts] = React.useState<IPost[] | null>(null)
  const [isPostsLoading, setIsPostsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    setIsUserLoading(true)

    fetchUser(id)
      .then(user => {
        setUser(user)
        setIsUserLoading(false)

        return fetchPosts(user.submitted.slice(0, 30))
      })
      .then(posts => {
        setPosts(posts)
        setIsPostsLoading(false)
      })
      .catch(({ message }) => {
        setError(message)
        setIsUserLoading(false)
        setIsPostsLoading(false)
      })
  }, [id])

  return {
    user,
    isUserLoading,
    posts,
    isPostsLoading,
    error,
  }
}
