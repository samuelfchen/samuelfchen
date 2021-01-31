import { Link } from "gatsby"
import React, { useEffect, useState } from 'react';

import HeaderWrapper from '../../styles/layout/HeaderStyles'


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
        <Link to="/" activeClassName="active">sc</Link>
      </div>

      <div className="navigation">
        <nav>
          <Link to="/photo" activeClassName="active">photography</Link>
          <Link to="/projects" activeClassName="active">projects</Link>
          <Link to="/about" activeClassName="active">about</Link>
        </nav>
      </div>
    </HeaderWrapper>
  )
}

export default Header
