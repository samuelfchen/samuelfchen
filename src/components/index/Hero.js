import React, {useEffect, useRef} from "react"
import IconBar from "./IconBar.js"
import ImageArt from "./ImageArt.js"

import { TweenLite } from 'gsap'

import HeroWrapper from '../../styles/index/HeroStyles'

const Hero = () => {
    let imageItem = useRef(null);
    let heroItem = useRef(null);
    
    useEffect(() => {
        TweenLite.fromTo(heroItem, 1, {
            y: 40,
            opacity: 0
        }, {
            y:0,
            opacity: 1,
            delay: 0.5
        })

        TweenLite.fromTo(imageItem, 2, {
            opacity: 0
        }, {
            opacity: 1,
            delay: 1.5
        })
    })

    return (
        <HeroWrapper ref={el=> {heroItem = el}}>
            <div className="description">
                <div className="name">
                    <p>samuel <br className="rwd-break"/>chen</p>
                </div>

                <div className="title">
                    <p>bachelor of adv. <br className="rwd-break"/>computing @ usyd</p>
                </div>

                <div className="hero-icon-bar">
                    <IconBar/>
                </div>
            </div>

            <div className="hero-image-art" ref={el => {imageItem = el}}>
                <ImageArt/>
            </div>
        </HeroWrapper>
    )
}

export default Hero
