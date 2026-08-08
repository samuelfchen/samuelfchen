import React from "react"
import { Link } from "gatsby"

import AlbumLinkWrapper from '../../styles/photo/AlbumLinkStyles'
import DynImage from "./DynImage"
import { PhotoAlbum } from '../../utils/types'

interface AlbumLinkProps {
  post: PhotoAlbum
}

const AlbumLink = ({ post }: AlbumLinkProps) => {

  return (
    <AlbumLinkWrapper>
      <Link to={post.frontmatter.slug}>
        <div className="outer-image">
          <div className="image">
            <DynImage filename={post.frontmatter.slug}/>
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
