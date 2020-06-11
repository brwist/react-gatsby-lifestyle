import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Button = styled(Link)``

const Label = styled.span`
    display: inline-block;
    vertical-align: middle;
    
    font-family: ${props => props.theme.fontFamilies.nbRegular};
    font-size: ${props => props.theme.fontSizes.mobile.xs};
    line-height: 1.5;

    text-transform: uppercase;

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.m};
    `}
`

const Arrow = styled.div`
    position: relative;

    margin-left: ${props => props.theme.mobileVW(15)};

    ${props => props.theme.styles.inlineBlock.verCen};

    width: 0; 
    height: 0; 

    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 4px solid currentColor;

    &:before {
        content: '';
        position: absolute;
        
        top: 50%;
        left: 0;

        transform: translateY(-50%) translateX(-12px);
        
        width: 8px;
        height: 2px;

        background-color: currentColor;
    }

    ${props => props.theme.above.desktop`
        margin-left: ${props.theme.desktopVW(15)};

        border-top: ${props.theme.desktopVW(5)} solid transparent;
        border-bottom: ${props.theme.desktopVW(5)} solid transparent;
        border-left: ${props.theme.desktopVW(5)} solid currentColor;

        &:before {
            transform: translateY(-50%) translateX(-${props.theme.desktopVW(13)});
            
            width: ${props.theme.desktopVW(13)};
            height: ${props.theme.desktopVW(2)};
        }
    `}
`

const ButtonArrow = ({
    className,
    label, 
    to
}) => {
    return (
        <Button 
            className={className}
            to={to}
        >
            <Label>{label}</Label>
            <Arrow direction='right' />
        </Button>
    )
}

export default ButtonArrow
