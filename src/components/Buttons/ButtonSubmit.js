import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.input`
    display: inline-flex;
    justify-content: center;
    align-items: center;

    height: ${props => props.theme.desktopVW(40)};

    padding: 0 ${props => props.theme.desktopVW(12)};

    background-color: ${props => props.theme.colors.light};
    border: ${props => props.theme.desktopVW(2)} solid ${props => props.theme.colors.light};
    border-radius: ${props => props.theme.desktopVW(24)};

    font-family: ${props => props.theme.fontFamilies.nbRegular};
    font-size: ${props => props.theme.desktopVW(16)};
    line-height: 1;

    text-transform: uppercase;

    color: ${props => props.theme.colors.dark};

    cursor: pointer;

    ${props => props.inactive == 'false' && `
        opacity: 0.25;

        pointer-events: none;
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
