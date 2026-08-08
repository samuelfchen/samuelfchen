import React from "react"

import AnimatedIconWrapper from '../../styles/index/AnimatedIconStyles'

const AnimatedIcon = (props) => {
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