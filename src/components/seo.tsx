import React from "react"
import { useStaticQuery, graphql } from "gatsby"

interface SeoProps {
  title?: string
  description?: string
}

interface SiteQueryResult {
  site: {
    siteMetadata: {
      title: string
      description: string
    }
  }
}

const Seo = ({ title, description }: SeoProps) => {
  const data = useStaticQuery<SiteQueryResult>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description

  return (
    <>
      <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      <meta name="description" content={description || siteDescription} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || siteDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
    </>
  )
}

export default Seo
