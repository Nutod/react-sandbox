import React from 'react'
import queryString from 'query-string'
import { fetchUser, fetchPosts } from '../utils/api'
import Loading from './Loading'
import { formatDate } from '../utils/helpers'
import PostsList from './PostsList'
import { useLocation } from 'react-router-dom'
import { IPost } from './Post'

export interface IUser {
  id: number
  karma: number
  created: number
  about: string
  submitted: string[]
}

export default function User() {
  const [user, setUser] = React.useState<IUser | null>(null)
  const [loadingUser, setLoadingUser] = React.useState(true)
  const [posts, setPosts] = React.useState<IPost[] | null>(null)
  const [loadingPosts, setLoadingPosts] = React.useState(true)
  const [error, setError] = React.useState(null)
  const { search } = useLocation()

  React.useEffect(() => {
    const { id } = queryString.parse(search) as { [id: string]: string }

    fetchUser(id)
      .then(user => {
        setUser(user)
        setLoadingUser(false)

        return fetchPosts(user.submitted.slice(0, 30))
      })
      .then(posts => {
        setPosts(posts)
        setLoadingPosts(false)
        setError(null)
      })
      .catch(({ message }) => {
        setError(message)
        setLoadingPosts(false)
        setLoadingUser(false)
      })
  }, [])

  if (error) {
    return <p className="center-text error">{error}</p>
  }

  if (!posts || !user) return ''

  return (
    <React.Fragment>
      {loadingUser === true ? (
        <Loading text="Fetching User" />
      ) : (
        <React.Fragment>
          <h1 className="header">{user.id}</h1>
          <div className="meta-info-light">
            <span>
              joined <b>{formatDate(user.created)}</b>
            </span>
            <span>
              has <b>{user.karma.toLocaleString()}</b> karma
            </span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: user.about }} />
        </React.Fragment>
      )}
      {loadingPosts === true ? (
        loadingUser === false && <Loading text="Fetching posts" />
      ) : (
        <React.Fragment>
          <h2>Posts</h2>
          <PostsList posts={posts} />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
