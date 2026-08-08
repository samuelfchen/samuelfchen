import React from "react"
import { graphql } from 'gatsby'

//Import component
import Layout from "../templates/Layout"

import AlbumLink from "../components/photo/AlbumLink"
import { PhotoAlbum } from '../utils/types'

interface PhotoPageProps {
  data: {
    allMarkdownRemark: {
      edges: Array<{ node: PhotoAlbum }>
    }
  }
}

const PhotoPage = ({ data }: PhotoPageProps) => {

  const Albums = data.allMarkdownRemark.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <AlbumLink key={edge.node.id} post={edge.node}/>)

  return (
    <Layout limitWidth="true">
      <h1>
        Albums
      </h1>
      <div>
        {Albums}
      </div>
    </Layout>
  );
}

export default PhotoPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, filter: { frontmatter: {type: {eq: "photoAlbum" }}}) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM YYYY")
            slug
            title
            subtitle
            featuredImage
          }
        }
      }
    }
  }
`
