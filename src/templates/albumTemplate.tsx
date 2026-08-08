import React from "react";
import { graphql } from "gatsby"

import Layout from './Layout'
import Gallery from '../components/photo/Gallery'
import 'react-image-lightbox/style.css';

import PhotoAlbumWrapper from './PhotoAlbum.styles'

interface AlbumTemplateProps {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        date: string
        slug: string
        title: string
        subtitle: string
      }
    }
    allFile: {
      edges: Array<{
        node: {
          id: string
          name: string
          childImageSharp: {
            original: {
              width: number
              height: number
            }
            gatsbyImageData: any
          }
        }
      }>
    }
  }
}

export default function Template({ data }: AlbumTemplateProps) {
  const { markdownRemark } = data
  const { frontmatter } = markdownRemark

  return (
    <Layout>
      <PhotoAlbumWrapper>
        <div className="gallery-wrapper">
          <Gallery photosQuery={data.allFile.edges}/>
        </div>
      </PhotoAlbumWrapper>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $imgDirRegex: String!, $imgDir: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        subtitle
      }
    }

    allCloudinaryMedia(filter: {public_id: {regex:$imgDirRegex}}) {
      edges {
        node {
          secure_url
          public_id
          height
          width
        }
      }
    }

    allFile(filter: {extension: {regex: "/(jpg)|(jpeg)|(png)/"}, relativeDirectory: {eq: $imgDir}}) {
      edges {
        node {
          id
          name
          childImageSharp {
            original {
              width
              height
            }
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`
