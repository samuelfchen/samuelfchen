import React, { useState, useCallback } from "react";
import { graphql } from "gatsby"

import Layout from './Layout'
import Img from "gatsby-image"
// import Gallery from '../components/photo/Gallery'
import Gallery from "react-photo-gallery"
import Carousel, { Modal, ModalGateway } from "react-images";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import Images from '../components/photo/AlbumImages'

import PhotoAlbumWrapper from '../styles/photo/PhotoAlbumStyles'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, file } = markdownRemark

  const clImages = data.allCloudinaryMedia.edges;

  const photos = clImages.map((edge) => {
    return {
      src: edge.node.secure_url,
      height: edge.node.height,
      width: edge.node.width,
    }
  })

  // Lightbox stuff
  const [currentImage, setCurrentImage] = useState(0);
  const [isOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const photoForward = () => {
    setCurrentImage((currentImage + 1) % photos.length);
  }

  const photoBack = () => {
    setCurrentImage((currentImage + photos.length - 1) % photos.length)
  }


  return (
    <Layout>
      <PhotoAlbumWrapper>
        {/* <div className="blog-intro">
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.subtitle}</h2>
        </div> */} 

        <div className="gallery">
          <Gallery photos={photos} onClick={openLightbox}/>

          {isOpen && (
          <Lightbox
          mainSrc={photos[currentImage].src}
          nextSrc={photos[(currentImage + 1) % photos.length].src}
          prevSrc={photos[(currentImage + photos.length - 1) % photos.length].src}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={photoBack}
          onMoveNextRequest={photoForward}
        />
        )}
        </div>

      </PhotoAlbumWrapper>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $imgDirRegex: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        subtitle
      }
    }

    allCloudinaryMedia(filter: {public_id: {regex:$imgDirRegex}}) {
      edges {
        node {
          secure_url
          public_id
          height
          width
        }
      }
    }
  }
`

// allFile(filter: {extension: {regex: "/(jpg)|(jpeg)|(png)/"}, relativeDirectory: {eq: ""}}) {
//   edges {
//     node {
//       id
//       name
//       childImageSharp {
//         original {
//           width
//           height
//         }
//         fluid {
//           ...GatsbyImageSharpFluid_withWebp
//           originalName
//           originalImg
//         }
//       }
//     }
//   }
// }
// }