import styled from "styled-components"
import React, { useState, useCallback } from "react"
import Gallery, { PhotoProps, RenderImageProps } from 'react-photo-gallery'
import Img, { FluidObject } from 'gatsby-image'

import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css';

interface AlbumFluid extends FluidObject {
  originalName?: string
  originalImg?: string
}

interface AlbumImageNode {
  childImageSharp: {
    original: {
      width: number
      height: number
    }
    fluid: AlbumFluid
  }
}

interface AlbumImageEdge {
  node: AlbumImageNode
}

type GalleryPhoto = PhotoProps<{ fluid: AlbumFluid }>

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

const GatsbyImage = ({ index, onClick, photo, margin }: RenderImageProps<{ fluid: AlbumFluid }>) => (
<ImageWrapper
 style={{ margin, height: photo.height, width: photo.width }}
 onClick={e => onClick && onClick(e, { index, photo } as any)}
>
 <Img
   fixed={typeof window === 'undefined' ? ({ src: {} } as any) : undefined}
   fluid={photo.fluid}
 />
</ImageWrapper>
)

const fileNumber = (file: AlbumImageNode) =>
  Number(file.childImageSharp.fluid.originalName?.replace(/[a-z]/gi, ''))

const getImages = (imageArray: AlbumImageEdge[]): GalleryPhoto[] => {
  return [...imageArray]
    .sort((a, b) => fileNumber(b.node) - fileNumber(a.node))
    .map(({ node: { childImageSharp: { fluid, original } } }) => ({
      height: original.height,
      width: original.width,
      src: fluid.originalImg || fluid.src,
      srcSet: fluid.srcSet,
      fluid
    }))
}


const GatsbyGallery = ({ photosQuery, ...rest }: { photosQuery: AlbumImageEdge[] }) => {

  const photos = getImages(photosQuery);

  // Lightbox stuff
  const [currentImage, setCurrentImage] = useState(0);
  const [isOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event: React.MouseEvent, { photo, index }: any) => {
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
