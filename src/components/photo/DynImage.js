import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import styled from 'styled-components'

// Note: You can change "images" to whatever you'd like.


const Image = props => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(
            filter: {extension: {regex: "/(jpg)|(jpeg)|(png)/"}, relativeDirectory: {eq: "albums/featured"}}
        ) {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(props.filename);
      });
      if (!image) {
        return null;
      }

      //const imageSizes = image.node.childImageSharp.sizes; sizes={imageSizes}
      return (
          <Img alt={props.alt} fluid={{...image.node.childImageSharp.fluid, aspectRatio: 10 / 4}} />
      );
    }}
  />
);

export default Image;