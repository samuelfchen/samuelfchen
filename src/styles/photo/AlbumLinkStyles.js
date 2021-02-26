import styled from 'styled-components'

const AlbumLinkWrapper = styled.div`
    padding-bottom: 0px;
    padding-top: 20px;

    a:hover {
        .description {
            opacity: 1;
        }
        img {
            transform: scale(1.1);
            filter: blur(4px) brightness(0.8);
        }
    }

    

    a {
        position: relative;
              
        img {
            transition: 0.7s;
        }
        

        .description {
            transition: 0.7s;
            opacity: 0;
            
            position: absolute;
            width: 90vw;
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