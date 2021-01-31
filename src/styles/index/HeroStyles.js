import styled from 'styled-components';

const HeroWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    position: fixed;
    height: 100vh;
    width: 80vw;
    top: 0;
    // background-color: pink;
    align-items: center;

    .description {
        text-transform: uppercase;
        
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
            // font-weight: 400;
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
`

export default HeroWrapper;