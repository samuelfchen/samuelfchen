import styled from 'styled-components';

const HeroWrapper = styled.div`
    height: calc(100vh);
    margin-left: 10vw;
    // background-color: green;
    overflow: hidden;

    .hero-content {
        position: absolute
        z-index: 10;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: vertical;
        // background-color: pink;        
        
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

        .hero-mesh {
            z-index: 5;
            margin-right: 10vw;
            // background-color: pink;

            display: flex;
            justify-content: flex-end;
            align-items: center;

            height: 80vh;
            width: 50vw;

        }
        @media screen and (max-width: 600px) {
            .hero-mesh {
                width: 50vw;
                // position: absolute;
                // right: -25vw;
                // display: flex;
                // left-margin: 30vw;
                height: 90vh;
                // background-color: pink;

                margin-right: 0;
                svg {
                    // background-color: red;
                }
            }
        }

        @media screen and (max-width: 400px) {
            .hero-mesh {
                display: none;
            }
        }
    }

    


    .arrow-down{
        // position: absolute;
        width: 80vw;
        display: flex;
        margin-top: -80px;
        // bottom: 0
        // background-color: red;

        img {
            width: 80px;
            margin: auto;
        }
    }
`

export default HeroWrapper;