import React from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import Loading from './Loading'
import { formatDate } from '../utils/helpers'
import PostsList from './PostsList'
import { useUserDataAndPosts } from '../hooks'

export interface IUser {
  id: number
  karma: number
  created: number
  about: string
  submitted: string[]
}

export default function User() {
  const { search } = useLocation()
  const { id } = queryString.parse(search) as { [id: string]: string }
  const { posts, user, error, isPostsLoading, isUserLoading } =
    useUserDataAndPosts(id)

  if (error) {
    return <p className="center-text error">{error}</p>
  }

  if (!posts || !user) return ''

  return (
    <React.Fragment>
      {isUserLoading === true ? (
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
      {isPostsLoading === true ? (
        isUserLoading === false && <Loading text="Fetching posts" />
      ) : (
        <React.Fragment>
          <h2>Posts</h2>
          <PostsList posts={posts} />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
