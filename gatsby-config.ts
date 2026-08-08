import 'dotenv/config'

import type { GatsbyConfig } from 'gatsby'

const hasCloudinaryConfig = [
  process.env.CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET,
].every(Boolean);

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Samuel Chen`,
    description: `Personal site of Samuel Chen — photography, writing, and projects.`,
  },
  plugins: [
    // File system
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    // Manifest
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Samuel Chen`,
        short_name: `samuelfchen`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // Remark transformer
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // Plugins configs
        plugins: [],
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // Cloudinary is optional for local development and required for photo sync.
    ...(hasCloudinaryConfig
      ? [{
          resolve: `gatsby-source-cloudinary`,
          options: {
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            apiSecret: process.env.CLOUDINARY_API_SECRET,
            resourceType: `image`,
            prefix: `albums/`,
            context: true,
            tags: true,
            maxResults: 300,
          },
        }]
      : []),
    // One liners
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,
    'gatsby-plugin-svgr',
  ],
}

export default config
