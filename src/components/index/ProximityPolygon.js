import React, { useRef, useEffect, useState } from 'react'

import { useProximityFeedback } from 'react-proximity-feedback'

import styled from 'styled-components'

const PolyWrapper = styled.polygon`
    opacity: ${(props) => props.distance}
`

const ProximityPolygon = (props) => {

    let polyRef = useRef(null)

    // const [ mouseDistance, setMouseDistance ] = useState()
    
    function calculateDistance(elem, mouseX, mouseY) {
        var {top, left, width, height} = elem;

        return Math.floor(Math.sqrt(Math.pow(mouseX - (left+(width/2)), 2) + Math.pow(mouseY - (top+(height/2)), 2)));
    }

    // useEffect(() => {
    //     const handleMove = (e) => {
    //         var mX = e.pageX;
    //         var mY = e.pageY;
    //         setMouseDistance(calculateDistance(polyRef.getBoundingClientRect(), mX, mY))
    //         // console.log(mouseDistance)
    //     }

    //     window.addEventListener('mouseover', handleMove);

    //     return () => {
    //         window.removeEventListener('mouseover', handleMove);
    //     }
    // })

    return (
        <g>
            <PolyWrapper ref={el => {polyRef = el}} className={props.className} points={props.points}/>
        </g>
    )
}

export default ProximityPolygon;