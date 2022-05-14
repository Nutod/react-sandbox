import React from 'react'
import PropTypes from 'prop-types'
import { fetchMainPosts } from '../utils/api'
import Loading from './Loading'
import PostsList from './PostsList'

export default function Posts({ type }: { type: 'new' | 'top' }) {
  const [posts, setPosts] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    handleFetch()
  }, [type])

  const handleFetch = () => {
    setPosts(null)
    setError(null)
    setLoading(true)

    fetchMainPosts(type)
      .then(posts => {
        setPosts(posts)
        setLoading(false)
        setError(null)
      })
      .catch(({ message }) => {
        setError(message)
        setLoading(false)
      })
  }

  if (loading === true) {
    return <Loading />
  }

  if (error) {
    return <p className="center-text error">{error}</p>
  }

  return <PostsList posts={posts} />
}

Posts.propTypes = {
  type: PropTypes.oneOf(['top', 'new']),
}
