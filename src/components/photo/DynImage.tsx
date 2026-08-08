import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import styled from 'styled-components'

// Note: You can change "images" to whatever you'd like.

interface DynImageProps {
  filename?: string
  alt?: string
}

interface DynImageData {
  images: {
    edges: Array<{
      node: {
        relativePath: string
        childImageSharp: {
          fluid: FluidObject
        }
      }
    }>
  }
}

const Image = (props: DynImageProps) => (
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
    render={(data: DynImageData) => {
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(props.filename || '');
      });
      if (!image) {
        return null;
      }

      return (
          <Img alt={props.alt} fluid={{...image.node.childImageSharp.fluid, aspectRatio: 10 / 4}} />
      );
    }}
  />
);

export default Image;
