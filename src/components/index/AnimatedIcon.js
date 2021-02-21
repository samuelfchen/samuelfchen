import React, { useRef } from "react"
// import TweenMax from 'gsap'

import AnimatedIconWrapper from '../../styles/index/AnimatedIconStyles'

// const showLabel = (label) => {
//     TweenMax.to(label, 0.4, {autoAlpha: 1, y: 3});
// }

// const hideLabel = (label) => {
//     TweenMax.to(label, 0.4, {autoAlpha: 0, y: -3});
// }

const AnimatedIcon = (props) => {

    let label = useRef(null);

    return (
        <AnimatedIconWrapper>
            <a 
                href={ props.url } 
                target="_blank" 
                rel="noreferrer"
                // onMouseEnter={() => showLabel(label)}
                // onMouseLeave={() => hideLabel(label)}
            >
                <img src={ props.icon } alt={ props.label }/>
            </a>
            <span>{ props.label }</span>
        </AnimatedIconWrapper>
    )
}

export default AnimatedIcon