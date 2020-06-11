import React, { useState } from 'react'
import styled from 'styled-components'

import TextRenderer from './TextRenderer'

const StyledLocations = styled.div`
    width: 100%;

    ${props => props.theme.above.desktop`
        max-width: ${props.theme.desktopVW(500)};

        margin-left: calc(${props.theme.sizes.desktop} * 5);
    `}
`

const NavList = styled.ul`
    display: block;

    margin-bottom: ${props => props.theme.sizes.mobile};
    
    ${props => props.theme.above.desktop`
        margin-bottom: calc(${props.theme.sizes.desktop} * 2);
    `}
`

const NavItem = styled.li`
    display: inline-block;
    vertical-align: middle;

    position: relative;

    opacity: ${props => props.active ? 1 : 0.25};

    cursor: pointer;

    &:after {
        content: '';

        position: absolute;

        bottom: -5px;
        left: 0;

        width: 0;
        height: 1px;

        background-color: ${props => props.theme.colors.light};
    }

    &:not(:last-of-type) {
        margin-right: calc(${props => props.theme.sizes.mobile} / 2);
    }

    ${props => props.active && `
        &:after {
            width: 100%;
        }
    `}

    ${props => props.theme.above.desktop`
        &:not(:last-of-type) {
            margin-right: ${props.theme.sizes.desktop};
        }
    `}
`

const Title = styled.h4`
    font-family: ${props => props.theme.fontFamilies.plainRegular};
    font-size: ${props => props.theme.fontSizes.mobile.m};
    
    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.h6};
    `}
`

const Address = styled(TextRenderer)`
    font-size: ${props => props.theme.fontSizes.mobile.s};

    &:not(:last-of-type) {
        margin-bottom: 0;
    }

    &:first-of-type {
        margin-bottom: calc(${props => props.theme.sizes.mobile} / 1.5);
    }

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.p};

        &:first-of-type {
            margin-bottom: calc(${props.theme.sizes.desktop} / 1.5);
        }
    `}
`

const ContentList = styled.ul`
    position: relative;
`

const ContentItem = styled.li`
    position: absolute;

    opacity: ${props => props.active ? 1 : 0};

    &:nth-of-type(2) {
        position: relative;
    }
`

const Locations = ({
    lang,
    inView,
    data
}) => {

    const [activeItem, setActiveItem] = useState(0)

    return (
        <StyledLocations>
            <NavList>
                {data.map(({ title }, i) => {
                    return (
                        <NavItem key={i} onClick={() => setActiveItem(i)} active={activeItem == i}>
                            <Title>{title}</Title>
                        </NavItem>
                    )
                })}
            </NavList>
            <ContentList>
                {data.map(({ 
                    address,
                    facebook,
                    instagram
                }, i) => {
                    return (
                        <ContentItem key={i} active={activeItem == i}>
                            <Address data={address} useInlineLink />
                        </ContentItem>
                    )
                })}
            </ContentList>
        </StyledLocations>
    )
}

export default Locations
