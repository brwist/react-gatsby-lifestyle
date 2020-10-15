import React, { useRef, forwardRef } from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import { scroller } from 'react-scroll'

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

    cursor: pointer;

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
}, ref) => {
    if (onClick) {
        return (
            <StyledButton 
                className={`button ${className || ''}`} 
                onClick={onClick} 
                inverted={inverted ? 'true' : 'false'}
                colored={colored ? 'true' : 'false'}
                ref={ref}
            >
                {buttonInside(label)}
            </StyledButton>
        )
    } else if (to) {
        if (modal) {
            return (
                <StyledInternal 
                    className={`button ${className || ''}`} 
                    to={to} 
                    inverted={inverted ? 'true' : 'false'}
                    colored={colored ? 'true' : 'false'}
                    ref={ref}
                    state={{
                        modal: modal.modal,
                        formInput: modal.formInput
                    }}
                >
                    {buttonInside(label)}
                </StyledInternal>
            )
        } else {
            return (
                <StyledInternal 
                    className={`button ${className || ''}`} 
                    to={to} 
                    inverted={inverted ? 'true' : 'false'}
                    colored={colored ? 'true' : 'false'}
                    ref={ref}
                >
                    {buttonInside(label)}
                </StyledInternal>
            )
        }
    } else if (href) {
        if (href.includes('#')) {
            const anchor = href.replace('#', '')
            return (
                <StyledButton
                    className={`button ${className || ''}`} 
                    smooth={true}
                    inverted={inverted ? 'true' : 'false'}
                    colored={colored ? 'true' : 'false'}
                    onClick={() => scroller.scrollTo(anchor, {
                        duration: 2000,
                        offset: -50,
                        smooth: 'easeInOutQuint'
                    })}
                >{buttonInside(label)}</StyledButton>
            )
        } else {
            const url = href.includes('@') && !href.includes('mailto') ? 'mailto:' + href : href
            return (
                <StyledExternal 
                    className={`button ${className || ''}`}
                    href={url}
                    target={url.includes('mailto') ? '' : '_blank'}
                    inverted={inverted ? 'true' : 'false'}
                    colored={colored ? 'true' : 'false'}
                    ref={ref}
                >{buttonInside(label)}</StyledExternal>
            )
        }
    } else if (share) {
        if (typeof window !== 'undefined' && window.navigator.share) {

            const shareHandler = (title, url) => {

                window.navigator.share({
                    title: title,
                    url: url
                }).then(() => {
                    console.log('Share success')
                })
                .catch((error) => {
                    console.log(error)
                })
        
            }

            return (
                <StyledButton 
                    onClick={() => shareHandler(share.text, share.link)}
                    className={`button ${className || ''}`}
                    inverted={inverted ? 'true' : 'false'}
                    colored={colored ? 'true' : 'false'}
                    ref={ref}
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
                    ref={ref}
                >
                    {buttonInside(label)}
                </StyledExternal>
            )
        }
    } else {
        return null
    }
}

export default forwardRef(ButtonPrimary)
