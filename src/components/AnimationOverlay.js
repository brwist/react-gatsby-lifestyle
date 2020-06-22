import React, { forwardRef } from 'react'
import styled from 'styled-components'

import Grain from './Layout/Grain'

const Wrapper = styled.div`
    ${props => props.theme.styles.element.fill}

    background-color: ${props => props.theme.colors.dark};
`

const AnimationOverlay = ({
    className
}, ref) => {
    return (
        <Wrapper className={className} ref={ref}>
            <Grain />
        </Wrapper>
    )
}

export default forwardRef(AnimationOverlay)
