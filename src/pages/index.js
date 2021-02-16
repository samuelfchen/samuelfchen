import React from "react"
// import "../styles/default.scss"

//Import component
import Layout from "../templates/Layout.js"
import Hero from "../components/index/Hero.js"

import DummyText from "../components/test/DummyText"


const IndexPage = () => (
  <>
    <Layout>
      <Hero/>

      <h1>About Me</h1>
      <p>Hey there, I'm Sam! Thanks for checking out my website.</p>
      <p>I'm currently in my third year, studying the Bachelor of Advanced Computing at the University of Sydney. </p>
      {/* <DummyText/> */}
    </Layout>
  </>
)

export default IndexPage
