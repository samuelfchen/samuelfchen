import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';

interface DynImageProps {
  filename?: string
  alt?: string
}

interface DynImageQueryResult {
  images: {
    edges: Array<{
      node: {
        name: string
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
    }>
  }
}

const DynImage = ({ filename, alt }: DynImageProps) => {
  const data = useStaticQuery<DynImageQueryResult>(graphql`
    query {
      images: allFile(
          filter: {extension: {regex: "/(jpg)|(jpeg)|(png)/"}, relativeDirectory: {eq: "albums/featured"}}
      ) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData(aspectRatio: 2.5, layout: FULL_WIDTH, width: 1000)
            }
          }
        }
      }
    }
  `);

  const node = data.images.edges.find(n => n.node.name.includes(filename || ''));
  const image = node ? getImage(node.node.childImageSharp) : undefined;

  if (!image) {
    return null;
  }

  return <GatsbyImage image={image} alt={alt || ''} />;
};

export default DynImage;
