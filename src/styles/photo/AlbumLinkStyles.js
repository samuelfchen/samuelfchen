import styled from 'styled-components'

const AlbumLinkWrapper = styled.div`
    padding-bottom: 0px;
    padding-top: 20px;

    a:hover {
        .description {
            opacity: 1;
        }

        .outer-image .image {
            filter: brightness(0.7) blur(3px);
            transform: scale(1.05);
            // transform-origin: 0% 0% 0px;
        }
        
    }

    a {
        position: relative;

        .outer-image {
            min-width: 100%;
            min-height: 100%;
            overflow: hidden;
        
            .image {
                img {
                    position: absolute;
                }
                transition: 1s;
                // position: absolute;
                height: 100%;
                width: 100%;
                // -webkit-transform: translateZ(0);
                // transform: translateZ(0);
            }        
        }

        .description {
            transition: 0.7s;
            opacity: 0;
            
            position: absolute;
            width: 80vw;
            max-width: 1000px;
            height: 100%;
        
            padding-top: 30px;
            padding-left: 30px;

            top: 0;
            z-index: 2;
            max-height: 400px;
            // background-color: gray;

            text-decoration: none;
            color: white;
            h2 {
                margin-bottom: 0.5rem;
            }
            p {
                margin-bottom: 0.5rem;
            }
        }
        
    }
`

export default AlbumLinkWrapper