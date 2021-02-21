import React, {useEffect, useRef} from "react"
import IconBar from "./IconBar.js"

import HeroWrapper from '../../styles/index/HeroStyles'

import Mesh from './Mesh'

import down from '../../images/icons/down.svg'

const Hero = () => {

    return (
        <HeroWrapper>
            <div className="hero-content">
                <div className="description" >
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
