import React from "react"
import PropTypes from "prop-types"

import { Helmet } from "react-helmet"
import Header from "../../components/header"
import { useStaticQuery, graphql } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link"
import {gsap, TweenMax} from 'gsap'
import "../../styles/Layout.scss"

// Transition Link Component
export const ListTLink = props => (
  <TransitionLink style={{textDecoration:`none`}}
  to={props.to}
  entry={props.entry, {delay: 1}}
  exit={props.exit, {length: 1}}
  trigger={props.trigger}
  >
  {props.children}
  </TransitionLink>
)

// hidden object animation
export function animateObjects(exit, node) {
  var tl = gsap.timeline();
  // tl.to('.content', {opacity: 0, delay: 3, duration: 2})
  // tl.to('ul.transition li', {duration: .5, opacity: 0})'
  // console.log(node.querySelectorAll('div.content'))
  // return gsap.to(node.querySelectorAll('div.content'), {y: -10, duration: 2})
  return tl.to('div.content', {opacity: 0, duration: 1})
}

// new content to be faded in after animation
export function newContent(node) {
  return TweenMax.from(node.querySelectorAll('h1, h2, h3, h4, p, a, img, table, ul, pre'),
  {
    opacity: 0,
    delay: 1,
    duration: 0.5,
    stagger: 0.08,
  })
}


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
      <Helmet>
          <meta charSet="utf-8" />
          <title>{data.site.siteMetadata.title}</title>
      </Helmet>

      <Header siteTitle={data.site.siteMetadata.title}/>

      <div>
        <main>{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout