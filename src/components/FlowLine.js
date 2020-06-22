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
`

const FlowImage = styled(FlowSvg)`
    width: 100vw;
`

const FlowLine = ({
    className,
    inView
}) => {

    const flowRef = useRef(null)

    useEffect(() => {
        let tween = inView ? gsap.fromTo(flowRef.current, { width: '0%' }, { width: '100%', duration: 2, ease: 'power3.out' }) : null
        return () => {
            tween && tween.kill()
        }
    }, [inView])

    return (
        <StyledFlow ref={flowRef} className={className}>
            <FlowImage />
        </StyledFlow>
    )
}

export default FlowLine
