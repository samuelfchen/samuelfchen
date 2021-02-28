import { Link } from "gatsby"
import React, { useEffect, useState } from 'react';

import HeaderWrapper from '../../styles/layout/HeaderStyles'

import LogoSVG from '../../images/logos/SigniatureLogoSVG'


import blogIconURL from '../../images/icons/header/blog.svg'
import photoIconURL from '../../images/icons/header/photo.svg'


const Header = () => {
  let [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (
        document.body.scrollTop > 30 ||
        document.documentElement.scrollTop > 30
      ) {
        setIsScrolled((isScrolled = true));
      } else {
        setIsScrolled((isScrolled = false));
      }
    });
  }, []);

  return (
    <HeaderWrapper isScrolled={isScrolled}>
      <div className="inner-header">
        <div className="logo">
          <Link to="/" activeClassName="active">
            {/* <LogoSVG/>
            <p>samuel chen</p> */}
            sc
          </Link>
        </div>

        <div className="navigation">
          <nav className='desktop'>
            <Link to="/photo" activeClassName="active">photography</Link>
            <Link to="/blog" activeClassName="active">blog</Link>
            {/* <Link to="/projects" activeClassName="active">projects</Link> */}
            {/* <Link to="/about" activeClassName="active">about</Link> */}
          </nav>
          <nav className='mobile'>
            <Link to="/photo"><img src={photoIconURL} alt='photo'/></Link>
            <Link to="/blog"><img src={blogIconURL} alt='blog'/></Link>
          </nav>
        </div>
      </div>
    </HeaderWrapper>
  )
}

export default Header
