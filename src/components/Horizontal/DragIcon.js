import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Label = styled.span`

`

const DragIcon = ({
    className
}) => {
    return (
        <Wrapper className={className}>
            <Label>Drag me</Label>
        </Wrapper>
    )
}

export default DragIcon
