import React from "react"

import Layout from "../templates/Layout"
import Seo from "../components/seo"

const AboutPage = () => (
  <Layout>
    <h1>About Me</h1>
    <p>
      I&apos;m Samuel Chen, a front-end developer who enjoys building
      responsive, accessible web experiences with React, TypeScript, and
      Gatsby.
    </p>
    <p>
      This site is where I write about web development and share photo albums
      from my travels.
    </p>
  </Layout>
)

export default AboutPage

export const Head = () => <Seo title="About" />
