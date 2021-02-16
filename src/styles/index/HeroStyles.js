import styled from 'styled-components';

const HeroWrapper = styled.div`
    height: calc(100vh - 70px);
    margin-left: calc(10vw-1000px);
    // background-color: green;
    overflow: hidden;
    width: 90vw;
    left: calc(-40vw + 50%);
    position: relative;

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
            p {
                margin-bottom: 0;
            }

            text-transform: uppercase;
            opacity: 0; 

            line-height: 1em;
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
                max-width: 50vw;
                // position: absolute;
                // right: -25vw;
                // display: flex;
                // left-margin: 30vw;
                max-height: 90vh;
                // background-color: pink;

                margin-right: -10vw;
                svg {
                    // background-color: red;
                }
            }
        }

        @media screen and (max-width: 500px) {
            .hero-mesh {
                max-width: 45vw;
                max-height: 90vh;

                margin-right: -15vw;
            }
        }

        @media screen and (max-width: 400px) {
            .description {
                font-size: 14px;
            }

            .hero-mesh {
                max-width: 45vw;
                max-height: 90vh;

                margin-right: -15vw;
            }
        }

        @media screen and (max-width: 350px) {
            // .description {
            //     font-size: 12px;
            // }

            .hero-mesh {
                // max-width: 60vw;
                // max-height: 90vh;

                // margin-right: 0;
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