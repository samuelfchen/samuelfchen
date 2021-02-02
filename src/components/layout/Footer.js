import { Link } from "gatsby"
import React from 'react';

import FooterWrapper from '../../styles/layout/FooterStyles'

import LogoSVG from '../../images/logos/SigniatureLogoSVG'

const Footer = () => {

  return (
    <FooterWrapper>
      <div className="left">
        © {(new Date().getFullYear())} - Samuel Chen
      </div>
      <div className="right">
        Built with <a href="https://www.gatsbyjs.com" target="_blank" rel="noreferrer">Gatsby</a>.
      </div>
    </FooterWrapper>
  )
}

export default Footer
