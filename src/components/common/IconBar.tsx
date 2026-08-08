import React from "react"

import IconBarWrapper from './IconBar.styles'
import contact from '../../images/icons/contact/ContactInfo'
import AnimatedIcon from './AnimatedIcon'

const IconBar = () => {
    return (
        <IconBarWrapper numIcons={contact.length}>
            {
                contact.map((imageData) => {
                    return <AnimatedIcon icon={imageData.icon} label={imageData.label} url={imageData.url} key={imageData.label}/>
                })
            }
        </IconBarWrapper>
    )
}

export default IconBar
