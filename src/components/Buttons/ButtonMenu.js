import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    position: relative;

    width: ${props => props.theme.sizes.mobile};
    height: ${props => props.theme.mobileVW(8)};

    margin-right: 0;

    cursor: pointer;

    ${props => props.theme.below.desktop`
        &:after {
            content: '';
            position: absolute;
            top: -20px;
            right: -10px;
            bottom: -20px;
            left: -10px;
        }
    `}
    
    ${props => props.theme.above.desktop`
        width: ${props.theme.sizes.desktop};
        height: ${props.theme.desktopVW(8)};

        margin-right: calc(${props.theme.sizes.desktop} / 2);
    `}
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

    ${props => props.open && `
        &:nth-of-type(1) {
            top: 50%;
            left: 50%;
            
            transform: rotate(45deg) translate(-50%, -50%);
            transform-origin: left;

            width: calc(${props.theme.sizes.mobile} / 2);
        }
        
        &:nth-of-type(2) {
            top: 50%;
            left: 50%;

            transform: rotate(-45deg) translate(-50%, -50%);
            transform-origin: left;

            width: calc(${props.theme.sizes.mobile} / 2);
        }
    `}

    ${props => props.theme.above.desktop`
        ${props => props.open && `
            &:nth-of-type(1) {
                width: calc(${props.theme.sizes.desktop} / 2);
            }
            
            &:nth-of-type(2) {
                width: calc(${props.theme.sizes.desktop} / 2);
            }
        `}
    `}
`

const MenuToggle = ({ 
    className,
    setMenuOpen,
    menuOpen
}) => {
    return (
        <StyledButton
            className={className}
            onClick={setMenuOpen}
            open={menuOpen}
        >
            <Line open={menuOpen} />
            <Line open={menuOpen} />
        </StyledButton>
    )
}

export default MenuToggle