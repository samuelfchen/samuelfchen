import React from "react"
import { Link } from "gatsby"

import PostLinkWrapper from '../../styles/blog/PostLinkStyles'

const PostLink = ({ post, excerpt, timeToRead }) => (
  <PostLinkWrapper>
    <Link to={post.frontmatter.slug}>
      <h2>{post.frontmatter.title}</h2> 
      <h5>{post.frontmatter.date} - {timeToRead} min read</h5> 
      {/* <div className='date'>{post.frontmatter.date}</div> */}
      <div className='excerpt'>{excerpt}</div>
    </Link>
  </PostLinkWrapper>
)
export default PostLink