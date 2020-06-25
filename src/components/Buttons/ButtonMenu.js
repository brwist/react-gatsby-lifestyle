import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    position: relative;

    width: ${props => props.theme.sizes.mobile};
    height: ${props => props.theme.mobileVW(8)};

    margin-right: 0;

    cursor: pointer;

    transition: transform 0.5s cubic-bezier(.16,1.08,.38,.98);

    &:after {
        content: '';
        position: absolute;
        top: -20px;
        right: -10px;
        bottom: -20px;
        left: -10px;
    }

    &:hover {
        transform: scale(0.9);
    }
    
    ${props => props.theme.above.desktop`
        width: ${props.theme.sizes.desktop};
        height: ${props.theme.desktopVW(8)};

        margin-right: calc(${props.theme.sizes.desktop} / 2);
    `}
`

const Line = styled.span`
    position: absolute;

    top: 0;
    left: 50%;

    transform: translateX(-50%);

    width: 100%;
    height: 1px;

    background-color: ${props => props.theme.colors.white};

    transition: all 0.25s ease-out;

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
            min-width: 20px;
        }
        
        &:nth-of-type(2) {
            top: 50%;
            left: 50%;

            transform: rotate(-45deg) translate(-50%, -50%);
            transform-origin: left;

            width: calc(${props.theme.sizes.mobile} / 2);
            min-width: 20px;
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
            <Line className='line' open={menuOpen} />
            <Line className='line' open={menuOpen} />
        </StyledButton>
    )
}

export default MenuToggle