import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'

import { generatePath } from './../../utils/helpers'

const ButtonStyles = css`
    display: inline-flex;
    justify-content: center;
    align-items: center;

    height: ${props => props.theme.mobileVW(40)};

    padding: 0 ${props => props.theme.mobileVW(12)};

    border: ${props => props.theme.mobileVW(2)} solid ${props => props.theme.colors.light};
    border-radius: ${props => props.theme.mobileVW(24)};

    color: ${props => props.theme.colors.light};

    transition: all 0.5s cubic-bezier(.16,1.08,.38,.98);

    ${props => props.inverted == 'true' && `
        background-color: ${props.theme.colors.light};
        
        border: ${props.theme.mobileVW(2)} solid ${props.theme.colors.light};
        
        color: ${props.theme.colors.dark};
    `}

    ${props => props.colored == 'true' && `
        border: ${props.theme.mobileVW(2)} solid currentColor;
        
        background-color: currentColor;

        .label {
            filter: invert(100%);
        }
    `}

    ${props => props.theme.above.desktop`
        height: ${props.theme.desktopVW(40)};

        padding: 0 ${props.theme.desktopVW(12)};

        border: ${props.theme.desktopVW(2)} solid ${props.theme.colors.light};
        border-radius: ${props.theme.desktopVW(24)};

        ${props.inverted == 'true' && `            
            border: ${props.theme.desktopVW(2)} solid ${props.theme.colors.light};
        `}

        ${props.colored == 'true' && `
            border: ${props.theme.desktopVW(2)} solid currentColor;
        `}

        &:hover {
            color: ${props.theme.colors.dark};

            background-color: ${props.theme.colors.white};
            border-color: ${props.theme.colors.white};
        }

        ${props.inverted == 'true' && `            
            &:hover {
                color: ${props.theme.colors.white};

                background-color: ${props.theme.colors.dark};
                border-color: ${props.theme.colors.white};
            }
        `}

        ${props.colored == 'true' && `            
            &:hover {
                color: ${props.theme.colors.white};

                background-color: ${props.theme.colors.dark};

                .label {
                    filter: none;
                }
            }
        `}

        ${props.colored == 'true' && props.inverted == 'true' && `
            &:hover {
                background-color: transparent;

                border-color: ${props.theme.colors.dark}; 
                
                .label {
                    filter: invert(100%);
                }
            }
        `}
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

    top: 1px;

    font-family: ${props => props.theme.fontFamilies.nbRegular};
    font-size: ${props => props.theme.fontSizes.mobile.s};
    line-height: 1;

    text-transform: uppercase;

    color: currentColor;

    transition: color 0.5s cubic-bezier(.16,1.08,.38,.98);

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.m};
    `}
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
    colored,
    modal,
    share
}) => {
    if (onClick) {
        return (
            <StyledButton 
                className={`button ${className || ''}`} 
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
                className={`button ${className || ''}`} 
                to={to} 
                inverted={inverted ? 'true' : 'false'}
                colored={colored ? 'true' : 'false'}
                state={{
                    modal: modal
                }}
            >
                {buttonInside(label)}
            </StyledInternal>
        )
    } else if (href) {
        const url = href.includes('@') && !href.includes('mailto') ? 'mailto:' + href : href
        return (
            <StyledExternal 
                className={`button ${className || ''}`}
                href={url}
                target={url.includes('mailto') ? '' : '_blank'}
                inverted={inverted ? 'true' : 'false'}
                colored={colored ? 'true' : 'false'}
            >
                {buttonInside(label)}
            </StyledExternal>
        )
    } else if (share) {
        if (typeof window !== 'undefined' && window.navigator.share) {
            return (
                <StyledButton 
                    onClick={() => shareHandler(share.text, share.link)}
                    className={`button ${className || ''}`}
                    inverted={inverted ? 'true' : 'false'}
                    colored={colored ? 'true' : 'false'}
                >
                    {buttonInside(label)}
                </StyledButton>
            )
        } else {
            return (
                <StyledExternal 
                    className={`button ${className || ''}`}
                    inverted={inverted ? 'true' : 'false'}
                    colored={colored ? 'true' : 'false'}
                    href={`https://web.whatsapp.com/send?text=${share.text}. Read more about it on ${share.link}`} 
                    target='_blank'
                >
                    {buttonInside(label)}
                </StyledExternal>
            )
        }
    } else {
        return null
    }
}

export default ButtonPrimary
