import styled from 'styled-components';

const HeroWrapper = styled.div`
    // height: calc(100vh - 70px);
    height: 100vh;
    background-color: green;
    overflow: hidden;
    width: 90vw;
    left: calc(-40vw + 50%);
    position: relative;
    top: -70px;

    .hero-content {
        position: absolute
        z-index: 10;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: vertical;
        // background-color: pink;    
        
        // font-size: 16px;
        
        .description {
            // Animations
            animation: fadein 1.1s ease-in-out 0.05s; 
            animation-fill-mode: forwards;

            // opacity: 0;
            // transform: translateY(70px);

            @keyframes fadein {
                from {
                    opacity: 0;
                    transform: translateY(70px);
                }

                to {
                    transform: translateY(0px);
                    opacity: 1;
                }
            }

            text-transform: uppercase;
            line-height: 1em;

            // Css reset
            p {
                margin-bottom: 0;
            }

            // line break
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
                line-height: 1.2em;
                font-size: 2.5em;
                font-weight: 400;
                letter-spacing: 0.1em;
                margin-bottom: 0.25em;
            }

            .title {
                font-size: 1.1em;
                letter-spacing: 0.15em;
                font-weight: 350;
                margin-bottom: 1em;
                // marign-top: 0;
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
                margin-right: -3vw
            }
        }
        @media screen and (max-width: 550px) {
            .hero-mesh {
                margin-right: -5vw
            }
        }

        @media screen and (max-width: 500px) {
            .hero-mesh {
                margin-right: -12vw;
            }
        }

        @media screen and (max-width: 400px) {
            .description {
                font-size: 14px;
            }

            .hero-mesh {
                max-width: 60vw;
                max-height: 95vh;

                margin-right: -10vw;
            }
        }

        @media screen and (max-width: 350px) {
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