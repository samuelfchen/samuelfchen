import React, {useEffect, useRef} from "react"
import IconBar from "./IconBar.js"

import { TweenLite } from 'gsap'

import HeroWrapper from '../../styles/index/HeroStyles'

import Mesh from './Mesh'

import down from '../../images/icons/down.svg'

const Hero = () => {
    let imageItem = useRef(null);
    let heroItem = useRef(null);
    
    // useEffect(() => {
    //     TweenLite.fromTo(heroItem, 1, {
    //         y: 40,
    //         opacity: 0
    //     }, {
    //         y:0,
    //         opacity: 1,
    //         delay: 0.5
    //     })
    // })

    return (
        <HeroWrapper>
            <div className="hero-content">
                <div className="description" ref={el => {heroItem = el}}>
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

                <div className="hero-mesh">
                    <Mesh/>
                </div>
            </div>
            
            <div className="arrow-down"> 
                <img src={down} alt="down arrow"/>
            </div>
        </HeroWrapper>
    )
}

export default Hero
