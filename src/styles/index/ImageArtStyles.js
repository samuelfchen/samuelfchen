import styled from 'styled-components';

const ImageArtWrapper = styled.div`
    position: relative;
    // background-color: pink;

    opacity: ${props => props.mobile ? 0 : 1};

    .images {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: relative;
        width: ${props => props.width}px;
        height: ${props => props.width / 2}px;
        z-index: 2;

        .image {
            display: relative;
            border: 1px solid; 
            align-self: baseline;
        }

        .left-image {
            flex: 16.67%;
            width: 1/6;
            min-width: 1/6;
            margin-right: ${props => props.width / 12}px;
        }

        .center-image {
            flex: 50%;
            width: 3/6;
            min-width: 3/6;
        }

        .right-image {
            flex: 16.67%;
            width: 1/6;
            min-width: 1/6;
            margin-left: ${props => props.width / 12}px;
            align-self: flex-start;
        }

    }
    .caption {
        p {
            text-align: center;
            letter-spacing: 0.1rem; 
            font-size: 0.75rem;
            margin-top: 0.5rem;
        }
    }
    .lines {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 4;
        svg {
            width: ${props => props.width}px;
            height: ${props => props.width / 2}px;

            rect {
                fill: black;
            }

            .left-horizontal {
                y: ${props => props.width / 2 - 2}px;
                x: ${props => props.width / 6}px;
                width: ${props => props.width / 12 + 2}px;
                height: 1px;
            }

            .right-horizontal {
                y: 0;
                x: ${props => props.width * 3/4 - 1}px;
                width: ${props => props.width / 12 + 2}px;
                height: 1px;
            }

            .left-diagonal {
                // $top:147;
                // $wid: 151;
                // $lef: 0;
    
                height: 1px;
                y: ${props => props.width / 600 * 147}px;
                width: ${props => props.width / 600 * 151}px;
                x: ${props => props.width / 600 * 0}px;
                transform: skewY(-44.5deg);
            }

            .right-diagonal {
                // $top: 734;
                // $wid: 151;
                // $lef: 449;

                height: 1px;
                y: ${props => props.width / 600 * 740}px;
                width: ${props => props.width / 600 * 151}px;
                x: ${props => props.width / 600 * 449}px;
                transform: skewY(-44.5deg);
            }
        }
    }
`;

export default ImageArtWrapper;