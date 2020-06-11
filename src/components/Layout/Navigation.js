import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { generatePath } from './../../utils/helpers'

const StyledNavigation = styled.nav`
    display: inline-block;
    vertical-align: middle;

    width: 100%;

    ${props => props.type == 'main' && `
        margin-bottom: calc(${props.theme.sizes.mobile} * 1.5);
    
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

    ${props => props.type == 'small' && `
        .item {
            opacity: 0.5;
        }
    `}

    ${props => props.theme.above.desktop`
        .link {
            &:not(.active) {
                opacity: 0.25;
            }

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
    vertical-align: middle;

    color: ${props => props.theme.colors.light};

    &:not(:last-of-type) {
        margin-right: ${props => props.theme.sizes.desktop};
    }
`

const StyledLink = styled(Link)`
    display: inline-block;

    position: relative;

    &.active {
        &:after {
            width: 100%;
        }
    }

    &:after {
        content: '';

        position: absolute;

        bottom: -${props => props.theme.mobileVW(3)};
        left: 0;

        width: 0;
        height: 1px;

        background-color: ${props => props.theme.colors.light};
    }

    ${props => props.theme.above.desktop`
        &:after {
            bottom: -${props.theme.desktopVW(5)};
        }
    `}
`

const Label = styled.span`
    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.desktop.p};
    font-weight: 100;

    color: currentColor;
`

const Navigation = ({
    lang, 
    data,
    setMenuOpen,
    className,
    type
}) => {
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
                                className='link'
                                activeClassName='active'
                                onClick={setMenuOpen && setMenuOpen}
                                partiallyActive={true}
                                to={generatePath(lang, slug)}
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
