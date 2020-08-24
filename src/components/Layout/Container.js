import React, { forwardRef } from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
    position: relative;
    
    width: 100%;
    /* max-width: ${props => props.theme.breakpoints.maxWidth}px; */
    
    height: 100%;

    margin: 0 auto;

    ${props => props.theme.below.maxWidth`
        padding: 0 ${props.theme.sizes.mobile};
    `}

    ${props => props.theme.above.maxWidth`
        padding: 0 ${props.theme.sizes.desktop};
    `}
`

const Container = ({ children, className }, ref) => {
    return (
        <StyledContainer ref={ref} className={className}>
            {children}
        </StyledContainer>
    )
}

export default forwardRef(Container)
