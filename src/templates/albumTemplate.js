import React, { useState, useCallback } from "react";
import { graphql } from "gatsby"

import Layout from './Layout'
import Img from "gatsby-image"
import Gallery from '../components/photo/Gallery.js'
import 'react-image-lightbox/style.css';


import PhotoAlbumWrapper from '../styles/photo/PhotoAlbumStyles'



export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, file } = markdownRemark

  // const clImages = data.allCloudinaryMedia.edges;
  // const photos = clImages.filter(edge => !!edge.node.public_id).map((edge) => {
  //   return {
  //     src: edge.node.secure_url,
  //     height: edge.node.height,
  //     width: edge.node.width,
  //   }
  // })
  
  

  return (
    <Layout>
      <PhotoAlbumWrapper>
        {/* <div className="blog-intro">
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.subtitle}</h2>
        </div> */} 

        <div className="gallery-wrapper">
          <Gallery photosQuery={data.allFile.edges}/>
        </div>

        {/* {console.log(data.allFile.edges)} */}

        {/* <Gallery photos={data.allFile.edges}/> */}

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

