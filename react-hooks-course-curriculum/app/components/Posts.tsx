import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import PostsList from './PostsList'
import { useFetchMainPosts } from '../hooks'

export default function Posts({ type }: { type: 'new' | 'top' }) {
  const { loading, error, posts } = useFetchMainPosts(type)

  if (loading === true) {
    return <Loading />
  }

  if (error) {
    return <p className="center-text error">{error}</p>
  }

  if (!posts) return ''

  return <PostsList posts={posts} />
}

Posts.propTypes = {
  type: PropTypes.oneOf(['top', 'new']),
}
