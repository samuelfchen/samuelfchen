import React, {useEffect, useRef} from "react"
import Img from "gatsby-image"
import { Link, useStaticQuery, graphql } from "gatsby"
import gsap, {TweenMax, Power3} from 'gsap'

import githubIcon from "../images/icons/github-icon.svg"
import linkedinIcon from "../images/icons/linkedin-icon.svg"
import emailIcon from "../images/icons/email-icon.svg"
import resumeIcon from "../images/icons/resume-icon.svg"

const IconBar = () => {

    let gLabel = useRef(null);
    let eLabel = useRef(null);
    let lLabel = useRef(null);
    let rLabel = useRef(null);


    const showLabel = (label) => {
        TweenMax.to(label, 0.4, {autoAlpha: 1, y: 3});
    }

    const hideLabel = (label) => {
        TweenMax.to(label, 0.4, {autoAlpha: 0, y: -3});
    }

    return (
        <div className="icon-bar"> 
            <div className="icons"> 
                <div className="icon">
                    <a 
                        href="https://github.com/s-f-chen" 
                        target="_blank" 
                        onMouseEnter={() => showLabel(gLabel)}
                        onMouseLeave={() => hideLabel(gLabel)}
                    >
                        <img src={githubIcon} alt="github"/>
                    </a>
                    <span ref={el => {gLabel = el}}>github</span>
                </div>
                <div className="icon">
                    <a 
                        href="mailto:samuel.f.chen@gmail.com" 
                        target="_blank"
                        onMouseEnter={() => showLabel(eLabel)}
                        onMouseLeave={() => hideLabel(eLabel)}
                    >
                            <img src={emailIcon} alt="email"/>
                    </a>
                    <span ref={el => {eLabel = el}}>email</span>
                </div>
                <div className="icon">
                    <a 
                        href="https://www.linkedin.com/in/samuel-chen-849b41177/" 
                        target="_blank"
                        onMouseEnter={() => showLabel(lLabel)}
                        onMouseLeave={() => hideLabel(lLabel)}
                    >
                        <img src={linkedinIcon} alt="linkedIn"/>
                    </a>
                    <span ref={el => {lLabel = el}}>linkedin</span>
                </div>
                <div className="icon">
                    <Link 
                        to="/resume" 
                        target="_blank"
                        onMouseEnter={() => showLabel(rLabel)}
                        onMouseLeave={() => hideLabel(rLabel)}
                    >
                        <img src={resumeIcon} alt="resume"/>
                    </Link>
                    <span ref={el => {rLabel = el}}>resume</span>
                </div>
            </div>
        </div>
    )
}

export default IconBar
