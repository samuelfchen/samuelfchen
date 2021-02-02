import styled from 'styled-components'

const HeaderWrapper = styled.header`
    position: fixed;
    z-index: 5;
    background-color: white;
    width: 100vw;
    top: 0;
    left: 0;

    height: 70px;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // font-weight: bold;

    // Shadow when scrolled
    box-shadow: ${props => (props.isScrolled ? '0px 0px 10px #4d4d4d' : 'none')};


    .logo {
        // background-color: pink;
        margin-left: 10vw;
        width: auto;
        height: auto;
        display: flex;
        align-items: center;

        a {
            text-decoration: none;
            color: black;
            // font-weight: 400;
            font-size: 1.5rem;
            // text-align: center;
            letter-spacing: 0.2rem;
        }
        .active {
            pointer-events: none;
        }
    }

    nav {
        a {
            // Fade in underline on hover
            text-decoration: underline solid transparent;
            text-underline-offset: 5px;
            transition: text-decoration 0.5s ease;


            letter-spacing: 1px;
            margin: 0 20px;
            color: black;
            font-size: 0.75rem;

            &:last-child {
                margin-right: 10vw;
            }
        }
        // Deactivate when page active
        .active {
            text-decoration: underline;
            pointer-events: none;
        }
        a:hover {
            text-decoration: underline;
        }
    }
`

export default HeaderWrapper;