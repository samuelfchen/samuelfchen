const hasCloudinaryConfig = [
  process.env.CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET,
].every(Boolean)

// When Cloudinary isn't configured (e.g. local development), provide an empty
// CloudinaryMedia type so the photo queries still validate but return nothing.
exports.createSchemaCustomization = ({ actions }) => {
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

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = require.resolve(`./src/templates/blogTemplate.js`)

  const blogRes = await graphql(`
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
  `)

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
  const albumTemplate = require.resolve(`./src/templates/albumTemplate.js`)

  const albumRes = await graphql(`
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
  `)

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