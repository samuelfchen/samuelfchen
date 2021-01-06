import React from "react"
import "../styles/styles.scss"

//Import component
import Header from "../components/header"
import Hero from "../components/hero"
// import ImageArt from "../components/image-art"

const IndexPage = () => (
  <div>
    <Header/>
    <Hero/>
    {/* <ImageArt/> */}
  </div>
)

export default IndexPage
