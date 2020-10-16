import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import gsap from 'gsap'

import TextRenderer from './TextRenderer'
import AnimatedIcon from './AnimatedIcon'

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

const ContentList = styled.ul`
    position: relative;
`

const ContentItem = styled.li`
    position: absolute;

    background-color: ${props => props.theme.colors.dark};

    ${props => props.active ? `
        pointer-events: all;
    ` : `
        pointer-events: none;
    `}

    &:nth-of-type(2) {
        position: relative;
    }
`

const Address = styled(TextRenderer)`
    font-size: ${props => props.theme.fontSizes.mobile.s};

    a {
        color: ${props => props.theme.colors.orange};
    }

    &:not(:last-of-type) {
        margin-bottom: 0;
    }

    &:first-of-type {
        margin-bottom: calc(${props => props.theme.sizes.mobile} / 3);
    }

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.p};

        &:first-of-type {
            margin-bottom: calc(${props.theme.sizes.desktop} / 1.5);
        }

        &:last-of-type {
            margin-bottom: ${props.theme.sizes.desktop};
        }
    `}
`

const StyledAnimatedIcon = styled(AnimatedIcon)`
    margin-top: calc(${props => props.theme.sizes.mobile} / 2);
    
    &:first-of-type {
        margin-right: calc(${props => props.theme.sizes.mobile} / 3);
    }

    ${props => props.theme.above.desktop`
        margin-top: calc(${props.theme.sizes.desktop} / 2);
        
        &:first-of-type {
            margin-right: calc(${props.theme.sizes.desktop} / 2);
        }
    `}
`

const Locations = ({
    lang,
    inView,
    data
}) => {

    const locationRefs = useRef([])
    const [activeItem, setActiveItem] = useState(0)

    useEffect(() => {
        locationRefs.current.forEach((item) => {
            gsap.set(item, { alpha: 0.0, y: 25.0 })
        })
    }, [])

    useEffect(() => {

        locationRefs.current.forEach((item, i) => {
            if (i == activeItem) {
                gsap.to(item, { alpha: 1.0, y: 0.0, duration: 1.0, delay: 0.25, ease: 'power3.out' })
            } else {
                gsap.to(item, { alpha: 0.0, y: 25.0, duration: 0.5, ease: 'power3.out' })
            }
        })

    }, [activeItem])

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
                        <ContentItem key={i} ref={el => locationRefs.current[i] = el} active={activeItem == i}>
                            <Address data={address} useInlineLink />
                            <StyledAnimatedIcon instagram={instagram} />
                            <StyledAnimatedIcon facebook={facebook} />
                        </ContentItem>
                    )
                })}
            </ContentList>
        </StyledLocations>
    )
}

export default Locations
