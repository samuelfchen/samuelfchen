import styled from 'styled-components';

const AnimatedIconWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    a {
        img {
            width: 2.5rem;
            height: 2.5rem;
    
            // transition: 1s;
    
            @media screen and (max-width: 400px) {
                width: 2rem;
                height: 2rem;
            }
        }
    }

    a:hover + span {
        opacity: 1;
        transform: translateY(0px);
    }

    // a:hover {
    //     img {
    //         transform: scale(1.1);
    //         filter: blur(4px) brightness(0.8);
    //     }
    // }

    span {
        font-size: 0.7rem;
        text-transform: lowercase;
        position: absolute;
        bottom: -1rem;

        transition: 0.4s;
        opacity: 0;
        transform: translateY(-0.25rem);

        overflow: auto;
    }
`;

export default AnimatedIconWrapper;