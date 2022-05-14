import React from 'react'
import PropTypes from 'prop-types'
import PostMetaInfo from './PostMetaInfo'

export default function Comment({
  comment,
}: {
  comment: {
    by: string
    time: number
    id: number
    text: string
  }
}) {
  return (
    <div className="comment">
      <PostMetaInfo
        comment={true}
        by={comment.by}
        time={comment.time}
        id={comment.id}
      />
      <p dangerouslySetInnerHTML={{ __html: comment.text }} />
    </div>
  )
}
