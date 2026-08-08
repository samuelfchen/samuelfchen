import React, {useEffect, useRef} from "react"
import IconBar from "./IconBar"

import { TweenMax } from 'gsap'

import HeroWrapper from './Hero.styles'

import Mesh from './Mesh'

import down from '../../images/icons/down.svg'

const Hero = () => {
    let heroItem = useRef<HTMLDivElement>(null);

    useEffect(() => {
        TweenMax.fromTo(heroItem.current, 1, {
            y: 40,
            opacity: 0
        }, {
            y:0,
            opacity: 1,
            delay: 0.5
        })
    }, [])

    return (
        <HeroWrapper>
            <div className="hero-content">
                <div className="description" ref={heroItem}>
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
