import { Link } from "gatsby"
import React, { useEffect, useState } from 'react';

import HeaderWrapper from '../../styles/layout/HeaderStyles'

import LogoSVG from '../../images/logos/SigniatureLogoSVG'

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
      <div className="logo">
        <Link to="/" activeClassName="active">
          {/* <LogoSVG/>
          <p>samuel chen</p> */}
          sc
        </Link>
      </div>

      <div className="navigation">
        <nav>
          <Link to="/photo" activeClassName="active">photography</Link>
          <Link to="/blog" activeClassName="active">blog</Link>
          {/* <Link to="/projects" activeClassName="active">projects</Link> */}
          {/* <Link to="/about" activeClassName="active">about</Link> */}
        </nav>
      </div>
    </HeaderWrapper>
  )
}

export default Header
