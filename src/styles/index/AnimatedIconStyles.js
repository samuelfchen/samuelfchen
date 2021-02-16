import styled from 'styled-components';

const AnimatedIconWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    img {
        width: 2.5rem;
        height: 2.5rem;
    }
    span {
        margin-top: -2px;
        font-size: 0.7rem;
        text-transform: lowercase;
        opacity: 0;
    }
`;

export default AnimatedIconWrapper;