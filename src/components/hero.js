import React, {useEffect, useRef} from "react"
import IconBar from "./icon-bar.js"
import ImageArt from "./image-art.js"

import {TweenMax, Power3} from 'gsap'

const Hero = () => {
    let nameItem = useRef(null);
    let titleItem = useRef(null);
    let iconItem = useRef(null);
    let imageItem = useRef(null);

    
    useEffect(() => {
        TweenMax.from(
            nameItem,
            .8,
            {
                opacity: 0,
                y: 40,
                delay: 0.5
            }
        )
        TweenMax.to(
            nameItem,
            .8,
            { 
                opacity: 1,
                ease: Power3.easeIn(),
                delay: 0.5
            }
        )
        
        TweenMax.from(
            titleItem,
            .8, 
            {
                opacity: 0,
                y: 30,
                delay: 0.7
            }
        )
        TweenMax.to(
            titleItem,
            .8,
            { 
                opacity: 1,
                ease: Power3.easeIn(),
                delay: .7
            }
        )


        TweenMax.from(
            iconItem,
            0.8,
            { 
                opacity: 0,
                y: 20,
                delay: 0.9
            }
        )
        TweenMax.to(
            iconItem,
            0.8,
            { 
                opacity: 1,
                ease: Power3.easeIn(),
                delay: 0.9
            }
        )
        
        TweenMax.from(
            imageItem,
            1.2,
            { 
                opacity: 0,
                delay: 1
            }
        )
        TweenMax.to(
            imageItem,
            1.2,
            { 
                opacity: 1,
                ease: Power3.easeIn(),
                delay: 1
            }
        )
    })

    return (
        <div className="hero">
            <div className="container">
                <div className="inner-hero">
                    <div className="description">
                        <div className="name" ref={el => {nameItem = el}}>
                            <p>samuel <br className="rwd-break"/>chen</p>
                        </div>

                        <div className="title" ref={el => {titleItem = el}}>
                            <p>bachelor of adv. <br className="rwd-break"/>computing @ usyd</p>
                        </div>

                        <div className="hero-icon-bar" ref={el => {iconItem = el}}>
                            <IconBar/>
                        </div>
                    </div>

                    <div className="hero-image-art" ref={el => {imageItem = el}}>
                        <ImageArt/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
