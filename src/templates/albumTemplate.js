import React from "react"
import { graphql } from "gatsby"

import Layout from './Layout'
import Img from "gatsby-image"
import Gallery from '../components/photo/Gallery'

import PhotoAlbumWrapper from '../styles/photo/PhotoAlbumStyles'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, file } = markdownRemark

  const Photos = data.allFile.edges.map(({node}) => {
    return (
      <Img fluid={{...node.childImageSharp.fluid}}/>
    )
  })

  return (
    <Layout>
      <PhotoAlbumWrapper>
        <div className="blog-intro">
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.subtitle}</h2>
        </div>
        {/* {
          Photos
        } */}

        <Gallery
          columns={width => {
            if (width < 700) {
              return 2
            } else if (width < 1000) {
              return 3
            } else {
              return 6
            }
          }}
          photos={data.allFile.edges}
        />

        {Photos}
      </PhotoAlbumWrapper>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $imgDir: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        subtitle
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
            fluid {
              ...GatsbyImageSharpFluid_withWebp
              originalName
              originalImg
            }
          }
        }
      }
    }
  }
`