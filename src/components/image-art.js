import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby"

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
    return (
        <div className="image-art">
            <div className="images">
                <div className="image left-image">
                    <Img fluid={{...data.left.childImageSharp.fluid, aspectRatio: 2 / 3}} />
                </div>
                <div className="image center-image">
                    <Img fluid={{...data.center.childImageSharp.fluid, aspectRatio: 1 / 1}} />
                </div>
                <div className="image right-image">
                    <Img fluid={{...data.right.childImageSharp.fluid, aspectRatio: 2 / 3}} />
                </div>
            </div>
            <div className="caption">
                <p>"doggo" - 2020</p>
            </div>
        </div>
    )
}

export default ImageArt