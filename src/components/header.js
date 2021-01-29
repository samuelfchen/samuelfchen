import { Link } from "gatsby"
import React from "react"
import PropTypes from "prop-types"

import "../styles/header.scss"

const Header = ({ siteTitle }) => {
  return (
    <div className="container">
      <header>
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
      </header>
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
