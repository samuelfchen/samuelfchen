import React from "react"
// import "../styles/default.scss"

//Import component
import Layout from "../templates/Layout.js"
import Hero from "../components/index/Hero.js"

const IndexPage = () => (
  <>
    <Hero/>
    <Layout>
      
      <h1>About Me</h1>
      <p>Hey there, I'm Sam! Thanks for checking out my website. <br/><br/>I'm currently in my third year, studying the Bachelor of Advanced Computing at the University of Sydney. </p>
    </Layout>
  </>
)

export default IndexPage
