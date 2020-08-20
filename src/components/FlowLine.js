import React, { useRef, useEffect, forwardRef } from 'react'
import styled from 'styled-components'
import gsap from 'gsap'

import FlowSvg from './../images/graphics/flow.svg'

const StyledFlow = styled.div`
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;

    pointer-events: none;

    overflow: hidden;

    &:after {
        content: '';
        position: absolute;

        top: 0;
        right: 0;
        
        width: 50px;
        height: 100%;

        background: linear-gradient(to right, rgba(16, 16, 16, 0) 0%, rgba(16, 16, 16, 0.72) 75%, rgba(16, 16, 16, 1) 100%);
    }

    ${props => props.theme.below.desktop`
        display: none;
    `}
`

const FlowImage = styled(FlowSvg)``

const FlowLine = ({
    className,
    inView
}, ref) => {
    return (
        <StyledFlow ref={ref} className={className}>
            <FlowImage />
        </StyledFlow>
    )
}

export default forwardRef(FlowLine)
