import React from "react"

import AnimatedIconWrapper from './AnimatedIcon.styles'

interface AnimatedIconProps {
  icon: string
  label: string
  url: string
}

const AnimatedIcon = (props: AnimatedIconProps) => {
    return (
        <AnimatedIconWrapper>
            <a
                href={ props.url }
                target="_blank"
                rel="noreferrer"
            >
                <img src={ props.icon } alt={ props.label }/>
            </a>
            <span>{ props.label }</span>
        </AnimatedIconWrapper>
    )
}

export default AnimatedIcon
