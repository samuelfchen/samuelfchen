import React from "react"
import PropTypes from "prop-types"

import Header from "../components/layout/Header.js"
import Footer from "../components/layout/Footer"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import '../styles/default.scss'

// styling
import LayoutWrapper from '../styles/layout/LayoutStyles.js'
import {Normalize} from 'styled-normalize'

const Layout = ({ children, limitWidth }) => {
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout