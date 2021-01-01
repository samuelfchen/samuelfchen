import React from "react"
import IconBar from "./icon-bar.js"
import ImageArt from "./image-art.js"

const Hero = () => (
    <div className="hero">
        <div className="container">
            <div className="inner-hero">
                <div className="description">
                    <div className="name">
                        <p>samuel <br className="rwd-break"/>chen</p>
                    </div>

                    <div className="title">
                        <p>bachelor of adv. <br className="rwd-break"/>computing @ usyd</p>
                    </div>

                    <div className="icons">
                        <IconBar/>
                    </div>
                </div>

                <div className="image-art">
                    placeholder for images
                </div>
            </div>
        </div>
    </div>
)

export default Hero
