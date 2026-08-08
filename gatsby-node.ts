import * as path from 'path'
import type { GatsbyNode } from 'gatsby'

const hasCloudinaryConfig = [
  process.env.CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET,
].every(Boolean)

// When Cloudinary isn't configured (e.g. local development), provide an empty
// CloudinaryMedia type so the photo queries still validate but return nothing.
export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  if (hasCloudinaryConfig) return
  const { createTypes } = actions
  createTypes(`
    type CloudinaryMedia implements Node {
      public_id: String
      secure_url: String
      height: Float
      width: Float
    }
  `)
}

interface MarkdownNode {
  id: string
  frontmatter: {
    slug: string
    featuredImage: string
  }
}

interface QueryResult {
  errors?: unknown
  data: {
    allMarkdownRemark: {
      edges: Array<{ node: MarkdownNode }>
    }
  }
}

export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(process.cwd(), `src/templates/blogTemplate.tsx`)

  const blogRes = (await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: {type: {eq: "blogPost" }}}
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              slug
              featuredImage
            }
          }
        }
      }
    }
  `)) as QueryResult

  // Handle errors
  if (blogRes.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  blogRes.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: "blog/" + node.frontmatter.slug,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
        imgUrl: `blog/${node.frontmatter.featuredImage}`
      },
    })
  })

  //===========================================================================

  // Albums
  const albumTemplate = path.resolve(process.cwd(), `src/templates/albumTemplate.tsx`)

  const albumRes = (await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: {type: {eq: "photoAlbum" }}}
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              slug
              featuredImage
            }
          }
        }
      }
    }
  `)) as QueryResult

  // Handle errors
  if (albumRes.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  albumRes.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: "photo/" + node.frontmatter.slug,
      component: albumTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
        imgDirRegex: `/albums/${node.frontmatter.slug}/+/`,
        imgDir: `albums/${node.frontmatter.slug}`
      },
    })
  })
}
