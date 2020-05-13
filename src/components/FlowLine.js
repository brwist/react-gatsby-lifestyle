import React from 'react'
import styled from 'styled-components'

import FlowSvg from './../images/graphics/flow.svg'

const StyledFlow = styled(FlowSvg)`
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;

    pointer-events: none;
`

const FlowLine = ({
    className
}) => {
    return (
        <StyledFlow className={className} />
    )
}

export default FlowLine
