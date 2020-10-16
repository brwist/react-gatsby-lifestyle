import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import gsap from 'gsap'

import { generatePath } from './../../utils/helpers'

const StyledNavigation = styled.nav`
    display: block;

    position: relative;

    width: 100%;
    
    ${props => props.type == 'header' && `
        top: -2px;
        
        .list {
            display: flex;
            flex-direction: row;
        }
    `}

    ${props => props.type == 'main' && `
        margin-bottom: ${props.theme.sizes.mobile};
    
        .item {
            display: block;
        }

        .link {
            overflow: hidden;

            &.in-active {
                opacity: 0.15;
            }
        }

        .label {
            font-family: ${props.theme.fontFamilies.nbBold};
            font-size: ${props.theme.fontSizes.mobile.h5};
            line-height: 1.25;

            text-transform: uppercase;
        }
    `}

    ${props => props.type == 'sub' && `
        .list {
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: calc(${props.theme.sizes.mobile} / 4) 0;
        }

        .link {
            overflow: hidden;
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

            .link {
                &:after {
                    display: none;
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
                line-height: 1.5;
            }
        `}
    `}
`

const List = styled.ul``

const Item = styled.li`
    color: ${props => props.theme.colors.light};

    &:not(:last-of-type) {
        margin-right: ${props => props.theme.sizes.desktop};
    }
`

const StyledLink = styled(Link)`
    display: block;

    position: relative;

    transition: opacity .5s cubic-bezier(.16,1.08,.38,.98);

    &:after {
        content: '';

        position: absolute;

        bottom: -${props => props.theme.mobileVW(3)};
        left: 0;

        width: 0;
        height: 1px;

        background-color: ${props => props.theme.colors.light};

        transition: width 0.25s cubic-bezier(.16,1.08,.38,.98);
    }

    &.in-active {
        opacity: 0.5;
    }

    ${props => props.theme.above.desktop`
        &:after {
            bottom: -${props.theme.desktopVW(2)};
        }

        &.active, &:hover {
            &:after {
                width: 100%;
            }
        }
    `}
`

const Label = styled.span`
    display: block;

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.s};
    line-height: 1.5;
    font-weight: 100;

    color: currentColor;

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.p};
    `}
`

const Navigation = ({
    lang, 
    className,
    data,
    setMenuOpen,
    setActiveMenuItem,
    type
}, ref) => {

    const linksRef = useRef([])
    const labelsRef = useRef([])

    useImperativeHandle(ref, () => {
        return {
            mainTransitionIn() {

                const timeline = new gsap.timeline()
                
                labelsRef.current.forEach((link, i) => {
                    timeline.to(link, { y: '0%', transformOrigin: 'top', duration: 0.45, ease: 'power2.out' }, i * 0.025)
                })
                
                return timeline

            },
            subTransitionIn() {

                const timeline = new gsap.timeline()
                
                labelsRef.current.forEach((link, i) => {
                    timeline.to(link, { alpha: 1.0, x: 0.0, duration: 0.35, ease: 'power2.out' }, i * 0.1)
                })
                
                return timeline

            }
        }
    })

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

    useEffect(() => {
        if (type == 'main') {
            labelsRef.current.forEach((label) => {
                gsap.set(label, { y: '-100%' })
            })
        } else if (type == 'sub') {
            labelsRef.current.forEach((label) => {
                gsap.set(label, { alpha: 0.0, x: -15.0 })
            })
        }
    }, [])

    const cutName = name => {
        if (name.includes('Development')) {
            return name.replace('Development', 'Dev.')
        } else if (name.includes('Rockstar')) {
            return name.replace('Rockstar', 'RS.')
        } else {
            return name
        }
    }

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
                                <Label 
                                    className='label'
                                    ref={el => labelsRef.current[index] = el}
                                >{type == 'main' ? cutName(name) : name}</Label>
                            </StyledLink>
                        </Item>
                    )
                })}
            </List>
        </StyledNavigation>
    )
}

export default forwardRef(Navigation)
