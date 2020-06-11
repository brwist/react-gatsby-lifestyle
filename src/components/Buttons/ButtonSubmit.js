import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.input`
    display: inline-flex;
    justify-content: center;
    align-items: center;

    height: ${props => props.theme.mobileVW(40)};

    padding: 0 ${props => props.theme.mobileVW(12)};

    background-color: ${props => props.theme.colors.light};
    border: ${props => props.theme.mobileVW(2)} solid ${props => props.theme.colors.light};
    border-radius: ${props => props.theme.mobileVW(24)};

    font-family: ${props => props.theme.fontFamilies.nbRegular};
    font-size: ${props => props.theme.fontSizes.mobile.s};
    line-height: 1;

    text-transform: uppercase;

    color: ${props => props.theme.colors.dark};

    cursor: pointer;

    ${props => props.inactive == 'false' && `
        opacity: 0.25;

        pointer-events: none;
    `} 

    ${props => props.theme.above.desktop`
        height: ${props.theme.desktopVW(40)};

        padding: 0 ${props.theme.desktopVW(12)};

        background-color: ${props.theme.colors.light};
        border: ${props.theme.desktopVW(2)} solid ${props.theme.colors.light};
        border-radius: ${props.theme.desktopVW(24)};

        font-family: ${props.theme.fontFamilies.nbRegular};
        font-size: ${props.theme.fontSizes.desktop.m};
    `}
`

const ButtonSubmit = ({
    className,
    value,
    id,
    name,
    onClick,
    inactive
}) => {
    return (
        <StyledButton 
            type='submit'
            onClick={onClick}
            value={value && value}
            name={name && name}
            id={id && id}
            className={className}
            inactive={inactive && inactive}
        />
    )
}

export default ButtonSubmit
