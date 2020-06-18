import React, { forwardRef } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: ${props => props.theme.desktopVW(150)};
    height: ${props => props.theme.desktopVW(150)};

    border-radius: 100%;

    background-color: #fff;

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
