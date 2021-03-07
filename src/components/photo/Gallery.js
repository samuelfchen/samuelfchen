import styled from "styled-components"
import React, { useState, useCallback } from "react"
import Gallery from 'react-photo-gallery'
import Img from 'gatsby-image'

import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css';


const ImageWrapper = styled.div`
box-shadow: -1px 3px 6px 1px rgba(0, 0, 0, 0.3);
transition: all 0.2s ease-in-out;
// border-radius: 2px;
overflow: hidden;
cursor: pointer;
div {
 transition: transform 2s;
}
:hover {
 box-shadow: -2px 5px 8px 2px rgba(0, 0, 0, 0.3);
 div {
   transform: scale(1.05);
 }
}
`

const GatsbyImage = ({ index, onClick, photo, margin }) => (
<ImageWrapper
 style={{ margin, height: photo.height, width: photo.width }}
 onClick={e => onClick(e, { index, photo })}
>
 <Img
   fixed={typeof window === 'undefined' ? { src: {} } : undefined}
   fluid={photo.fluid}
 />
</ImageWrapper>
)

const fileNumber = file =>
  Number(file.node.childImageSharp.fluid.originalName.replace(/[a-z]/gi, ''))

const getImages = imageArray => {
  return [...imageArray]
    .sort((a, b) => fileNumber(b) - fileNumber(a))
    .map(({ node: { childImageSharp: { fluid, original } } }) => ({
      height: original.height,
      width: original.width,
      src: fluid.originalImg,
      srcSet: fluid.srcSet,
      fluid
    })) 
}


const GatsbyGallery = ({photosQuery, ...rest}) => {
  
  const photos = getImages(photosQuery);

  // console.log(photos)

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
    <>
      <Gallery photos={photos} onClick={openLightbox} renderImage={GatsbyImage} />

      {isOpen && (
        <Lightbox
        reactModalProps={{ shouldReturnFocusAfterClose: false }}
        mainSrc={photos[currentImage].src}
        nextSrc={photos[(currentImage + 1) % photos.length].src}
        prevSrc={photos[(currentImage + photos.length - 1) % photos.length].src}
        onCloseRequest={closeLightbox}
        onMovePrevRequest={photoBack}
        onMoveNextRequest={photoForward}
        />
      )}
    </>
  )
}

export default GatsbyGallery