import styled from 'styled-components'

const HeaderWrapper = styled.header`
    position: fixed;
    z-index: 100;
    background-color: white;
    width: 100%;
    top: 0;
    left: 0;
    // Shadow when scrolled

    box-shadow: ${props => (props.isScrolled ? '0px 0px 10px #4d4d4d' : 'none')};

        .inner-header {
            height: 70px;
            text-transform: uppercase;
            display: flex;
            justify-content: space-between;
            align-items: center;
            // font-weight: bold;
            width: 80vw;
            margin: 0 auto;


            .logo {
                // background-color: pink;
                // margin-left: 10vw;
                width: auto;
                height: auto;
                display: flex;
                align-items: center;

                a {
                    text-decoration: none;
                    color: black;
                    font-size: 1.5rem;
                    letter-spacing: 0.2rem;
                }
                .active {
                    pointer-events: none;
                }
            }

            .navigation {
                // margin-right: 10vw;
                .desktop {
                    // background-color: pink;
                    a {
                        // Fade in underline on hover
                        text-decoration: underline solid transparent;
                        text-underline-offset: 5px;
                        transition: text-decoration 0.5s ease;
                        
                        letter-spacing: 1px;
                        margin: 0 20px;
                        color: black;
                        font-size: 0.85rem;
            
                        &:last-child {
                            margin-right: 0;
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
            
                .mobile {
                    a {
                        margin: 0 15px;
                        img {
                            width: 25px;
                            height: 25px;
                        }

                        &:last-child {
                            margin-right: 10vw;
                        }
                    }
                    display: none;
                }
            
                @media only screen and (max-width: 600px) {
                    .mobile {
                        display: inline;
                    }
                    .desktop {
                        display: none;
                    }
                }
            }
        }
    }
`

export default HeaderWrapper;