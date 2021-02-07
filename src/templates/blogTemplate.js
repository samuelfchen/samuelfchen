import React from "react"
import { graphql } from "gatsby"

import Layout from './Layout'
import Img from "gatsby-image"

import BlogPostWrapper from '../styles/blog/BlogPostStyles'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  let featuredImgFluid = frontmatter.featuredImage.childImageSharp.fluid
  return (
    <Layout>
      <BlogPostWrapper>
        <div className="blog-intro">
          <h1>{frontmatter.title}</h1>
          <h3>{frontmatter.date}</h3>

          <h2>{frontmatter.subtitle}</h2>
          <Img fluid={featuredImgFluid} />
        </div>

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </BlogPostWrapper>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        subtitle
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`