import React from "react"
// import "../styles/default.scss"

//Import component
import Layout from "../templates/Layout.js"
import Hero from "../components/index/Hero.js"
import { Link } from "gatsby"

import DummyText from "../components/test/DummyText"


const IndexPage = () => (
  <>
    <Layout limitWidth="true">
      <Hero/>
      <h1>Whats up?</h1>
      <p>👋 Hey there, I'm Sam! Thanks for checking out my website.</p>
      <p>I'm currently in my third year, studying the Bachelor of Advanced Computing at the University of Sydney. </p>
      <p>I take <Link to="/photo">📷 photos</Link> and write <Link to="/blog">👨‍💻 code</Link> in my spare time.</p> 
      <p>
        Some of my other passing interests incude
        <ul>
          <li>Computer Security</li>
          <li>Graphic Design</li>
          <li>Gaming</li>
          <li>Trying to <a target="none" href="https://www.notion.so/sfchen/To-Read-01343436f7b44a19ba6ed3ff666ca7f8">read more</a></li>
          <li>Wasting time on Youtube</li>
        </ul>         
      </p>
      
    </Layout>
  </>
)

export default IndexPage
