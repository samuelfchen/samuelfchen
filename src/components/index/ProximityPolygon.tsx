import React from 'react'

import styled from 'styled-components'

const PolyWrapper = styled.polygon<{ distance?: number }>`
    opacity: ${(props) => props.distance}
`

interface ProximityPolygonProps {
    id?: string
    className?: string
    points?: string
    "data-name"?: string
}

const ProximityPolygon = (props: ProximityPolygonProps) => {
    return (
        <g>
            <PolyWrapper
                id={props.id}
                className={props.className}
                points={props.points}
                data-name={props["data-name"]}
            />
        </g>
    )
}

export default ProximityPolygon;
