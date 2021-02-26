import React from "react"
import { Link } from "gatsby"

import AlbumLinkWrapper from '../../styles/photo/AlbumLinkStyles'
import DynImage from "./DynImage"

const AlbumLink = ({ post, data }) => {
  const featuredImage = post.frontmatter.slug + ".jpg"

  return (
    <AlbumLinkWrapper>
      <Link to={post.frontmatter.slug}>
        <div className="outer-image">
          <div className="image">
            <DynImage alt="" filename={featuredImage}/>
          </div>
        </div>
        <div className='description'>
          <h2>{post.frontmatter.title} | {post.frontmatter.date}</h2> 
          <p>{post.frontmatter.subtitle}</p> 
        </div>
      </Link>
    </AlbumLinkWrapper>
  )
}
export default AlbumLink