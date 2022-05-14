import React from 'react'
import queryString from 'query-string'
import { fetchItem, fetchPosts, fetchComments } from '../utils/api'
import Loading from './Loading'
import PostMetaInfo from './PostMetaInfo'
import Title from './Title'
import Comment from './Comment'
import { useLocation } from 'react-router-dom'

export interface Post {
  url: string
  title: string
  id: number
  by: string
  time: number
  text: string
  descendants?: number
}

export default function Post() {
  const [post, setPost] = React.useState<Post | null>(null)
  const [loadingPost, setLoadingPost] = React.useState(true)
  const [comments, setComments] = React.useState<Post[] | null>(null)
  const [loadingComments, setLoadingComments] = React.useState(true)
  const [error, setError] = React.useState(null)
  const { search } = useLocation()

  React.useEffect(() => {
    const { id } = queryString.parse(search) as { [id: string]: string }

    fetchItem(id)
      .then(post => {
        setPost(post)
        setLoadingPost(false)

        return fetchComments(post.kids || [])
      })
      .then(comments => {
        setComments(comments)
        setLoadingComments(false)
      })
      .catch(({ message }) => {
        setError(message)
        setLoadingPost(false)
        setLoadingComments(false)
      })
  }, [])

  if (error) {
    return <p className="center-text error">{error}</p>
  }

  if (!post || !comments) {
    return ""
  }

  return (
    <React.Fragment>
      {loadingPost === true ? (
        <Loading text="Fetching post" />
      ) : (
        <React.Fragment>
          <h1 className="header">
            <Title url={post.url} title={post.title} id={post.id} />
          </h1>
          <PostMetaInfo
            by={post.by}
            time={post.time}
            id={post.id}
            descendants={post.descendants}
          />
          <p dangerouslySetInnerHTML={{ __html: post.text }} />
        </React.Fragment>
      )}
      {loadingComments === true ? (
        loadingPost === false && <Loading text="Fetching comments" />
      ) : (
        <React.Fragment>
          {comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
