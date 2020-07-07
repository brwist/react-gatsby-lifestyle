import React, { useRef, useEffect } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { generatePath } from './../../utils/helpers'

const StyledNavigation = styled.nav`
    display: block;

    width: 100%;

    ${props => props.type == 'main' && `
        margin-bottom: ${props.theme.sizes.mobile};
    
        .item {
            display: block;

            &:not(:last-of-type) {
                margin-bottom: calc(${props.theme.sizes.mobile} / 3);
            }
        }

        .label {
            font-family: ${props.theme.fontFamilies.nbBold};
            font-size: ${props.theme.fontSizes.mobile.h4};

            text-transform: uppercase;
        }
    `}

    ${props => props.type == 'sub' && `
        .list {
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: calc(${props.theme.sizes.mobile} / 2) 0;
        }

        .label {
            font-size: ${props.theme.mobileVW(20)};
        }
    `}

    ${props => props.theme.above.desktop`
        .link {
            &:hover {
                opacity: 1;
            }
        }

        ${props.type == 'main' && `
            margin-bottom: ${props.theme.desktopVW(80)};
        
            .item {
                &:not(:last-of-type) {
                    margin-bottom: ${props.theme.desktopVW(24)};
                }
            }

            .label {
                font-size: ${props.theme.fontSizes.desktop.h4};
            }
        `}

        ${props.type == 'sub' && `
            .list {
                grid-template-columns: repeat(2, ${props.theme.desktopVW(350)});
                grid-gap: calc(${props.theme.sizes.desktop} / 2) 0;
            }

            .label {
                font-size: ${props.theme.desktopVW(24)};
            }
        `}
    `}
`

const List = styled.ul``

const Item = styled.li`
    display: inline-block;

    color: ${props => props.theme.colors.light};

    &:not(:last-of-type) {
        margin-right: ${props => props.theme.sizes.desktop};
    }
`

const StyledLink = styled(Link)`
    display: inline-block;

    position: relative;

    &:after {
        content: '';

        position: absolute;

        bottom: -${props => props.theme.mobileVW(3)};
        left: 0;

        width: 0;
        height: 1px;

        background-color: ${props => props.theme.colors.light};
    }

    &.in-active {
        opacity: 0.25;
    }

    ${props => props.theme.above.desktop`
        &:after {
            bottom: -${props.theme.desktopVW(5)};
        }

        &.active {
            &:after {
                width: 100%;
            }
        }
    `}
`

const Label = styled.span`
    display: block;

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.desktop.p};
    font-weight: 100;

    color: currentColor;
`

const Navigation = ({
    lang, 
    className,
    data,
    setMenuOpen,
    setActiveMenuItem,
    type
}) => {

    const linksRef = useRef([])

    useEffect(() => {

        linksRef.current.forEach((link, i) => {
            if (link.classList.contains('in-active')) {
                link.classList.remove('in-active')
            }
        })
        
        linksRef.current.forEach((link, i) => {
            if (link.classList.contains('active')) {
                linksRef.current.forEach((link, i) => {
                    if (!link.classList.contains('active')) {
                        link.classList.add('in-active')
                    }
                })
            }
        })

    })

    return (
        <StyledNavigation className={className} type={type}>
            <List className='list'>
                {data.map(({ name, slug }, index) => {
                    return (
                        <Item 
                            key={index} 
                            className='item'
                        >
                            <StyledLink 
                                className={`link js-link-${type}`}
                                ref={el => linksRef.current[index] = el}
                                to={generatePath(lang, slug)}
                                activeClassName='active'
                                partiallyActive={true}
                                onClick={setMenuOpen && setMenuOpen}
                                onMouseEnter={() => setActiveMenuItem && setActiveMenuItem(index)}
                            >
                                <Label className='label'>{name}</Label>
                            </StyledLink>
                        </Item>
                    )
                })}
            </List>
        </StyledNavigation>
    )
}

export default Navigation
