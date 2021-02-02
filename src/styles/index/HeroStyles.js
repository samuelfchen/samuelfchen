import styled from 'styled-components';

const HeroWrapper = styled.div`
    height: calc(100vh);
    width: 80vw;
    margin-left: 10vw;
    // background-color: green;
    overflow: hidden;


    .hero-content {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .description {
            text-transform: uppercase;
            opacity: 0; 

            // line-height: 1rem;
            // display: inline-block;

            white-space: nowrap;
            .rwd-break {
                display: none;
            }

            @media screen and (max-width: 1000px) {
                .rwd-break {
                    display: block;
                }
            }

            .name {
                line-height: 2.5rem;
                font-size: 2.5rem;
                font-weight: 400;
                letter-spacing: 0.2rem;
                margin-bottom: 1rem;
            }

            .title {
                font-size: 1.1rem;
                letter-spacing: 0.15rem;
                font-weight: 350;
                margin-bottom: 1rem;
            }
        }

        .hero-image-art {
            opacity: 0;
        }
    }

    .arrow-down{
        width: 80vw;
        display: flex;
        margin-top: -80px;
        // background-color: red;

        img {
            width: 80px;
            margin: auto;
        }
    }
`

export default HeroWrapper;