import React, {useRef, useEffect, useState} from "react"
import throttle from 'lodash';
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import {TweenLite} from 'gsap'

import ImageArtWrapper from '../../styles/index/ImageArtStyles'

const ImageArt = (props) => {
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


    // Window Width handling
    const [ windowProps, setState ] = useState({ width: 0, displayWidth: 0, isMobile: 0 });

    useEffect(() => {
        const updateWindowDimensions = () => {
            const windowProps = { width: 0, displayWidth: 0, isMobile: 0 };
            windowProps.width = window.innerWidth;
            
            const availableWidth = window.innerWidth * 0.6 / 2;
            const maxWidth = availableWidth - (availableWidth % 100);
            const availableHeight = window.innerHeight - 200;
            const maxHeight = availableHeight - (availableHeight % 50);
            

            // If not enough height, width is maxHeight * 2, else width is maxWidth
            windowProps.displayWidth = (maxWidth > maxHeight * 2) ? maxHeight * 2 : maxWidth;

            windowProps.isMobile = windowProps.displayWidth < 400;
            setState(windowProps);
        }

        window.addEventListener('resize', updateWindowDimensions, { passive: true });
        window.addEventListener('load', updateWindowDimensions, { passive: true });


        return () => {
            window.removeEventListener('resize', updateWindowDimensions);
        }
    }, [ windowProps ]);


    return (
        <>
            { console.log("Display width: " + windowProps) } 

            <ImageArtWrapper width={windowProps.displayWidth} mobile={windowProps.isMobile || 0}>
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
            </ImageArtWrapper>
        </>
    )
}

export default ImageArt

