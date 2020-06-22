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
    className,
    inView
}) => {

    const flowRef = useRef(null)

    useEffect(() => {
        let tween = inView ? gsap.fromTo(this._tweenObj, { reveal: 1.0 }, { reveal: 0.0, duration: 0.8, ease: 'power3.inOut' }) : null
        return () => {
            tween && tween.kill()
        }
    }, [inView])

    return (
        <StyledFlow ref={flowRef} className={className} />
    )
}

export default FlowLine
