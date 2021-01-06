import { Link } from "gatsby"
import React from "react"
import githubIcon from "../images/icons/github-icon.svg"
import emailIcon from "../images/icons/email-icon.svg"
import linkedinIcon from "../images/icons/linkedin-icon.svg"
import resumeIcon from "../images/icons/resume-icon.svg"


const IconBar = () => (
    <div> 
        <nav>
            <a href="https://github.com/s-f-chen" target="_blank" rel="noreferrer"><img src={githubIcon} alt="github"/></a>
            <a href="mailto:samuel.f.chen@gmail.com" target="_blank" rel="noreferrer"><img src={emailIcon} alt="email"/></a>
            <a href="https://www.linkedin.com/in/samuel-chen-849b41177/" target="_blank" rel="noreferrer"><img src={linkedinIcon} alt="linkedIn"/></a>
            <Link to="/resume" target="_blank" rel="noreferrer"><img src={resumeIcon} alt="resume"/></Link>
        </nav>
    </div>
)

export default IconBar
