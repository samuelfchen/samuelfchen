import React from "react"
import { Link } from "gatsby"

import PostLinkWrapper from '../../styles/blog/PostLinkStyles'

const PostLink = ({ post, excerpt }) => (
  <PostLinkWrapper>
    <Link to={post.frontmatter.slug}>
      <h2>{post.frontmatter.title}</h2> 
      <h3>{post.frontmatter.date}</h3> 
      {/* <div className='date'>{post.frontmatter.date}</div> */}
      <div className='excerpt'>{excerpt}</div>
    </Link>
  </PostLinkWrapper>
)
export default PostLink