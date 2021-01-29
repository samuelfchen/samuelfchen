import React, {useRef, useEffect} from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import {TweenLite} from 'gsap'

import "../styles/default.scss"
import "../styles/image-art.scss"

const ImageArt = () => {
    const data = useStaticQuery(graphql`
        query {
            left: file(relativePath: { eq: "albums/dog/left.jpg" }) {
                childImageSharp {
                    fluid  {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            right: file(relativePath: { eq: "albums/dog/right.jpg" }) {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            center: file(relativePath: { eq: "albums/dog/center.jpg" }) {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `)

    //Animations 
    let leftItem = useRef(null);
    let rightItem = useRef(null);
    let centerItem = useRef(null);
    let captionItem = useRef(null);

    let leftHorizontal = useRef(null);
    let rightHorizontal = useRef(null);
    let leftDiagonal = useRef(null);
    let rightDiagonal = useRef(null);


    // useEffect(
    //     () => {
    //         TweenLite.fromTo(leftItem, 0.8, {
    //             x: -15,
    //             opacity: 0
    //         }, {
    //             x: 0,
    //             opacity: 1,
    //             delay: 0.2
    //         })
    //         TweenLite.fromTo(rightItem, 0.8, {
    //             x: 15,
    //             opacity: 0
    //         }, {
    //             x: 0,
    //             opacity: 1,
    //             delay: 0.2
    //         })
    //         TweenLite.fromTo(centerItem, 0.8, {
    //             // x: 20,
    //             opacity: 0
    //         }, {
    //             x: 0,
    //             opacity: 1,
    //             delay: 0.2
    //         })
    //         TweenLite.to(leftHorizontal, 3, {drawSVG: "0%"})
    //     }
    // )
    

    return (
        <div>
            <div className="image-art">
                <Link to="/photo" target="_blank">
                    <div className="images">
                        <div className="image left-image" ref={el => {leftItem = el}}>
                            <Img fluid={{...data.left.childImageSharp.fluid, aspectRatio: 2 / 3}}/>
                        </div>
                        <div className="image center-image" ref={el => {centerItem = el}}>
                            <Img fluid={{...data.center.childImageSharp.fluid, aspectRatio: 1 / 1}}/>
                        </div>
                        <div className="image right-image" ref={el => {rightItem = el}}>
                            <Img fluid={{...data.right.childImageSharp.fluid, aspectRatio: 2 / 3}}/>
                        </div>
                    </div>
                </Link>
                
                <div className="caption" ref={el => {captionItem = el}}>
                    <p>"doggo" - 2020</p>
                </div>

                <div className="lines"> 
                    <svg>
                        <rect className="left-horizontal" ref={el => {leftHorizontal = el}}/>
                        <rect className="right-horizontal" ref={el => {leftHorizontal = el}}/>
                        <rect className="left-diagonal" ref={el => {leftHorizontal = el}}/>
                        <rect className="right-diagonal" ref={el => {leftHorizontal = el}}/>
                    </svg>
                </div>
            </div>
            
        </div>
    )
}

export default ImageArt

