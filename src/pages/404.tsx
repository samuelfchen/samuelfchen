import React from "react"
import { Link } from "gatsby"

import Layout from "../templates/Layout"

const NotFoundPage = () => (
  <Layout>
    <h1>Page not found</h1>
    <p>
      The page you&apos;re looking for doesn&apos;t exist or has moved.
    </p>
    <Link to="/">Go home</Link>
  </Layout>
)

export default NotFoundPage
