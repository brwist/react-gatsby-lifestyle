import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Button = styled(Link)``

const Label = styled.span`
    font-family: ${props => props.theme.fontFamilies.nbRegular};
    font-size: ${props => props.theme.fontSizes.desktop.m};
    line-height: 1.5;

    text-transform: uppercase;
`

const Arrow = styled.div`
    position: relative;

    margin-left: ${props => props.theme.desktopVW(15)};

    ${props => props.theme.styles.inlineBlock.verCen};

    width: 0; 
    height: 0; 

    border-top: ${props => props.theme.desktopVW(5)} solid transparent;
    border-bottom: ${props => props.theme.desktopVW(5)} solid transparent;
    
    border-left: ${props => props.theme.desktopVW(5)} solid currentColor;

    &:before {
        content: '';
        position: absolute;
        
        top: 50%;
        left: 0;

        transform: translateY(-50%) translateX(-${props => props.theme.desktopVW(13)});
        
        width: ${props => props.theme.desktopVW(13)};
        height: ${props => props.theme.desktopVW(2)};

        background-color: currentColor;
    }
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
