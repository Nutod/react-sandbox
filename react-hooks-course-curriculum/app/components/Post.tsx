import React from 'react'
import queryString from 'query-string'
import Loading from './Loading'
import PostMetaInfo from './PostMetaInfo'
import Title from './Title'
import Comment from './Comment'
import { useLocation } from 'react-router-dom'
import { usePostsAndComments } from '../hooks'

export interface IPost {
  url: string
  title: string
  id: number
  by: string
  time: number
  text: string
  descendants?: number
  dead?: boolean
  deleted?: boolean
  type: 'story' | 'comment'
}

export default function Post() {
  const { search } = useLocation()
  const { id } = queryString.parse(search) as { [id: string]: string }
  const { post, loadingPost, comments, loadingComments, error } =
    usePostsAndComments(id)

  if (error) {
    return <p className="center-text error">{error}</p>
  }

  if (!post || !comments) {
    return ''
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
