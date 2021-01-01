import { Link } from "gatsby"
import React from "react"
import githubIcon from "../images/github-icon.svg"
import emailIcon from "../images/email-icon.svg"
import linkedinIcon from "../images/linkedin-icon.svg"
import resumeIcon from "../images/resume-icon.svg"


const IconBar = () => (
    <div> 
        <nav>
            <a href="https://github.com/s-f-chen" target="_blank"><img src={githubIcon} alt="github"/></a>
            <a href="mailto:samuel.f.chen@gmail.com" target="_blank"><img src={emailIcon} alt="email"/></a>
            <a href="https://www.linkedin.com/in/samuel-chen-849b41177/" target="_blank"><img src={linkedinIcon} alt="linkedIn"/></a>
            <Link to="/resume" target="_blank"><img src={resumeIcon} alt="resume"/></Link>
        </nav>
    </div>
)

export default IconBar
