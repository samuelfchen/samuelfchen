import React, {useEffect, useRef} from "react"
import IconBar from "./icon-bar.js"
import ImageArt from "./image-art.js"

import "../styles/default.scss"
import "../styles/hero.scss"

import {TweenLite, Power3, Elastic} from 'gsap'

const Hero = () => {
    let nameItem = useRef(null);
    let titleItem = useRef(null);
    let iconItem = useRef(null);
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
        // TweenLite.fromTo(nameItem, 0.8, {
        //     y: 40,
        //     opacity: 0
        // }, {
        //     y: 0,
        //     opacity: 1,
        //     delay: 1
        // })
        // TweenLite.fromTo(titleItem, 1, {
        //     y: 40,
        //     opacity: 0
        // }, {
        //     y: 0,
        //     opacity: 1,
        //     delay: 1.2
        // })
        // TweenLite.fromTo(iconItem, 1.2, {
        //     y: 40,
        //     opacity: 0
        // }, {
        //     y: 0,
        //     opacity: 1,
        //     delay: 1.4
        // })
        // TweenLite.fromTo(imageItem, 2, {
        //     opacity: 0
        // }, {
        //     opacity: 1,
        //     delay: 2
        // })
    })

    return (
        <div className="container">
            <div className="hero" ref={el=> {heroItem = el}}>
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
    )
}

export default Hero
