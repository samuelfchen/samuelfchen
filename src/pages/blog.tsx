import React from "react"
import { graphql } from 'gatsby'

//Import component
import Layout from "../templates/Layout"
import PostLink from "../components/blog/PostLink"
import Seo from "../components/seo"
import { BlogPost } from '../utils/types'

interface BlogPageProps {
  data: {
    allMarkdownRemark: {
      edges: Array<{ node: BlogPost }>
    }
  }
}

const BlogPage = ({ data }: BlogPageProps) => {

  const Posts = data.allMarkdownRemark.edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} excerpt={edge.node.excerpt} timeToRead={edge.node.timeToRead} />)

  return (
    <Layout limitWidth="true">
      <h1>
        Blog Posts
      </h1>

      <div>{Posts}</div>

    </Layout>
  );
}

export default BlogPage

export const Head = () => <Seo title="Blog" />

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, filter: { frontmatter: {type: {eq: "blogPost" }}}) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            subtitle
          }
        }
      }
    }
  }
`
