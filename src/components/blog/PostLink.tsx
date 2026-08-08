import React from "react"
import { Link } from "gatsby"

import PostLinkWrapper from './PostLink.styles'
import { BlogPost } from '../../utils/types'

interface PostLinkProps {
  post: BlogPost
  excerpt?: string
  timeToRead?: number
}

const PostLink = ({ post, excerpt, timeToRead }: PostLinkProps) => (
  <PostLinkWrapper>
    <Link to={post.frontmatter.slug}>
      <h2>{post.frontmatter.title}</h2>
      <h5>{post.frontmatter.date} - {timeToRead} min read</h5>
      <div className='excerpt'>{excerpt}</div>
    </Link>
  </PostLinkWrapper>
)
export default PostLink
