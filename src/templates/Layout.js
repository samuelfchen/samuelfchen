import React from "react"
import PropTypes from "prop-types"

import Header from "../components/layout/Header.js"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

// styling
import LayoutWrapper from '../styles/layout/LayoutStyles.js'
import {Normalize} from 'styled-normalize'

const Layout = ({ children }) => {
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
      <Normalize/>

      <LayoutWrapper>
        <Helmet>
          <title>{data.site.siteMetadata.title}</title>
        </Helmet>
        
        <Header/>

        <main>
          {children}
        </main>
      </LayoutWrapper>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout