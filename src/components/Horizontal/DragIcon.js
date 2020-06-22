import React, { forwardRef } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    pointer-events: none;
`

const Label = styled.span`
    color: ${props => props.theme.colors.dark};
`

const DragIcon = ({
    className
}, ref) => {
    return (
        <Wrapper ref={ref} className={className}>
            <Label>Drag me</Label>
        </Wrapper>
    )
}

export default forwardRef(DragIcon)
