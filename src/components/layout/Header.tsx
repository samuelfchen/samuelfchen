import { Link } from "gatsby"
import React, { useEffect, useState } from 'react';

import HeaderWrapper from '../../styles/layout/HeaderStyles'

import blogIconURL from '../../images/icons/header/blog.svg'
import photoIconURL from '../../images/icons/header/photo.svg'


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 30 ||
        document.documentElement.scrollTop > 30
      ) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderWrapper isScrolled={isScrolled}>
      <div className="inner-header">
        <div className="logo">
          <Link to="/" activeClassName="active">
            sc
          </Link>
        </div>

        <div className="navigation">
          <nav className='desktop'>
            <Link to="/photo" activeClassName="active">photography</Link>
            <Link to="/blog" activeClassName="active">blog</Link>
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
