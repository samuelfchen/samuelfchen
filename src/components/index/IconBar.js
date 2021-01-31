import React, {useEffect, useRef} from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import gsap, {TweenMax, Power3} from 'gsap'

import IconBarWrapper from '../../styles/index/IconBarStyles'

import contact from '../../images/icons/contact/ContactInfo'
import AnimatedIcon from './AnimatedIcon'

const IconBar = () => {
    return (
        <IconBarWrapper numIcons={contact.length}>
            {
                contact.map((imageData) => {
                    return <AnimatedIcon icon={imageData.icon} label={imageData.label} url={imageData.url}/>
                })
            }
        </IconBarWrapper>
    )
}

export default IconBar
