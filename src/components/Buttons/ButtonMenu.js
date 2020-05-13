import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    position: relative;

    width: ${props => props.theme.sizes.desktop};
    height: ${props => props.theme.desktopVW(8)};

    margin-right: ${props => props.theme.sizes.desktop};

    cursor: pointer;
`

const Line = styled.span`
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: ${props => props.theme.desktopVW(1)};

    background-color: ${props => props.theme.colors.white};

    &:nth-of-type(2) {
        top: initial;
        bottom: 0;
    }
`

const MenuToggle = ({ 
    className,
    setMenuOpen,
    menuOpen
}) => (
    <StyledButton
        className={className} 
        onClick={setMenuOpen}
        open={menuOpen}
    >
        <Line />
        <Line />
    </StyledButton>
)

export default MenuToggle