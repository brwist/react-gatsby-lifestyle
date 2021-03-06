import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import gsap from 'gsap'

import Navigation from './Navigation'
import TextRenderer from '../TextRenderer'
import Container from './Container'
import Footer from './Footer'
import Grain from './Grain'
import TiltImage from './../TiltImage'
import AnimatedImage from './../AnimatedImage'

import LogoShortSvg from './../../images/graphics/rl.svg'
import InstagramSvg from './../../images/graphics/instagram.svg'

import { generatePath, removeLeadingSlashes } from '../../utils/helpers'

const StyledMenu = styled.aside`
    position: fixed;
    
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 3;

    width: 100%;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);

    opacity: 0;

    background-color: ${props => props.theme.colors.dark};

    ${props => props.menuOpen ? `
        pointer-events: all;
    ` : `
        pointer-events: none;
    `}
`

const StyledContainer = styled(Container)`
    position: relative;

    height: 100%;

    padding: ${props => props.theme.sizes.mobile};

    ${props => props.theme.above.desktop`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        padding: calc(${props.theme.sizes.desktop} * 8) 0;
    `}
`

const NavigationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    height: 100%;

    ${props => props.theme.above.desktop`
        align-items: center;
    `}
`

const ImageWrapper = styled.div`
    position: relative;

    width: ${props => props.theme.desktopVW(480)};
    height: ${props => props.theme.desktopVW(600)};
    
    background-color: ${props => props.theme.colors.darkGrey};

    ${props => props.theme.below.desktop`
        display: none;
    `}
`

const StyledAnimatedImage = styled(AnimatedImage)`
    width: 100%;
    height: 100%;
`

const StyledFooter = styled(Footer)`
    .link {
        &:not(.active) {
            opacity: 1;
        }
    }
`

const Menu = ({
    lang, 
    className,
    currentLocation,
    menuOpen,
    setMenuOpen,
    contentTheme
}) => {

    const menuRef = useRef(null)
    const mainNavRef = useRef(null)
    const subNavRef = useRef(null)
    const imageRef = useRef(null)

    const [timeline] = useState(new gsap.timeline({ paused: true }))
    const [activeMenuItem, setActiveMenuItem] = useState(Math.floor(Math.random() * contentTheme.menu.menuItems.length))

    const {
        contentfulTheme: {
            menu: {
                menuItems
            }
        }
    } = useStaticQuery(graphql`
        query MenuImagesQuery {
            contentfulTheme {
                menu {
                    menuItems {
                        name
                        slug
                        featuredImage {
                            title
                            fluid(maxWidth: 480, quality: 100) {
                                ...GatsbyContentfulFluid_withWebp
                            }
                        }
                    }
                }
            }
        }
    `)

    useEffect(() => {
        
        let slug = removeLeadingSlashes(currentLocation.pathname)

        if (slug == '') {
            setActiveMenuItem(Math.floor(Math.random() * contentTheme.menu.menuItems.length))
        } else {
            menuItems.forEach((item, i) => {
                if (slug == item.slug) {
                    setActiveMenuItem(i)
                }
            })
        }

    }, [currentLocation])

    useEffect(() => {

        timeline.to(menuRef.current, { alpha: 1.0, duration: 0.55, ease: 'sine.out' }, 0.0)
        timeline.add(imageRef.current.transitionIn(), 0.25)
        timeline.add(mainNavRef.current.mainTransitionIn(), 0.55)
        timeline.add(subNavRef.current.subTransitionIn(), 0.55)

    }, [])

    useEffect(() => {
        
        if (menuOpen) {
            timeline.play().timeScale(1)
        } else {
            timeline.reverse().timeScale(-3)
        }
        
    }, [menuOpen])

    useEffect(() => {
        
        timeline.add(imageRef.current.zoomIn(), 0.0)
        
    }, [activeMenuItem])

    useEffect(() => {

        let vh = typeof window !== 'undefined' ? window.innerHeight * 0.01 : 1000
        menuRef.current.style.setProperty('--vh', `${vh}px`)
    
    }, [])

    return (
        <StyledMenu 
            ref={menuRef}
            className={className} 
            menuOpen={menuOpen}
        >
            <StyledContainer>
                <NavigationWrapper>
                    <Navigation
                        ref={mainNavRef}
                        lang={lang}
                        data={contentTheme.menu.menuItems}
                        setMenuOpen={setMenuOpen}
                        setActiveMenuItem={i => setActiveMenuItem(i)}
                        type='main'
                    />
                    <Navigation
                        ref={subNavRef}
                        lang={lang}
                        data={contentTheme.menu.subItems}
                        setMenuOpen={setMenuOpen}
                        type='sub'
                    />
                </NavigationWrapper>
                <ImageWrapper>
                    {menuItems[activeMenuItem].featuredImage != null && (
                        <StyledAnimatedImage 
                            ref={imageRef}
                            data={menuItems[activeMenuItem].featuredImage}
                        />
                    )}
                </ImageWrapper>
                <StyledFooter 
                    lang={lang}
                    contentTheme={contentTheme}
                    setMenuOpen={setMenuOpen}
                    type='menu' 
                />
            </StyledContainer>
            <Grain />
        </StyledMenu>
    )
}

export default Menu
