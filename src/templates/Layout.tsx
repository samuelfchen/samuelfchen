import React from "react"

import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

// styling
import LayoutWrapper from './Layout.styles'
import {Normalize} from 'styled-normalize'

interface LayoutProps {
  children: React.ReactNode
  limitWidth?: string
}

const Layout = ({ children, limitWidth }: LayoutProps) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <LayoutWrapper limitWidth={limitWidth}>
        <Normalize/>

        <Helmet>
          <title>{data.site.siteMetadata.title}</title>
        </Helmet>

        <main>
          <Header/>
          {children}
        </main>
        <Footer/>

      </LayoutWrapper>
    </>
  )
}

export default Layout
