import { Link } from "gatsby"
import React from "react"

const Header = () => (
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
          </nav>
        </div>
      </div>
    </div>
  </header>
)

export default Header
