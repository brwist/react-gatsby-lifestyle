import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
    position: relative;
    
    width: 100%;
    max-width: ${props => props.theme.breakpoints.maxWidth}px;
    
    height: 100%;

    margin: 0 auto;

    ${props => props.theme.below.maxWidth`
        padding: 0 calc(${props => props.theme.sizes.desktop} * 3);
    `}
`

const Container = ({ children, className }) => {
    return (
        <StyledContainer className={className}>
            {children}
        </StyledContainer>
    )
}

export default Container
