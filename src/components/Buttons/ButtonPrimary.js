import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'

import { generatePath } from './../../utils/helpers'

const ButtonStyles = css`
    display: inline-flex;
    justify-content: center;
    align-items: center;

    height: ${props => props.theme.desktopVW(40)};

    padding: 0 ${props => props.theme.desktopVW(12)};

    border: ${props => props.theme.desktopVW(2)} solid ${props => props.theme.colors.light};
    border-radius: ${props => props.theme.desktopVW(24)};

    color: ${props => props.theme.colors.light};

    ${props => props.inverted == 'true' && `
        background-color: ${props.theme.colors.light};
        
        border: ${props.theme.desktopVW(2)} solid ${props.theme.colors.dark};
        
        color: ${props.theme.colors.dark};
    `}

    ${props => props.colored == 'true' && `
        border: ${props.theme.desktopVW(2)} solid currentColor;
        background-color: currentColor;

        .label {
            filter: invert(100%);
        }
    `}
`

const StyledButton = styled.button`
    ${ButtonStyles}
`

const StyledInternal = styled(Link)`
    ${ButtonStyles}
`

const StyledExternal = styled.a`
    ${ButtonStyles}
`

const Label = styled.span`
    display: block;

    position: relative;

    top: 1.5px;

    font-family: ${props => props.theme.fontFamilies.nbRegular};
    font-size: ${props => props.theme.desktopVW(16)};
    line-height: 1;

    text-transform: uppercase;

    color: currentColor;
`

const buttonInside = (label) => {
    return (
        <Label className='label'>{label}</Label>
    )
}

const ButtonPrimary = ({
    lang,
    className,
    onClick,
    to,
    href,
    label,
    inverted,
    colored
}) => {
    if (onClick) {
        return (
            <StyledButton 
                className={className} 
                onClick={onClick} 
                inverted={inverted ? 'true' : 'false'}
                colored={colored ? 'true' : 'false'}
            >
                {buttonInside(label)}
            </StyledButton>
        )
    } else if (to) {
        return (
            <StyledInternal 
                className={className} 
                to={to} 
                inverted={inverted ? 'true' : 'false'}
                colored={colored ? 'true' : 'false'}
            >
                {buttonInside(label)}
            </StyledInternal>
        )
    } else if (href) {
        const url = href.includes('@') && !href.includes('mailto') ? 'mailto:' + href : href
        return (
            <StyledExternal 
                className={className} 
                href={url} 
                target={url.includes('mailto') ? '' : '_blank'} 
                inverted={inverted ? 'true' : 'false'}
                colored={colored ? 'true' : 'false'}
            >
                {buttonInside(label)}
            </StyledExternal>
        )
    } else {
        return null
    }
}

export default ButtonPrimary
