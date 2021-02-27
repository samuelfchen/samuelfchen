import styled from 'styled-components'

const PhotoAlbumWrapper = styled.div`
    .blog-intro {
        // margin-bottom: 5rem;
        // img {
        //     transition: 1s;
        //     &:hover {
        //         filter: blur(4px);
        //     }
        // }
        // transition: 1s;
        // &:hover {
        //     filter: blur(4px);
        // }
    }


    .gallery {
        width: 80vw;
        left: 10vw;
        position: absolute;
        // top: -70px;
    }

    img {
        transition: 0.7s;
        overflow: hidden;
    }

    img:hover {
        filter: brightness(0.8);
    }
    
`

export default PhotoAlbumWrapper