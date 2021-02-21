import styled from 'styled-components';

const IconBarWrapper = styled.div`
    width: ${props => props.numIcons * 3}rem;
    display: flex;
    justify-content: space-between;
    margin-right: 1.5rem;
    flex-direction: row;

    &:last-child {
        margin-right: 0;
    }

    @media screen and (max-width: 400px) {
        width: ${props => props.numIcons * 2.5}rem;
    }

`;

export default IconBarWrapper;