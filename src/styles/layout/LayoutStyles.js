import styled from 'styled-components';
import { normalize } from 'styled-normalize';

const LayoutWrapper = styled.div`    

    main {        
        padding-top: 70px;
        padding-bottom: 110px;

        width: 80vw;
        max-width: 1000px;
        // margin-left: 10vw;
        margin: 0 auto;
        // background-color: green;

        
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        
        h1 {
            // text-transform: uppercase;
            line-height: 2rem;
            font-size: 2.5rem;
            font-weight: 400;
            letter-spacing: 0.1rem;
            margin-bottom: 1rem;
        }

        h2 {
            font-size: 1rem;
            letter-spacing: 0.1rem;
            font-weight: 350;
            margin-bottom: 1rem;
        }

        h3 {
            font-size: 1rem;
            letter-spacing: 0.1rem;
            font-weight: 350;
            margin-bottom: 1rem;
        }
    }
    
`

export default LayoutWrapper
