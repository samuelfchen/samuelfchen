import { Link } from "gatsby"
import React from "react"

import TransitionLink from 'gatsby-plugin-transition-link';
import {TweenLite, Power3, Elastic} from 'gsap'



const Header = () => {

  return (
    <header>
      <div className="container">
        <div className="inner-header">
          <div className="logo">
            <Link to="/">sc</Link>
          </div>
  
          <div className="navigation">
            <nav>
              <Link to="/photo">photography</Link>
              <Link to="/projects">projects</Link>
              <Link to="/about">about</Link>
              <TransitionLink
                to="/about"
                exit={{
                  trigger: ({ exit, node }) => {
                    var main = node.getElementsByClassName("main");
                  
                    TweenLite.to(main, 3, {opacity: 0});
                  },
                  length: 1
                }}
                entry={{
                  delay: 0.6
                }}
              >
                Go to page 2
              </TransitionLink>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
