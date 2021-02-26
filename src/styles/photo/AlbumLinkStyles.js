import styled from 'styled-components'

const AlbumLinkWrapper = styled.div`
    padding-bottom: 0px;
    padding-top: 20px;

    a:hover {
        .description {
            opacity: 1;
        }

        .outer-image .image {
            filter: blur(4px) brightness(0.8);
        }
        
    }

    a {
        position: relative;

        .outer-image {
            width: 80vw;
            max-width: 1000px;
            height: 32vw;
            max-height: 400px;
            overflow: hidden;

            // &:hover {
            //     .image {
            //         filter: blur(4px) brightness(0.8);
            //     }
            // }
        
            .image {
                transition: 0.7s;
                
            }
        }


        // .description:before {
        //     width: 100%
        //     height: 100%;
        //     background-color: black;
        //     z-index: 2;
        // }

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